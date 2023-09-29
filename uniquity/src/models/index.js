// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const OpenAiRoleType = {
  "SYSTEM": "SYSTEM",
  "ASSISTANT": "ASSISTANT",
  "USER": "USER"
};

const { OpenAIChat, OpenAIModel, Feedback, UserProfile, IcebreakerChat, RoleplayChat, RoleplaySummary, MessagesType } = initSchema(schema);

export {
  OpenAIChat,
  OpenAIModel,
  Feedback,
  UserProfile,
  IcebreakerChat,
  RoleplayChat,
  RoleplaySummary,
  OpenAiRoleType,
  MessagesType
};