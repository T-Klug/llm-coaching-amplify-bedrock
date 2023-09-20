import { API } from 'aws-amplify';
import { IcebreakerChat, OpenAIChat } from '../models';
import {
  ChatIcebreakerFuncInput,
  CreateOpenAIChatFuncMutation,
} from '../graphql/API';
import { chatIcebreakerFunc, createOpenAIChatFunc } from '../graphql/mutations';
import { GraphQLQuery } from '@aws-amplify/api';

export const individualContributorHelperPrompts = [
  'I need help setting development goals at work.',
  'I need help building my confidence.',
  'I felt really overwhelmed at work this week.',
  'Help me write a status email to my manager.',
  'My manager never gives me feedback.',
];

export const managerHelperPrompts = [
  'I need help setting development goals at work.',
  'I felt really overwhelmed at work this week.',
  'My team told me they were burned out this week, and I am not sure what to do.',
];

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
  await API.graphql<GraphQLQuery<ChatIcebreakerFuncInput>>({
    query: chatIcebreakerFunc,
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
