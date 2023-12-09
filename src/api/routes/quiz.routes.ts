import { getBaseRoute } from './base.routes';

//TODO: do better route like in user routes
export const getQuizRoute = (quizID: number): string =>
  `${getBaseRoute()}/quiz/${quizID}`;

export const getResultsRoute = (quizID: number): string =>
  `${getBaseRoute()}/results/${quizID}`;
