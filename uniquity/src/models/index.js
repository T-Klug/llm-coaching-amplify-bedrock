// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const OpenAiRoleType = {
  "SYSTEM": "SYSTEM",
  "ASSISTANT": "ASSISTANT",
  "USER": "USER"
};

const { OpenAIChat, Feedback, UserProfile, IcebreakerChat, RoleChat, RoleSummaary, MessagesType } = initSchema(schema);

export {
  OpenAIChat,
  Feedback,
  UserProfile,
  IcebreakerChat,
  RoleChat,
  RoleSummaary,
  OpenAiRoleType,
  MessagesType
};