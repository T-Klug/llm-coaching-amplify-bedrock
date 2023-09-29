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

const GRAPHQL_ENDPOINT = process.env.API_AMPLIFYPOC_GRAPHQLAPIENDPOINTOUTPUT;
const AWS_REGION = process.env.AWS_REGION || "us-east-1";
const { Sha256 } = crypto;

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

const updateUserProfile = /* GraphQL */ `
  mutation UpdateUserProfile(
    $input: UpdateUserProfileInput!
    $condition: ModelUserProfileConditionInput
  ) {
    updateUserProfile(input: $input, condition: $condition) {
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
  }
`;

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

  return body.data.listUserProfiles.items[0];
};

// Helper function to update the Model
const updateProfile = async (userModel, summary) => {
  const endpoint = new URL(GRAPHQL_ENDPOINT);

  const variables = {
    input: {
      id: userModel.id,
      userSummary: summary.response
        .replace("<response>", "")
        .replace("</response>", ""),
      _version: userModel._version,
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
    body: JSON.stringify({ query: updateUserProfile, variables }),
    path: endpoint.pathname,
  });

  const signed = await signer.sign(requestToBeSigned);
  const request = new Request(endpoint, signed);
  let response;
  let body;
  try {
    console.log("SENDING THE MUTATION UPDATE TO THE MODEL AFTER SUMMARY");
    response = await fetch(request);
    body = await response.json();
    if (body.errors)
      console.log(`ERROR UPDATING SUMMARY: ${JSON.stringify(body.errors)}`);
  } catch (error) {
    console.log(
      `ERROR UPDATING SUMMRY CATCH: ${JSON.stringify(error.message)}`
    );
  }
  console.log(body.data);
  return body.data.updateUserProfile;
};

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
export const handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const userProfile = await getUserProfile(event.identity.claims.username);

  const chatPrompt = ChatPromptTemplate.fromPromptMessages([
    ["human", "{input}"],
  ]);

  const chat = new ChatBedrock({
    model: "anthropic.claude-instant-v1",
    region: AWS_REGION,
    maxTokens: 8191,
  });

  const chain = new ConversationChain({
    llm: chat,
    prompt: chatPrompt,
  });

  const result = await chain.call({
    input: `I am providing you with information about a user between the <user> tag. You will summarize that information for the purpose of coaching in a concise but complete paragraph summary.
      You will recieve the users name, an assessment as json with what motivates the user and ratings of 1-5, and a professional background block of text. 
     <user>
      Name: ${userProfile.name}
      Assessment: ${userProfile.personalityTest}
      Background: ${userProfile.background}
      </user>
      You will respond with the summary within the <response></response> tags.
      Assistant: [Summary] <response>
      `,
  });

  await updateProfile(userProfile, result);

  return "Done";
};
