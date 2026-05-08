import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json-summary'],
      exclude: [
        'app/main.js',
        'app/views/board.js',
        'app/views/detail.js',
        'server/app.js',
        'server/cli/open.js',
        'server/logging.js',
        'server/ws.js'
      ],
      thresholds: {
        lines: 85,
        functions: 85,
        branches: 75,
        statements: 85
      }
    },
    projects: [
      {
        test: {
          name: 'node',
          include: ['**/*.test.js'],
          exclude: ['app/**/*.test.js', 'e2e/**', 'node_modules/**'],
          environment: 'node',
          restoreMocks: true
        }
      },
      {
        test: {
          name: 'jsdom',
          setupFiles: ['test/setup-vitest.js'],
          include: ['app/**/*.test.js'],
          exclude: ['e2e/**', 'node_modules/**'],
          environment: 'jsdom',
          restoreMocks: true
        }
      }
    ]
  }
});
