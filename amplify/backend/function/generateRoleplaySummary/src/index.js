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

const getRoleChat = /* GraphQL */ `
  query GetRoleChat($id: ID!) {
    getRoleChat(id: $id) {
      id
      messages {
        role
        content
        __typename
      }
      user
      roleplayId
      scenario
      difficulty
      scenarioPrompt
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

const createRoleSummaary = /* GraphQL */ `
  mutation CreateRoleSummaary(
    $input: CreateRoleSummaaryInput!
    $condition: ModelRoleSummaaryConditionInput
  ) {
    createRoleSummaary(input: $input, condition: $condition) {
      id
      summary
      user
      roleplayId
      scenario
      difficulty
      scenarioPrompt
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
    body: JSON.stringify({ query: getRoleChat, variables }),
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

  return body.data.getRoleChat;
};

const createSummary = async (
  ownerId,
  newContent,
  chatScenario,
  chatDifficulty,
  scenarioPrompt
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
      scenarioPrompt: scenarioPrompt,
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
    body: JSON.stringify({ query: createRoleSummaary, variables }),
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
  return body.data.createRoleSummaary;
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
      minSimilarityScore: 0.69,
      maxK: 20,
      kIncrement: 2,
    });

    const docs = await retriever.getRelevantDocuments(
      JSON.stringify(chatTranscript.messages)
    );

    result = await chain.call({
      input: `<document>
       ${docs
         .map((d) => {
           if (d.pageContent.length > 0)
             return `
        ${d.pageContent
          .replace(/[^a-zA-Z0-9 \n\r]+/g, "")
          .trimStart()
          .trimEnd()}
        `;
           return;
         })
         .join("NEXT DOCUMENT")}
      </document>
      Before diving in, remember: The USER in the chat is the MANAGER, and the BOT is an employee. 
      The BOT was instructed to have the following tone: ${
        chatTranscript.difficulty
      }.

      You are Uniquity AI, a professional coaching assistant. Your objective is to analyze the interaction, 
      focusing particularly on the MANAGER's (USER's) communication and leadership skills in the context of a "${
        chatTranscript.scenario
      }".

      Consider the following managerial qualities:
      - Clear communication.
      - Demonstrated empathy and understanding.
      - Decisive decision making.
      - Effective leadership.
      - Active listening.

      <rules>
      - STRICTLY evaluate the MANAGER's skills.
      - Do NOT consider the BOT's responses for evaluation.
      - For each feedback point, provide:
        1. A brief explanation.
        2. An actionable recommendation.
      - Organize feedback under these categories:
        1. Communication
        2. Decision Making
        3. Empathy
        4. Leadership
      - Highlight both strengths and areas of improvement.
      - Rate the manager's performance in each category on a scale of 1-5.
      - Avoid repetitive feedback.
      - Your feedback should be constructive and actionable.
      - Conclude after giving feedback. No further conversation.
      - Relate anything relevant from the context in the <document></document> tags.
      </rules>
      
     

      <chat>
      ${
        chatTranscript && chatTranscript.messages
          ? JSON.stringify(chatTranscript.messages).replace("ASSISTANT", "BOT")
          : ""
      }
      </chat>

      Structure your feedback with ratings, observations, and recommendations within the <response></response> tags.
      Assistant: <response>
      `,
    });

    result.response = result.response.replace(/\bBOT\b/g, "employee");
  } else {
    result = await chain.call({
      input: `
      Before diving in, remember: The USER in the chat is the MANAGER, and the BOT is an employee. 
      The BOT was instructed to have the following tone: ${
        chatTranscript.difficulty
      }.

      You are Uniquity AI, a professional coaching assistant. Your objective is to analyze the interaction, 
      focusing particularly on the MANAGER's (USER's) communication and leadership skills in the context of a "${
        chatTranscript.scenario
      }".

      Consider the following managerial qualities:
      - Clear communication.
      - Demonstrated empathy and understanding.
      - Decisive decision making.
      - Effective leadership.
      - Active listening.

      <rules>
      - STRICTLY evaluate the MANAGER's skills.
      - Do NOT consider the BOT's responses for evaluation.
      - For each feedback point, provide:
        1. A brief explanation.
        2. An actionable recommendation.
      - Organize feedback under these categories:
        1. Communication
        2. Decision Making
        3. Empathy
        4. Leadership
      - Highlight both strengths and areas of improvement.
      - Rate the manager's performance in each category on a scale of 1-5.
      - Avoid repetitive feedback.
      - Your feedback should be constructive and actionable
      - Conclude after giving feedback. No further conversation.
      </rules>

      <chat>
      ${
        chatTranscript && chatTranscript.messages
          ? JSON.stringify(chatTranscript.messages).replace("ASSISTANT", "BOT")
          : ""
      }
      </chat>

      Structure your feedback with ratings, observations, and recommendations within the <response></response> tags.
      Assistant: <response>
      `,
    });

    result.response = result.response.replace(/\bBOT\b/g, "employee");
  }

  const saved = await createSummary(
    event.identity.claims.username,
    result,
    chatTranscript.scenario,
    chatTranscript.difficulty,
    chatTranscript.scenarioPrompt
  );

  return saved;
};
