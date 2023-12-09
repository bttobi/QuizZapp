import { getBaseRoute } from '../routes/base.routes';

export const getExploreRoute = (page: number): string =>
  `${getBaseRoute()}/explore/${page}`;
