import { getBaseRoute } from './base.routes';

//TODO: do better route like in user routes
export const getQuizRoute = (quizID: number): string =>
  `${getBaseRoute()}/quiz/${quizID}`;

export const postAnswersRoute = (quizID: number): string =>
  `${getBaseRoute()}/answers/${quizID}`;

export const getResultsRoute = (quizID: number): string =>
  `${getBaseRoute()}/results/${quizID}`;

export const postCreateQuizRoute = (): string =>
  `${getBaseRoute()}/quiz/create`;

export const postDeleteQuizzesRoute = (): string =>
  `${getBaseRoute()}/quiz/delete`;

export const postEditQuizRoute = (quizID: number): string =>
  `${getBaseRoute()}/quiz/edit/${quizID}`;

export const getEditQuizRoute = (quizID: number): string =>
  `${getBaseRoute()}/quiz/edit/${quizID}`;

export const postCreateQuestionRoute = (quizID: number): string =>
  `${getBaseRoute()}/quiz/${quizID}/question/create`;

export const getQuestionsRoute = (quizID: number): string =>
  `${getBaseRoute()}/quiz/${quizID}/questions/edit`;

export const postEditQuestionRoute = (
  quizID: number,
  questionID: number
): string => `${getBaseRoute()}/quiz/${quizID}/question/edit/${questionID}`;

export const getEditQuestionRoute = (
  quizID: number,
  questionID: number
): string => `${getBaseRoute()}/quiz/${quizID}/question/edit/${questionID}`;

export const postDeleteQuestionsRoute = (quizID: number): string =>
  `${getBaseRoute()}/quiz/${quizID}/questions/delete`;
