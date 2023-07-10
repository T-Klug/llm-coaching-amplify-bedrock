export const listOpenAIChats = /* GraphQL */ `
  query ListOpenAIChats(
    $filter: ModelOpenAIChatFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOpenAIChats(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        owner
      }
      nextToken
    }
  }
`;

export const listOpenAIChatsUser = /* GraphQL */ `
  query ListOpenAIChats(
    $filter: ModelOpenAIChatFilterInput
    $nextToken: String
  ) {
    listOpenAIChats(filter: $filter, nextToken: $nextToken) {
      items {
        id
        messages {
          role
          content
          __typename
        }
        owner
        updatedAt
      }
      nextToken
    }
  }
`;

export const listUserSpecificPrompts = /* GraphQL */ `
  query ListUserSpecificPrompts(
    $filter: ModelUserSpecificPromptFilterInput
    $nextToken: String
  ) {
    listUserSpecificPrompts(filter: $filter, nextToken: $nextToken) {
      items {
        id
        userId
        prompt
        lastChatId
        _version
      }
      nextToken
    }
  }
`;

export const updateUserSpecificPrompt = /* GraphQL */ `
  mutation UpdateUserSpecificPrompt($input: UpdateUserSpecificPromptInput!) {
    updateUserSpecificPrompt(input: $input) {
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

export const createUserSpecificPrompt = /* GraphQL */ `
  mutation CreateUserSpecificPrompt($input: CreateUserSpecificPromptInput!) {
    createUserSpecificPrompt(input: $input) {
      id
      userId
      prompt
      lastChatId
    }
  }
`;
