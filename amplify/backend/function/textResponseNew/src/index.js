/* Amplify Params - DO NOT EDIT
	API_AMPLIFYPOC_GRAPHQLAPIENDPOINTOUTPUT
	API_AMPLIFYPOC_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";
import { ConversationChain } from "langchain/chains";
import { ChatPromptTemplate, MessagesPlaceholder } from "langchain/prompts";
import { PinpointClient, SendMessagesCommand } from "@aws-sdk/client-pinpoint";
import { BufferWindowMemory } from "langchain/memory";
import { DynamoDBChatMessageHistory } from "langchain/stores/message/dynamodb";
import crypto from "@aws-crypto/sha256-js";
import { defaultProvider } from "@aws-sdk/credential-provider-node";
import { SignatureV4 } from "@aws-sdk/signature-v4";
import { HttpRequest } from "@aws-sdk/protocol-http";
import { default as fetch, Request } from "node-fetch";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenSearchVectorStore } from "langchain/vectorstores/opensearch";
import { AwsSigv4Signer } from "@opensearch-project/opensearch/aws";
import { Client } from "@opensearch-project/opensearch";
import { ScoreThresholdRetriever } from "langchain/retrievers/score_threshold";
import { ChatBedrock } from "langchain/chat_models/bedrock";

const SECRET_PATH = process.env.OpenAIKey;
const AppId = process.env.PinpointApplicationId;
const GRAPHQL_ENDPOINT = process.env.API_AMPLIFYPOC_GRAPHQLAPIENDPOINTOUTPUT;
const AWS_REGION = process.env.AWS_REGION || "us-east-1";
const { Sha256 } = crypto;
const OPENSEARCH_URL = process.env.opensearchURL;

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

// Helper to get UserProfile
const getUserProfile = async (phonenumber) => {
  const phone = phonenumber.substring(2);
  const endpoint = new URL(GRAPHQL_ENDPOINT);
  const variables = {
    filter: {
      phone: { eq: phone },
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
    body &&
    body.data &&
    body.data.listUserProfiles &&
    body.data.listUserProfiles.items &&
    body.data.listUserProfiles.items.length >= 1
  ) {
    return body.data.listUserProfiles.items[0];
  }
  return undefined;
};

// Prompt builder
const buildPrompt = (userProfile, docs) => {
  // User Profile Present & docs
  if (docs && docs.length > 0) {
    return ChatPromptTemplate.fromMessages([
      new MessagesPlaceholder("history"),
      [
        "human",
        `I'm going to give you a document chunks about the user and/or the user's company context. I'd like you to use this document context to enrich the conversation. It could be information that is relevant about the company or information relevant to the user. The chunks are split by NEXT DOCUMENT. 
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
          - You are Uniquity AI, when asked who you are. A professional coaching assistant.
          - You should approach the conversation with the coaching framework of circling to gain a deeper understanding.
          - You should ask clarifying questions; don't make assumptions.
          - Your responses should be thought provoking and on topic.
          - You should include anything relevant from the <documents> about the user's company or the user's provided documents.
          - When you reference the document context provided, it should be conversational. Do not use the words "document context" in your answers.
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
        Assistant:`,
      ],
    ]);
  } else {
    // No docs
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
          - You are Uniquity AI, when asked who you are. A professional coaching assistant.
          - You should ask clarifying questions; don't make assumptions.
          - You should approach the conversation with the coaching framework of circling to gain a deeper understanding.
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
        Assistant:`,
      ],
    ]);
  }
};

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
export const handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const message = JSON.parse(event.Records[0].Sns.Message);
  const customerPhoneNumber = message.originationNumber;
  const chatbotPhoneNumber = message.destinationNumber;
  const response = message.messageBody.toLowerCase();

  const userProfile = await getUserProfile(customerPhoneNumber);

  // Do not text anyone number not associated to a user.
  if (!userProfile) {
    return;
  }

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
      tableName: "langchain",
      partitionKey: "id",
      sessionId: customerPhoneNumber,
      config: {
        region: "us-east-1",
      },
    }),
  });

  const chat = new ChatBedrock({
    model: "anthropic.claude-instant-v1",
    region: AWS_REGION,
    maxTokens: 8191,
  });

  let chatPrompt;
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
      indexName: userProfile.owner.split("::")[0],
    }
  );

  if (await vectorStore.doesIndexExist()) {
    console.log("DOING A CONTEXT RICH CHAIN");
    const retriever = ScoreThresholdRetriever.fromVectorStore(vectorStore, {
      minSimilarityScore: 0.66,
      maxK: 20,
      kIncrement: 2,
    });
    const docs = await retriever.getRelevantDocuments(response);
    // Profile and Docs
    chatPrompt = buildPrompt(userProfile, docs);
  } else {
    // Profile no Docs
    chatPrompt = buildPrompt(userProfile, undefined);
  }

  const chain = new ConversationChain({
    llm: chat,
    prompt: chatPrompt,
    memory: memory,
    verbose: true,
  });

  const result = await chain.call({
    input: response,
  });

  console.log(result);

  console.log("sending sms");
  const inputSMS = {
    ApplicationId: AppId,
    MessageRequest: {
      Addresses: {
        [customerPhoneNumber]: {
          ChannelType: "SMS",
        },
      },
      MessageConfiguration: {
        SMSMessage: {
          Body: result.response
            .replace("<response>", "")
            .replace("</response>", "")
            .trimStart()
            .trimEnd(),
          MessageType: "TRANSACTIONAL",
          OriginationNumber: chatbotPhoneNumber,
        },
      },
    },
  };

  const pinpoint = new PinpointClient();
  const smsCommand = new SendMessagesCommand(inputSMS);
  const pinpointStatus = await pinpoint.send(smsCommand);
  console.log(pinpointStatus);
  return;
};
