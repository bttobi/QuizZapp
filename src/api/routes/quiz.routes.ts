import { getBaseRoute } from './base.routes';

//TODO: do better route like in user routes
export const getQuizRoute = (quizID: number): string =>
  `${getBaseRoute()}/quiz/${quizID}`;

export const postAnswersRoute = (quizID: number): string =>
  `${getBaseRoute()}/answers/${quizID}`;

export const getResultsRoute = (quizID: number, userEmail: string): string =>
  `${getBaseRoute()}/results/${userEmail}/${quizID}`;
