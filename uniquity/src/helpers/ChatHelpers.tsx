import { API } from 'aws-amplify';
import { IcebreakerChat, OpenAIChat, RoleplayChat } from '../models';
import {
  ChatIcebreakerFuncMutation,
  ChatRoleplayFuncMutation,
  CreateOpenAIChatFuncMutation,
  GenerateRoleplaySummaryFuncMutation,
} from '../graphql/API';
import {
  chatIcebreakerFunc,
  chatRoleplayFunc,
  createOpenAIChatFunc,
  generateRoleplaySummaryFunc,
  generateUserSummaryFunc,
} from '../graphql/mutations';
import { GraphQLQuery } from '@aws-amplify/api';

export const iOS =
  typeof navigator !== 'undefined' &&
  /iPad|iPhone|iPod/.test(navigator.userAgent);

export const submitOpenAI = async (response: OpenAIChat) => {
  const saveModel = OpenAIChat.copyOf(response, draft => draft);
  const functionInput = {
    id: saveModel.id,
    messages: saveModel.messages,
  };
  await API.graphql<GraphQLQuery<CreateOpenAIChatFuncMutation>>({
    query: createOpenAIChatFunc,
    variables: { input: functionInput },
  });
};

export const submitIceBreaker = async (response: IcebreakerChat) => {
  const saveModel = IcebreakerChat.copyOf(response, draft => draft);
  const functionInput = {
    id: saveModel.id,
    messages: saveModel.messages,
  };
  await API.graphql<GraphQLQuery<ChatIcebreakerFuncMutation>>({
    query: chatIcebreakerFunc,
    variables: { input: functionInput },
  });
};

export const submitRoleplayChat = async (response: RoleplayChat) => {
  const saveModel = RoleplayChat.copyOf(response, draft => draft);
  const functionInput = {
    id: saveModel.id,
    messages: saveModel.messages,
    scenario: saveModel.scenario,
    difficulty: saveModel.difficulty,
  };
  await API.graphql<GraphQLQuery<ChatRoleplayFuncMutation>>({
    query: chatRoleplayFunc,
    variables: { input: functionInput },
  });
};

export const generateUserSummaryCall = async () => {
  return await API.graphql({
    query: generateUserSummaryFunc,
  });
};

export const generateRoleplaySummary = async (roleplayId: string) => {
  const functionInput = {
    roleplayId: roleplayId,
  };
  return await API.graphql<GraphQLQuery<GenerateRoleplaySummaryFuncMutation>>({
    query: generateRoleplaySummaryFunc,
    variables: { input: functionInput },
  });
};

export function compareDates(date: Date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const weekAgo = new Date(today);
  weekAgo.setDate(today.getDate() - 7);

  const monthAgo = new Date(today);
  monthAgo.setMonth(today.getMonth() - 1);

  date = new Date(date);
  date.setHours(0, 0, 0, 0);

  if (+date === +today) {
    return 'Today';
  } else if (+date === +yesterday) {
    return 'Yesterday';
  } else if (+date > +weekAgo && +date < +yesterday) {
    return 'This week';
  } else {
    return 'Other';
  }
}
