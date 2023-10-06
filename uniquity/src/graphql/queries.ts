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
export const getRoleChat = /* GraphQL */ `query GetRoleChat($id: ID!) {
  getRoleChat(id: $id) {
    id
    messages {
      role
      content
      __typename
    }
    user
    roleplayId
    scenario
    difficulty
    scenarioPrompt
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
  APITypes.GetRoleChatQueryVariables,
  APITypes.GetRoleChatQuery
>;
export const listRoleChats = /* GraphQL */ `query ListRoleChats(
  $filter: ModelRoleChatFilterInput
  $limit: Int
  $nextToken: String
) {
  listRoleChats(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      messages {
        role
        content
        __typename
      }
      user
      roleplayId
      scenario
      difficulty
      scenarioPrompt
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
  APITypes.ListRoleChatsQueryVariables,
  APITypes.ListRoleChatsQuery
>;
export const syncRoleChats = /* GraphQL */ `query SyncRoleChats(
  $filter: ModelRoleChatFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncRoleChats(
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
      scenario
      difficulty
      scenarioPrompt
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
  APITypes.SyncRoleChatsQueryVariables,
  APITypes.SyncRoleChatsQuery
>;
export const getRoleSummaary = /* GraphQL */ `query GetRoleSummaary($id: ID!) {
  getRoleSummaary(id: $id) {
    id
    summary
    user
    roleplayId
    scenario
    difficulty
    scenarioPrompt
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
  APITypes.GetRoleSummaaryQueryVariables,
  APITypes.GetRoleSummaaryQuery
>;
export const listRoleSummaaries = /* GraphQL */ `query ListRoleSummaaries(
  $filter: ModelRoleSummaaryFilterInput
  $limit: Int
  $nextToken: String
) {
  listRoleSummaaries(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      summary
      user
      roleplayId
      scenario
      difficulty
      scenarioPrompt
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
  APITypes.ListRoleSummaariesQueryVariables,
  APITypes.ListRoleSummaariesQuery
>;
export const syncRoleSummaaries = /* GraphQL */ `query SyncRoleSummaaries(
  $filter: ModelRoleSummaaryFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncRoleSummaaries(
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
      scenario
      difficulty
      scenarioPrompt
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
  APITypes.SyncRoleSummaariesQueryVariables,
  APITypes.SyncRoleSummaariesQuery
>;
