/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getOpenAIChat = /* GraphQL */ `
  query GetOpenAIChat($id: ID!) {
    getOpenAIChat(id: $id) {
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
export const listOpenAIChats = /* GraphQL */ `
  query ListOpenAIChats(
    $filter: ModelOpenAIChatFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOpenAIChats(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncOpenAIChats = /* GraphQL */ `
  query SyncOpenAIChats(
    $filter: ModelOpenAIChatFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncOpenAIChats(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getOpenAIModel = /* GraphQL */ `
  query GetOpenAIModel($id: ID!) {
    getOpenAIModel(id: $id) {
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
export const listOpenAIModels = /* GraphQL */ `
  query ListOpenAIModels(
    $filter: ModelOpenAIModelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOpenAIModels(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncOpenAIModels = /* GraphQL */ `
  query SyncOpenAIModels(
    $filter: ModelOpenAIModelFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncOpenAIModels(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
