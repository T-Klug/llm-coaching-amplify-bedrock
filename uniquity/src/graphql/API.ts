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

export type CreateSystemPromptInput = {
  id?: string | null,
  prompt: string,
  type?: PromptType | null,
  _version?: number | null,
};

export enum PromptType {
  SYSTEM = "SYSTEM",
}


export type ModelSystemPromptConditionInput = {
  prompt?: ModelStringInput | null,
  type?: ModelPromptTypeInput | null,
  and?: Array< ModelSystemPromptConditionInput | null > | null,
  or?: Array< ModelSystemPromptConditionInput | null > | null,
  not?: ModelSystemPromptConditionInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelPromptTypeInput = {
  eq?: PromptType | null,
  ne?: PromptType | null,
};

export type SystemPrompt = {
  __typename: "SystemPrompt",
  id: string,
  prompt: string,
  type?: PromptType | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdateSystemPromptInput = {
  id: string,
  prompt?: string | null,
  type?: PromptType | null,
  _version?: number | null,
};

export type DeleteSystemPromptInput = {
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

export type ModelSystemPromptFilterInput = {
  id?: ModelIDInput | null,
  prompt?: ModelStringInput | null,
  type?: ModelPromptTypeInput | null,
  and?: Array< ModelSystemPromptFilterInput | null > | null,
  or?: Array< ModelSystemPromptFilterInput | null > | null,
  not?: ModelSystemPromptFilterInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelSystemPromptConnection = {
  __typename: "ModelSystemPromptConnection",
  items:  Array<SystemPrompt | null >,
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

export type ModelSubscriptionSystemPromptFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  prompt?: ModelSubscriptionStringInput | null,
  type?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionSystemPromptFilterInput | null > | null,
  or?: Array< ModelSubscriptionSystemPromptFilterInput | null > | null,
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

export type CreateSystemPromptMutationVariables = {
  input: CreateSystemPromptInput,
  condition?: ModelSystemPromptConditionInput | null,
};

export type CreateSystemPromptMutation = {
  createSystemPrompt?:  {
    __typename: "SystemPrompt",
    id: string,
    prompt: string,
    type?: PromptType | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateSystemPromptMutationVariables = {
  input: UpdateSystemPromptInput,
  condition?: ModelSystemPromptConditionInput | null,
};

export type UpdateSystemPromptMutation = {
  updateSystemPrompt?:  {
    __typename: "SystemPrompt",
    id: string,
    prompt: string,
    type?: PromptType | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteSystemPromptMutationVariables = {
  input: DeleteSystemPromptInput,
  condition?: ModelSystemPromptConditionInput | null,
};

export type DeleteSystemPromptMutation = {
  deleteSystemPrompt?:  {
    __typename: "SystemPrompt",
    id: string,
    prompt: string,
    type?: PromptType | null,
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

export type GetSystemPromptQueryVariables = {
  id: string,
};

export type GetSystemPromptQuery = {
  getSystemPrompt?:  {
    __typename: "SystemPrompt",
    id: string,
    prompt: string,
    type?: PromptType | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListSystemPromptsQueryVariables = {
  filter?: ModelSystemPromptFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSystemPromptsQuery = {
  listSystemPrompts?:  {
    __typename: "ModelSystemPromptConnection",
    items:  Array< {
      __typename: "SystemPrompt",
      id: string,
      prompt: string,
      type?: PromptType | null,
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

export type SyncSystemPromptsQueryVariables = {
  filter?: ModelSystemPromptFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncSystemPromptsQuery = {
  syncSystemPrompts?:  {
    __typename: "ModelSystemPromptConnection",
    items:  Array< {
      __typename: "SystemPrompt",
      id: string,
      prompt: string,
      type?: PromptType | null,
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

export type OnCreateSystemPromptSubscriptionVariables = {
  filter?: ModelSubscriptionSystemPromptFilterInput | null,
};

export type OnCreateSystemPromptSubscription = {
  onCreateSystemPrompt?:  {
    __typename: "SystemPrompt",
    id: string,
    prompt: string,
    type?: PromptType | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateSystemPromptSubscriptionVariables = {
  filter?: ModelSubscriptionSystemPromptFilterInput | null,
};

export type OnUpdateSystemPromptSubscription = {
  onUpdateSystemPrompt?:  {
    __typename: "SystemPrompt",
    id: string,
    prompt: string,
    type?: PromptType | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteSystemPromptSubscriptionVariables = {
  filter?: ModelSubscriptionSystemPromptFilterInput | null,
};

export type OnDeleteSystemPromptSubscription = {
  onDeleteSystemPrompt?:  {
    __typename: "SystemPrompt",
    id: string,
    prompt: string,
    type?: PromptType | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};
