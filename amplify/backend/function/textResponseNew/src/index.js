/* Amplify Params - DO NOT EDIT
	API_AMPLIFYPOC_GRAPHQLAPIENDPOINTOUTPUT
	API_AMPLIFYPOC_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { ConversationChain } from "langchain/chains";
import { ChatPromptTemplate, MessagesPlaceholder } from "langchain/prompts";
import { PinpointClient, SendMessagesCommand } from "@aws-sdk/client-pinpoint";
import { BufferWindowMemory } from "langchain/memory";
import { DynamoDBChatMessageHistory } from "langchain/stores/message/dynamodb";
import crypto from "@aws-crypto/sha256-js";
import { defaultProvider } from "@aws-sdk/credential-provider-node";
import { SignatureV4 } from "@aws-sdk/signature-v4";
import { HttpRequest } from "@aws-sdk/protocol-http";
import { default as fetch, Request } from "node-fetch";

const SECRET_PATH = process.env.OpenAIKey;
const AppId = process.env.PinpointApplicationId;
const GRAPHQL_ENDPOINT = process.env.API_AMPLIFYPOC_GRAPHQLAPIENDPOINTOUTPUT;
const AWS_REGION = process.env.AWS_REGION || "us-east-1";
const { Sha256 } = crypto;

const listUserProfiles = /* GraphQL */ `
  query ListUserProfiles(
    $filter: ModelUserProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        name
        personalityTest
        background
        phone
        optInText
        completedIcebreakers
        userSummary
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;

const listOpenAIModels = /* GraphQL */ `
  query ListOpenAIModels {
    listOpenAIModels {
      items {
        id
        prompt
        model
        temperature
        top_p
        max_tokens
        presence_penalty
        frequency_penalty
      }
    }
  }
`;

// Helper to get UserProfile
const getUserProfile = async (phonenumber) => {
  const phone = phonenumber.substring(2);
  const endpoint = new URL(GRAPHQL_ENDPOINT);
  const variables = {
    filter: {
      phone: { eq: phone },
    },
  };

  const signer = new SignatureV4({
    credentials: defaultProvider(),
    region: AWS_REGION,
    service: "appsync",
    sha256: Sha256,
  });

  const requestToBeSigned = new HttpRequest({
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      host: endpoint.host,
    },
    hostname: endpoint.host,
    body: JSON.stringify({ query: listUserProfiles, variables }),
    path: endpoint.pathname,
  });

  const signed = await signer.sign(requestToBeSigned);
  const request = new Request(endpoint, signed);
  let response;
  let body;
  try {
    console.log("GETTING USER PROFILE");
    response = await fetch(request);
    body = await response.json();
    if (body.errors)
      console.log(`ERROR GETTING USER PROFILE: ${JSON.stringify(body.errors)}`);
  } catch (error) {
    console.log(`ERROR GETTING USER PROFILE: ${JSON.stringify(error.message)}`);
  }
  if (
    body &&
    body.data &&
    body.data.listUserProfiles &&
    body.data.listUserProfiles.items &&
    body.data.listUserProfiles.items.length >= 1
  ) {
    return body.data.listUserProfiles.items[0];
  }
  return undefined;
};

const getOpenAIModel = async () => {
  const endpoint = new URL(GRAPHQL_ENDPOINT);
  const signer = new SignatureV4({
    credentials: defaultProvider(),
    region: AWS_REGION,
    service: "appsync",
    sha256: Sha256,
  });
  const requestToBeSigned = new HttpRequest({
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      host: endpoint.host,
    },
    hostname: endpoint.host,
    body: JSON.stringify({ query: listOpenAIModels }),
    path: endpoint.pathname,
  });
  const signed = await signer.sign(requestToBeSigned);
  const request = new Request(endpoint, signed);
  let response;
  let body;

  try {
    console.log("Fetch Admin Settings");
    response = await fetch(request);
    body = await response.json();
    if (body.errors)
      console.log(
        `ERROR Fetching Admin Settings: ${JSON.stringify(body.errors)}`
      );
  } catch (error) {
    console.log(
      `ERROR Fetching Admin Settings: ${JSON.stringify(error.message)}`
    );
  }
  return body.data.listOpenAIModels.items[0];
};

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
export const handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const message = JSON.parse(event.Records[0].Sns.Message);
  const customerPhoneNumber = message.originationNumber;
  const chatbotPhoneNumber = message.destinationNumber;
  const response = message.messageBody.toLowerCase();

  const client = new SSMClient();
  const input = {
    Name: SECRET_PATH,
    WithDecryption: true,
  };
  const command = new GetParameterCommand(input);
  const { Parameter } = await client.send(command);

  const userProfile = await getUserProfile(customerPhoneNumber);
  console.log(userProfile);
  let userPromptTemplate;
  if (userProfile && userProfile.name) {
    userPromptTemplate = `Respond to the input conversationally, and with a format of a statement followed by a question to learn more. The users name is ${userProfile.name} and you should use there name to reference them. The input is: {input}`;
  } else {
    userPromptTemplate = `Respond to the input conversationally, and with a format of a statement followed by a question to learn more. The input is: {input}`;
  }
  const memory = new BufferWindowMemory({
    k: 5,
    returnMessages: true,
    memoryKey: "history",
    chatHistory: new DynamoDBChatMessageHistory({
      tableName: "langchain",
      partitionKey: "id",
      sessionId: customerPhoneNumber,
      config: {
        region: "us-east-1",
      },
    }),
  });
  const adminModelSettings = await getOpenAIModel();

  const chatPrompt = ChatPromptTemplate.fromPromptMessages([
    ["system", adminModelSettings.prompt],
    [
      "system",
      `This is a summary for the user you are chatting with: ${
        userProfile && userProfile.userSummary ? userProfile.userSummary : ""
      }`,
    ],
    new MessagesPlaceholder("history"),
    ["human", userPromptTemplate],
  ]);

  const chat = new ChatOpenAI({
    openAIApiKey: Parameter.Value,
    modelName: adminModelSettings.model,
    temperature: parseFloat(adminModelSettings.temperature),
    frequency_penalty: parseFloat(adminModelSettings.frequency_penalty),
    presence_penalty: parseFloat(adminModelSettings.presence_penalty),
    max_tokens: parseInt(adminModelSettings.max_tokens),
    top_p: parseFloat(adminModelSettings.top_p),
  });

  const chain = new ConversationChain({
    llm: chat,
    prompt: chatPrompt,
    memory: memory,
  });

  const result = await chain.call({
    input: response,
  });
  const inputSMS = {
    ApplicationId: AppId,
    MessageRequest: {
      Addresses: {
        [customerPhoneNumber]: {
          ChannelType: "SMS",
        },
      },
      MessageConfiguration: {
        SMSMessage: {
          Body: result.response,
          MessageType: "TRANSACTIONAL",
          OriginationNumber: chatbotPhoneNumber,
        },
      },
    },
  };

  const pinpoint = new PinpointClient();
  const smsCommand = new SendMessagesCommand(inputSMS);
  const pinpointStatus = await pinpoint.send(smsCommand);
  console.log(pinpointStatus);
  return;
};
