/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createOpenAIChat = /* GraphQL */ `
  mutation CreateOpenAIChat(
    $input: CreateOpenAIChatInput!
    $condition: ModelOpenAIChatConditionInput
  ) {
    createOpenAIChat(input: $input, condition: $condition) {
      id
      messages {
        role
        content
      }
      user
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateOpenAIChat = /* GraphQL */ `
  mutation UpdateOpenAIChat(
    $input: UpdateOpenAIChatInput!
    $condition: ModelOpenAIChatConditionInput
  ) {
    updateOpenAIChat(input: $input, condition: $condition) {
      id
      messages {
        role
        content
      }
      user
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteOpenAIChat = /* GraphQL */ `
  mutation DeleteOpenAIChat(
    $input: DeleteOpenAIChatInput!
    $condition: ModelOpenAIChatConditionInput
  ) {
    deleteOpenAIChat(input: $input, condition: $condition) {
      id
      messages {
        role
        content
      }
      user
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createOpenAIModel = /* GraphQL */ `
  mutation CreateOpenAIModel(
    $input: CreateOpenAIModelInput!
    $condition: ModelOpenAIModelConditionInput
  ) {
    createOpenAIModel(input: $input, condition: $condition) {
      id
      prompt
      model
      temperature
      top_p
      max_tokens
      presence_penalty
      frequency_penalty
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateOpenAIModel = /* GraphQL */ `
  mutation UpdateOpenAIModel(
    $input: UpdateOpenAIModelInput!
    $condition: ModelOpenAIModelConditionInput
  ) {
    updateOpenAIModel(input: $input, condition: $condition) {
      id
      prompt
      model
      temperature
      top_p
      max_tokens
      presence_penalty
      frequency_penalty
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteOpenAIModel = /* GraphQL */ `
  mutation DeleteOpenAIModel(
    $input: DeleteOpenAIModelInput!
    $condition: ModelOpenAIModelConditionInput
  ) {
    deleteOpenAIModel(input: $input, condition: $condition) {
      id
      prompt
      model
      temperature
      top_p
      max_tokens
      presence_penalty
      frequency_penalty
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createOpenAIChatFunc = /* GraphQL */ `
  mutation CreateOpenAIChatFunc($input: CreateOpenAIChatFuncInput) {
    createOpenAIChatFunc(input: $input) {
      id
      messages {
        role
        content
      }
      user
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
