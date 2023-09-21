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
      __typename
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
      __typename
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
      __typename
    }
  }
`;
export const onCreateFeedback = /* GraphQL */ `
  subscription OnCreateFeedback($filter: ModelSubscriptionFeedbackFilterInput) {
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
`;
export const onUpdateFeedback = /* GraphQL */ `
  subscription OnUpdateFeedback($filter: ModelSubscriptionFeedbackFilterInput) {
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
`;
export const onDeleteFeedback = /* GraphQL */ `
  subscription OnDeleteFeedback($filter: ModelSubscriptionFeedbackFilterInput) {
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
`;
export const onCreateUserSpecificPrompt = /* GraphQL */ `
  subscription OnCreateUserSpecificPrompt(
    $filter: ModelSubscriptionUserSpecificPromptFilterInput
  ) {
    onCreateUserSpecificPrompt(filter: $filter) {
      id
      userId
      prompt
      lastChatId
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onUpdateUserSpecificPrompt = /* GraphQL */ `
  subscription OnUpdateUserSpecificPrompt(
    $filter: ModelSubscriptionUserSpecificPromptFilterInput
  ) {
    onUpdateUserSpecificPrompt(filter: $filter) {
      id
      userId
      prompt
      lastChatId
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onDeleteUserSpecificPrompt = /* GraphQL */ `
  subscription OnDeleteUserSpecificPrompt(
    $filter: ModelSubscriptionUserSpecificPromptFilterInput
  ) {
    onDeleteUserSpecificPrompt(filter: $filter) {
      id
      userId
      prompt
      lastChatId
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onCreateUserProfile = /* GraphQL */ `
  subscription OnCreateUserProfile(
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
export const onUpdateUserProfile = /* GraphQL */ `
  subscription OnUpdateUserProfile(
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
export const onDeleteUserProfile = /* GraphQL */ `
  subscription OnDeleteUserProfile(
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
export const onCreateIcebreakerChat = /* GraphQL */ `
  subscription OnCreateIcebreakerChat(
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
`;
export const onUpdateIcebreakerChat = /* GraphQL */ `
  subscription OnUpdateIcebreakerChat(
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
`;
export const onDeleteIcebreakerChat = /* GraphQL */ `
  subscription OnDeleteIcebreakerChat(
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
`;
