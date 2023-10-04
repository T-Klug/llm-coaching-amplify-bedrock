import performanceImage from '../assets/performance.jpg';
import pipImage from '../assets/pip.jpg';

export const scenarios = [
  {
    image: performanceImage,
    title: 'One on one',
    scenario: 'You will act as an employee in a one on one chat',
    message:
      'You are tasked with having a one on one with one of your employees',
  },
  {
    image: pipImage,
    title: 'Personal improvement plan',
    scenario:
      'You will act as an employee recieving a performance improvement plan',
    message:
      'You are tasked with giving your employee a performance improvement plan. Work through giving the news.',
  },
];

export const difficulty = [
  {
    level: 1,
    name: 'Beginner',
    prompt:
      "Your behavior during this roleplay should be polite and receptive to the user's points",
  },
  {
    level: 2,
    name: 'Intermediate',
    prompt:
      "Your behavior during this roleplay should be neutral, occasionally challenging the user's points.",
  },
  {
    level: 3,
    name: 'Advanced',
    prompt:
      "Your behavior during this roleplay should be more challenging, occasionally pushing back on the user's points.",
  },
];
