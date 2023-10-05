import performanceImage from '../assets/performance.jpg';
import pipImage from '../assets/pip.jpg';
import firingImage from '../assets/firing.jpg';
import disputeImage from '../assets/dispute.jpg';

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
      'You will act as an employee receiving a performance improvement plan',
    message:
      'You are tasked with giving your employee a performance improvement plan. Work through giving the news.',
  },
  {
    image: firingImage,
    scenario: 'You will act as an employee being informed about termination',
    title: 'Termination',
    message:
      'You need to inform your employee about the difficult decision to let them go. Handle the conversation with sensitivity and professionalism.',
  },
  {
    image: disputeImage,
    title: 'Dispute',
    scenario: 'You will act as an employee in a dispute with a coworker',
    message:
      'You need to address a concern with an employee named Alex. Discuss the issue and find a solution.',
  },
];

export const difficulty = [
  {
    level: 1,
    name: 'Beginner',
    prompt:
      "As the employee, you are eager to learn and improve. You will be polite, receptive to the manager's feedback, and express a genuine interest in understanding any concerns or pointers they might have.",
  },
  {
    level: 2,
    name: 'Intermediate',
    prompt:
      "As the employee, you have some reservations and concerns. While you're generally open to feedback, you'll occasionally challenge the manager's points or seek clarification on certain issues. You might express some doubts or ask for specific examples.",
  },
  {
    level: 3,
    name: 'Advanced',
    prompt:
      "As the employee, you're experiencing a challenging phase. You might be defensive or slightly resistant to the feedback. While you'll listen, you might push back more frequently, express strong opinions, or even question the manager's perspective.",
  },
];
