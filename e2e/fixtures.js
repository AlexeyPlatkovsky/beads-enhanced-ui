/**
 * Playwright fixtures for beads-ui E2E tests.
 *
 * appPage: navigates to the app root and waits for the shell to mount.
 * wsConnected: extends appPage and waits for WebSocket to signal a
 *   workspace reply before handing control to the test.
 */
import { expect, test as base } from '@playwright/test';

/**
 * Wait for the app shell to mount (the header + main#app are present in the DOM).
 *
 * @param {import('@playwright/test').Page} page
 */
async function waitForAppShell(page) {
  await page.waitForSelector('header.app-header', { timeout: 10_000 });
  await page.waitForSelector('#app', { timeout: 5_000 });
}

/**
 * Wait for the WebSocket to establish and return initial workspace state.
 * We detect this by waiting for the workspace-picker element to finish its
 * loading indicator (or for the workspace label / select to appear).
 *
 * @param {import('@playwright/test').Page} page
 */
async function waitForWsReady(page) {
  // The workspace picker hides its loading indicator once the WS reply arrives.
  // Wait for either: a workspace label (single workspace) or the select (multi).
  await expect(
    page.locator('[data-testid="workspace-picker"]')
  ).toBeVisible({ timeout: 10_000 });
  // Then wait for the loading spinner inside the picker to disappear.
  await expect(
    page.locator('[data-testid="workspace-picker-loading"]')
  ).toBeHidden({ timeout: 10_000 });
}

export const test = base.extend({
  /** Navigates to the app root and waits for the shell to mount. */
  appPage: async ({ page }, use) => {
    await page.goto('/');
    await waitForAppShell(page);
    await use(page);
  },

  /** Extends appPage — also waits for WebSocket + workspace to be ready. */
  wsConnectedPage: async ({ page }, use) => {
    await page.goto('/');
    await waitForAppShell(page);
    await waitForWsReady(page);
    await use(page);
  }
});

export { expect };
