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
import { ConversationChain } from "langchain/chains";
import { ChatPromptTemplate, MessagesPlaceholder } from "langchain/prompts";
import { BufferWindowMemory } from "langchain/memory";
import { DynamoDBChatMessageHistory } from "langchain/stores/message/dynamodb";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenSearchVectorStore } from "langchain/vectorstores/opensearch";
import { ScoreThresholdRetriever } from "langchain/retrievers/score_threshold";
import { ChatBedrock } from "langchain/chat_models/bedrock";

const GRAPHQL_ENDPOINT = process.env.API_AMPLIFYPOC_GRAPHQLAPIENDPOINTOUTPUT;
const AWS_REGION = process.env.AWS_REGION || "us-east-1";
const { Sha256 } = crypto;
const SECRET_PATH = process.env.openAIKey;
const OPENSEARCH_URL = process.env.opensearchURL;

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

// Helper function to update the Model
const updateChatModel = async (id, newContent) => {
  const endpoint = new URL(GRAPHQL_ENDPOINT);
  const messages = [
    {
      role: "ASSISTANT",
      content: newContent.response
        .replace("<response>", "")
        .replace("</response>", "")
        .trimStart()
        .trimEnd(),
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

// Prompt builder (Probably should do checks on username and summary)
const buildPrompt = (userProfile, docs) => {
  if (docs && docs.length > 0) {
    console.log(docs);
    return ChatPromptTemplate.fromMessages([
      new MessagesPlaceholder("history"),
      [
        "human",
        `I'm going to give you a document chunks about the user you are conversing with. I'd like you to use this document context to enrich the conversation. The chunks are split by NEXT DOCUMENT. 
        Here is the document context: 

        <document>
        ${docs
          .map((d) => {
            if (d.pageContent.length > 0)
              return `
          ${d.pageContent
            .replace(/[^a-zA-Z0-9 \n\r-]+/g, "")
            .replace("\n", " ")
            .trimStart()
            .trimEnd()}
          `;
            return;
          })
          .join("NEXT DOCUMENT")}
        </document>
        
        You are Uniquity AI, a professional coaching assistant.
        You are conversing with someone seeking professional coaching.
        You are responding to the input between the <input></input> tags.
        The name of the user you are conversing with is ${userProfile.name}.
        The summary of the users motivations and background is provided between the <summary></summary> tags.
        You should follow the rules in the <rules></rules> tags.

        Here are the rules:
        
        <rules>
          - You should ask clarifying QUESTIONS; don't make ASSUMPTIONS.
          - Your responses should be thought provoking and on topic.
          - Your responses should be conversational, not just suggestions or solutions. 
          - You should be empathetic to the user.
          - Conclude after giving a response. No further conversation.
          - You should keep your answers short.
          - ONLY provide ONE response, if there is more than one remove them.
          - Keep your responses to about 100 words.
        </rules>

        Here is the summary:

        <summary>
        ${userProfile.userSummary}
        </summary>
        
        Here is the input:

        <input>
        {input}
        </input>

        Assistant:
        `,
      ],
    ]);
  } else {
    return ChatPromptTemplate.fromMessages([
      new MessagesPlaceholder("history"),
      [
        "human",
        `You are Uniquity AI, a professional coaching assistant.
        You are conversing with someone seeking professional coaching.
        You are responding to the input between the <input></input> tags.
        The name of the user you are conversing with is ${userProfile.name}.
        The summary of the users motivations and background is provided between the <summary></summary> tags.
        You should follow the rules in the <rules></rules> tags.
        
        Here are the rules:

        <rules>
          - You should ask clarifying QUESTIONS; don't make ASSUMPTIONS.
          - Your responses should be thought provoking and on topic.
          - Your responses should be conversational, not just suggestions or solutions. 
          - You should be empathetic to the user.
          - You should conclude after giving a response. No further conversation.
          - You should keep your answers short.
          - ONLY provide ONE response, if there is more than one remove them.
          - Keep your responses to about 100 words.
        </rules>
        
        Here is the summary:

        <summary>
        ${userProfile.userSummary}
        </summary>

        Here is the input:

        <input>
        {input}
        </input>

        Assistant:
        `,
      ],
    ]);
  }
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

  const chat = new ChatBedrock({
    model: "anthropic.claude-instant-v1",
    region: AWS_REGION,
    maxTokens: 8191,
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

  let chatPrompt;
  if (await vectorStore.doesIndexExist()) {
    console.log("DOING A CONTEXT RICH CHAIN");
    const retriever = ScoreThresholdRetriever.fromVectorStore(vectorStore, {
      minSimilarityScore: 0.66,
      maxK: 20,
      kIncrement: 2,
    });

    const docs = await retriever.getRelevantDocuments(
      event.arguments.input.messages[event.arguments.input.messages.length - 1]
        .content
    );
    chatPrompt = buildPrompt(userProfile, docs);
  } else {
    chatPrompt = buildPrompt(userProfile, undefined);
  }

  const chain = new ConversationChain({
    llm: chat,
    prompt: chatPrompt,
    memory: memory,
    verbose: true,
  });

  const result = await chain.call({
    input:
      event.arguments.input.messages[event.arguments.input.messages.length - 1]
        .content,
  });

  const chatModel = await updateChatModel(event.arguments?.input?.id, result);

  // The chat turn is over
  return chatModel;
};
