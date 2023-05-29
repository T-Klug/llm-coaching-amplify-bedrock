/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSystemPrompt = /* GraphQL */ `
  mutation CreateSystemPrompt(
    $input: CreateSystemPromptInput!
    $condition: ModelSystemPromptConditionInput
  ) {
    createSystemPrompt(input: $input, condition: $condition) {
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
export const updateSystemPrompt = /* GraphQL */ `
  mutation UpdateSystemPrompt(
    $input: UpdateSystemPromptInput!
    $condition: ModelSystemPromptConditionInput
  ) {
    updateSystemPrompt(input: $input, condition: $condition) {
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
export const deleteSystemPrompt = /* GraphQL */ `
  mutation DeleteSystemPrompt(
    $input: DeleteSystemPromptInput!
    $condition: ModelSystemPromptConditionInput
  ) {
    deleteSystemPrompt(input: $input, condition: $condition) {
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
