/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	PinpointApplicationId
Amplify Params - DO NOT EDIT */
import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { LLMChain } from "langchain/chains";
import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
} from "langchain/prompts";
import { PinpointClient, SendMessagesCommand } from "@aws-sdk/client-pinpoint";

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

  const template =
    "As an AI developed for the purpose of career coaching, you only respond with an open-ended single question. ";
  const systemMessagePrompt =
    SystemMessagePromptTemplate.fromTemplate(template);
  const humanTemplate = "{text}";
  const humanMessagePrompt =
    HumanMessagePromptTemplate.fromTemplate(humanTemplate);

  const chatPrompt = ChatPromptTemplate.fromPromptMessages([
    systemMessagePrompt,
    humanMessagePrompt,
  ]);

  const chat = new ChatOpenAI({
    temperature: 0,
    openAIApiKey: Parameter.Value,
  });

  const chain = new LLMChain({
    llm: chat,
    prompt: chatPrompt,
  });

  const result = await chain.call({
    text: response,
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
          Body: result.text,
          MessageType: "TRANSACTIONAL",
          OriginationNumber: chatbotPhoneNumber,
        },
      },
    },
  };

  const pinpoint = new PinpointClient();
  const smsCommand = new SendMessagesCommand(inputSMS);
  const pinpointStatus = await pinpoint.send(smsCommand);
  return;
};
