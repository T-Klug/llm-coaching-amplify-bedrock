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
import {
  listOpenAIChats,
  listOpenAIChatsUser,
  listUserSpecificPrompts,
  createUserSpecificPrompt,
  updateUserSpecificPrompt,
} from "./constants.js";

const GRAPHQL_ENDPOINT = process.env.API_AMPLIFYPOC_GRAPHQLAPIENDPOINTOUTPUT;
const AWS_REGION = process.env.AWS_REGION || "us-east-1";
const { Sha256 } = crypto;
const SECRET_PATH = process.env.openAIKey;

// Call GraphQL
const callGraphQL = async (query, variables) => {
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
    body: variables
      ? JSON.stringify({ query, variables })
      : JSON.stringify({ query }),
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
      console.log(
        `Error getting ${query.toString()}: ${JSON.stringify(body.errors)}`
      );
  } catch (error) {
    console.log(
      `ERROR GETTING ${query.toString()}: ${JSON.stringify(error.message)}`
    );
  }
  return body;
};

// Get the distinct list of users with chats
const getChatOwners = async () => {
  const body = await callGraphQL(listOpenAIChats, undefined);
  return [
    ...new Set(body.data.listOpenAIChats.items.map((item) => item.owner)),
  ];
};

// Update the User Specific Model
const updateUserSpecificPromptModel = async (
  userPrompt,
  lastChatId,
  newPrompt,
  ownerId
) => {
  const variables = {
    input: {
      lastChatId: lastChatId,
      prompt: newPrompt.content,
      userId: ownerId,
    },
  };
  let query = createUserSpecificPrompt;
  if (userPrompt) {
    variables.input.id = userPrompt.id;
    variables.input._version = userPrompt._version;
    query = updateUserSpecificPrompt;
  }
  const body = await callGraphQL(query, variables);
  return body.data.updateUserSpecificPrompt;
};

// Create the OPEN AI prompt using the users past information
const createOpenAIPrompt = async (ownerId, openAIclient, userPrompt) => {
  const ownerChats = await listChatsforOwner(ownerId);
  if (userPrompt) {
    if (userPrompt.lastChatId === ownerChats[0].id) {
      console.log("NO NEW CHATS");
      return;
    }
  }

  const messages = ownerChats
    .map((c) =>
      c.messages.map((m) => {
        if (m.role === "USER") {
          return m.content;
        }
      })
    )
    .flat()
    .filter((i) => i);
  try {
    const res = await openAIclient.createChatCompletion({
      model: "gpt-3.5-turbo-0613",
      messages: [
        {
          role: "user",
          content: `Given the following chat messages summarize the user in the context of career coaching, ${messages.join(
            ", "
          )}`,
        },
      ],
    });

    await updateUserSpecificPromptModel(
      userPrompt,
      ownerChats[0].id,
      res.data.choices[0].message,
      ownerId
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
};

// Get the Users Prompt
const getUserSpecificPrompt = async (ownerId) => {
  const variables = {
    filter: {
      userId: { eq: ownerId },
    },
  };

  const body = await callGraphQL(listUserSpecificPrompts, variables);
  if (body.data.listUserSpecificPrompts.items.length >= 1) {
    return body.data.listUserSpecificPrompts.items[0];
  } else {
    return undefined;
  }
};

// Helper method for getting the users chats
const listChatsforOwner = async (ownerId) => {
  const variables = {
    filter: {
      owner: { eq: `${ownerId}::${ownerId}` },
    },
  };

  const body = await callGraphQL(listOpenAIChatsUser, variables);
  const sorted = body.data.listOpenAIChats.items.sort(function (a, b) {
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });
  return sorted;
};

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

export const handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  // Get Open AI Key
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

  // Get Distinct users that have chats
  const listOwners = await getChatOwners();

  // if the list of owners then iterate over them to generate prompts
  if (listOwners && listOwners.length > 0) {
    // TODO: This should be optmized with a Promise.await all
    for (const owner of listOwners) {
      // Get the User Specific Prompt
      const userPrompt = await getUserSpecificPrompt(owner);
      // Generate the new prompt with the new user context
      await createOpenAIPrompt(owner, openai, userPrompt);
    }
  }
};
