/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateSystemPromptInput = {
  id?: string | null,
  prompts?: Array< string > | null,
  _version?: number | null,
};

export type ModelSystemPromptConditionInput = {
  prompts?: ModelStringInput | null,
  and?: Array< ModelSystemPromptConditionInput | null > | null,
  or?: Array< ModelSystemPromptConditionInput | null > | null,
  not?: ModelSystemPromptConditionInput | null,
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

export type SystemPrompt = {
  __typename: "SystemPrompt",
  id: string,
  prompts?: Array< string > | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdateSystemPromptInput = {
  id: string,
  prompts?: Array< string > | null,
  _version?: number | null,
};

export type DeleteSystemPromptInput = {
  id: string,
  _version?: number | null,
};

export type ModelSystemPromptFilterInput = {
  id?: ModelIDInput | null,
  prompts?: ModelStringInput | null,
  and?: Array< ModelSystemPromptFilterInput | null > | null,
  or?: Array< ModelSystemPromptFilterInput | null > | null,
  not?: ModelSystemPromptFilterInput | null,
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

export type ModelSystemPromptConnection = {
  __typename: "ModelSystemPromptConnection",
  items:  Array<SystemPrompt | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelSubscriptionSystemPromptFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  prompts?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionSystemPromptFilterInput | null > | null,
  or?: Array< ModelSubscriptionSystemPromptFilterInput | null > | null,
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

export type CreateSystemPromptMutationVariables = {
  input: CreateSystemPromptInput,
  condition?: ModelSystemPromptConditionInput | null,
};

export type CreateSystemPromptMutation = {
  createSystemPrompt?:  {
    __typename: "SystemPrompt",
    id: string,
    prompts?: Array< string > | null,
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
    prompts?: Array< string > | null,
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
    prompts?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type GetSystemPromptQueryVariables = {
  id: string,
};

export type GetSystemPromptQuery = {
  getSystemPrompt?:  {
    __typename: "SystemPrompt",
    id: string,
    prompts?: Array< string > | null,
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
      prompts?: Array< string > | null,
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
      prompts?: Array< string > | null,
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

export type OnCreateSystemPromptSubscriptionVariables = {
  filter?: ModelSubscriptionSystemPromptFilterInput | null,
};

export type OnCreateSystemPromptSubscription = {
  onCreateSystemPrompt?:  {
    __typename: "SystemPrompt",
    id: string,
    prompts?: Array< string > | null,
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
    prompts?: Array< string > | null,
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
    prompts?: Array< string > | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};
