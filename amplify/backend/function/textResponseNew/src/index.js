/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	PinpointApplicationId
Amplify Params - DO NOT EDIT */
import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { ConversationChain } from "langchain/chains";
import { ChatPromptTemplate, MessagesPlaceholder } from "langchain/prompts";
import { PinpointClient, SendMessagesCommand } from "@aws-sdk/client-pinpoint";
import { BufferWindowMemory } from "langchain/memory";
import { DynamoDBChatMessageHistory } from "langchain/stores/message/dynamodb";

const SECRET_PATH = process.env.OpenAIKey;
const AppId = process.env.PinpointApplicationId;

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
export const handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const message = JSON.parse(event.Records[0].Sns.Message);
  const customerPhoneNumber = message.originationNumber;
  const chatbotPhoneNumber = message.destinationNumber;
  const response = message.messageBody.toLowerCase();

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

  const chatPrompt = ChatPromptTemplate.fromPromptMessages([
    [
      "system",
      "You are AI developed for the purpose of career coaching. You only respond conversationally with a single statement, and a single follow up question around the user's topic.",
    ],
    new MessagesPlaceholder("history"),
    ["human", "{input}"],
  ]);

  const chat = new ChatOpenAI({
    openAIApiKey: Parameter.Value,
  });

  const chain = new ConversationChain({
    llm: chat,
    prompt: chatPrompt,
    memory: memory,
  });

  const result = await chain.call({
    input: response,
  });
  console.log(result);
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
          Body: result.response,
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
