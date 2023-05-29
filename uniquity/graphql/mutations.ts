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
export const createSystemPrompt = /* GraphQL */ `
  mutation CreateSystemPrompt(
    $input: CreateSystemPromptInput!
    $condition: ModelSystemPromptConditionInput
  ) {
    createSystemPrompt(input: $input, condition: $condition) {
      id
      prompt
      type
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateSystemPrompt = /* GraphQL */ `
  mutation UpdateSystemPrompt(
    $input: UpdateSystemPromptInput!
    $condition: ModelSystemPromptConditionInput
  ) {
    updateSystemPrompt(input: $input, condition: $condition) {
      id
      prompt
      type
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteSystemPrompt = /* GraphQL */ `
  mutation DeleteSystemPrompt(
    $input: DeleteSystemPromptInput!
    $condition: ModelSystemPromptConditionInput
  ) {
    deleteSystemPrompt(input: $input, condition: $condition) {
      id
      prompt
      type
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
