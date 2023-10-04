/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../../uniquity/src/graphql/API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createOpenAIChat = /* GraphQL */ `mutation CreateOpenAIChat(
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
` as GeneratedMutation<
  APITypes.CreateOpenAIChatMutationVariables,
  APITypes.CreateOpenAIChatMutation
>;
export const updateOpenAIChat = /* GraphQL */ `mutation UpdateOpenAIChat(
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
` as GeneratedMutation<
  APITypes.UpdateOpenAIChatMutationVariables,
  APITypes.UpdateOpenAIChatMutation
>;
export const deleteOpenAIChat = /* GraphQL */ `mutation DeleteOpenAIChat(
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
` as GeneratedMutation<
  APITypes.DeleteOpenAIChatMutationVariables,
  APITypes.DeleteOpenAIChatMutation
>;
export const createOpenAIModel = /* GraphQL */ `mutation CreateOpenAIModel(
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
` as GeneratedMutation<
  APITypes.CreateOpenAIModelMutationVariables,
  APITypes.CreateOpenAIModelMutation
>;
export const updateOpenAIModel = /* GraphQL */ `mutation UpdateOpenAIModel(
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
` as GeneratedMutation<
  APITypes.UpdateOpenAIModelMutationVariables,
  APITypes.UpdateOpenAIModelMutation
>;
export const deleteOpenAIModel = /* GraphQL */ `mutation DeleteOpenAIModel(
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
` as GeneratedMutation<
  APITypes.DeleteOpenAIModelMutationVariables,
  APITypes.DeleteOpenAIModelMutation
>;
export const createFeedback = /* GraphQL */ `mutation CreateFeedback(
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
` as GeneratedMutation<
  APITypes.CreateFeedbackMutationVariables,
  APITypes.CreateFeedbackMutation
>;
export const updateFeedback = /* GraphQL */ `mutation UpdateFeedback(
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
` as GeneratedMutation<
  APITypes.UpdateFeedbackMutationVariables,
  APITypes.UpdateFeedbackMutation
>;
export const deleteFeedback = /* GraphQL */ `mutation DeleteFeedback(
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
` as GeneratedMutation<
  APITypes.DeleteFeedbackMutationVariables,
  APITypes.DeleteFeedbackMutation
>;
export const createUserProfile = /* GraphQL */ `mutation CreateUserProfile(
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
` as GeneratedMutation<
  APITypes.CreateUserProfileMutationVariables,
  APITypes.CreateUserProfileMutation
>;
export const updateUserProfile = /* GraphQL */ `mutation UpdateUserProfile(
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
` as GeneratedMutation<
  APITypes.UpdateUserProfileMutationVariables,
  APITypes.UpdateUserProfileMutation
>;
export const deleteUserProfile = /* GraphQL */ `mutation DeleteUserProfile(
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
` as GeneratedMutation<
  APITypes.DeleteUserProfileMutationVariables,
  APITypes.DeleteUserProfileMutation
>;
export const createIcebreakerChat = /* GraphQL */ `mutation CreateIcebreakerChat(
  $input: CreateIcebreakerChatInput!
  $condition: ModelIcebreakerChatConditionInput
) {
  createIcebreakerChat(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateIcebreakerChatMutationVariables,
  APITypes.CreateIcebreakerChatMutation
>;
export const updateIcebreakerChat = /* GraphQL */ `mutation UpdateIcebreakerChat(
  $input: UpdateIcebreakerChatInput!
  $condition: ModelIcebreakerChatConditionInput
) {
  updateIcebreakerChat(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateIcebreakerChatMutationVariables,
  APITypes.UpdateIcebreakerChatMutation
>;
export const deleteIcebreakerChat = /* GraphQL */ `mutation DeleteIcebreakerChat(
  $input: DeleteIcebreakerChatInput!
  $condition: ModelIcebreakerChatConditionInput
) {
  deleteIcebreakerChat(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteIcebreakerChatMutationVariables,
  APITypes.DeleteIcebreakerChatMutation
>;
export const createRoleplayChat = /* GraphQL */ `mutation CreateRoleplayChat(
  $input: CreateRoleplayChatInput!
  $condition: ModelRoleplayChatConditionInput
) {
  createRoleplayChat(input: $input, condition: $condition) {
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
    owner
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateRoleplayChatMutationVariables,
  APITypes.CreateRoleplayChatMutation
>;
export const updateRoleplayChat = /* GraphQL */ `mutation UpdateRoleplayChat(
  $input: UpdateRoleplayChatInput!
  $condition: ModelRoleplayChatConditionInput
) {
  updateRoleplayChat(input: $input, condition: $condition) {
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
    owner
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateRoleplayChatMutationVariables,
  APITypes.UpdateRoleplayChatMutation
>;
export const deleteRoleplayChat = /* GraphQL */ `mutation DeleteRoleplayChat(
  $input: DeleteRoleplayChatInput!
  $condition: ModelRoleplayChatConditionInput
) {
  deleteRoleplayChat(input: $input, condition: $condition) {
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
    owner
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteRoleplayChatMutationVariables,
  APITypes.DeleteRoleplayChatMutation
>;
export const createRoleplaySummary = /* GraphQL */ `mutation CreateRoleplaySummary(
  $input: CreateRoleplaySummaryInput!
  $condition: ModelRoleplaySummaryConditionInput
) {
  createRoleplaySummary(input: $input, condition: $condition) {
    id
    summary
    user
    roleplayId
    scenario
    difficulty
    owner
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateRoleplaySummaryMutationVariables,
  APITypes.CreateRoleplaySummaryMutation
>;
export const updateRoleplaySummary = /* GraphQL */ `mutation UpdateRoleplaySummary(
  $input: UpdateRoleplaySummaryInput!
  $condition: ModelRoleplaySummaryConditionInput
) {
  updateRoleplaySummary(input: $input, condition: $condition) {
    id
    summary
    user
    roleplayId
    scenario
    difficulty
    owner
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateRoleplaySummaryMutationVariables,
  APITypes.UpdateRoleplaySummaryMutation
>;
export const deleteRoleplaySummary = /* GraphQL */ `mutation DeleteRoleplaySummary(
  $input: DeleteRoleplaySummaryInput!
  $condition: ModelRoleplaySummaryConditionInput
) {
  deleteRoleplaySummary(input: $input, condition: $condition) {
    id
    summary
    user
    roleplayId
    scenario
    difficulty
    owner
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteRoleplaySummaryMutationVariables,
  APITypes.DeleteRoleplaySummaryMutation
>;
export const createOpenAIChatFunc = /* GraphQL */ `mutation CreateOpenAIChatFunc($input: CreateOpenAIChatFuncInput) {
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
` as GeneratedMutation<
  APITypes.CreateOpenAIChatFuncMutationVariables,
  APITypes.CreateOpenAIChatFuncMutation
>;
export const chatIcebreakerFunc = /* GraphQL */ `mutation ChatIcebreakerFunc($input: ChatIcebreakerFuncInput) {
  chatIcebreakerFunc(input: $input) {
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
` as GeneratedMutation<
  APITypes.ChatIcebreakerFuncMutationVariables,
  APITypes.ChatIcebreakerFuncMutation
>;
export const generateUserSummaryFunc = /* GraphQL */ `mutation GenerateUserSummaryFunc($input: GenerateUserSummaryFuncInput) {
  generateUserSummaryFunc(input: $input)
}
` as GeneratedMutation<
  APITypes.GenerateUserSummaryFuncMutationVariables,
  APITypes.GenerateUserSummaryFuncMutation
>;
export const chatRoleplayFunc = /* GraphQL */ `mutation ChatRoleplayFunc($input: RoleplayChatFuncInput) {
  chatRoleplayFunc(input: $input) {
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
    owner
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.ChatRoleplayFuncMutationVariables,
  APITypes.ChatRoleplayFuncMutation
>;
export const generateRoleplaySummaryFunc = /* GraphQL */ `mutation GenerateRoleplaySummaryFunc($input: GenerateRoleplaySummaryFuncInput) {
  generateRoleplaySummaryFunc(input: $input) {
    id
    summary
    user
    roleplayId
    scenario
    difficulty
    owner
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.GenerateRoleplaySummaryFuncMutationVariables,
  APITypes.GenerateRoleplaySummaryFuncMutation
>;
