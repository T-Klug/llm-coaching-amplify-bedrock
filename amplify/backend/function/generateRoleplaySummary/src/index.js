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
import { Client } from "@opensearch-project/opensearch";
import { AwsSigv4Signer } from "@opensearch-project/opensearch/aws";
import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenSearchVectorStore } from "langchain/vectorstores/opensearch";
import { ScoreThresholdRetriever } from "langchain/retrievers/score_threshold";

const GRAPHQL_ENDPOINT = process.env.API_AMPLIFYPOC_GRAPHQLAPIENDPOINTOUTPUT;
const AWS_REGION = process.env.AWS_REGION || "us-east-1";
const { Sha256 } = crypto;
const SECRET_PATH = process.env.OpenAIKey;
const OPENSEARCH_URL = process.env.opensearchURL;

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
      scenario
      difficulty
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

const createSummary = async (
  ownerId,
  newContent,
  chatScenario,
  chatDifficulty
) => {
  const endpoint = new URL(GRAPHQL_ENDPOINT);
  const variables = {
    input: {
      summary: newContent.response
        .replace("<response>", "")
        .replace("</response>", "")
        .trimStart(),
      scenario: chatScenario,
      difficulty: chatDifficulty,
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

  const client = new SSMClient();
  const input = {
    Name: SECRET_PATH,
    WithDecryption: true,
  };
  const command = new GetParameterCommand(input);
  const { Parameter } = await client.send(command);

  const chatTranscript = await getChat(event.arguments?.input?.roleplayId);

  // Define the mapping object
  const roleMapping = {
    "Performance Reviews": "employee",
    "Career Development": "employee",
    "Career Change": "employee",
    "Career Advancement": "employee",
    "Career Transition": "employee",
    "team building": "coworker",
    "team conflict": "coworker",
    "promotion discussion": "boss",
    "layoff discussion": "boss",
    "firing discussion": "boss",
    "salary negotiation": "boss",
    "firing discussion": "boss",
    "hiring discussion": "boss",
    "workplace conflict": "coworker",
    "work life balance": "employee",
    "workplace belonging": "coworker",
    // ... add more as needed
  };

  // Determine the AI role based on the scenario
  let aiRole = "AI career coach"; // Default role
  console.log(`Scenario from chatTranscript: ${chatTranscript.scenario}`);

  for (const keyword in roleMapping) {
    if (chatTranscript.scenario.includes(keyword)) {
      aiRole = roleMapping[keyword];
      console.log(`Determined AI Role: ${aiRole}`);
      break;
    }
  }

  // Determine behavior based on the difficulty.
  let difficultyInstructions = "";
  switch (chatTranscript.difficulty) {
    case "beginner":
      difficultyInstructions =
        "Your behavior during this roleplay should be polite and receptive to feedback.";
      break;
    case "intermediate":
      difficultyInstructions =
        "Your behavior during this roleplay should be neutral, occasionally challenging the user's points.";
      break;
    case "advanced":
      difficultyInstructions =
        "Your behavior during this roleplay should be more challenging, occasionally pushing back on the user's feedback.";
      break;
    default:
      break;
  }

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

  const chatPrompt = ChatPromptTemplate.fromPromptMessages([
    ["human", "{input}"],
  ]);

  const chain = new ConversationChain({
    llm: chat,
    prompt: chatPrompt,
    verbose: true,
  });

  let result;
  if (await vectorStore.doesIndexExist()) {
    console.log("CONTEXT RICH SUMMARY GENERATION");
    const retriever = ScoreThresholdRetriever.fromVectorStore(vectorStore, {
      minSimilarityScore: 0.66,
      maxK: 20,
      kIncrement: 2,
    });

    const docs = await retriever.getRelevantDocuments(
      JSON.stringify(chatTranscript.messages)
    );

    result = await chain.call({
      input: `You will act as a career coach named Uniquity AI. You are provided with chat between the <chat> tag that the user had while roleplaying with AI. The roleplay scenario prompt is between the <scenario> tag.
    I want you to provide feedback in the form of three things they could improve on in regards to engaginge in chat. Your rules are between the <rules> tag.
    You also have access to the following chunked document context the user provided about themselves and their company. The document chunks are in the <document> tags.
    The BOT was instructed to act as ${aiRole} and have the following tone ${difficultyInstructions}
    
    <rules>
    - Do not give feedback about BOT responses.
    - Do not make up information about the user who is the USER.
    - Only include information from the <document> tags that are relevant to the three things to improve on.
    - If there is no relevant information in the document tags do not include any additional context. 
    - You are reviewing the chat context and providing career coaching advice on how they could engage better with the chat.
    - You should always stop after your first response. Do not continue the conversation. 
    </rules>
    
    <document>
    ${
      docs && docs.length > 0
        ? docs.map((d) => d.pageContent).join("\n</document>\n<document>\n")
        : "</document>"
    }

    <scenario>
    The user was instructed to do ${chatTranscript.scenario} with BOT.
    </scenario>

    <chat>
      ${
        chatTranscript && chatTranscript.messages
          ? JSON.stringify(chatTranscript.messages).replace("ASSISTANT", "BOT")
          : ""
      }
    </chat>
    
    You will respond with the feedback within the <response></response> tags.
    You should always stop after your first response. Do not continue the conversation.
    Assistant: <response>`,
    });
  } else {
    result = await chain.call({
      input: `You will act as a career coach named Uniquity AI. You are provided with chat between the <chat> tag that the user had while roleplaying with AI. The roleplay scenario prompt is between the <scenario> tag.
    I want you to provide feedback in the form of three things they could improve on based on what the user said in the chat. Your rules are between the <rules> tag.
    The BOT was instructed to act as ${aiRole} and have the following tone ${difficultyInstructions}
    
    <rules>
    - Do not give feedback about BOT responses.
    - Do not make up information about the user who is the USER.
    - You are reviewing the chat context and providing career coaching advice on how they could engage better with the chat.
    - You should always stop after your first response. Do not continue the conversation.
    </rules>

    <scenario>
    The USER was instructed to do ${chatTranscript.scenario} with BOT.
    </scenario>

    <chat>
      ${
        chatTranscript && chatTranscript.messages
          ? JSON.stringify(chatTranscript.messages).replace("ASSISTANT", "BOT")
          : ""
      }
    </chat>
    
    You will respond with the feedback within the <response></response> tags.
    You should always stop after your first response. Do not continue the conversation.
    Assistant: <response>`,
    });
  }

  const saved = await createSummary(
    event.identity.claims.username,
    result,
    chatTranscript.scenario,
    chatTranscript.difficulty
  );

  return saved;
};
