import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      include: ['app/**/*.js'],
      exclude: ['app/**/*.test.js', 'app/main.bundle.js'],
      reporter: ['text', 'lcov', 'html', 'json-summary'],
      reportsDirectory: 'coverage',
      thresholds: {
        lines: 65,
        functions: 65,
        branches: 55,
        statements: 65
      }
    },
    projects: [
      {
        test: {
          name: 'node',
          include: ['**/*.test.js'],
          exclude: ['app/**/*.test.js', 'node_modules/**'],
          environment: 'node',
          restoreMocks: true
        }
      },
      {
        test: {
          name: 'jsdom',
          setupFiles: ['test/setup-vitest.js'],
          include: ['app/**/*.test.js'],
          environment: 'jsdom',
          restoreMocks: true
        }
      }
    ]
  }
});
