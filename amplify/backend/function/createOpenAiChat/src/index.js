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
        { role: "SYSTEM", content: "Act as a career coach, be concise." },
        {
          role: "SYSTEM",
          content: "Ask me how you can help with careeer coaching.",
        },
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

  return body.data.createOpenAIChat;
};

// Helper function to update the Model
const updateChatModel = async (chatModel, newContent, isUpdate) => {
  const endpoint = new URL(GRAPHQL_ENDPOINT);
  console.log(newContent);
  const newConvo = {
    role: newContent.role.toUpperCase(),
    content: newContent.content,
  };

  const variables = {
    input: {
      id: chatModel.id,
      messages: [newConvo],
    },
  };
  if (isUpdate) {
    variables.input.messages.unshift(
      chatModel.messages[chatModel.messages.length - 1]
    );
  }

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
    console.log("SENDING THE MUTATION UPDATE TO THE MODEL AFTER CHAT");
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
  // If we got an input use that model, otherwise create a chat model
  let chatModel;
  let update;
  if (event.arguments?.input?.id) {
    update = true;
    console.log("Update occuring");
    chatModel = event.arguments.input;
  } else {
    update = false;
    console.log("Create occuring");
    chatModel = await createChatModel(event.identity.claims.username);
  }

  // chat with openai (Change system to user because gpt3.5turbo is ignoring SYSTEM)
  const messages = chatModel.messages.map((m) => {
    if (m.role === "SYSTEM") {
      return { role: "user", content: m.content };
    } else {
      return { role: m.role.toLowerCase(), content: m.content };
    }
  });
  try {
    console.log("Calling ChatGPT");
    const res = await openai.createChatCompletion({
      model: "gpt-3.5-turbo-0301",
      messages: messages,
      max_tokens: 100,
    });
    console.log(res.data);

    //Update the chat model with the chat response
    chatModel = await updateChatModel(
      chatModel,
      res.data.choices[0].message,
      update
    );
  } catch (error) {
    if (error.response) {
      console.error(
        "An error occurred during OpenAI request: ",
        error.response.status,
        error.response.data
      );
    } else {
      console.error("An error occurred during OpenAI request", error.message);
    }
  }

  // The chat turn is over
  return chatModel;
};
