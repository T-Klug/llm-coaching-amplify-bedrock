import { ConversationChain } from "langchain/chains";
import { ChatPromptTemplate, MessagesPlaceholder } from "langchain/prompts";
import { BufferWindowMemory } from "langchain/memory";
import { DynamoDBChatMessageHistory } from "langchain/stores/message/dynamodb";
import crypto from "@aws-crypto/sha256-js";
import { defaultProvider } from "@aws-sdk/credential-provider-node";
import { SignatureV4 } from "@aws-sdk/signature-v4";
import { HttpRequest } from "@aws-sdk/protocol-http";
import { default as fetch, Request } from "node-fetch";
import { ChatBedrock } from "langchain/chat_models/bedrock";

/* Amplify Params - DO NOT EDIT
	API_AMPLIFYPOC_GRAPHQLAPIENDPOINTOUTPUT
	API_AMPLIFYPOC_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const GRAPHQL_ENDPOINT = process.env.API_AMPLIFYPOC_GRAPHQLAPIENDPOINTOUTPUT;
const AWS_REGION = process.env.AWS_REGION || "us-east-1";
const { Sha256 } = crypto;

const updateRoleplayChat = /* GraphQL */ `
  mutation UpdateRoleplayChat(
    $input: UpdateRoleplayChatInput!
    $condition: ModelRoleplayChatConditionInput
  ) {
    updateRoleplayChat(input: $input, condition: $condition) {
      id
      messages {
        role
        content
        __typename
      }
      user
      roleplayId
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
      content: newContent.response
        .replace("<response>", "")
        .replace("</response>", "")
        .trimStart(),
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
    body: JSON.stringify({ query: updateRoleplayChat, variables }),
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
  return body.data.updateRoleplayChat;
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

  return body.data.listUserProfiles.items[0];
};

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
export const handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  if (!event.arguments?.input?.id) {
    return "400 bad argument";
  }

  const memory = new BufferWindowMemory({
    k: 5,
    returnMessages: true,
    memoryKey: "history",
    chatHistory: new DynamoDBChatMessageHistory({
      tableName: "roleplay-chat",
      partitionKey: "id",
      sessionId: event.arguments?.input?.id,
      config: {
        region: "us-east-1",
      },
    }),
  });

  const userProfile = await getUserProfile(event.identity.claims.username);

  // const chatPrompt = ChatPromptTemplate.fromPromptMessages([
  //   new MessagesPlaceholder("history"),
  //   [
  //     "human",
  //     `${event.arguments?.input?.scenarioPrompt} Respond to the input within the <input> tag conversationally. The user's name is ${userProfile.name}, and you should use their name when you reference them.
  //     Your rules are provided in the <rules> tag. The scenario given to the user was "${event.arguments?.input?.scenario}"
  //     <rules>
  //     - ${event.arguments?.input?.difficulty}
  //     - You are allowed to make up answers to their questions.
  //     </rules>
  //     Please respond to the user's input within the <response></response> tag 
  //     You should always stop after your first response. Do not continue the conversation.
  //     <input>{input}</input>
  //     Assistant: <response>`,
  //   ],
  // ]);

const chatPrompt = ChatPromptTemplate.fromPromptMessages([
    new MessagesPlaceholder("history"),
    [
      "human",
      `You are the assistant in a roleplay scenario titled "${event.arguments?.input?.scenario}". The specific prompt for this scenario is "${event.arguments?.input?.scenarioPrompt}". 
      In this context, the user ${userProfile.name} is the manager and you are the employee. 
      Your behavior should align with these rules: 
      <rules>
      - ${event.arguments?.input?.difficulty}
      - You are allowed to make up answers to their questions but remain in your role as the employee.
      </rules>
      Address the user as ${userProfile.name} and respond to the following input: <input>{input}</input>. 
      Please encapsulate your response within the <response></response> tags and stay within the context of the roleplay scenario.`,
    ],
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

  const result = await chain.call({
    input:
      event.arguments.input.messages[event.arguments.input.messages.length - 1]
        .content,
  });

  const chatModel = await updateChatModel(event.arguments?.input?.id, result);

  return chatModel;
};
