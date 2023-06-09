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
