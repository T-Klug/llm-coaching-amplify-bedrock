/* Amplify Params - DO NOT EDIT
	API_AMPLIFYPOC_GRAPHQLAPIENDPOINTOUTPUT
	API_AMPLIFYPOC_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
import { Configuration, OpenAIApi } from "openai";
import crypto from "@aws-crypto/sha256-js";
import { defaultProvider } from "@aws-sdk/credential-provider-node";
import { SignatureV4 } from "@aws-sdk/signature-v4";
import { HttpRequest } from "@aws-sdk/protocol-http";
import { default as fetch, Request } from "node-fetch";
import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";

const GRAPHQL_ENDPOINT = process.env.API_AMPLIFYPOC_GRAPHQLAPIENDPOINTOUTPUT;
const AWS_REGION = process.env.AWS_REGION || "us-east-1";
const { Sha256 } = crypto;
const SECRET_PATH = process.env.openAIKey;

//Create Model
const createOpenAIChat = /* GraphQL */ `
  mutation CreateOpenAIChat(
    $input: CreateOpenAIChatInput!
    $condition: ModelOpenAIChatConditionInput
  ) {
    createOpenAIChat(input: $input, condition: $condition) {
      id
      messages {
        role
        content
      }
      user
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;

// Update Model
const updateOpenAIChat = /* GraphQL */ `
  mutation UpdateOpenAIChat(
    $input: UpdateOpenAIChatInput!
    $condition: ModelOpenAIChatConditionInput
  ) {
    updateOpenAIChat(input: $input, condition: $condition) {
      id
      messages {
        role
        content
      }
      user
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;

// Helper Function to create the model
const createChatModel = async (ownerId) => {
  const variables = {
    input: {
      messages: [
        { role: "SYSTEM", content: "Act as a career coach, be concise" },
        { role: "USER", content: "Hello, can you help me with my coaching?" },
      ],
      owner: `${ownerId}::${ownerId}`,
    },
  };
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
    body: JSON.stringify({ query: createOpenAIChat, variables }),
    path: endpoint.pathname,
  });

  const signed = await signer.sign(requestToBeSigned);
  const request = new Request(endpoint, signed);
  let body;
  let response;
  try {
    response = await fetch(request);
    body = await response.json();
    if (body.errors)
      console.log(`ERROR CREATING CHAT: ${JSON.stringify(body.errors)}`);
  } catch (error) {
    console.log(`ERROR CREATING CHAT CATCH: ${JSON.stringify(error.message)}`);
  }
  console.log(JSON.stringify(body));
  return body.data.createOpenAIChat;
};

// Helper function to update the Model
const updateChatModel = async (chatModel, newContent) => {
  const endpoint = new URL(GRAPHQL_ENDPOINT);
  const variables = {
    input: {
      id: chatModel.id,
      messages: chatModel.messages,
      _version: chatModel._version,
    },
  };
  variables.messages.push(newContent);
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
    body: JSON.stringify({ query: updateOpenAIChat, variables }),
    path: endpoint.pathname,
  });

  const signed = await signer.sign(requestToBeSigned);
  const request = new Request(endpoint, signed);
  let response;
  let body;
  try {
    response = await fetch(request);
    body = await response.json();
    if (body.errors)
      console.log(`ERROR UPDATING CHAT: ${JSON.stringify(body.errors)}`);
  } catch (error) {
    console.log(`ERROR UPDATING CHAT CATCH: ${JSON.stringify(error.message)}`);
  }
  return body.data.updateOpenAIChat;
};

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
export const handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  // Get API Key
  const client = new SSMClient();
  const input = {
    Name: SECRET_PATH,
    WithDecryption: true,
  };
  const command = new GetParameterCommand(input);
  const { Parameter } = await client.send(command);

  // Configure OpenAI
  const configuration = new Configuration({ apiKey: Parameter.Value });
  const openai = new OpenAIApi(configuration);
  // Create the Chat Model and add a landing zone for the streamed content.
  let chatModel = await createChatModel(event.identity.claims.username);

  //Start the chat with injected prompts
  try {
    const res = await openai.createChatCompletion({
      model: "gpt-3.5-turbo-0301",
      messages: chatModel.messages,
    });

    //Update the chat model with the chat response
    chatModel = updateChatModel(chatModel, res.data.choices[0].message);
  } catch (error) {
    if (error.response?.status) {
      console.error(
        "An error occurred during OpenAI request: ",
        error.response.status,
        error.message
      );
    } else {
      console.error("An error occurred during OpenAI request", error);
    }
  }

  // The chat turn is over
  return chatModel;
};
