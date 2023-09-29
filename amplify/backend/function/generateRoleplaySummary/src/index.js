/* Amplify Params - DO NOT EDIT
	API_AMPLIFYPOC_GRAPHQLAPIENDPOINTOUTPUT
	API_AMPLIFYPOC_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT  */
import crypto from "@aws-crypto/sha256-js";
import { defaultProvider } from "@aws-sdk/credential-provider-node";
import { SignatureV4 } from "@aws-sdk/signature-v4";
import { HttpRequest } from "@aws-sdk/protocol-http";
import { default as fetch, Request } from "node-fetch";
import { ConversationChain } from "langchain/chains";
import { ChatPromptTemplate } from "langchain/prompts";
import { ChatBedrock } from "langchain/chat_models/bedrock";

const GRAPHQL_ENDPOINT = process.env.API_AMPLIFYPOC_GRAPHQLAPIENDPOINTOUTPUT;
const AWS_REGION = process.env.AWS_REGION || "us-east-1";
const { Sha256 } = crypto;

const getRoleplayChat = /* GraphQL */ `
  query GetRoleplayChat($id: ID!) {
    getRoleplayChat(id: $id) {
      id
      messages {
        role
        content
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

const createRoleplaySummary = /* GraphQL */ `
  mutation CreateRoleplaySummary(
    $input: CreateRoleplaySummaryInput!
    $condition: ModelRoleplaySummaryConditionInput
  ) {
    createRoleplaySummary(input: $input, condition: $condition) {
      id
      summary
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

// Helper to get Chat
const getChat = async (id) => {
  const endpoint = new URL(GRAPHQL_ENDPOINT);
  const variables = {
    id: id,
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
    body: JSON.stringify({ query: getRoleplayChat, variables }),
    path: endpoint.pathname,
  });

  const signed = await signer.sign(requestToBeSigned);
  const request = new Request(endpoint, signed);
  let response;
  let body;
  try {
    console.log("GETTING Chat");
    response = await fetch(request);
    body = await response.json();
    if (body.errors)
      console.log(`ERROR GETTING Chat: ${JSON.stringify(body.errors)}`);
  } catch (error) {
    console.log(`ERROR GETTING Chat: ${JSON.stringify(error.message)}`);
  }

  return body.data.getRoleplayChat;
};

const createSummary = async (ownerId, newContent) => {
  const endpoint = new URL(GRAPHQL_ENDPOINT);
  const variables = {
    input: {
      summary: newContent.response
        .replace("<response>", "")
        .replace("</response>", ""),
      owner: `${ownerId}::${ownerId}`,
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
    body: JSON.stringify({ query: createRoleplaySummary, variables }),
    path: endpoint.pathname,
  });

  const signed = await signer.sign(requestToBeSigned);
  const request = new Request(endpoint, signed);
  let response;
  let body;
  try {
    console.log("SENDING THE MUTATION CREATE TO THE MODEL AFTER SUMMARY");
    response = await fetch(request);
    body = await response.json();
    if (body.errors)
      console.log(`ERROR UPDATING SUMMARY: ${JSON.stringify(body.errors)}`);
  } catch (error) {
    console.log(
      `ERROR UPDATING SUMMARY CATCH: ${JSON.stringify(error.message)}`
    );
  }
  return body.data.createRoleplaySummary;
};

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
export const handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  if (!event.arguments?.input?.roleplayId) {
    return "400 bad argument";
  }

  const chatTranscript = await getChat(event.arguments?.input?.roleplayId);

  const chatPrompt = ChatPromptTemplate.fromPromptMessages([
    ["human", "{input}"],
  ]);

  const chat = new ChatBedrock({
    model: "anthropic.claude-instant-v1",
    region: AWS_REGION,
    maxTokens: 8191,
  });

  const chain = new ConversationChain({
    llm: chat,
    prompt: chatPrompt,
    verbose: true,
  });

  const result = await chain.call({
    input: `You will act as an AI career coach named Uniquity AI. I am providing you with chat between the <chat> tag that the user had while roleplaying. The roleplay scenario prompt is between the tag <scenario>.
    I want you to provide feedback in the form of three things they could improve on based on what the user said in the chat. 
    Do not give feedback about Bill's responses.  
    <scenario>
    You're catching up with Bill to see how his projects are coming along. Initiate the convo whenever you are ready! Don't forget to also ask how he's doing personally. Once you feel like you've covered everything, you can wrap it up
    </scenario>
    <chat>
      ${
        chatTranscript && chatTranscript.messages
          ? JSON.stringify(chatTranscript.messages)
          : ""
      }
    </chat>
    You will respond with the feedback within the <response></response> tags.
    Assistant: [Feedback] <response>`,
  });

  const saved = await createSummary(event.identity.claims.username, result);

  return saved;
};
