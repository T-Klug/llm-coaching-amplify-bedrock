/* Amplify Params - DO NOT EDIT
	API_AMPLIFYPOC_GRAPHQLAPIENDPOINTOUTPUT
	API_AMPLIFYPOC_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";
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
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenSearchVectorStore } from "langchain/vectorstores/opensearch";
import { AwsSigv4Signer } from "@opensearch-project/opensearch/aws";
import { Client } from "@opensearch-project/opensearch";
import { ScoreThresholdRetriever } from "langchain/retrievers/score_threshold";
import { ChatBedrock } from "langchain/chat_models/bedrock";

const SECRET_PATH = process.env.OpenAIKey;
const AppId = process.env.PinpointApplicationId;
const GRAPHQL_ENDPOINT = process.env.API_AMPLIFYPOC_GRAPHQLAPIENDPOINTOUTPUT;
const AWS_REGION = process.env.AWS_REGION || "us-east-1";
const { Sha256 } = crypto;
const OPENSEARCH_URL = process.env.opensearchURL;

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
  const adminModelSettings = await getOpenAIModel();

  let userPromptTemplate;
  if (userProfile && userProfile.name) {
    userPromptTemplate = `You will act as an AI career coach named Uniquity AI. Respond to the input within the <input> tags conversationally. The user's name is ${
      userProfile.name
    }, and you should use their name when you reference them.
    Your rules are provided in the <rules> tag.
    <rules>${adminModelSettings.prompt}</rules>
    The summary of the users motivations and background is provided between the <summary> tag.
    <summary>${userProfile.userSummary ? userProfile.userSummary : ""}</summary>
    You should try to ask thought provoking questions to encourage the user think from different perspectives. 
    You also have access to the following chunked document context the user provided about themselves and their company. The document chunks are in the <document> tags.
    <document>
    {context}
    Please include anything relevant in the user's background in your answer.
    Please respond to the user within <response></response> tag.
    You should always stop after your first response. Do not continue the conversation.
    <input>{input}</input> 
    Assistant: [Uniquity AI] <response>`;
  } else {
    userPromptTemplate = `You will act as an AI career coach named Uniquity AI. Respond to the input within the <input> tag conversationally.
    Your rules are provided in the <rules> tag.
    <rules>${adminModelSettings.prompt}</rules>
    You should try to ask thought provoking questions to encourage the user think from different perspectives. 
    You also have access to the following chunked document context the user provided about themselves and their company. The document chunks are in the <document> tags.
    <document>
    {context}
    Please include anything relevant in the user's background in your answer.
    Please respond to the user within <response></response> tag.
    You should always stop after your first response. Do not continue the conversation.
    <input>{input}</input> 
    Assistant: [Uniquity AI] <response>`;
  }
  const memory = new BufferWindowMemory({
    k: 5,
    returnMessages: true,
    inputKey: "input",
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

  const chatPrompt = ChatPromptTemplate.fromPromptMessages([
    new MessagesPlaceholder("history"),
    ["human", userPromptTemplate],
  ]);

  const chat = new ChatBedrock({
    model: "anthropic.claude-instant-v1",
    region: AWS_REGION,
    maxTokens: 8191,
  });

  const chain = new ConversationChain({
    llm: chat,
    prompt: chatPrompt,
    memory: memory,
  });
  let result;
  if (userProfile) {
    const clientOS = new Client({
      ...AwsSigv4Signer({
        region: "us-east-1",
        service: "es", // 'aoss' for OpenSearch Serverless
        // Must return a Promise that resolve to an AWS.Credentials object.
        // This function is used to acquire the credentials when the client start and
        // when the credentials are expired.
        // The Client will refresh the Credentials only when they are expired.
        // With AWS SDK V2, Credentials.refreshPromise is used when available to refresh the credentials.

        // Example with AWS SDK V3:
        getCredentials: () => {
          // Any other method to acquire a new Credentials object can be used.
          const credentialsProvider = defaultProvider();
          return credentialsProvider();
        },
      }),
      node: OPENSEARCH_URL,
    });
    const vectorStore = new OpenSearchVectorStore(
      new OpenAIEmbeddings({
        openAIApiKey: Parameter.Value,
      }),
      {
        client: clientOS,
        indexName: userProfile.owner.split("::")[0],
      }
    );
    if (await vectorStore.doesIndexExist()) {
      console.log("DOING A CONTEXT RICH CHAIN");
      const retriever = ScoreThresholdRetriever.fromVectorStore(vectorStore, {
        minSimilarityScore: 0.66,
        maxK: 20,
        kIncrement: 2,
      });
      const docs = await retriever.getRelevantDocuments(response);
      result = await chain.call({
        input: response,
        context:
          docs && docs.length > 0
            ? docs.map((d) => d.pageContent).join("\n</document>\n<document>\n")
            : "</document>",
      });
    } else {
      result = await chain.call({
        input: response,
        context: "</document>",
      });
    }
  } else {
    result = await chain.call({
      input: response,
      context: "</document>",
    });
  }

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
          Body: result.response
            .replace("<response>", "")
            .replace("</response>", ""),
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
