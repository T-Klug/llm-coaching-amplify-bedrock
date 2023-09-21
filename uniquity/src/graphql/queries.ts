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
        __typename
      }
      user
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
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
          __typename
        }
        user
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
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
          __typename
        }
        user
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
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
      __typename
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
        __typename
      }
      nextToken
      startedAt
      __typename
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
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getFeedback = /* GraphQL */ `
  query GetFeedback($id: ID!) {
    getFeedback(id: $id) {
      id
      like
      comment
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listFeedbacks = /* GraphQL */ `
  query ListFeedbacks(
    $filter: ModelFeedbackFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFeedbacks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        like
        comment
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncFeedbacks = /* GraphQL */ `
  query SyncFeedbacks(
    $filter: ModelFeedbackFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncFeedbacks(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        like
        comment
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getUserProfile = /* GraphQL */ `
  query GetUserProfile($id: ID!) {
    getUserProfile(id: $id) {
      id
      userId
      name
      personalityTest
      background
      phone
      optInText
      completedIcebreakers
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listUserProfiles = /* GraphQL */ `
  query ListUserProfiles(
    $filter: ModelUserProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        name
        personalityTest
        background
        phone
        optInText
        completedIcebreakers
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncUserProfiles = /* GraphQL */ `
  query SyncUserProfiles(
    $filter: ModelUserProfileFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUserProfiles(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        userId
        name
        personalityTest
        background
        phone
        optInText
        completedIcebreakers
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getIcebreakerChat = /* GraphQL */ `
  query GetIcebreakerChat($id: ID!) {
    getIcebreakerChat(id: $id) {
      id
      messages {
        role
        content
        __typename
      }
      user
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listIcebreakerChats = /* GraphQL */ `
  query ListIcebreakerChats(
    $filter: ModelIcebreakerChatFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listIcebreakerChats(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        messages {
          role
          content
          __typename
        }
        user
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncIcebreakerChats = /* GraphQL */ `
  query SyncIcebreakerChats(
    $filter: ModelIcebreakerChatFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncIcebreakerChats(
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
          __typename
        }
        user
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
