/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSystemPrompt = /* GraphQL */ `
  query GetSystemPrompt($id: ID!) {
    getSystemPrompt(id: $id) {
      id
      prompts
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
        prompts
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
        prompts
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
