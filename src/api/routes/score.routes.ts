import { getBaseRoute } from './base.routes';

export const getUserScoresRoute = (userID: number): string =>
  `${getBaseRoute()}/scores/all/${userID}`;

export const getStatsRoute = (): string => `${getBaseRoute()}/scores/all`;
