/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateOpenAIChat = /* GraphQL */ `
  subscription OnCreateOpenAIChat(
    $filter: ModelSubscriptionOpenAIChatFilterInput
    $owner: String
  ) {
    onCreateOpenAIChat(filter: $filter, owner: $owner) {
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
export const onUpdateOpenAIChat = /* GraphQL */ `
  subscription OnUpdateOpenAIChat(
    $filter: ModelSubscriptionOpenAIChatFilterInput
    $owner: String
  ) {
    onUpdateOpenAIChat(filter: $filter, owner: $owner) {
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
export const onDeleteOpenAIChat = /* GraphQL */ `
  subscription OnDeleteOpenAIChat(
    $filter: ModelSubscriptionOpenAIChatFilterInput
    $owner: String
  ) {
    onDeleteOpenAIChat(filter: $filter, owner: $owner) {
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
export const onCreateSystemPrompt = /* GraphQL */ `
  subscription OnCreateSystemPrompt(
    $filter: ModelSubscriptionSystemPromptFilterInput
  ) {
    onCreateSystemPrompt(filter: $filter) {
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
export const onUpdateSystemPrompt = /* GraphQL */ `
  subscription OnUpdateSystemPrompt(
    $filter: ModelSubscriptionSystemPromptFilterInput
  ) {
    onUpdateSystemPrompt(filter: $filter) {
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
export const onDeleteSystemPrompt = /* GraphQL */ `
  subscription OnDeleteSystemPrompt(
    $filter: ModelSubscriptionSystemPromptFilterInput
  ) {
    onDeleteSystemPrompt(filter: $filter) {
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
