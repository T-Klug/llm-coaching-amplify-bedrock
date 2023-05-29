// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const OpenAiRoleType = {
  "SYSTEM": "SYSTEM",
  "ASSISTANT": "ASSISTANT",
  "USER": "USER"
};

const PromptType = {
  "SYSTEM": "SYSTEM"
};

const { OpenAIChat, SystemPrompt, MessagesType } = initSchema(schema);

export {
  OpenAIChat,
  SystemPrompt,
  OpenAiRoleType,
  PromptType,
  MessagesType
};