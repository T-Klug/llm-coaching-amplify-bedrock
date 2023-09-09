/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createOpenAIChat = /* GraphQL */ `
  mutation CreateOpenAIChat(
    $input: CreateOpenAIChatInput!
    $condition: ModelOpenAIChatConditionInput
  ) {
    createOpenAIChat(input: $input, condition: $condition) {
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
export const updateOpenAIChat = /* GraphQL */ `
  mutation UpdateOpenAIChat(
    $input: UpdateOpenAIChatInput!
    $condition: ModelOpenAIChatConditionInput
  ) {
    updateOpenAIChat(input: $input, condition: $condition) {
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
export const deleteOpenAIChat = /* GraphQL */ `
  mutation DeleteOpenAIChat(
    $input: DeleteOpenAIChatInput!
    $condition: ModelOpenAIChatConditionInput
  ) {
    deleteOpenAIChat(input: $input, condition: $condition) {
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
export const createOpenAIModel = /* GraphQL */ `
  mutation CreateOpenAIModel(
    $input: CreateOpenAIModelInput!
    $condition: ModelOpenAIModelConditionInput
  ) {
    createOpenAIModel(input: $input, condition: $condition) {
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
export const updateOpenAIModel = /* GraphQL */ `
  mutation UpdateOpenAIModel(
    $input: UpdateOpenAIModelInput!
    $condition: ModelOpenAIModelConditionInput
  ) {
    updateOpenAIModel(input: $input, condition: $condition) {
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
export const deleteOpenAIModel = /* GraphQL */ `
  mutation DeleteOpenAIModel(
    $input: DeleteOpenAIModelInput!
    $condition: ModelOpenAIModelConditionInput
  ) {
    deleteOpenAIModel(input: $input, condition: $condition) {
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
export const createFeedback = /* GraphQL */ `
  mutation CreateFeedback(
    $input: CreateFeedbackInput!
    $condition: ModelFeedbackConditionInput
  ) {
    createFeedback(input: $input, condition: $condition) {
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
export const updateFeedback = /* GraphQL */ `
  mutation UpdateFeedback(
    $input: UpdateFeedbackInput!
    $condition: ModelFeedbackConditionInput
  ) {
    updateFeedback(input: $input, condition: $condition) {
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
export const deleteFeedback = /* GraphQL */ `
  mutation DeleteFeedback(
    $input: DeleteFeedbackInput!
    $condition: ModelFeedbackConditionInput
  ) {
    deleteFeedback(input: $input, condition: $condition) {
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
export const createUserSpecificPrompt = /* GraphQL */ `
  mutation CreateUserSpecificPrompt(
    $input: CreateUserSpecificPromptInput!
    $condition: ModelUserSpecificPromptConditionInput
  ) {
    createUserSpecificPrompt(input: $input, condition: $condition) {
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
export const updateUserSpecificPrompt = /* GraphQL */ `
  mutation UpdateUserSpecificPrompt(
    $input: UpdateUserSpecificPromptInput!
    $condition: ModelUserSpecificPromptConditionInput
  ) {
    updateUserSpecificPrompt(input: $input, condition: $condition) {
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
export const deleteUserSpecificPrompt = /* GraphQL */ `
  mutation DeleteUserSpecificPrompt(
    $input: DeleteUserSpecificPromptInput!
    $condition: ModelUserSpecificPromptConditionInput
  ) {
    deleteUserSpecificPrompt(input: $input, condition: $condition) {
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
export const createUserProfile = /* GraphQL */ `
  mutation CreateUserProfile(
    $input: CreateUserProfileInput!
    $condition: ModelUserProfileConditionInput
  ) {
    createUserProfile(input: $input, condition: $condition) {
      id
      userId
      name
      personalityTest
      background
      phone
      optInText
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
export const updateUserProfile = /* GraphQL */ `
  mutation UpdateUserProfile(
    $input: UpdateUserProfileInput!
    $condition: ModelUserProfileConditionInput
  ) {
    updateUserProfile(input: $input, condition: $condition) {
      id
      userId
      name
      personalityTest
      background
      phone
      optInText
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
export const deleteUserProfile = /* GraphQL */ `
  mutation DeleteUserProfile(
    $input: DeleteUserProfileInput!
    $condition: ModelUserProfileConditionInput
  ) {
    deleteUserProfile(input: $input, condition: $condition) {
      id
      userId
      name
      personalityTest
      background
      phone
      optInText
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
export const createOpenAIChatFunc = /* GraphQL */ `
  mutation CreateOpenAIChatFunc($input: CreateOpenAIChatFuncInput) {
    createOpenAIChatFunc(input: $input) {
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
