import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { ConversationChain } from "langchain/chains";
import { ChatPromptTemplate, MessagesPlaceholder } from "langchain/prompts";
import { BufferWindowMemory } from "langchain/memory";
import { DynamoDBChatMessageHistory } from "langchain/stores/message/dynamodb";
import crypto from "@aws-crypto/sha256-js";
import { defaultProvider } from "@aws-sdk/credential-provider-node";
import { SignatureV4 } from "@aws-sdk/signature-v4";
import { HttpRequest } from "@aws-sdk/protocol-http";
import { default as fetch, Request } from "node-fetch";

/* Amplify Params - DO NOT EDIT
	API_AMPLIFYPOC_GRAPHQLAPIENDPOINTOUTPUT
	API_AMPLIFYPOC_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const SECRET_PATH = process.env.OpenAIKey;
const GRAPHQL_ENDPOINT = process.env.API_AMPLIFYPOC_GRAPHQLAPIENDPOINTOUTPUT;
const AWS_REGION = process.env.AWS_REGION || "us-east-1";
const { Sha256 } = crypto;

const updateIcebreakerChat = /* GraphQL */ `
  mutation UpdateIcebreakerChat(
    $input: UpdateIcebreakerChatInput!
    $condition: ModelIcebreakerChatConditionInput
  ) {
    updateIcebreakerChat(input: $input, condition: $condition) {
      id
      messages {
        role
        content
        __typename
      }
      user
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;

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

// Helper function to update the Model
const updateChatModel = async (id, newContent) => {
  const endpoint = new URL(GRAPHQL_ENDPOINT);
  const messages = [
    {
      role: "ASSISTANT",
      content: newContent.response,
    },
  ];
  const variables = {
    input: {
      id: id,
      messages: messages,
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
    body: JSON.stringify({ query: updateIcebreakerChat, variables }),
    path: endpoint.pathname,
  });

  const signed = await signer.sign(requestToBeSigned);
  const request = new Request(endpoint, signed);
  let response;
  let body;
  try {
    console.log("SENDING THE MUTATION UPDATE TO THE MODEL AFTER CHAT");
    response = await fetch(request);
    body = await response.json();
    if (body.errors)
      console.log(`ERROR UPDATING CHAT: ${JSON.stringify(body.errors)}`);
  } catch (error) {
    console.log(`ERROR UPDATING CHAT CATCH: ${JSON.stringify(error.message)}`);
  }
  return body.data.updateIcebreakerChat;
};

// Helper to get UserProfile
const getUserProfile = async (userId) => {
  const endpoint = new URL(GRAPHQL_ENDPOINT);
  const variables = {
    filter: {
      owner: { eq: `${userId}::${userId}` },
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

  return body.data.listUserProfiles;
};

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
export const handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  if (!event.arguments?.input?.id) {
    return "400 bad argument";
  }
  const client = new SSMClient();
  const input = {
    Name: SECRET_PATH,
    WithDecryption: true,
  };
  const command = new GetParameterCommand(input);
  const { Parameter } = await client.send(command);

  const memory = new BufferWindowMemory({
    k: 5,
    returnMessages: true,
    memoryKey: "history",
    chatHistory: new DynamoDBChatMessageHistory({
      tableName: "icebreaker-chat",
      partitionKey: "id",
      sessionId: event.arguments?.input?.id,
      config: {
        region: "us-east-1",
      },
    }),
  });

  const userProfile = await getUserProfile(event.identity.claims.username);
  console.log(userProfile);
  const chatPrompt = ChatPromptTemplate.fromPromptMessages([
    [
      "system",
      "You are AI developed for the purpose of career coaching. You only respond conversationally and compassionately. This conversation should be focused on icebreaker questions.",
    ],
    new MessagesPlaceholder("history"),
    [
      "human",
      `Respond to the input conversationally, and with an icebreaker format the users name is ${userProfile.name} and you should refer to them as such. The input is: {input}`,
    ],
  ]);

  const chat = new ChatOpenAI({
    openAIApiKey: Parameter.Value,
  });

  const chain = new ConversationChain({
    llm: chat,
    prompt: chatPrompt,
    memory: memory,
  });

  const result = await chain.call({
    input:
      event.arguments.input.messages[event.arguments.input.messages.length - 1]
        .content,
  });

  const chatModel = await updateChatModel(event.arguments?.input?.id, result);

  return chatModel;
};
