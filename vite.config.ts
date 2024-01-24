import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig(() => ({
  plugins: [react()],
  base: '/QuizZapp/',
  define: {
    global: 'window',
  },
  test: {
    setupFiles: ['./vitest.setup.ts'],
    include: ['**/*.test.tsx'],
    globals: true,
    environment: 'jsdom',
    deps: {
      optimizer: {
        web: {
          include: ['vitest-canvas-mock'],
        },
      },
    },
  },
}));
