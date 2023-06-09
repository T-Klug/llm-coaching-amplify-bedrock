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
export const onCreateOpenAIModel = /* GraphQL */ `
  subscription OnCreateOpenAIModel(
    $filter: ModelSubscriptionOpenAIModelFilterInput
  ) {
    onCreateOpenAIModel(filter: $filter) {
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
export const onUpdateOpenAIModel = /* GraphQL */ `
  subscription OnUpdateOpenAIModel(
    $filter: ModelSubscriptionOpenAIModelFilterInput
  ) {
    onUpdateOpenAIModel(filter: $filter) {
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
export const onDeleteOpenAIModel = /* GraphQL */ `
  subscription OnDeleteOpenAIModel(
    $filter: ModelSubscriptionOpenAIModelFilterInput
  ) {
    onDeleteOpenAIModel(filter: $filter) {
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
