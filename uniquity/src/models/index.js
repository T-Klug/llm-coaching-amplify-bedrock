// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const OpenAiRoleType = {
  "SYSTEM": "SYSTEM",
  "ASSISTANT": "ASSISTANT",
  "USER": "USER"
};

const { OpenAIChat, OpenAIModel, Feedback, UserSpecificPrompt, UserProfile, IcebreakerChat, MessagesType } = initSchema(schema);

export {
  OpenAIChat,
  OpenAIModel,
  Feedback,
  UserSpecificPrompt,
  UserProfile,
  IcebreakerChat,
  OpenAiRoleType,
  MessagesType
};