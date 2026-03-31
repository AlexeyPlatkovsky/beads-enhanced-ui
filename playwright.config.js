// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for beads-ui E2E tests.
 *
 * The webServer starts the real Node/Express server on a dedicated port so
 * tests run against live WebSocket + bd-CLI infrastructure. Smoke tests pass
 * without any workspace data; interaction tests use the project's own workspace
 * (read paths only — write paths test dialog flow without submitting).
 *
 * Before running locally:
 *   npm run build          # regenerate app/main.bundle.js
 *   npm run test:e2e       # run all E2E tests
 *
 * Browser binaries must be installed separately:
 *   npx playwright install chromium
 */
export default defineConfig({
  testDir: './e2e',
  testMatch: '**/*.test.js',

  // Run each test file in its own worker for isolation
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,

  reporter: [['list'], ['html', { open: 'never', outputFolder: '.playwright/report' }]],

  use: {
    baseURL: 'http://127.0.0.1:3999',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'off'
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], headless: true }
    }
  ],

  webServer: {
    command: 'node server/index.js --port 3999',
    url: 'http://127.0.0.1:3999/healthz',
    reuseExistingServer: !process.env.CI,
    timeout: 15_000,
    stdout: 'ignore',
    stderr: 'pipe'
  }
});
