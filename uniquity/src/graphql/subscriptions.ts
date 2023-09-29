/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateOpenAIChat = /* GraphQL */ `subscription OnCreateOpenAIChat(
  $filter: ModelSubscriptionOpenAIChatFilterInput
  $owner: String
) {
  onCreateOpenAIChat(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateOpenAIChatSubscriptionVariables,
  APITypes.OnCreateOpenAIChatSubscription
>;
export const onUpdateOpenAIChat = /* GraphQL */ `subscription OnUpdateOpenAIChat(
  $filter: ModelSubscriptionOpenAIChatFilterInput
  $owner: String
) {
  onUpdateOpenAIChat(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateOpenAIChatSubscriptionVariables,
  APITypes.OnUpdateOpenAIChatSubscription
>;
export const onDeleteOpenAIChat = /* GraphQL */ `subscription OnDeleteOpenAIChat(
  $filter: ModelSubscriptionOpenAIChatFilterInput
  $owner: String
) {
  onDeleteOpenAIChat(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteOpenAIChatSubscriptionVariables,
  APITypes.OnDeleteOpenAIChatSubscription
>;
export const onCreateOpenAIModel = /* GraphQL */ `subscription OnCreateOpenAIModel(
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
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateOpenAIModelSubscriptionVariables,
  APITypes.OnCreateOpenAIModelSubscription
>;
export const onUpdateOpenAIModel = /* GraphQL */ `subscription OnUpdateOpenAIModel(
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
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateOpenAIModelSubscriptionVariables,
  APITypes.OnUpdateOpenAIModelSubscription
>;
export const onDeleteOpenAIModel = /* GraphQL */ `subscription OnDeleteOpenAIModel(
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
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteOpenAIModelSubscriptionVariables,
  APITypes.OnDeleteOpenAIModelSubscription
>;
export const onCreateFeedback = /* GraphQL */ `subscription OnCreateFeedback($filter: ModelSubscriptionFeedbackFilterInput) {
  onCreateFeedback(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateFeedbackSubscriptionVariables,
  APITypes.OnCreateFeedbackSubscription
>;
export const onUpdateFeedback = /* GraphQL */ `subscription OnUpdateFeedback($filter: ModelSubscriptionFeedbackFilterInput) {
  onUpdateFeedback(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateFeedbackSubscriptionVariables,
  APITypes.OnUpdateFeedbackSubscription
>;
export const onDeleteFeedback = /* GraphQL */ `subscription OnDeleteFeedback($filter: ModelSubscriptionFeedbackFilterInput) {
  onDeleteFeedback(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteFeedbackSubscriptionVariables,
  APITypes.OnDeleteFeedbackSubscription
>;
export const onCreateUserProfile = /* GraphQL */ `subscription OnCreateUserProfile(
  $filter: ModelSubscriptionUserProfileFilterInput
  $owner: String
) {
  onCreateUserProfile(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateUserProfileSubscriptionVariables,
  APITypes.OnCreateUserProfileSubscription
>;
export const onUpdateUserProfile = /* GraphQL */ `subscription OnUpdateUserProfile(
  $filter: ModelSubscriptionUserProfileFilterInput
  $owner: String
) {
  onUpdateUserProfile(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateUserProfileSubscriptionVariables,
  APITypes.OnUpdateUserProfileSubscription
>;
export const onDeleteUserProfile = /* GraphQL */ `subscription OnDeleteUserProfile(
  $filter: ModelSubscriptionUserProfileFilterInput
  $owner: String
) {
  onDeleteUserProfile(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteUserProfileSubscriptionVariables,
  APITypes.OnDeleteUserProfileSubscription
>;
export const onCreateIcebreakerChat = /* GraphQL */ `subscription OnCreateIcebreakerChat(
  $filter: ModelSubscriptionIcebreakerChatFilterInput
  $owner: String
) {
  onCreateIcebreakerChat(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateIcebreakerChatSubscriptionVariables,
  APITypes.OnCreateIcebreakerChatSubscription
>;
export const onUpdateIcebreakerChat = /* GraphQL */ `subscription OnUpdateIcebreakerChat(
  $filter: ModelSubscriptionIcebreakerChatFilterInput
  $owner: String
) {
  onUpdateIcebreakerChat(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateIcebreakerChatSubscriptionVariables,
  APITypes.OnUpdateIcebreakerChatSubscription
>;
export const onDeleteIcebreakerChat = /* GraphQL */ `subscription OnDeleteIcebreakerChat(
  $filter: ModelSubscriptionIcebreakerChatFilterInput
  $owner: String
) {
  onDeleteIcebreakerChat(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteIcebreakerChatSubscriptionVariables,
  APITypes.OnDeleteIcebreakerChatSubscription
>;
export const onCreateRoleplayChat = /* GraphQL */ `subscription OnCreateRoleplayChat(
  $filter: ModelSubscriptionRoleplayChatFilterInput
  $owner: String
) {
  onCreateRoleplayChat(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateRoleplayChatSubscriptionVariables,
  APITypes.OnCreateRoleplayChatSubscription
>;
export const onUpdateRoleplayChat = /* GraphQL */ `subscription OnUpdateRoleplayChat(
  $filter: ModelSubscriptionRoleplayChatFilterInput
  $owner: String
) {
  onUpdateRoleplayChat(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateRoleplayChatSubscriptionVariables,
  APITypes.OnUpdateRoleplayChatSubscription
>;
export const onDeleteRoleplayChat = /* GraphQL */ `subscription OnDeleteRoleplayChat(
  $filter: ModelSubscriptionRoleplayChatFilterInput
  $owner: String
) {
  onDeleteRoleplayChat(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteRoleplayChatSubscriptionVariables,
  APITypes.OnDeleteRoleplayChatSubscription
>;
export const onCreateRoleplaySummary = /* GraphQL */ `subscription OnCreateRoleplaySummary(
  $filter: ModelSubscriptionRoleplaySummaryFilterInput
  $owner: String
) {
  onCreateRoleplaySummary(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateRoleplaySummarySubscriptionVariables,
  APITypes.OnCreateRoleplaySummarySubscription
>;
export const onUpdateRoleplaySummary = /* GraphQL */ `subscription OnUpdateRoleplaySummary(
  $filter: ModelSubscriptionRoleplaySummaryFilterInput
  $owner: String
) {
  onUpdateRoleplaySummary(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateRoleplaySummarySubscriptionVariables,
  APITypes.OnUpdateRoleplaySummarySubscription
>;
export const onDeleteRoleplaySummary = /* GraphQL */ `subscription OnDeleteRoleplaySummary(
  $filter: ModelSubscriptionRoleplaySummaryFilterInput
  $owner: String
) {
  onDeleteRoleplaySummary(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteRoleplaySummarySubscriptionVariables,
  APITypes.OnDeleteRoleplaySummarySubscription
>;
