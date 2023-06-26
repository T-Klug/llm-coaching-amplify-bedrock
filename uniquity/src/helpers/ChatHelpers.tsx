import { API } from 'aws-amplify';
import { OpenAIChat } from '../models';
import { CreateOpenAIChatFuncMutation } from '../graphql/API';
import { createOpenAIChatFunc } from '../graphql/mutations';
import { GraphQLQuery } from '@aws-amplify/api';

export const helperPrompts = [
  'I need help setting development goal at work.',
  'I need help building my confidence.',
  'I felt really overwhelmed at work this week.',
  'Help me write a status email to my manager.',
  'My team told me they were burned out this week, and I am not sure what to do.',
  'My manager never gives me feedback.',
  'I was in a meeting today and do not feel like people listened to what I had to say.',
];

export const intros = [
  'What did you enjoy most about today?',
  'Is there anything specific that made your day memorable?',
  "Is there something you accomplished today that you're proud of?",
  'Did you learn anything new or interesting today?',
  "Is there something you've been struggling with that you'd like to discuss?",
  "What's one thing that made you smile today?",
  "Is there a challenge or obstacle you're currently facing?",
  'Did you have any interesting conversations today? What were they about?',
  "Is there something you're looking forward to in the near future?",
  'Did you encounter any setbacks today? How did you handle them?',
  "Is there something you'd like to vent or express your frustrations about?",
  "Is there someone you'd like to thank or show appreciation to?",
  'Did you try something new or step out of your comfort zone today?',
  "Is there a decision you're currently struggling to make?",
  'Did you receive any feedback or criticism today? How did you handle it?',
  "Is there a goal or dream you're working towards? How's the progress?",
  'Did you make any meaningful connections or build new relationships today?',
  'Did you face any unexpected opportunities today? What were they?',
  'Did you encounter any moments of self-reflection or personal growth today?',
  "Is there something you're grateful for today?",
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
