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
export const getSystemPrompt = /* GraphQL */ `
  query GetSystemPrompt($id: ID!) {
    getSystemPrompt(id: $id) {
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
export const listSystemPrompts = /* GraphQL */ `
  query ListSystemPrompts(
    $filter: ModelSystemPromptFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSystemPrompts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        prompt
        type
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
export const syncSystemPrompts = /* GraphQL */ `
  query SyncSystemPrompts(
    $filter: ModelSystemPromptFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncSystemPrompts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        prompt
        type
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
