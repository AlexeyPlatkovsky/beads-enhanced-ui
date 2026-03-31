/**
 * E2E smoke tests: boot, routing, workspace selection, and connection states.
 *
 * These tests verify that the app boots correctly in a real browser and that
 * the critical UI landmarks are present before any user interaction occurs.
 * They pass with or without a populated workspace database.
 */
import { expect, test } from './fixtures.js';

test.describe('app boot', () => {
  test('HTML document loads with correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle('Beads');
  });

  test('app header renders with title and action bar', async ({ appPage: page }) => {
    await expect(page.locator('header.app-header')).toBeVisible();
    await expect(page.locator('h1.app-title')).toHaveText('Beads');
    await expect(page.locator('#new-issue-btn')).toBeVisible();
    await expect(page.locator('#theme-switch')).toBeVisible();
  });

  test('main app shell mounts inside #app', async ({ appPage: page }) => {
    await expect(page.locator('#app')).toBeVisible();
    // The shell contains at least one route section
    await expect(page.locator('#issues-root')).toBeAttached();
  });

  test('healthz endpoint returns ok', async ({ request }) => {
    const res = await request.get('/healthz');
    expect(res.ok()).toBe(true);
    const body = await res.json();
    expect(body.ok).toBe(true);
  });
});

test.describe('routing: navigation tabs', () => {
  test('navigation renders Issues, Epics, and Board tabs', async ({ wsConnectedPage: page }) => {
    const nav = page.locator('[data-testid="top-nav"]');
    await expect(nav).toBeVisible();
    await expect(page.locator('[data-testid="nav-tab-issues"]')).toBeVisible();
    await expect(page.locator('[data-testid="nav-tab-epics"]')).toBeVisible();
    await expect(page.locator('[data-testid="nav-tab-board"]')).toBeVisible();
  });

  test('Issues tab is active by default', async ({ wsConnectedPage: page }) => {
    const issuesTab = page.locator('[data-testid="nav-tab-issues"]');
    await expect(issuesTab).toHaveClass(/active/);
  });

  test('clicking Epics tab shows epics route', async ({ wsConnectedPage: page }) => {
    await page.locator('[data-testid="nav-tab-epics"]').click();
    await expect(page.locator('#epics-root')).not.toHaveAttribute('hidden');
    await expect(page.locator('#issues-root')).toHaveAttribute('hidden', '');
  });

  test('clicking Board tab shows board route', async ({ wsConnectedPage: page }) => {
    await page.locator('[data-testid="nav-tab-board"]').click();
    await expect(page.locator('#board-root')).not.toHaveAttribute('hidden');
  });

  test('clicking Issues tab after switching returns to issues route', async ({ wsConnectedPage: page }) => {
    await page.locator('[data-testid="nav-tab-epics"]').click();
    await page.locator('[data-testid="nav-tab-issues"]').click();
    await expect(page.locator('#issues-root')).not.toHaveAttribute('hidden');
    await expect(page.locator('[data-testid="nav-tab-issues"]')).toHaveClass(/active/);
  });
});

test.describe('workspace selection', () => {
  test('workspace picker renders in header', async ({ wsConnectedPage: page }) => {
    await expect(
      page.locator('[data-testid="workspace-picker"]')
    ).toBeVisible();
  });

  test('workspace loading indicator disappears after WS handshake', async ({ wsConnectedPage: page }) => {
    await expect(
      page.locator('[data-testid="workspace-picker-loading"]')
    ).toBeHidden();
  });

  test('workspace picker shows at least one workspace option', async ({ wsConnectedPage: page }) => {
    const picker = page.locator('[data-testid="workspace-picker"]');
    // Single-workspace: label; multi-workspace: select element
    const labelOrSelect = picker.locator(
      '[data-testid="workspace-picker-label"], [data-testid="workspace-picker-select"]'
    );
    await expect(labelOrSelect).toBeVisible();
  });
});

test.describe('connection states', () => {
  test('app does not show fatal error dialog on successful WS connection', async ({ wsConnectedPage: page }) => {
    // Fatal error dialog should not be present in the DOM
    await expect(
      page.locator('[data-testid="fatal-error-dialog"]')
    ).not.toBeVisible();
  });

  test('no uncaught JavaScript errors during boot', async ({ page }) => {
    /** @type {string[]} */
    const errors = [];
    page.on('pageerror', (err) => errors.push(err.message));
    await page.goto('/');
    await page.waitForSelector('#app', { timeout: 10_000 });
    // Give the app a moment to fully initialize
    await page.waitForTimeout(1_000);
    expect(errors).toHaveLength(0);
  });
});
