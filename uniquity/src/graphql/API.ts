/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateOpenAIChatInput = {
  id?: string | null;
  messages?: Array<MessagesTypeInput | null> | null;
  user?: string | null;
  owner?: string | null;
  _version?: number | null;
};

export type MessagesTypeInput = {
  role?: OpenAIRoleType | null;
  content?: string | null;
};

export enum OpenAIRoleType {
  SYSTEM = 'SYSTEM',
  ASSISTANT = 'ASSISTANT',
  USER = 'USER',
}

export type ModelOpenAIChatConditionInput = {
  user?: ModelIDInput | null;
  owner?: ModelStringInput | null;
  and?: Array<ModelOpenAIChatConditionInput | null> | null;
  or?: Array<ModelOpenAIChatConditionInput | null> | null;
  not?: ModelOpenAIChatConditionInput | null;
  _deleted?: ModelBooleanInput | null;
};

export type ModelIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export enum ModelAttributeTypes {
  binary = 'binary',
  binarySet = 'binarySet',
  bool = 'bool',
  list = 'list',
  map = 'map',
  number = 'number',
  numberSet = 'numberSet',
  string = 'string',
  stringSet = 'stringSet',
  _null = '_null',
}

export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export type ModelBooleanInput = {
  ne?: boolean | null;
  eq?: boolean | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export type OpenAIChat = {
  __typename: 'OpenAIChat';
  id: string;
  messages?: Array<MessagesType | null> | null;
  user?: string | null;
  owner?: string | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type MessagesType = {
  __typename: 'MessagesType';
  role?: OpenAIRoleType | null;
  content?: string | null;
};

export type UpdateOpenAIChatInput = {
  id: string;
  messages?: Array<MessagesTypeInput | null> | null;
  user?: string | null;
  owner?: string | null;
  _version?: number | null;
};

export type DeleteOpenAIChatInput = {
  id: string;
  _version?: number | null;
};

export type CreateOpenAIModelInput = {
  id?: string | null;
  prompt: string;
  model: string;
  temperature: string;
  top_p: string;
  max_tokens: string;
  presence_penalty: string;
  frequency_penalty: string;
  _version?: number | null;
};

export type ModelOpenAIModelConditionInput = {
  prompt?: ModelStringInput | null;
  model?: ModelStringInput | null;
  temperature?: ModelStringInput | null;
  top_p?: ModelStringInput | null;
  max_tokens?: ModelStringInput | null;
  presence_penalty?: ModelStringInput | null;
  frequency_penalty?: ModelStringInput | null;
  and?: Array<ModelOpenAIModelConditionInput | null> | null;
  or?: Array<ModelOpenAIModelConditionInput | null> | null;
  not?: ModelOpenAIModelConditionInput | null;
  _deleted?: ModelBooleanInput | null;
};

export type OpenAIModel = {
  __typename: 'OpenAIModel';
  id: string;
  prompt: string;
  model: string;
  temperature: string;
  top_p: string;
  max_tokens: string;
  presence_penalty: string;
  frequency_penalty: string;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type UpdateOpenAIModelInput = {
  id: string;
  prompt?: string | null;
  model?: string | null;
  temperature?: string | null;
  top_p?: string | null;
  max_tokens?: string | null;
  presence_penalty?: string | null;
  frequency_penalty?: string | null;
  _version?: number | null;
};

export type DeleteOpenAIModelInput = {
  id: string;
  _version?: number | null;
};

export type CreateFeedbackInput = {
  id?: string | null;
  like?: boolean | null;
  comment?: string | null;
  owner?: string | null;
  _version?: number | null;
};

export type ModelFeedbackConditionInput = {
  like?: ModelBooleanInput | null;
  comment?: ModelStringInput | null;
  owner?: ModelStringInput | null;
  and?: Array<ModelFeedbackConditionInput | null> | null;
  or?: Array<ModelFeedbackConditionInput | null> | null;
  not?: ModelFeedbackConditionInput | null;
  _deleted?: ModelBooleanInput | null;
};

export type Feedback = {
  __typename: 'Feedback';
  id: string;
  like?: boolean | null;
  comment?: string | null;
  owner?: string | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type UpdateFeedbackInput = {
  id: string;
  like?: boolean | null;
  comment?: string | null;
  owner?: string | null;
  _version?: number | null;
};

export type DeleteFeedbackInput = {
  id: string;
  _version?: number | null;
};

export type CreateUserProfileInput = {
  id?: string | null;
  userId?: string | null;
  name?: string | null;
  personalityTest?: string | null;
  background?: string | null;
  phone?: string | null;
  optInText?: boolean | null;
  completedIcebreakers?: boolean | null;
  userSummary?: string | null;
  owner?: string | null;
  _version?: number | null;
};

export type ModelUserProfileConditionInput = {
  userId?: ModelStringInput | null;
  name?: ModelStringInput | null;
  personalityTest?: ModelStringInput | null;
  background?: ModelStringInput | null;
  phone?: ModelStringInput | null;
  optInText?: ModelBooleanInput | null;
  completedIcebreakers?: ModelBooleanInput | null;
  userSummary?: ModelStringInput | null;
  owner?: ModelStringInput | null;
  and?: Array<ModelUserProfileConditionInput | null> | null;
  or?: Array<ModelUserProfileConditionInput | null> | null;
  not?: ModelUserProfileConditionInput | null;
  _deleted?: ModelBooleanInput | null;
};

export type UserProfile = {
  __typename: 'UserProfile';
  id: string;
  userId?: string | null;
  name?: string | null;
  personalityTest?: string | null;
  background?: string | null;
  phone?: string | null;
  optInText?: boolean | null;
  completedIcebreakers?: boolean | null;
  userSummary?: string | null;
  owner?: string | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type UpdateUserProfileInput = {
  id: string;
  userId?: string | null;
  name?: string | null;
  personalityTest?: string | null;
  background?: string | null;
  phone?: string | null;
  optInText?: boolean | null;
  completedIcebreakers?: boolean | null;
  userSummary?: string | null;
  owner?: string | null;
  _version?: number | null;
};

export type DeleteUserProfileInput = {
  id: string;
  _version?: number | null;
};

export type CreateIcebreakerChatInput = {
  id?: string | null;
  messages?: Array<MessagesTypeInput | null> | null;
  user?: string | null;
  owner?: string | null;
  _version?: number | null;
};

export type ModelIcebreakerChatConditionInput = {
  user?: ModelIDInput | null;
  owner?: ModelStringInput | null;
  and?: Array<ModelIcebreakerChatConditionInput | null> | null;
  or?: Array<ModelIcebreakerChatConditionInput | null> | null;
  not?: ModelIcebreakerChatConditionInput | null;
  _deleted?: ModelBooleanInput | null;
};

export type IcebreakerChat = {
  __typename: 'IcebreakerChat';
  id: string;
  messages?: Array<MessagesType | null> | null;
  user?: string | null;
  owner?: string | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type UpdateIcebreakerChatInput = {
  id: string;
  messages?: Array<MessagesTypeInput | null> | null;
  user?: string | null;
  owner?: string | null;
  _version?: number | null;
};

export type DeleteIcebreakerChatInput = {
  id: string;
  _version?: number | null;
};

export type CreateRoleplayChatInput = {
  id?: string | null;
  messages?: Array<MessagesTypeInput | null> | null;
  user?: string | null;
  roleplayId?: string | null;
  scenario?: string | null;
  difficulty?: string | null;
  scenarioPrompt?: string | null;
  owner?: string | null;
  _version?: number | null;
};

export type ModelRoleplayChatConditionInput = {
  user?: ModelIDInput | null;
  roleplayId?: ModelIDInput | null;
  scenario?: ModelStringInput | null;
  difficulty?: ModelStringInput | null;
  scenarioPrompt?: ModelStringInput | null;
  owner?: ModelStringInput | null;
  and?: Array<ModelRoleplayChatConditionInput | null> | null;
  or?: Array<ModelRoleplayChatConditionInput | null> | null;
  not?: ModelRoleplayChatConditionInput | null;
  _deleted?: ModelBooleanInput | null;
};

export type RoleplayChat = {
  __typename: 'RoleplayChat';
  id: string;
  messages?: Array<MessagesType | null> | null;
  user?: string | null;
  roleplayId?: string | null;
  scenario?: string | null;
  difficulty?: string | null;
  scenarioPrompt?: string | null;
  owner?: string | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type UpdateRoleplayChatInput = {
  id: string;
  messages?: Array<MessagesTypeInput | null> | null;
  user?: string | null;
  roleplayId?: string | null;
  scenario?: string | null;
  difficulty?: string | null;
  scenarioPrompt?: string | null;
  owner?: string | null;
  _version?: number | null;
};

export type DeleteRoleplayChatInput = {
  id: string;
  _version?: number | null;
};

export type CreateRoleplaySummaryInput = {
  id?: string | null;
  summary?: string | null;
  user?: string | null;
  roleplayId?: string | null;
  scenario?: string | null;
  difficulty?: string | null;
  scenarioPrompt?: string | null;
  owner?: string | null;
  _version?: number | null;
};

export type ModelRoleplaySummaryConditionInput = {
  summary?: ModelStringInput | null;
  user?: ModelIDInput | null;
  roleplayId?: ModelIDInput | null;
  scenario?: ModelStringInput | null;
  difficulty?: ModelStringInput | null;
  scenarioPrompt?: ModelStringInput | null;
  owner?: ModelStringInput | null;
  and?: Array<ModelRoleplaySummaryConditionInput | null> | null;
  or?: Array<ModelRoleplaySummaryConditionInput | null> | null;
  not?: ModelRoleplaySummaryConditionInput | null;
  _deleted?: ModelBooleanInput | null;
};

export type RoleplaySummary = {
  __typename: 'RoleplaySummary';
  id: string;
  summary?: string | null;
  user?: string | null;
  roleplayId?: string | null;
  scenario?: string | null;
  difficulty?: string | null;
  scenarioPrompt?: string | null;
  owner?: string | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type UpdateRoleplaySummaryInput = {
  id: string;
  summary?: string | null;
  user?: string | null;
  roleplayId?: string | null;
  scenario?: string | null;
  difficulty?: string | null;
  scenarioPrompt?: string | null;
  owner?: string | null;
  _version?: number | null;
};

export type DeleteRoleplaySummaryInput = {
  id: string;
  _version?: number | null;
};

export type CreateOpenAIChatFuncInput = {
  id?: string | null;
  messages?: Array<MessagesTypeFuncInput | null> | null;
  user?: string | null;
  owner?: string | null;
  _version?: number | null;
};

export type MessagesTypeFuncInput = {
  role?: OpenAIRoleType | null;
  content?: string | null;
};

export type ChatIcebreakerFuncInput = {
  id?: string | null;
  messages?: Array<MessagesTypeFuncInput | null> | null;
  user?: string | null;
  owner?: string | null;
  _version?: number | null;
};

export type GenerateUserSummaryFuncInput = {
  id?: string | null;
};

export type RoleplayChatFuncInput = {
  id?: string | null;
  messages?: Array<MessagesTypeFuncInput | null> | null;
  user?: string | null;
  roleplayId?: string | null;
  owner?: string | null;
  scenario?: string | null;
  difficulty?: string | null;
  scenarioPrompt?: string | null;
  _version?: number | null;
};

export type GenerateRoleplaySummaryFuncInput = {
  roleplayId?: string | null;
};

export type ModelOpenAIChatFilterInput = {
  id?: ModelIDInput | null;
  user?: ModelIDInput | null;
  owner?: ModelStringInput | null;
  and?: Array<ModelOpenAIChatFilterInput | null> | null;
  or?: Array<ModelOpenAIChatFilterInput | null> | null;
  not?: ModelOpenAIChatFilterInput | null;
  _deleted?: ModelBooleanInput | null;
};

export type ModelOpenAIChatConnection = {
  __typename: 'ModelOpenAIChatConnection';
  items: Array<OpenAIChat | null>;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type ModelOpenAIModelFilterInput = {
  id?: ModelIDInput | null;
  prompt?: ModelStringInput | null;
  model?: ModelStringInput | null;
  temperature?: ModelStringInput | null;
  top_p?: ModelStringInput | null;
  max_tokens?: ModelStringInput | null;
  presence_penalty?: ModelStringInput | null;
  frequency_penalty?: ModelStringInput | null;
  and?: Array<ModelOpenAIModelFilterInput | null> | null;
  or?: Array<ModelOpenAIModelFilterInput | null> | null;
  not?: ModelOpenAIModelFilterInput | null;
  _deleted?: ModelBooleanInput | null;
};

export type ModelOpenAIModelConnection = {
  __typename: 'ModelOpenAIModelConnection';
  items: Array<OpenAIModel | null>;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type ModelFeedbackFilterInput = {
  id?: ModelIDInput | null;
  like?: ModelBooleanInput | null;
  comment?: ModelStringInput | null;
  owner?: ModelStringInput | null;
  and?: Array<ModelFeedbackFilterInput | null> | null;
  or?: Array<ModelFeedbackFilterInput | null> | null;
  not?: ModelFeedbackFilterInput | null;
  _deleted?: ModelBooleanInput | null;
};

export type ModelFeedbackConnection = {
  __typename: 'ModelFeedbackConnection';
  items: Array<Feedback | null>;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type ModelUserProfileFilterInput = {
  id?: ModelIDInput | null;
  userId?: ModelStringInput | null;
  name?: ModelStringInput | null;
  personalityTest?: ModelStringInput | null;
  background?: ModelStringInput | null;
  phone?: ModelStringInput | null;
  optInText?: ModelBooleanInput | null;
  completedIcebreakers?: ModelBooleanInput | null;
  userSummary?: ModelStringInput | null;
  owner?: ModelStringInput | null;
  and?: Array<ModelUserProfileFilterInput | null> | null;
  or?: Array<ModelUserProfileFilterInput | null> | null;
  not?: ModelUserProfileFilterInput | null;
  _deleted?: ModelBooleanInput | null;
};

export type ModelUserProfileConnection = {
  __typename: 'ModelUserProfileConnection';
  items: Array<UserProfile | null>;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type ModelIcebreakerChatFilterInput = {
  id?: ModelIDInput | null;
  user?: ModelIDInput | null;
  owner?: ModelStringInput | null;
  and?: Array<ModelIcebreakerChatFilterInput | null> | null;
  or?: Array<ModelIcebreakerChatFilterInput | null> | null;
  not?: ModelIcebreakerChatFilterInput | null;
  _deleted?: ModelBooleanInput | null;
};

export type ModelIcebreakerChatConnection = {
  __typename: 'ModelIcebreakerChatConnection';
  items: Array<IcebreakerChat | null>;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type ModelRoleplayChatFilterInput = {
  id?: ModelIDInput | null;
  user?: ModelIDInput | null;
  roleplayId?: ModelIDInput | null;
  scenario?: ModelStringInput | null;
  difficulty?: ModelStringInput | null;
  scenarioPrompt?: ModelStringInput | null;
  owner?: ModelStringInput | null;
  and?: Array<ModelRoleplayChatFilterInput | null> | null;
  or?: Array<ModelRoleplayChatFilterInput | null> | null;
  not?: ModelRoleplayChatFilterInput | null;
  _deleted?: ModelBooleanInput | null;
};

export type ModelRoleplayChatConnection = {
  __typename: 'ModelRoleplayChatConnection';
  items: Array<RoleplayChat | null>;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type ModelRoleplaySummaryFilterInput = {
  id?: ModelIDInput | null;
  summary?: ModelStringInput | null;
  user?: ModelIDInput | null;
  roleplayId?: ModelIDInput | null;
  scenario?: ModelStringInput | null;
  difficulty?: ModelStringInput | null;
  scenarioPrompt?: ModelStringInput | null;
  owner?: ModelStringInput | null;
  and?: Array<ModelRoleplaySummaryFilterInput | null> | null;
  or?: Array<ModelRoleplaySummaryFilterInput | null> | null;
  not?: ModelRoleplaySummaryFilterInput | null;
  _deleted?: ModelBooleanInput | null;
};

export type ModelRoleplaySummaryConnection = {
  __typename: 'ModelRoleplaySummaryConnection';
  items: Array<RoleplaySummary | null>;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type ModelSubscriptionOpenAIChatFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  user?: ModelSubscriptionIDInput | null;
  and?: Array<ModelSubscriptionOpenAIChatFilterInput | null> | null;
  or?: Array<ModelSubscriptionOpenAIChatFilterInput | null> | null;
  _deleted?: ModelBooleanInput | null;
};

export type ModelSubscriptionIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  in?: Array<string | null> | null;
  notIn?: Array<string | null> | null;
};

export type ModelSubscriptionOpenAIModelFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  prompt?: ModelSubscriptionStringInput | null;
  model?: ModelSubscriptionStringInput | null;
  temperature?: ModelSubscriptionStringInput | null;
  top_p?: ModelSubscriptionStringInput | null;
  max_tokens?: ModelSubscriptionStringInput | null;
  presence_penalty?: ModelSubscriptionStringInput | null;
  frequency_penalty?: ModelSubscriptionStringInput | null;
  and?: Array<ModelSubscriptionOpenAIModelFilterInput | null> | null;
  or?: Array<ModelSubscriptionOpenAIModelFilterInput | null> | null;
  _deleted?: ModelBooleanInput | null;
};

export type ModelSubscriptionStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  in?: Array<string | null> | null;
  notIn?: Array<string | null> | null;
};

export type ModelSubscriptionFeedbackFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  like?: ModelSubscriptionBooleanInput | null;
  comment?: ModelSubscriptionStringInput | null;
  and?: Array<ModelSubscriptionFeedbackFilterInput | null> | null;
  or?: Array<ModelSubscriptionFeedbackFilterInput | null> | null;
  _deleted?: ModelBooleanInput | null;
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null;
  eq?: boolean | null;
};

export type ModelSubscriptionUserProfileFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  userId?: ModelSubscriptionStringInput | null;
  name?: ModelSubscriptionStringInput | null;
  personalityTest?: ModelSubscriptionStringInput | null;
  background?: ModelSubscriptionStringInput | null;
  phone?: ModelSubscriptionStringInput | null;
  optInText?: ModelSubscriptionBooleanInput | null;
  completedIcebreakers?: ModelSubscriptionBooleanInput | null;
  userSummary?: ModelSubscriptionStringInput | null;
  and?: Array<ModelSubscriptionUserProfileFilterInput | null> | null;
  or?: Array<ModelSubscriptionUserProfileFilterInput | null> | null;
  _deleted?: ModelBooleanInput | null;
};

export type ModelSubscriptionIcebreakerChatFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  user?: ModelSubscriptionIDInput | null;
  and?: Array<ModelSubscriptionIcebreakerChatFilterInput | null> | null;
  or?: Array<ModelSubscriptionIcebreakerChatFilterInput | null> | null;
  _deleted?: ModelBooleanInput | null;
};

export type ModelSubscriptionRoleplayChatFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  user?: ModelSubscriptionIDInput | null;
  roleplayId?: ModelSubscriptionIDInput | null;
  scenario?: ModelSubscriptionStringInput | null;
  difficulty?: ModelSubscriptionStringInput | null;
  scenarioPrompt?: ModelSubscriptionStringInput | null;
  and?: Array<ModelSubscriptionRoleplayChatFilterInput | null> | null;
  or?: Array<ModelSubscriptionRoleplayChatFilterInput | null> | null;
  _deleted?: ModelBooleanInput | null;
};

export type ModelSubscriptionRoleplaySummaryFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  summary?: ModelSubscriptionStringInput | null;
  user?: ModelSubscriptionIDInput | null;
  roleplayId?: ModelSubscriptionIDInput | null;
  scenario?: ModelSubscriptionStringInput | null;
  difficulty?: ModelSubscriptionStringInput | null;
  scenarioPrompt?: ModelSubscriptionStringInput | null;
  and?: Array<ModelSubscriptionRoleplaySummaryFilterInput | null> | null;
  or?: Array<ModelSubscriptionRoleplaySummaryFilterInput | null> | null;
  _deleted?: ModelBooleanInput | null;
};

export type CreateOpenAIChatMutationVariables = {
  input: CreateOpenAIChatInput;
  condition?: ModelOpenAIChatConditionInput | null;
};

export type CreateOpenAIChatMutation = {
  createOpenAIChat?: {
    __typename: 'OpenAIChat';
    id: string;
    messages?: Array<{
      __typename: 'MessagesType';
      role?: OpenAIRoleType | null;
      content?: string | null;
    } | null> | null;
    user?: string | null;
    owner?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type UpdateOpenAIChatMutationVariables = {
  input: UpdateOpenAIChatInput;
  condition?: ModelOpenAIChatConditionInput | null;
};

export type UpdateOpenAIChatMutation = {
  updateOpenAIChat?: {
    __typename: 'OpenAIChat';
    id: string;
    messages?: Array<{
      __typename: 'MessagesType';
      role?: OpenAIRoleType | null;
      content?: string | null;
    } | null> | null;
    user?: string | null;
    owner?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type DeleteOpenAIChatMutationVariables = {
  input: DeleteOpenAIChatInput;
  condition?: ModelOpenAIChatConditionInput | null;
};

export type DeleteOpenAIChatMutation = {
  deleteOpenAIChat?: {
    __typename: 'OpenAIChat';
    id: string;
    messages?: Array<{
      __typename: 'MessagesType';
      role?: OpenAIRoleType | null;
      content?: string | null;
    } | null> | null;
    user?: string | null;
    owner?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type CreateOpenAIModelMutationVariables = {
  input: CreateOpenAIModelInput;
  condition?: ModelOpenAIModelConditionInput | null;
};

export type CreateOpenAIModelMutation = {
  createOpenAIModel?: {
    __typename: 'OpenAIModel';
    id: string;
    prompt: string;
    model: string;
    temperature: string;
    top_p: string;
    max_tokens: string;
    presence_penalty: string;
    frequency_penalty: string;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type UpdateOpenAIModelMutationVariables = {
  input: UpdateOpenAIModelInput;
  condition?: ModelOpenAIModelConditionInput | null;
};

export type UpdateOpenAIModelMutation = {
  updateOpenAIModel?: {
    __typename: 'OpenAIModel';
    id: string;
    prompt: string;
    model: string;
    temperature: string;
    top_p: string;
    max_tokens: string;
    presence_penalty: string;
    frequency_penalty: string;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type DeleteOpenAIModelMutationVariables = {
  input: DeleteOpenAIModelInput;
  condition?: ModelOpenAIModelConditionInput | null;
};

export type DeleteOpenAIModelMutation = {
  deleteOpenAIModel?: {
    __typename: 'OpenAIModel';
    id: string;
    prompt: string;
    model: string;
    temperature: string;
    top_p: string;
    max_tokens: string;
    presence_penalty: string;
    frequency_penalty: string;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type CreateFeedbackMutationVariables = {
  input: CreateFeedbackInput;
  condition?: ModelFeedbackConditionInput | null;
};

export type CreateFeedbackMutation = {
  createFeedback?: {
    __typename: 'Feedback';
    id: string;
    like?: boolean | null;
    comment?: string | null;
    owner?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type UpdateFeedbackMutationVariables = {
  input: UpdateFeedbackInput;
  condition?: ModelFeedbackConditionInput | null;
};

export type UpdateFeedbackMutation = {
  updateFeedback?: {
    __typename: 'Feedback';
    id: string;
    like?: boolean | null;
    comment?: string | null;
    owner?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type DeleteFeedbackMutationVariables = {
  input: DeleteFeedbackInput;
  condition?: ModelFeedbackConditionInput | null;
};

export type DeleteFeedbackMutation = {
  deleteFeedback?: {
    __typename: 'Feedback';
    id: string;
    like?: boolean | null;
    comment?: string | null;
    owner?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type CreateUserProfileMutationVariables = {
  input: CreateUserProfileInput;
  condition?: ModelUserProfileConditionInput | null;
};

export type CreateUserProfileMutation = {
  createUserProfile?: {
    __typename: 'UserProfile';
    id: string;
    userId?: string | null;
    name?: string | null;
    personalityTest?: string | null;
    background?: string | null;
    phone?: string | null;
    optInText?: boolean | null;
    completedIcebreakers?: boolean | null;
    userSummary?: string | null;
    owner?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type UpdateUserProfileMutationVariables = {
  input: UpdateUserProfileInput;
  condition?: ModelUserProfileConditionInput | null;
};

export type UpdateUserProfileMutation = {
  updateUserProfile?: {
    __typename: 'UserProfile';
    id: string;
    userId?: string | null;
    name?: string | null;
    personalityTest?: string | null;
    background?: string | null;
    phone?: string | null;
    optInText?: boolean | null;
    completedIcebreakers?: boolean | null;
    userSummary?: string | null;
    owner?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type DeleteUserProfileMutationVariables = {
  input: DeleteUserProfileInput;
  condition?: ModelUserProfileConditionInput | null;
};

export type DeleteUserProfileMutation = {
  deleteUserProfile?: {
    __typename: 'UserProfile';
    id: string;
    userId?: string | null;
    name?: string | null;
    personalityTest?: string | null;
    background?: string | null;
    phone?: string | null;
    optInText?: boolean | null;
    completedIcebreakers?: boolean | null;
    userSummary?: string | null;
    owner?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type CreateIcebreakerChatMutationVariables = {
  input: CreateIcebreakerChatInput;
  condition?: ModelIcebreakerChatConditionInput | null;
};

export type CreateIcebreakerChatMutation = {
  createIcebreakerChat?: {
    __typename: 'IcebreakerChat';
    id: string;
    messages?: Array<{
      __typename: 'MessagesType';
      role?: OpenAIRoleType | null;
      content?: string | null;
    } | null> | null;
    user?: string | null;
    owner?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type UpdateIcebreakerChatMutationVariables = {
  input: UpdateIcebreakerChatInput;
  condition?: ModelIcebreakerChatConditionInput | null;
};

export type UpdateIcebreakerChatMutation = {
  updateIcebreakerChat?: {
    __typename: 'IcebreakerChat';
    id: string;
    messages?: Array<{
      __typename: 'MessagesType';
      role?: OpenAIRoleType | null;
      content?: string | null;
    } | null> | null;
    user?: string | null;
    owner?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type DeleteIcebreakerChatMutationVariables = {
  input: DeleteIcebreakerChatInput;
  condition?: ModelIcebreakerChatConditionInput | null;
};

export type DeleteIcebreakerChatMutation = {
  deleteIcebreakerChat?: {
    __typename: 'IcebreakerChat';
    id: string;
    messages?: Array<{
      __typename: 'MessagesType';
      role?: OpenAIRoleType | null;
      content?: string | null;
    } | null> | null;
    user?: string | null;
    owner?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type CreateRoleplayChatMutationVariables = {
  input: CreateRoleplayChatInput;
  condition?: ModelRoleplayChatConditionInput | null;
};

export type CreateRoleplayChatMutation = {
  createRoleplayChat?: {
    __typename: 'RoleplayChat';
    id: string;
    messages?: Array<{
      __typename: 'MessagesType';
      role?: OpenAIRoleType | null;
      content?: string | null;
    } | null> | null;
    user?: string | null;
    roleplayId?: string | null;
    scenario?: string | null;
    difficulty?: string | null;
    scenarioPrompt?: string | null;
    owner?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type UpdateRoleplayChatMutationVariables = {
  input: UpdateRoleplayChatInput;
  condition?: ModelRoleplayChatConditionInput | null;
};

export type UpdateRoleplayChatMutation = {
  updateRoleplayChat?: {
    __typename: 'RoleplayChat';
    id: string;
    messages?: Array<{
      __typename: 'MessagesType';
      role?: OpenAIRoleType | null;
      content?: string | null;
    } | null> | null;
    user?: string | null;
    roleplayId?: string | null;
    scenario?: string | null;
    difficulty?: string | null;
    scenarioPrompt?: string | null;
    owner?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type DeleteRoleplayChatMutationVariables = {
  input: DeleteRoleplayChatInput;
  condition?: ModelRoleplayChatConditionInput | null;
};

export type DeleteRoleplayChatMutation = {
  deleteRoleplayChat?: {
    __typename: 'RoleplayChat';
    id: string;
    messages?: Array<{
      __typename: 'MessagesType';
      role?: OpenAIRoleType | null;
      content?: string | null;
    } | null> | null;
    user?: string | null;
    roleplayId?: string | null;
    scenario?: string | null;
    difficulty?: string | null;
    scenarioPrompt?: string | null;
    owner?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type CreateRoleplaySummaryMutationVariables = {
  input: CreateRoleplaySummaryInput;
  condition?: ModelRoleplaySummaryConditionInput | null;
};

export type CreateRoleplaySummaryMutation = {
  createRoleplaySummary?: {
    __typename: 'RoleplaySummary';
    id: string;
    summary?: string | null;
    user?: string | null;
    roleplayId?: string | null;
    scenario?: string | null;
    difficulty?: string | null;
    scenarioPrompt?: string | null;
    owner?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type UpdateRoleplaySummaryMutationVariables = {
  input: UpdateRoleplaySummaryInput;
  condition?: ModelRoleplaySummaryConditionInput | null;
};

export type UpdateRoleplaySummaryMutation = {
  updateRoleplaySummary?: {
    __typename: 'RoleplaySummary';
    id: string;
    summary?: string | null;
    user?: string | null;
    roleplayId?: string | null;
    scenario?: string | null;
    difficulty?: string | null;
    scenarioPrompt?: string | null;
    owner?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type DeleteRoleplaySummaryMutationVariables = {
  input: DeleteRoleplaySummaryInput;
  condition?: ModelRoleplaySummaryConditionInput | null;
};

export type DeleteRoleplaySummaryMutation = {
  deleteRoleplaySummary?: {
    __typename: 'RoleplaySummary';
    id: string;
    summary?: string | null;
    user?: string | null;
    roleplayId?: string | null;
    scenario?: string | null;
    difficulty?: string | null;
    scenarioPrompt?: string | null;
    owner?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type CreateOpenAIChatFuncMutationVariables = {
  input?: CreateOpenAIChatFuncInput | null;
};

export type CreateOpenAIChatFuncMutation = {
  createOpenAIChatFunc?: {
    __typename: 'OpenAIChat';
    id: string;
    messages?: Array<{
      __typename: 'MessagesType';
      role?: OpenAIRoleType | null;
      content?: string | null;
    } | null> | null;
    user?: string | null;
    owner?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type ChatIcebreakerFuncMutationVariables = {
  input?: ChatIcebreakerFuncInput | null;
};

export type ChatIcebreakerFuncMutation = {
  chatIcebreakerFunc?: {
    __typename: 'IcebreakerChat';
    id: string;
    messages?: Array<{
      __typename: 'MessagesType';
      role?: OpenAIRoleType | null;
      content?: string | null;
    } | null> | null;
    user?: string | null;
    owner?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type GenerateUserSummaryFuncMutationVariables = {
  input?: GenerateUserSummaryFuncInput | null;
};

export type GenerateUserSummaryFuncMutation = {
  generateUserSummaryFunc?: string | null;
};

export type ChatRoleplayFuncMutationVariables = {
  input?: RoleplayChatFuncInput | null;
};

export type ChatRoleplayFuncMutation = {
  chatRoleplayFunc?: {
    __typename: 'RoleplayChat';
    id: string;
    messages?: Array<{
      __typename: 'MessagesType';
      role?: OpenAIRoleType | null;
      content?: string | null;
    } | null> | null;
    user?: string | null;
    roleplayId?: string | null;
    scenario?: string | null;
    difficulty?: string | null;
    scenarioPrompt?: string | null;
    owner?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type GenerateRoleplaySummaryFuncMutationVariables = {
  input?: GenerateRoleplaySummaryFuncInput | null;
};

export type GenerateRoleplaySummaryFuncMutation = {
  generateRoleplaySummaryFunc?: {
    __typename: 'RoleplaySummary';
    id: string;
    summary?: string | null;
    user?: string | null;
    roleplayId?: string | null;
    scenario?: string | null;
    difficulty?: string | null;
    scenarioPrompt?: string | null;
    owner?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type GetOpenAIChatQueryVariables = {
  id: string;
};

export type GetOpenAIChatQuery = {
  getOpenAIChat?: {
    __typename: 'OpenAIChat';
    id: string;
    messages?: Array<{
      __typename: 'MessagesType';
      role?: OpenAIRoleType | null;
      content?: string | null;
    } | null> | null;
    user?: string | null;
    owner?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type ListOpenAIChatsQueryVariables = {
  filter?: ModelOpenAIChatFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListOpenAIChatsQuery = {
  listOpenAIChats?: {
    __typename: 'ModelOpenAIChatConnection';
    items: Array<{
      __typename: 'OpenAIChat';
      id: string;
      messages?: Array<{
        __typename: 'MessagesType';
        role?: OpenAIRoleType | null;
        content?: string | null;
      } | null> | null;
      user?: string | null;
      owner?: string | null;
      createdAt: string;
      updatedAt: string;
      _version: number;
      _deleted?: boolean | null;
      _lastChangedAt: number;
    } | null>;
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type SyncOpenAIChatsQueryVariables = {
  filter?: ModelOpenAIChatFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  lastSync?: number | null;
};

export type SyncOpenAIChatsQuery = {
  syncOpenAIChats?: {
    __typename: 'ModelOpenAIChatConnection';
    items: Array<{
      __typename: 'OpenAIChat';
      id: string;
      messages?: Array<{
        __typename: 'MessagesType';
        role?: OpenAIRoleType | null;
        content?: string | null;
      } | null> | null;
      user?: string | null;
      owner?: string | null;
      createdAt: string;
      updatedAt: string;
      _version: number;
      _deleted?: boolean | null;
      _lastChangedAt: number;
    } | null>;
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type GetOpenAIModelQueryVariables = {
  id: string;
};

export type GetOpenAIModelQuery = {
  getOpenAIModel?: {
    __typename: 'OpenAIModel';
    id: string;
    prompt: string;
    model: string;
    temperature: string;
    top_p: string;
    max_tokens: string;
    presence_penalty: string;
    frequency_penalty: string;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type ListOpenAIModelsQueryVariables = {
  filter?: ModelOpenAIModelFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListOpenAIModelsQuery = {
  listOpenAIModels?: {
    __typename: 'ModelOpenAIModelConnection';
    items: Array<{
      __typename: 'OpenAIModel';
      id: string;
      prompt: string;
      model: string;
      temperature: string;
      top_p: string;
      max_tokens: string;
      presence_penalty: string;
      frequency_penalty: string;
      createdAt: string;
      updatedAt: string;
      _version: number;
      _deleted?: boolean | null;
      _lastChangedAt: number;
    } | null>;
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type SyncOpenAIModelsQueryVariables = {
  filter?: ModelOpenAIModelFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  lastSync?: number | null;
};

export type SyncOpenAIModelsQuery = {
  syncOpenAIModels?: {
    __typename: 'ModelOpenAIModelConnection';
    items: Array<{
      __typename: 'OpenAIModel';
      id: string;
      prompt: string;
      model: string;
      temperature: string;
      top_p: string;
      max_tokens: string;
      presence_penalty: string;
      frequency_penalty: string;
      createdAt: string;
      updatedAt: string;
      _version: number;
      _deleted?: boolean | null;
      _lastChangedAt: number;
    } | null>;
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type GetFeedbackQueryVariables = {
  id: string;
};

export type GetFeedbackQuery = {
  getFeedback?: {
    __typename: 'Feedback';
    id: string;
    like?: boolean | null;
    comment?: string | null;
    owner?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type ListFeedbacksQueryVariables = {
  filter?: ModelFeedbackFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListFeedbacksQuery = {
  listFeedbacks?: {
    __typename: 'ModelFeedbackConnection';
    items: Array<{
      __typename: 'Feedback';
      id: string;
      like?: boolean | null;
      comment?: string | null;
      owner?: string | null;
      createdAt: string;
      updatedAt: string;
      _version: number;
      _deleted?: boolean | null;
      _lastChangedAt: number;
    } | null>;
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type SyncFeedbacksQueryVariables = {
  filter?: ModelFeedbackFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  lastSync?: number | null;
};

export type SyncFeedbacksQuery = {
  syncFeedbacks?: {
    __typename: 'ModelFeedbackConnection';
    items: Array<{
      __typename: 'Feedback';
      id: string;
      like?: boolean | null;
      comment?: string | null;
      owner?: string | null;
      createdAt: string;
      updatedAt: string;
      _version: number;
      _deleted?: boolean | null;
      _lastChangedAt: number;
    } | null>;
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type GetUserProfileQueryVariables = {
  id: string;
};

export type GetUserProfileQuery = {
  getUserProfile?: {
    __typename: 'UserProfile';
    id: string;
    userId?: string | null;
    name?: string | null;
    personalityTest?: string | null;
    background?: string | null;
    phone?: string | null;
    optInText?: boolean | null;
    completedIcebreakers?: boolean | null;
    userSummary?: string | null;
    owner?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type ListUserProfilesQueryVariables = {
  filter?: ModelUserProfileFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListUserProfilesQuery = {
  listUserProfiles?: {
    __typename: 'ModelUserProfileConnection';
    items: Array<{
      __typename: 'UserProfile';
      id: string;
      userId?: string | null;
      name?: string | null;
      personalityTest?: string | null;
      background?: string | null;
      phone?: string | null;
      optInText?: boolean | null;
      completedIcebreakers?: boolean | null;
      userSummary?: string | null;
      owner?: string | null;
      createdAt: string;
      updatedAt: string;
      _version: number;
      _deleted?: boolean | null;
      _lastChangedAt: number;
    } | null>;
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type SyncUserProfilesQueryVariables = {
  filter?: ModelUserProfileFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  lastSync?: number | null;
};

export type SyncUserProfilesQuery = {
  syncUserProfiles?: {
    __typename: 'ModelUserProfileConnection';
    items: Array<{
      __typename: 'UserProfile';
      id: string;
      userId?: string | null;
      name?: string | null;
      personalityTest?: string | null;
      background?: string | null;
      phone?: string | null;
      optInText?: boolean | null;
      completedIcebreakers?: boolean | null;
      userSummary?: string | null;
      owner?: string | null;
      createdAt: string;
      updatedAt: string;
      _version: number;
      _deleted?: boolean | null;
      _lastChangedAt: number;
    } | null>;
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type GetIcebreakerChatQueryVariables = {
  id: string;
};

export type GetIcebreakerChatQuery = {
  getIcebreakerChat?: {
    __typename: 'IcebreakerChat';
    id: string;
    messages?: Array<{
      __typename: 'MessagesType';
      role?: OpenAIRoleType | null;
      content?: string | null;
    } | null> | null;
    user?: string | null;
    owner?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type ListIcebreakerChatsQueryVariables = {
  filter?: ModelIcebreakerChatFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListIcebreakerChatsQuery = {
  listIcebreakerChats?: {
    __typename: 'ModelIcebreakerChatConnection';
    items: Array<{
      __typename: 'IcebreakerChat';
      id: string;
      messages?: Array<{
        __typename: 'MessagesType';
        role?: OpenAIRoleType | null;
        content?: string | null;
      } | null> | null;
      user?: string | null;
      owner?: string | null;
      createdAt: string;
      updatedAt: string;
      _version: number;
      _deleted?: boolean | null;
      _lastChangedAt: number;
    } | null>;
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type SyncIcebreakerChatsQueryVariables = {
  filter?: ModelIcebreakerChatFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  lastSync?: number | null;
};

export type SyncIcebreakerChatsQuery = {
  syncIcebreakerChats?: {
    __typename: 'ModelIcebreakerChatConnection';
    items: Array<{
      __typename: 'IcebreakerChat';
      id: string;
      messages?: Array<{
        __typename: 'MessagesType';
        role?: OpenAIRoleType | null;
        content?: string | null;
      } | null> | null;
      user?: string | null;
      owner?: string | null;
      createdAt: string;
      updatedAt: string;
      _version: number;
      _deleted?: boolean | null;
      _lastChangedAt: number;
    } | null>;
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type GetRoleplayChatQueryVariables = {
  id: string;
};

export type GetRoleplayChatQuery = {
  getRoleplayChat?: {
    __typename: 'RoleplayChat';
    id: string;
    messages?: Array<{
      __typename: 'MessagesType';
      role?: OpenAIRoleType | null;
      content?: string | null;
    } | null> | null;
    user?: string | null;
    roleplayId?: string | null;
    scenario?: string | null;
    difficulty?: string | null;
    scenarioPrompt?: string | null;
    owner?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type ListRoleplayChatsQueryVariables = {
  filter?: ModelRoleplayChatFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListRoleplayChatsQuery = {
  listRoleplayChats?: {
    __typename: 'ModelRoleplayChatConnection';
    items: Array<{
      __typename: 'RoleplayChat';
      id: string;
      messages?: Array<{
        __typename: 'MessagesType';
        role?: OpenAIRoleType | null;
        content?: string | null;
      } | null> | null;
      user?: string | null;
      roleplayId?: string | null;
      scenario?: string | null;
      difficulty?: string | null;
      scenarioPrompt?: string | null;
      owner?: string | null;
      createdAt: string;
      updatedAt: string;
      _version: number;
      _deleted?: boolean | null;
      _lastChangedAt: number;
    } | null>;
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type SyncRoleplayChatsQueryVariables = {
  filter?: ModelRoleplayChatFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  lastSync?: number | null;
};

export type SyncRoleplayChatsQuery = {
  syncRoleplayChats?: {
    __typename: 'ModelRoleplayChatConnection';
    items: Array<{
      __typename: 'RoleplayChat';
      id: string;
      messages?: Array<{
        __typename: 'MessagesType';
        role?: OpenAIRoleType | null;
        content?: string | null;
      } | null> | null;
      user?: string | null;
      roleplayId?: string | null;
      scenario?: string | null;
      difficulty?: string | null;
      scenarioPrompt?: string | null;
      owner?: string | null;
      createdAt: string;
      updatedAt: string;
      _version: number;
      _deleted?: boolean | null;
      _lastChangedAt: number;
    } | null>;
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type GetRoleplaySummaryQueryVariables = {
  id: string;
};

export type GetRoleplaySummaryQuery = {
  getRoleplaySummary?: {
    __typename: 'RoleplaySummary';
    id: string;
    summary?: string | null;
    user?: string | null;
    roleplayId?: string | null;
    scenario?: string | null;
    difficulty?: string | null;
    scenarioPrompt?: string | null;
    owner?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type ListRoleplaySummariesQueryVariables = {
  filter?: ModelRoleplaySummaryFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListRoleplaySummariesQuery = {
  listRoleplaySummaries?: {
    __typename: 'ModelRoleplaySummaryConnection';
    items: Array<{
      __typename: 'RoleplaySummary';
      id: string;
      summary?: string | null;
      user?: string | null;
      roleplayId?: string | null;
      scenario?: string | null;
      difficulty?: string | null;
      scenarioPrompt?: string | null;
      owner?: string | null;
      createdAt: string;
      updatedAt: string;
      _version: number;
      _deleted?: boolean | null;
      _lastChangedAt: number;
    } | null>;
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type SyncRoleplaySummariesQueryVariables = {
  filter?: ModelRoleplaySummaryFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  lastSync?: number | null;
};

export type SyncRoleplaySummariesQuery = {
  syncRoleplaySummaries?: {
    __typename: 'ModelRoleplaySummaryConnection';
    items: Array<{
      __typename: 'RoleplaySummary';
      id: string;
      summary?: string | null;
      user?: string | null;
      roleplayId?: string | null;
      scenario?: string | null;
      difficulty?: string | null;
      scenarioPrompt?: string | null;
      owner?: string | null;
      createdAt: string;
      updatedAt: string;
      _version: number;
      _deleted?: boolean | null;
      _lastChangedAt: number;
    } | null>;
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type OnCreateOpenAIChatSubscriptionVariables = {
  filter?: ModelSubscriptionOpenAIChatFilterInput | null;
  owner?: string | null;
};

export type OnCreateOpenAIChatSubscription = {
  onCreateOpenAIChat?: {
    __typename: 'OpenAIChat';
    id: string;
    messages?: Array<{
      __typename: 'MessagesType';
      role?: OpenAIRoleType | null;
      content?: string | null;
    } | null> | null;
    user?: string | null;
    owner?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type OnUpdateOpenAIChatSubscriptionVariables = {
  filter?: ModelSubscriptionOpenAIChatFilterInput | null;
  owner?: string | null;
};

export type OnUpdateOpenAIChatSubscription = {
  onUpdateOpenAIChat?: {
    __typename: 'OpenAIChat';
    id: string;
    messages?: Array<{
      __typename: 'MessagesType';
      role?: OpenAIRoleType | null;
      content?: string | null;
    } | null> | null;
    user?: string | null;
    owner?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type OnDeleteOpenAIChatSubscriptionVariables = {
  filter?: ModelSubscriptionOpenAIChatFilterInput | null;
  owner?: string | null;
};

export type OnDeleteOpenAIChatSubscription = {
  onDeleteOpenAIChat?: {
    __typename: 'OpenAIChat';
    id: string;
    messages?: Array<{
      __typename: 'MessagesType';
      role?: OpenAIRoleType | null;
      content?: string | null;
    } | null> | null;
    user?: string | null;
    owner?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type OnCreateOpenAIModelSubscriptionVariables = {
  filter?: ModelSubscriptionOpenAIModelFilterInput | null;
};

export type OnCreateOpenAIModelSubscription = {
  onCreateOpenAIModel?: {
    __typename: 'OpenAIModel';
    id: string;
    prompt: string;
    model: string;
    temperature: string;
    top_p: string;
    max_tokens: string;
    presence_penalty: string;
    frequency_penalty: string;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type OnUpdateOpenAIModelSubscriptionVariables = {
  filter?: ModelSubscriptionOpenAIModelFilterInput | null;
};

export type OnUpdateOpenAIModelSubscription = {
  onUpdateOpenAIModel?: {
    __typename: 'OpenAIModel';
    id: string;
    prompt: string;
    model: string;
    temperature: string;
    top_p: string;
    max_tokens: string;
    presence_penalty: string;
    frequency_penalty: string;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type OnDeleteOpenAIModelSubscriptionVariables = {
  filter?: ModelSubscriptionOpenAIModelFilterInput | null;
};

export type OnDeleteOpenAIModelSubscription = {
  onDeleteOpenAIModel?: {
    __typename: 'OpenAIModel';
    id: string;
    prompt: string;
    model: string;
    temperature: string;
    top_p: string;
    max_tokens: string;
    presence_penalty: string;
    frequency_penalty: string;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type OnCreateFeedbackSubscriptionVariables = {
  filter?: ModelSubscriptionFeedbackFilterInput | null;
};

export type OnCreateFeedbackSubscription = {
  onCreateFeedback?: {
    __typename: 'Feedback';
    id: string;
    like?: boolean | null;
    comment?: string | null;
    owner?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type OnUpdateFeedbackSubscriptionVariables = {
  filter?: ModelSubscriptionFeedbackFilterInput | null;
};

export type OnUpdateFeedbackSubscription = {
  onUpdateFeedback?: {
    __typename: 'Feedback';
    id: string;
    like?: boolean | null;
    comment?: string | null;
    owner?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type OnDeleteFeedbackSubscriptionVariables = {
  filter?: ModelSubscriptionFeedbackFilterInput | null;
};

export type OnDeleteFeedbackSubscription = {
  onDeleteFeedback?: {
    __typename: 'Feedback';
    id: string;
    like?: boolean | null;
    comment?: string | null;
    owner?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type OnCreateUserProfileSubscriptionVariables = {
  filter?: ModelSubscriptionUserProfileFilterInput | null;
  owner?: string | null;
};

export type OnCreateUserProfileSubscription = {
  onCreateUserProfile?: {
    __typename: 'UserProfile';
    id: string;
    userId?: string | null;
    name?: string | null;
    personalityTest?: string | null;
    background?: string | null;
    phone?: string | null;
    optInText?: boolean | null;
    completedIcebreakers?: boolean | null;
    userSummary?: string | null;
    owner?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type OnUpdateUserProfileSubscriptionVariables = {
  filter?: ModelSubscriptionUserProfileFilterInput | null;
  owner?: string | null;
};

export type OnUpdateUserProfileSubscription = {
  onUpdateUserProfile?: {
    __typename: 'UserProfile';
    id: string;
    userId?: string | null;
    name?: string | null;
    personalityTest?: string | null;
    background?: string | null;
    phone?: string | null;
    optInText?: boolean | null;
    completedIcebreakers?: boolean | null;
    userSummary?: string | null;
    owner?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type OnDeleteUserProfileSubscriptionVariables = {
  filter?: ModelSubscriptionUserProfileFilterInput | null;
  owner?: string | null;
};

export type OnDeleteUserProfileSubscription = {
  onDeleteUserProfile?: {
    __typename: 'UserProfile';
    id: string;
    userId?: string | null;
    name?: string | null;
    personalityTest?: string | null;
    background?: string | null;
    phone?: string | null;
    optInText?: boolean | null;
    completedIcebreakers?: boolean | null;
    userSummary?: string | null;
    owner?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type OnCreateIcebreakerChatSubscriptionVariables = {
  filter?: ModelSubscriptionIcebreakerChatFilterInput | null;
  owner?: string | null;
};

export type OnCreateIcebreakerChatSubscription = {
  onCreateIcebreakerChat?: {
    __typename: 'IcebreakerChat';
    id: string;
    messages?: Array<{
      __typename: 'MessagesType';
      role?: OpenAIRoleType | null;
      content?: string | null;
    } | null> | null;
    user?: string | null;
    owner?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type OnUpdateIcebreakerChatSubscriptionVariables = {
  filter?: ModelSubscriptionIcebreakerChatFilterInput | null;
  owner?: string | null;
};

export type OnUpdateIcebreakerChatSubscription = {
  onUpdateIcebreakerChat?: {
    __typename: 'IcebreakerChat';
    id: string;
    messages?: Array<{
      __typename: 'MessagesType';
      role?: OpenAIRoleType | null;
      content?: string | null;
    } | null> | null;
    user?: string | null;
    owner?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type OnDeleteIcebreakerChatSubscriptionVariables = {
  filter?: ModelSubscriptionIcebreakerChatFilterInput | null;
  owner?: string | null;
};

export type OnDeleteIcebreakerChatSubscription = {
  onDeleteIcebreakerChat?: {
    __typename: 'IcebreakerChat';
    id: string;
    messages?: Array<{
      __typename: 'MessagesType';
      role?: OpenAIRoleType | null;
      content?: string | null;
    } | null> | null;
    user?: string | null;
    owner?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type OnCreateRoleplayChatSubscriptionVariables = {
  filter?: ModelSubscriptionRoleplayChatFilterInput | null;
  owner?: string | null;
};

export type OnCreateRoleplayChatSubscription = {
  onCreateRoleplayChat?: {
    __typename: 'RoleplayChat';
    id: string;
    messages?: Array<{
      __typename: 'MessagesType';
      role?: OpenAIRoleType | null;
      content?: string | null;
    } | null> | null;
    user?: string | null;
    roleplayId?: string | null;
    scenario?: string | null;
    difficulty?: string | null;
    scenarioPrompt?: string | null;
    owner?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type OnUpdateRoleplayChatSubscriptionVariables = {
  filter?: ModelSubscriptionRoleplayChatFilterInput | null;
  owner?: string | null;
};

export type OnUpdateRoleplayChatSubscription = {
  onUpdateRoleplayChat?: {
    __typename: 'RoleplayChat';
    id: string;
    messages?: Array<{
      __typename: 'MessagesType';
      role?: OpenAIRoleType | null;
      content?: string | null;
    } | null> | null;
    user?: string | null;
    roleplayId?: string | null;
    scenario?: string | null;
    difficulty?: string | null;
    scenarioPrompt?: string | null;
    owner?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type OnDeleteRoleplayChatSubscriptionVariables = {
  filter?: ModelSubscriptionRoleplayChatFilterInput | null;
  owner?: string | null;
};

export type OnDeleteRoleplayChatSubscription = {
  onDeleteRoleplayChat?: {
    __typename: 'RoleplayChat';
    id: string;
    messages?: Array<{
      __typename: 'MessagesType';
      role?: OpenAIRoleType | null;
      content?: string | null;
    } | null> | null;
    user?: string | null;
    roleplayId?: string | null;
    scenario?: string | null;
    difficulty?: string | null;
    scenarioPrompt?: string | null;
    owner?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type OnCreateRoleplaySummarySubscriptionVariables = {
  filter?: ModelSubscriptionRoleplaySummaryFilterInput | null;
  owner?: string | null;
};

export type OnCreateRoleplaySummarySubscription = {
  onCreateRoleplaySummary?: {
    __typename: 'RoleplaySummary';
    id: string;
    summary?: string | null;
    user?: string | null;
    roleplayId?: string | null;
    scenario?: string | null;
    difficulty?: string | null;
    scenarioPrompt?: string | null;
    owner?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type OnUpdateRoleplaySummarySubscriptionVariables = {
  filter?: ModelSubscriptionRoleplaySummaryFilterInput | null;
  owner?: string | null;
};

export type OnUpdateRoleplaySummarySubscription = {
  onUpdateRoleplaySummary?: {
    __typename: 'RoleplaySummary';
    id: string;
    summary?: string | null;
    user?: string | null;
    roleplayId?: string | null;
    scenario?: string | null;
    difficulty?: string | null;
    scenarioPrompt?: string | null;
    owner?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type OnDeleteRoleplaySummarySubscriptionVariables = {
  filter?: ModelSubscriptionRoleplaySummaryFilterInput | null;
  owner?: string | null;
};

export type OnDeleteRoleplaySummarySubscription = {
  onDeleteRoleplaySummary?: {
    __typename: 'RoleplaySummary';
    id: string;
    summary?: string | null;
    user?: string | null;
    roleplayId?: string | null;
    scenario?: string | null;
    difficulty?: string | null;
    scenarioPrompt?: string | null;
    owner?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};
