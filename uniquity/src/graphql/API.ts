/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateOpenAIChatInput = {
  id?: string | null,
  messages?: Array< MessagesTypeInput | null > | null,
  user?: string | null,
  owner?: string | null,
  _version?: number | null,
};

export type MessagesTypeInput = {
  role?: OpenAIRoleType | null,
  content?: string | null,
};

export enum OpenAIRoleType {
  SYSTEM = "SYSTEM",
  ASSISTANT = "ASSISTANT",
  USER = "USER",
}


export type ModelOpenAIChatConditionInput = {
  user?: ModelIDInput | null,
  owner?: ModelStringInput | null,
  and?: Array< ModelOpenAIChatConditionInput | null > | null,
  or?: Array< ModelOpenAIChatConditionInput | null > | null,
  not?: ModelOpenAIChatConditionInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type OpenAIChat = {
  __typename: "OpenAIChat",
  id: string,
  messages?:  Array<MessagesType | null > | null,
  user?: string | null,
  owner?: string | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type MessagesType = {
  __typename: "MessagesType",
  role?: OpenAIRoleType | null,
  content?: string | null,
};

export type UpdateOpenAIChatInput = {
  id: string,
  messages?: Array< MessagesTypeInput | null > | null,
  user?: string | null,
  owner?: string | null,
  _version?: number | null,
};

export type DeleteOpenAIChatInput = {
  id: string,
  _version?: number | null,
};

export type CreateOpenAIModelInput = {
  id?: string | null,
  prompt: string,
  model: string,
  temperature: string,
  top_p: string,
  max_tokens: string,
  presence_penalty: string,
  frequency_penalty: string,
  _version?: number | null,
};

export type ModelOpenAIModelConditionInput = {
  prompt?: ModelStringInput | null,
  model?: ModelStringInput | null,
  temperature?: ModelStringInput | null,
  top_p?: ModelStringInput | null,
  max_tokens?: ModelStringInput | null,
  presence_penalty?: ModelStringInput | null,
  frequency_penalty?: ModelStringInput | null,
  and?: Array< ModelOpenAIModelConditionInput | null > | null,
  or?: Array< ModelOpenAIModelConditionInput | null > | null,
  not?: ModelOpenAIModelConditionInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type OpenAIModel = {
  __typename: "OpenAIModel",
  id: string,
  prompt: string,
  model: string,
  temperature: string,
  top_p: string,
  max_tokens: string,
  presence_penalty: string,
  frequency_penalty: string,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdateOpenAIModelInput = {
  id: string,
  prompt?: string | null,
  model?: string | null,
  temperature?: string | null,
  top_p?: string | null,
  max_tokens?: string | null,
  presence_penalty?: string | null,
  frequency_penalty?: string | null,
  _version?: number | null,
};

export type DeleteOpenAIModelInput = {
  id: string,
  _version?: number | null,
};

export type CreateFeedbackInput = {
  id?: string | null,
  like?: boolean | null,
  comment?: string | null,
  owner?: string | null,
  _version?: number | null,
};

export type ModelFeedbackConditionInput = {
  like?: ModelBooleanInput | null,
  comment?: ModelStringInput | null,
  owner?: ModelStringInput | null,
  and?: Array< ModelFeedbackConditionInput | null > | null,
  or?: Array< ModelFeedbackConditionInput | null > | null,
  not?: ModelFeedbackConditionInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type Feedback = {
  __typename: "Feedback",
  id: string,
  like?: boolean | null,
  comment?: string | null,
  owner?: string | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdateFeedbackInput = {
  id: string,
  like?: boolean | null,
  comment?: string | null,
  owner?: string | null,
  _version?: number | null,
};

export type DeleteFeedbackInput = {
  id: string,
  _version?: number | null,
};

export type CreateUserSpecificPromptInput = {
  id?: string | null,
  userId?: string | null,
  prompt?: string | null,
  lastChatId?: string | null,
  _version?: number | null,
};

export type ModelUserSpecificPromptConditionInput = {
  userId?: ModelStringInput | null,
  prompt?: ModelStringInput | null,
  lastChatId?: ModelStringInput | null,
  and?: Array< ModelUserSpecificPromptConditionInput | null > | null,
  or?: Array< ModelUserSpecificPromptConditionInput | null > | null,
  not?: ModelUserSpecificPromptConditionInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type UserSpecificPrompt = {
  __typename: "UserSpecificPrompt",
  id: string,
  userId?: string | null,
  prompt?: string | null,
  lastChatId?: string | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdateUserSpecificPromptInput = {
  id: string,
  userId?: string | null,
  prompt?: string | null,
  lastChatId?: string | null,
  _version?: number | null,
};

export type DeleteUserSpecificPromptInput = {
  id: string,
  _version?: number | null,
};

export type CreateOpenAIChatFuncInput = {
  id?: string | null,
  messages?: Array< MessagesTypeFuncInput | null > | null,
  user?: string | null,
  owner?: string | null,
  _version?: number | null,
};

export type MessagesTypeFuncInput = {
  role?: OpenAIRoleType | null,
  content?: string | null,
};

export type ModelOpenAIChatFilterInput = {
  id?: ModelIDInput | null,
  user?: ModelIDInput | null,
  owner?: ModelStringInput | null,
  and?: Array< ModelOpenAIChatFilterInput | null > | null,
  or?: Array< ModelOpenAIChatFilterInput | null > | null,
  not?: ModelOpenAIChatFilterInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelOpenAIChatConnection = {
  __typename: "ModelOpenAIChatConnection",
  items:  Array<OpenAIChat | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelOpenAIModelFilterInput = {
  id?: ModelIDInput | null,
  prompt?: ModelStringInput | null,
  model?: ModelStringInput | null,
  temperature?: ModelStringInput | null,
  top_p?: ModelStringInput | null,
  max_tokens?: ModelStringInput | null,
  presence_penalty?: ModelStringInput | null,
  frequency_penalty?: ModelStringInput | null,
  and?: Array< ModelOpenAIModelFilterInput | null > | null,
  or?: Array< ModelOpenAIModelFilterInput | null > | null,
  not?: ModelOpenAIModelFilterInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelOpenAIModelConnection = {
  __typename: "ModelOpenAIModelConnection",
  items:  Array<OpenAIModel | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelFeedbackFilterInput = {
  id?: ModelIDInput | null,
  like?: ModelBooleanInput | null,
  comment?: ModelStringInput | null,
  owner?: ModelStringInput | null,
  and?: Array< ModelFeedbackFilterInput | null > | null,
  or?: Array< ModelFeedbackFilterInput | null > | null,
  not?: ModelFeedbackFilterInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelFeedbackConnection = {
  __typename: "ModelFeedbackConnection",
  items:  Array<Feedback | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelUserSpecificPromptFilterInput = {
  id?: ModelIDInput | null,
  userId?: ModelStringInput | null,
  prompt?: ModelStringInput | null,
  lastChatId?: ModelStringInput | null,
  and?: Array< ModelUserSpecificPromptFilterInput | null > | null,
  or?: Array< ModelUserSpecificPromptFilterInput | null > | null,
  not?: ModelUserSpecificPromptFilterInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelUserSpecificPromptConnection = {
  __typename: "ModelUserSpecificPromptConnection",
  items:  Array<UserSpecificPrompt | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelSubscriptionOpenAIChatFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  user?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionOpenAIChatFilterInput | null > | null,
  or?: Array< ModelSubscriptionOpenAIChatFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionOpenAIModelFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  prompt?: ModelSubscriptionStringInput | null,
  model?: ModelSubscriptionStringInput | null,
  temperature?: ModelSubscriptionStringInput | null,
  top_p?: ModelSubscriptionStringInput | null,
  max_tokens?: ModelSubscriptionStringInput | null,
  presence_penalty?: ModelSubscriptionStringInput | null,
  frequency_penalty?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionOpenAIModelFilterInput | null > | null,
  or?: Array< ModelSubscriptionOpenAIModelFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionFeedbackFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  like?: ModelSubscriptionBooleanInput | null,
  comment?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionFeedbackFilterInput | null > | null,
  or?: Array< ModelSubscriptionFeedbackFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type ModelSubscriptionUserSpecificPromptFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  userId?: ModelSubscriptionStringInput | null,
  prompt?: ModelSubscriptionStringInput | null,
  lastChatId?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserSpecificPromptFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserSpecificPromptFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
};

export type CreateOpenAIChatMutationVariables = {
  input: CreateOpenAIChatInput,
  condition?: ModelOpenAIChatConditionInput | null,
};

export type CreateOpenAIChatMutation = {
  createOpenAIChat?:  {
    __typename: "OpenAIChat",
    id: string,
    messages?:  Array< {
      __typename: "MessagesType",
      role?: OpenAIRoleType | null,
      content?: string | null,
    } | null > | null,
    user?: string | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateOpenAIChatMutationVariables = {
  input: UpdateOpenAIChatInput,
  condition?: ModelOpenAIChatConditionInput | null,
};

export type UpdateOpenAIChatMutation = {
  updateOpenAIChat?:  {
    __typename: "OpenAIChat",
    id: string,
    messages?:  Array< {
      __typename: "MessagesType",
      role?: OpenAIRoleType | null,
      content?: string | null,
    } | null > | null,
    user?: string | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteOpenAIChatMutationVariables = {
  input: DeleteOpenAIChatInput,
  condition?: ModelOpenAIChatConditionInput | null,
};

export type DeleteOpenAIChatMutation = {
  deleteOpenAIChat?:  {
    __typename: "OpenAIChat",
    id: string,
    messages?:  Array< {
      __typename: "MessagesType",
      role?: OpenAIRoleType | null,
      content?: string | null,
    } | null > | null,
    user?: string | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateOpenAIModelMutationVariables = {
  input: CreateOpenAIModelInput,
  condition?: ModelOpenAIModelConditionInput | null,
};

export type CreateOpenAIModelMutation = {
  createOpenAIModel?:  {
    __typename: "OpenAIModel",
    id: string,
    prompt: string,
    model: string,
    temperature: string,
    top_p: string,
    max_tokens: string,
    presence_penalty: string,
    frequency_penalty: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateOpenAIModelMutationVariables = {
  input: UpdateOpenAIModelInput,
  condition?: ModelOpenAIModelConditionInput | null,
};

export type UpdateOpenAIModelMutation = {
  updateOpenAIModel?:  {
    __typename: "OpenAIModel",
    id: string,
    prompt: string,
    model: string,
    temperature: string,
    top_p: string,
    max_tokens: string,
    presence_penalty: string,
    frequency_penalty: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteOpenAIModelMutationVariables = {
  input: DeleteOpenAIModelInput,
  condition?: ModelOpenAIModelConditionInput | null,
};

export type DeleteOpenAIModelMutation = {
  deleteOpenAIModel?:  {
    __typename: "OpenAIModel",
    id: string,
    prompt: string,
    model: string,
    temperature: string,
    top_p: string,
    max_tokens: string,
    presence_penalty: string,
    frequency_penalty: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateFeedbackMutationVariables = {
  input: CreateFeedbackInput,
  condition?: ModelFeedbackConditionInput | null,
};

export type CreateFeedbackMutation = {
  createFeedback?:  {
    __typename: "Feedback",
    id: string,
    like?: boolean | null,
    comment?: string | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateFeedbackMutationVariables = {
  input: UpdateFeedbackInput,
  condition?: ModelFeedbackConditionInput | null,
};

export type UpdateFeedbackMutation = {
  updateFeedback?:  {
    __typename: "Feedback",
    id: string,
    like?: boolean | null,
    comment?: string | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteFeedbackMutationVariables = {
  input: DeleteFeedbackInput,
  condition?: ModelFeedbackConditionInput | null,
};

export type DeleteFeedbackMutation = {
  deleteFeedback?:  {
    __typename: "Feedback",
    id: string,
    like?: boolean | null,
    comment?: string | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateUserSpecificPromptMutationVariables = {
  input: CreateUserSpecificPromptInput,
  condition?: ModelUserSpecificPromptConditionInput | null,
};

export type CreateUserSpecificPromptMutation = {
  createUserSpecificPrompt?:  {
    __typename: "UserSpecificPrompt",
    id: string,
    userId?: string | null,
    prompt?: string | null,
    lastChatId?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateUserSpecificPromptMutationVariables = {
  input: UpdateUserSpecificPromptInput,
  condition?: ModelUserSpecificPromptConditionInput | null,
};

export type UpdateUserSpecificPromptMutation = {
  updateUserSpecificPrompt?:  {
    __typename: "UserSpecificPrompt",
    id: string,
    userId?: string | null,
    prompt?: string | null,
    lastChatId?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteUserSpecificPromptMutationVariables = {
  input: DeleteUserSpecificPromptInput,
  condition?: ModelUserSpecificPromptConditionInput | null,
};

export type DeleteUserSpecificPromptMutation = {
  deleteUserSpecificPrompt?:  {
    __typename: "UserSpecificPrompt",
    id: string,
    userId?: string | null,
    prompt?: string | null,
    lastChatId?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateOpenAIChatFuncMutationVariables = {
  input?: CreateOpenAIChatFuncInput | null,
};

export type CreateOpenAIChatFuncMutation = {
  createOpenAIChatFunc?:  {
    __typename: "OpenAIChat",
    id: string,
    messages?:  Array< {
      __typename: "MessagesType",
      role?: OpenAIRoleType | null,
      content?: string | null,
    } | null > | null,
    user?: string | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type GetOpenAIChatQueryVariables = {
  id: string,
};

export type GetOpenAIChatQuery = {
  getOpenAIChat?:  {
    __typename: "OpenAIChat",
    id: string,
    messages?:  Array< {
      __typename: "MessagesType",
      role?: OpenAIRoleType | null,
      content?: string | null,
    } | null > | null,
    user?: string | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListOpenAIChatsQueryVariables = {
  filter?: ModelOpenAIChatFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListOpenAIChatsQuery = {
  listOpenAIChats?:  {
    __typename: "ModelOpenAIChatConnection",
    items:  Array< {
      __typename: "OpenAIChat",
      id: string,
      messages?:  Array< {
        __typename: "MessagesType",
        role?: OpenAIRoleType | null,
        content?: string | null,
      } | null > | null,
      user?: string | null,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncOpenAIChatsQueryVariables = {
  filter?: ModelOpenAIChatFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncOpenAIChatsQuery = {
  syncOpenAIChats?:  {
    __typename: "ModelOpenAIChatConnection",
    items:  Array< {
      __typename: "OpenAIChat",
      id: string,
      messages?:  Array< {
        __typename: "MessagesType",
        role?: OpenAIRoleType | null,
        content?: string | null,
      } | null > | null,
      user?: string | null,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetOpenAIModelQueryVariables = {
  id: string,
};

export type GetOpenAIModelQuery = {
  getOpenAIModel?:  {
    __typename: "OpenAIModel",
    id: string,
    prompt: string,
    model: string,
    temperature: string,
    top_p: string,
    max_tokens: string,
    presence_penalty: string,
    frequency_penalty: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListOpenAIModelsQueryVariables = {
  filter?: ModelOpenAIModelFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListOpenAIModelsQuery = {
  listOpenAIModels?:  {
    __typename: "ModelOpenAIModelConnection",
    items:  Array< {
      __typename: "OpenAIModel",
      id: string,
      prompt: string,
      model: string,
      temperature: string,
      top_p: string,
      max_tokens: string,
      presence_penalty: string,
      frequency_penalty: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncOpenAIModelsQueryVariables = {
  filter?: ModelOpenAIModelFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncOpenAIModelsQuery = {
  syncOpenAIModels?:  {
    __typename: "ModelOpenAIModelConnection",
    items:  Array< {
      __typename: "OpenAIModel",
      id: string,
      prompt: string,
      model: string,
      temperature: string,
      top_p: string,
      max_tokens: string,
      presence_penalty: string,
      frequency_penalty: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetFeedbackQueryVariables = {
  id: string,
};

export type GetFeedbackQuery = {
  getFeedback?:  {
    __typename: "Feedback",
    id: string,
    like?: boolean | null,
    comment?: string | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListFeedbacksQueryVariables = {
  filter?: ModelFeedbackFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListFeedbacksQuery = {
  listFeedbacks?:  {
    __typename: "ModelFeedbackConnection",
    items:  Array< {
      __typename: "Feedback",
      id: string,
      like?: boolean | null,
      comment?: string | null,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncFeedbacksQueryVariables = {
  filter?: ModelFeedbackFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncFeedbacksQuery = {
  syncFeedbacks?:  {
    __typename: "ModelFeedbackConnection",
    items:  Array< {
      __typename: "Feedback",
      id: string,
      like?: boolean | null,
      comment?: string | null,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetUserSpecificPromptQueryVariables = {
  id: string,
};

export type GetUserSpecificPromptQuery = {
  getUserSpecificPrompt?:  {
    __typename: "UserSpecificPrompt",
    id: string,
    userId?: string | null,
    prompt?: string | null,
    lastChatId?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListUserSpecificPromptsQueryVariables = {
  filter?: ModelUserSpecificPromptFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUserSpecificPromptsQuery = {
  listUserSpecificPrompts?:  {
    __typename: "ModelUserSpecificPromptConnection",
    items:  Array< {
      __typename: "UserSpecificPrompt",
      id: string,
      userId?: string | null,
      prompt?: string | null,
      lastChatId?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncUserSpecificPromptsQueryVariables = {
  filter?: ModelUserSpecificPromptFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncUserSpecificPromptsQuery = {
  syncUserSpecificPrompts?:  {
    __typename: "ModelUserSpecificPromptConnection",
    items:  Array< {
      __typename: "UserSpecificPrompt",
      id: string,
      userId?: string | null,
      prompt?: string | null,
      lastChatId?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type OnCreateOpenAIChatSubscriptionVariables = {
  filter?: ModelSubscriptionOpenAIChatFilterInput | null,
  owner?: string | null,
};

export type OnCreateOpenAIChatSubscription = {
  onCreateOpenAIChat?:  {
    __typename: "OpenAIChat",
    id: string,
    messages?:  Array< {
      __typename: "MessagesType",
      role?: OpenAIRoleType | null,
      content?: string | null,
    } | null > | null,
    user?: string | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateOpenAIChatSubscriptionVariables = {
  filter?: ModelSubscriptionOpenAIChatFilterInput | null,
  owner?: string | null,
};

export type OnUpdateOpenAIChatSubscription = {
  onUpdateOpenAIChat?:  {
    __typename: "OpenAIChat",
    id: string,
    messages?:  Array< {
      __typename: "MessagesType",
      role?: OpenAIRoleType | null,
      content?: string | null,
    } | null > | null,
    user?: string | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteOpenAIChatSubscriptionVariables = {
  filter?: ModelSubscriptionOpenAIChatFilterInput | null,
  owner?: string | null,
};

export type OnDeleteOpenAIChatSubscription = {
  onDeleteOpenAIChat?:  {
    __typename: "OpenAIChat",
    id: string,
    messages?:  Array< {
      __typename: "MessagesType",
      role?: OpenAIRoleType | null,
      content?: string | null,
    } | null > | null,
    user?: string | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateOpenAIModelSubscriptionVariables = {
  filter?: ModelSubscriptionOpenAIModelFilterInput | null,
};

export type OnCreateOpenAIModelSubscription = {
  onCreateOpenAIModel?:  {
    __typename: "OpenAIModel",
    id: string,
    prompt: string,
    model: string,
    temperature: string,
    top_p: string,
    max_tokens: string,
    presence_penalty: string,
    frequency_penalty: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateOpenAIModelSubscriptionVariables = {
  filter?: ModelSubscriptionOpenAIModelFilterInput | null,
};

export type OnUpdateOpenAIModelSubscription = {
  onUpdateOpenAIModel?:  {
    __typename: "OpenAIModel",
    id: string,
    prompt: string,
    model: string,
    temperature: string,
    top_p: string,
    max_tokens: string,
    presence_penalty: string,
    frequency_penalty: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteOpenAIModelSubscriptionVariables = {
  filter?: ModelSubscriptionOpenAIModelFilterInput | null,
};

export type OnDeleteOpenAIModelSubscription = {
  onDeleteOpenAIModel?:  {
    __typename: "OpenAIModel",
    id: string,
    prompt: string,
    model: string,
    temperature: string,
    top_p: string,
    max_tokens: string,
    presence_penalty: string,
    frequency_penalty: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateFeedbackSubscriptionVariables = {
  filter?: ModelSubscriptionFeedbackFilterInput | null,
};

export type OnCreateFeedbackSubscription = {
  onCreateFeedback?:  {
    __typename: "Feedback",
    id: string,
    like?: boolean | null,
    comment?: string | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateFeedbackSubscriptionVariables = {
  filter?: ModelSubscriptionFeedbackFilterInput | null,
};

export type OnUpdateFeedbackSubscription = {
  onUpdateFeedback?:  {
    __typename: "Feedback",
    id: string,
    like?: boolean | null,
    comment?: string | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteFeedbackSubscriptionVariables = {
  filter?: ModelSubscriptionFeedbackFilterInput | null,
};

export type OnDeleteFeedbackSubscription = {
  onDeleteFeedback?:  {
    __typename: "Feedback",
    id: string,
    like?: boolean | null,
    comment?: string | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateUserSpecificPromptSubscriptionVariables = {
  filter?: ModelSubscriptionUserSpecificPromptFilterInput | null,
};

export type OnCreateUserSpecificPromptSubscription = {
  onCreateUserSpecificPrompt?:  {
    __typename: "UserSpecificPrompt",
    id: string,
    userId?: string | null,
    prompt?: string | null,
    lastChatId?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateUserSpecificPromptSubscriptionVariables = {
  filter?: ModelSubscriptionUserSpecificPromptFilterInput | null,
};

export type OnUpdateUserSpecificPromptSubscription = {
  onUpdateUserSpecificPrompt?:  {
    __typename: "UserSpecificPrompt",
    id: string,
    userId?: string | null,
    prompt?: string | null,
    lastChatId?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteUserSpecificPromptSubscriptionVariables = {
  filter?: ModelSubscriptionUserSpecificPromptFilterInput | null,
};

export type OnDeleteUserSpecificPromptSubscription = {
  onDeleteUserSpecificPrompt?:  {
    __typename: "UserSpecificPrompt",
    id: string,
    userId?: string | null,
    prompt?: string | null,
    lastChatId?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};
