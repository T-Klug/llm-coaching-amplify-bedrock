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

const listOpenAIChats = /* GraphQL */ `
  query ListOpenAIChats($nextToken: String) {
    listOpenAIChats(nextToken: $nextToken) {
      items {
        owner
      }
      nextToken
    }
  }
`;

const listOpenAIChatsUser = /* GraphQL */ `
  query ListOpenAIChats(
    $filter: ModelOpenAIChatFilterInput
    $nextToken: String
  ) {
    listOpenAIChats(filter: $filter, nextToken: $nextToken) {
      items {
        id
        messages {
          role
          content
          __typename
        }
        owner
      }
      nextToken
    }
  }
`;

const listUserSpecificPrompts = /* GraphQL */ `
  query ListUserSpecificPrompts(
    $filter: ModelUserSpecificPromptFilterInput
    $nextToken: String
  ) {
    listUserSpecificPrompts(filter: $filter, nextToken: $nextToken) {
      items {
        id
        userId
        prompt
        lastChatId
      }
      nextToken
    }
  }
`;

const updateUserSpecificPrompt = /* GraphQL */ `
  mutation UpdateUserSpecificPrompt($input: UpdateUserSpecificPromptInput!) {
    updateUserSpecificPrompt(input: $input) {
      id
      userId
      prompt
      lastChatId
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
const createUserSpecificPrompt = /* GraphQL */ `
  mutation CreateUserSpecificPrompt($input: CreateUserSpecificPromptInput!) {
    createUserSpecificPrompt(input: $input) {
      id
      userId
      prompt
      lastChatId
    }
  }
`;

// Get the distinct list of users with chats
const getChatOwners = async () => {
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
    body: JSON.stringify({ query: listOpenAIChats }),
    path: endpoint.pathname,
  });

  const signed = await signer.sign(requestToBeSigned);
  const request = new Request(endpoint, signed);
  let response;
  let body;
  try {
    console.log("GETTING OWNERS WITH CHATS");
    response = await fetch(request);
    body = await response.json();
    if (body.errors)
      console.log(
        `ERROR GETTING OWNERS WITH CHATS: ${JSON.stringify(body.errors)}`
      );
  } catch (error) {
    console.log(
      `ERROR GETTING OWNERS WITH CHATS: ${JSON.stringify(error.message)}`
    );
  }

  return [
    ...new Set(body.data.listOpenAIChats.items.map((item) => item.owner)),
  ];
};

const updateUserSpecificPromptModel = async (
  userPrompt,
  lastChatId,
  newPrompt,
  ownerId
) => {
  const endpoint = new URL(GRAPHQL_ENDPOINT);
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
    query = updateUserSpecificPrompt;
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
    body: JSON.stringify({ query, variables }),
    path: endpoint.pathname,
  });

  const signed = await signer.sign(requestToBeSigned);
  const request = new Request(endpoint, signed);
  let response;
  let body;
  try {
    console.log("SENDING THE MUTATION UPDATE TO THE USER PROMPT MODEL");
    response = await fetch(request);
    body = await response.json();
    if (body.errors)
      console.log(`ERROR UPDATING USER PROMPT: ${JSON.stringify(body.errors)}`);
  } catch (error) {
    console.log(`ERROR UPDATING USER PROMPT: ${JSON.stringify(error.message)}`);
  }
  return body.data.updateUserSpecificPrompt;
};

// Create the OPEN AI prompt using the users past information
const createOpenAIPrompt = async (ownerId, openAIclient, userPrompt) => {
  const ownerChats = await listChatsforOwner(ownerId);
  if (userPrompt) {
    if (
      userPrompt.lastChatId === ownerChats.items[ownerChats.items.length - 1].id
    ) {
      console.log("NO NEW CHATS WE NEED TO END HERE");
      return;
    }
  }

  const messages = ownerChats.items
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
    console.log("New User Prompt", res.data.choices[0].message);
    await updateUserSpecificPromptModel(
      userPrompt,
      ownerChats.items[ownerChats.items.length - 1].id,
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
  const endpoint = new URL(GRAPHQL_ENDPOINT);

  const variables = {
    filter: {
      userId: { eq: ownerId },
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
    body: JSON.stringify({ query: listUserSpecificPrompts, variables }),
    path: endpoint.pathname,
  });

  const signed = await signer.sign(requestToBeSigned);
  const request = new Request(endpoint, signed);
  let response;
  let body;
  try {
    console.log("GETTING USER PROMPT");
    response = await fetch(request);
    body = await response.json();
    if (body.errors)
      console.log(`ERROR GETTING USER PROMPT: ${JSON.stringify(body.errors)}`);
  } catch (error) {
    console.log(`ERROR GETTING USER PROMPT: ${JSON.stringify(error.message)}`);
  }
  console.log("USER PROMPT", body.data.listUserSpecificPrompts);
  if (body.data.listUserSpecificPrompts.items.length >= 1) {
    return body.data.listUserSpecificPrompts.items[0];
  } else {
    return undefined;
  }
};

// Helper method for getting the users chats
const listChatsforOwner = async (ownerId) => {
  const endpoint = new URL(GRAPHQL_ENDPOINT);

  const variables = {
    filter: {
      owner: { eq: `${ownerId}::${ownerId}` },
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
    body: JSON.stringify({ query: listOpenAIChatsUser, variables }),
    path: endpoint.pathname,
  });

  const signed = await signer.sign(requestToBeSigned);
  const request = new Request(endpoint, signed);
  let response;
  let body;
  try {
    console.log("GETTING CHATS FOR USER");
    response = await fetch(request);
    body = await response.json();
    if (body.errors)
      console.log(
        `ERROR GETTING CHATS FOR USER: ${JSON.stringify(body.errors)}`
      );
  } catch (error) {
    console.log(
      `ERROR GETTING CHATS FOR USER: ${JSON.stringify(error.message)}`
    );
  }
  console.log("CHATS FOR USER", body.data.listOpenAIChats);
  return body.data.listOpenAIChats;
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
