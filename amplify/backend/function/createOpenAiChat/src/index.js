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
// Helper function to get Admin Settings
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

// Helper function to update the Model
const updateChatModel = async (chatModel, newContent) => {
  const endpoint = new URL(GRAPHQL_ENDPOINT);
  console.log(newContent);
  let messages = [];
  if (chatModel.messages.length <= 2) {
    messages.push(chatModel.messages[0]);
  }
  const newConvo = {
    role: newContent.role.toUpperCase(),
    content: newContent.content,
  };
  messages.push(newConvo);

  const variables = {
    input: {
      id: chatModel.id,
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

  // Get the Admin entered settings
  const openAIModel = await getOpenAIModel();

  // If we got an input use that model, otherwise create a chat model
  let chatModel;

  if (event.arguments?.input?.id) {
    chatModel = event.arguments.input;
    // New convo we need to inject the prompt
    if (chatModel.messages.length <= 1) {
      chatModel.messages.unshift({
        role: "SYSTEM",
        content: openAIModel.prompt,
      });
    }
  } else {
    return "400 bad argument";
  }

  // chat with openai
  const messages = chatModel.messages.map((m) => {
    return { role: m.role.toLowerCase(), content: m.content };
  });
  // Call Open AI
  try {
    console.log("Calling ChatGPT");
    const res = await openai.createChatCompletion({
      model: openAIModel.model,
      messages: messages,
      temperature: parseFloat(openAIModel.temperature),
      frequency_penalty: parseFloat(openAIModel.frequency_penalty),
      presence_penalty: parseFloat(openAIModel.presence_penalty),
      max_tokens: parseInt(openAIModel.max_tokens),
      top_p: parseFloat(openAIModel.top_p),
    });

    //Update the chat model with the chat response
    chatModel = await updateChatModel(chatModel, res.data.choices[0].message);
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
