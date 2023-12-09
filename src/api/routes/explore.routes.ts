import { getBaseRoute } from '../routes/base.routes';

export const getExploreRoute = (page: number) => {
  return `${getBaseRoute()}/explore/${page}`;
};
