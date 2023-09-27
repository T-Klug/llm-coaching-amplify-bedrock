/* Amplify Params - DO NOT EDIT
	API_AMPLIFYPOC_GRAPHQLAPIENDPOINTOUTPUT
	API_AMPLIFYPOC_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
import crypto from "@aws-crypto/sha256-js";
import { Client } from "@opensearch-project/opensearch";
import { AwsSigv4Signer } from "@opensearch-project/opensearch/aws";
import { defaultProvider } from "@aws-sdk/credential-provider-node";
import { SignatureV4 } from "@aws-sdk/signature-v4";
import { HttpRequest } from "@aws-sdk/protocol-http";
import { default as fetch, Request } from "node-fetch";
import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { ConversationChain } from "langchain/chains";
import { ChatPromptTemplate, MessagesPlaceholder } from "langchain/prompts";
import { BufferWindowMemory } from "langchain/memory";
import { DynamoDBChatMessageHistory } from "langchain/stores/message/dynamodb";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenSearchVectorStore } from "langchain/vectorstores/opensearch";
import { LLMChainExtractor } from "langchain/retrievers/document_compressors/chain_extract";
import { ContextualCompressionRetriever } from "langchain/retrievers/contextual_compression";

const GRAPHQL_ENDPOINT = process.env.API_AMPLIFYPOC_GRAPHQLAPIENDPOINTOUTPUT;
const AWS_REGION = process.env.AWS_REGION || "us-east-1";
const { Sha256 } = crypto;
const SECRET_PATH = process.env.openAIKey;
const OPENSEARCH_URL = process.env.opensearchURL;

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
  if (
    body.data.listUserProfiles.items &&
    body.data.listUserProfiles.items.length >= 1
  )
    return body.data.listUserProfiles.items[0];
  return {};
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

  const memory = new BufferWindowMemory({
    k: 5,
    returnMessages: true,
    inputKey: "input",
    memoryKey: "history",
    chatHistory: new DynamoDBChatMessageHistory({
      tableName: "adhoc-chat-memory",
      partitionKey: "id",
      sessionId: event.arguments?.input?.id,
      config: {
        region: "us-east-1",
      },
    }),
  });

  const userProfile = await getUserProfile(event.identity.claims.username);
  const adminModelSettings = await getOpenAIModel();

  const chatPrompt = ChatPromptTemplate.fromPromptMessages([
    ["system", adminModelSettings.prompt],
    [
      "system",
      `This is a summary of the user you are coaching: ${userProfile.userSummary}`,
    ],
    new MessagesPlaceholder("history"),
    [
      "human",
      `Respond to the input conversationally. The user's name is ${userProfile.name}, and you should use their name to reference them. 
      You should try to ask questions to get more details and help the user think from different perspectives. 
      You also have access to the following document context the user provided about themselves and their company: 
      {context} 
      The input is: {input}`,
    ],
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
      indexName: event.identity.claims.username,
    }
  );

  const chain = new ConversationChain({
    llm: chat,
    prompt: chatPrompt,
    memory: memory,
    verbose: true,
  });

  let result;
  if (await vectorStore.doesIndexExist()) {
    console.log("DOING A CONTEXT RICH CHAIN");
    const baseCompressor = LLMChainExtractor.fromLLM(chat);
    const retriever = new ContextualCompressionRetriever({
      baseCompressor,
      baseRetriever: vectorStore.asRetriever(),
    });
    const docs = await retriever.getRelevantDocuments(
      event.arguments.input.messages[event.arguments.input.messages.length - 1]
        .content
    );

    result = await chain.call({
      input:
        event.arguments.input.messages[
          event.arguments.input.messages.length - 1
        ].content,
      context:
        docs && docs.length > 0
          ? docs.map((d) => d.pageContent).join("\n")
          : "",
    });
  } else {
    result = await chain.call({
      input:
        event.arguments.input.messages[
          event.arguments.input.messages.length - 1
        ].content,
      context: "",
    });
  }

  const chatModel = await updateChatModel(event.arguments?.input?.id, result);

  // The chat turn is over
  return chatModel;
};
