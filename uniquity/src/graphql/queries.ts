/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getOpenAIChat = /* GraphQL */ `query GetOpenAIChat($id: ID!) {
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
` as GeneratedQuery<
  APITypes.GetOpenAIChatQueryVariables,
  APITypes.GetOpenAIChatQuery
>;
export const listOpenAIChats = /* GraphQL */ `query ListOpenAIChats(
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
` as GeneratedQuery<
  APITypes.ListOpenAIChatsQueryVariables,
  APITypes.ListOpenAIChatsQuery
>;
export const syncOpenAIChats = /* GraphQL */ `query SyncOpenAIChats(
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
` as GeneratedQuery<
  APITypes.SyncOpenAIChatsQueryVariables,
  APITypes.SyncOpenAIChatsQuery
>;
export const getOpenAIModel = /* GraphQL */ `query GetOpenAIModel($id: ID!) {
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
` as GeneratedQuery<
  APITypes.GetOpenAIModelQueryVariables,
  APITypes.GetOpenAIModelQuery
>;
export const listOpenAIModels = /* GraphQL */ `query ListOpenAIModels(
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
` as GeneratedQuery<
  APITypes.ListOpenAIModelsQueryVariables,
  APITypes.ListOpenAIModelsQuery
>;
export const syncOpenAIModels = /* GraphQL */ `query SyncOpenAIModels(
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
` as GeneratedQuery<
  APITypes.SyncOpenAIModelsQueryVariables,
  APITypes.SyncOpenAIModelsQuery
>;
export const getFeedback = /* GraphQL */ `query GetFeedback($id: ID!) {
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
` as GeneratedQuery<
  APITypes.GetFeedbackQueryVariables,
  APITypes.GetFeedbackQuery
>;
export const listFeedbacks = /* GraphQL */ `query ListFeedbacks(
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
` as GeneratedQuery<
  APITypes.ListFeedbacksQueryVariables,
  APITypes.ListFeedbacksQuery
>;
export const syncFeedbacks = /* GraphQL */ `query SyncFeedbacks(
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
` as GeneratedQuery<
  APITypes.SyncFeedbacksQueryVariables,
  APITypes.SyncFeedbacksQuery
>;
export const getUserProfile = /* GraphQL */ `query GetUserProfile($id: ID!) {
  getUserProfile(id: $id) {
    id
    userId
    name
    personalityTest
    background
    phone
    optInText
    completedIcebreakers
    userSummary
    owner
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetUserProfileQueryVariables,
  APITypes.GetUserProfileQuery
>;
export const listUserProfiles = /* GraphQL */ `query ListUserProfiles(
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
      userSummary
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
` as GeneratedQuery<
  APITypes.ListUserProfilesQueryVariables,
  APITypes.ListUserProfilesQuery
>;
export const syncUserProfiles = /* GraphQL */ `query SyncUserProfiles(
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
      userSummary
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
` as GeneratedQuery<
  APITypes.SyncUserProfilesQueryVariables,
  APITypes.SyncUserProfilesQuery
>;
export const getIcebreakerChat = /* GraphQL */ `query GetIcebreakerChat($id: ID!) {
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
` as GeneratedQuery<
  APITypes.GetIcebreakerChatQueryVariables,
  APITypes.GetIcebreakerChatQuery
>;
export const listIcebreakerChats = /* GraphQL */ `query ListIcebreakerChats(
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
` as GeneratedQuery<
  APITypes.ListIcebreakerChatsQueryVariables,
  APITypes.ListIcebreakerChatsQuery
>;
export const syncIcebreakerChats = /* GraphQL */ `query SyncIcebreakerChats(
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
` as GeneratedQuery<
  APITypes.SyncIcebreakerChatsQueryVariables,
  APITypes.SyncIcebreakerChatsQuery
>;
export const getRoleplayChat = /* GraphQL */ `query GetRoleplayChat($id: ID!) {
  getRoleplayChat(id: $id) {
    id
    messages {
      role
      content
      __typename
    }
    user
    roleplayId
    owner
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetRoleplayChatQueryVariables,
  APITypes.GetRoleplayChatQuery
>;
export const listRoleplayChats = /* GraphQL */ `query ListRoleplayChats(
  $filter: ModelRoleplayChatFilterInput
  $limit: Int
  $nextToken: String
) {
  listRoleplayChats(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      messages {
        role
        content
        __typename
      }
      user
      roleplayId
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
` as GeneratedQuery<
  APITypes.ListRoleplayChatsQueryVariables,
  APITypes.ListRoleplayChatsQuery
>;
export const syncRoleplayChats = /* GraphQL */ `query SyncRoleplayChats(
  $filter: ModelRoleplayChatFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncRoleplayChats(
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
      roleplayId
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
` as GeneratedQuery<
  APITypes.SyncRoleplayChatsQueryVariables,
  APITypes.SyncRoleplayChatsQuery
>;
export const getRoleplaySummary = /* GraphQL */ `query GetRoleplaySummary($id: ID!) {
  getRoleplaySummary(id: $id) {
    id
    summary
    user
    roleplayId
    owner
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetRoleplaySummaryQueryVariables,
  APITypes.GetRoleplaySummaryQuery
>;
export const listRoleplaySummaries = /* GraphQL */ `query ListRoleplaySummaries(
  $filter: ModelRoleplaySummaryFilterInput
  $limit: Int
  $nextToken: String
) {
  listRoleplaySummaries(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      summary
      user
      roleplayId
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
` as GeneratedQuery<
  APITypes.ListRoleplaySummariesQueryVariables,
  APITypes.ListRoleplaySummariesQuery
>;
export const syncRoleplaySummaries = /* GraphQL */ `query SyncRoleplaySummaries(
  $filter: ModelRoleplaySummaryFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncRoleplaySummaries(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      summary
      user
      roleplayId
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
` as GeneratedQuery<
  APITypes.SyncRoleplaySummariesQueryVariables,
  APITypes.SyncRoleplaySummariesQuery
>;
