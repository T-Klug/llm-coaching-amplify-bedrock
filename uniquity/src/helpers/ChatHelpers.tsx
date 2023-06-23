import { API } from 'aws-amplify';
import { OpenAIChat } from '../models';
import { CreateOpenAIChatFuncMutation } from '../graphql/API';
import { createOpenAIChatFunc } from '../graphql/mutations';
import { GraphQLQuery } from '@aws-amplify/api';

export const helperPrompts = [
  'I need help setting development goals.',
  'I feel overwhelmed and need help prioritizing my time.',
  'My team is burned out. What should I do?',
  'I am not good at delegating work. How can I change?',
];

export const intros = [
  "How was your adventure today? Is there a particular mountain you're preparing to climb that we can strategize over together?",
  'Can we explore your day? Are there any enigmas awaiting your attention that we can decode as a team?',
  'Tell me about your voyage today. Are there any roadblocks that you feel we could tackle head-on together?',
  "How's your story unfolding today? Are there any plot twists you'd like us to make sense of in unison?",
  "Are you ready to take today head-on? Is there a unique challenge that's beckoning for our joint problem-solving skills?",
  "How has your day been weaving itself? Any particular knots you'd like us to untangle together?",
  "What's the highlight of your journey today? Do you have a personal challenge we can turn into a victory together?",
  'How has the canvas of your day been painted? Any abstract scenarios we can interpret and refine together?',
  "Let's dive into your day. Are there any intriguing mazes you'd like us to navigate and find solutions for together?",
  "Tell me about your day's voyage. Are there any steep cliffs we can scale together to achieve your goals?",
  "Ready to dissect your day? Is there a unique labyrinth you're trying to navigate that we could unravel together?",
  "How was today's chapter in your life? Are there any riddles within it that we can solve as a team?",
  "Let's bring your day into focus. Are there any puzzles awaiting our collective brainpower?",
  "Walk me through your day. Are there any hurdles that you're keen to leap over with our combined effort?",
  "Can we rewind your day? Is there a particular puzzle you've stumbled upon that we can piece together?",
  "How's your day been? Are there any conundrums you're eager to solve with our pooled intellect?",
  "How was your path today? Any forks in the road you'd like us to explore and make sense of together?",
  "How did your day roll out? Is there a specific game plan you'd like us to draft together for your challenges?",
  "Let's discuss your journey today. Are there any obstacles you're determined to overcome with our combined strategy?",
  "What kind of day have you navigated through? Are there any roadblocks you're keen on dismantling with our cooperative effort?",
  "How did your saga unfold today? Is there a specific mystery you're hoping we can decipher together?",
  "What's the script of your day? Are there any intricate plots we can untangle together for your success?",
  "Let's explore your day. Are there any quandaries that you're eager to solve with our joint ingenuity?",
  "What's your narrative for the day? Any hurdles that you believe we can leap over together?",
  "How did your expedition go today? Any intriguing challenges you're keen on cracking with our combined insight?",
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
