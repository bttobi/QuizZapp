import { http } from 'msw';
import exploreResponse from '../mocks/data/explore.testdata.json';

export const handlers = [
  http.get('/api/explore/1', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ exploreResponse }));
  }),
];
