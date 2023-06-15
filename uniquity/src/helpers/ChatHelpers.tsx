import { API } from 'aws-amplify';
import { OpenAIChat } from '../models';
import { CreateOpenAIChatFuncMutation } from '../graphql/API';
import { createOpenAIChatFunc } from '../graphql/mutations';
import { GraphQLQuery } from '@aws-amplify/api';

export const helperPrompts = [
  'Can you help me with prioritization?',
  'What are some goals I can set for myself?',
  'How can I communicate effectively to my team?',
  'I am burned out - What can I do?',
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
