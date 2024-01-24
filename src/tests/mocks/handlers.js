import { http, HttpResponse } from 'msw';
import exploreResponse from '../mocks/test-data/explore.json';
import leaderboardResponse from '../mocks/test-data/leaderboard.json';
import userstatsResponse from '../mocks/test-data/userstats.json';
import quizResponse from '../mocks/test-data/quiz.json';
import resultsResponse from '../mocks/test-data/results.json';
import editquizResponse from '../mocks/test-data/editquiz.json';
import homeResponse from '../mocks/test-data/home.json';
import editquestionsResponse from '../mocks/test-data/editquestions.json';
import editquestionResponse from '../mocks/test-data/editquestion.json';
import userpointsResponse from '../mocks/test-data/userpoints.json';
import { getExploreRoute } from '../../api/routes/explore.routes';
import { getLeaderboardRoute } from '../../api/routes/leaderboard.routes';
import {
  getUserScoresRoute,
  getStatsRoute,
} from '../../api/routes/score.routes';
import {
  getQuestionsRoute,
  getEditQuizRoute,
  getQuizRoute,
  getEditQuestionRoute,
  getResultsRoute,
} from '../../api/routes/quiz.routes';
import { getUserRanking } from '../../api/routes/user.routes';

export const handlers = [
  http.get(getStatsRoute(), async () => {
    return HttpResponse.json(homeResponse);
  }),
  http.get(getExploreRoute(1), async () => {
    return HttpResponse.json(exploreResponse);
  }),
  http.get(getLeaderboardRoute(1), async () => {
    return HttpResponse.json(leaderboardResponse);
  }),
  http.get(getUserScoresRoute(1), async () => {
    return HttpResponse.json(userstatsResponse);
  }),
  http.get(getQuizRoute(1), async () => {
    return HttpResponse.json(quizResponse);
  }),
  http.get(getResultsRoute(1), async () => {
    return HttpResponse.json(resultsResponse);
  }),
  http.post(getResultsRoute(1), async ({ req }) => {
    console.log(req.body);
    return HttpResponse.status(200);
  }),
  http.get(getEditQuizRoute(1), async () => {
    return HttpResponse.json(editquizResponse);
  }),
  http.get(getQuestionsRoute(1), async () => {
    return HttpResponse.json(editquestionsResponse);
  }),
  http.get(getEditQuestionRoute(1, 1), async () => {
    return HttpResponse.json(editquestionResponse);
  }),
  http.get(getUserRanking('test@gmail.com'), async () => {
    return HttpResponse.json(userpointsResponse);
  }),
];
