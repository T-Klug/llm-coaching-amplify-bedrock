// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const PromptType = {
  "SYSTEM": "SYSTEM"
};

const { SystemPrompt } = initSchema(schema);

export {
  SystemPrompt,
  PromptType
};