import { getBaseRoute } from './base.routes';

export const getLeaderboardRoute = (page: number): string =>
  `${getBaseRoute()}/leaderboard/${page}`;
