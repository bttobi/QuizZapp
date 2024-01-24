import '@testing-library/jest-dom';
import 'vitest-canvas-mock';
import { server } from './src/tests/mocks/server';

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'warn' });
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
