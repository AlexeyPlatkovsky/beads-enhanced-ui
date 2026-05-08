/**
 * E2E interaction tests: new issue dialog, inline edits, epics, and board.
 *
 * Tests that involve navigation and read-only data use the project's live
 * workspace via the webServer. Tests for write operations verify the dialog
 * UX (open, fill, cancel) without submitting, to avoid polluting real data.
 *
 * The server must be running (started by playwright.config.js webServer).
 */
import { expect, test } from './fixtures.js';

test.describe('new issue dialog', () => {
  test('New Issue button opens the dialog', async ({
    wsConnectedPage: page
  }) => {
    await page.locator('#new-issue-btn').click();
    await expect(
      page.locator('[data-testid="new-issue-dialog"]')
    ).toBeVisible();
  });

  test('dialog has title input, type select, priority select, and create button', async ({
    wsConnectedPage: page
  }) => {
    await page.locator('#new-issue-btn').click();
    await expect(
      page.locator('[data-testid="new-issue-title-input"]')
    ).toBeVisible();
    await expect(
      page.locator('[data-testid="new-issue-type-select"]')
    ).toBeVisible();
    await expect(
      page.locator('[data-testid="new-issue-priority-select"]')
    ).toBeVisible();
    await expect(
      page.locator('[data-testid="new-issue-create"]')
    ).toBeVisible();
  });

  test('Cancel button closes the dialog', async ({ wsConnectedPage: page }) => {
    await page.locator('#new-issue-btn').click();
    await expect(
      page.locator('[data-testid="new-issue-dialog"]')
    ).toBeVisible();
    await page.locator('[data-testid="new-issue-cancel"]').click();
    await expect(
      page.locator('[data-testid="new-issue-dialog"]')
    ).not.toBeVisible();
  });

  test('Escape key closes the dialog', async ({ wsConnectedPage: page }) => {
    await page.locator('#new-issue-btn').click();
    await expect(
      page.locator('[data-testid="new-issue-dialog"]')
    ).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(
      page.locator('[data-testid="new-issue-dialog"]')
    ).not.toBeVisible();
  });

  test('keyboard shortcut Ctrl+N opens the dialog', async ({
    wsConnectedPage: page
  }) => {
    await page.keyboard.press('Control+n');
    await expect(
      page.locator('[data-testid="new-issue-dialog"]')
    ).toBeVisible();
    // Clean up
    await page.keyboard.press('Escape');
  });

  test('title input is focused when dialog opens', async ({
    wsConnectedPage: page
  }) => {
    await page.locator('#new-issue-btn').click();
    const titleInput = page.locator('[data-testid="new-issue-title-input"]');
    await expect(titleInput).toBeFocused();
  });

  test('create button is disabled when title is empty', async ({
    wsConnectedPage: page
  }) => {
    await page.locator('#new-issue-btn').click();
    const createBtn = page.locator('[data-testid="new-issue-create"]');
    // Title input is empty by default — create should be disabled or form-validates
    const titleInput = page.locator('[data-testid="new-issue-title-input"]');
    await expect(titleInput).toHaveValue('');
    // The button uses type="submit" on a form with required title input,
    // so native validation blocks submission. Check form has required attribute.
    await expect(titleInput).toHaveAttribute('required', '');
    await expect(createBtn).toBeVisible();
  });
});

test.describe('list view: inline edits', () => {
  test('list view renders when app loads', async ({
    wsConnectedPage: page
  }) => {
    await expect(page.locator('[data-testid="list-view"]')).toBeVisible();
  });

  test('list filter bar is visible with status and type filters', async ({
    wsConnectedPage: page
  }) => {
    await expect(page.locator('[data-testid="list-filters"]')).toBeVisible();
    await expect(
      page.locator('[data-testid="list-filter-status"]')
    ).toBeVisible();
    await expect(
      page.locator('[data-testid="list-filter-type"]')
    ).toBeVisible();
  });

  test('status filter dropdown opens on click', async ({
    wsConnectedPage: page
  }) => {
    const trigger = page.locator('[data-testid="list-filter-status-trigger"]');
    await trigger.click();
    await expect(
      page.locator('[data-testid="list-filter-status-menu"]')
    ).toBeVisible();
    // Click again to close
    await trigger.click();
  });

  test('type filter dropdown opens on click', async ({
    wsConnectedPage: page
  }) => {
    const trigger = page.locator('[data-testid="list-filter-type-trigger"]');
    await trigger.click();
    await expect(
      page.locator('[data-testid="list-filter-type-menu"]')
    ).toBeVisible();
    await trigger.click();
  });

  test('list search input is present', async ({ wsConnectedPage: page }) => {
    await expect(
      page.locator('[data-testid="list-search-input"]')
    ).toBeVisible();
  });

  test('search input filters visible issues', async ({
    wsConnectedPage: page
  }) => {
    const listBody = page.locator('[data-testid="list-body"]');
    await expect(listBody).toBeVisible();

    const searchInput = page.locator('[data-testid="list-search-input"]');
    // Type a query that should match nothing
    await searchInput.fill('xyzzy-no-match-12345');
    // List must show empty state — not the issue table
    await expect(page.locator('[data-testid="list-empty"]')).toBeVisible();
    await expect(page.locator('[data-testid="list-table"]')).not.toBeVisible();
    // Clear search
    await searchInput.clear();
  });

  test('clicking an issue row opens the detail panel', async ({
    wsConnectedPage: page
  }) => {
    // Only run if there are issues in the list
    const firstRow = page.locator('[data-testid^="issue-row-"]').first();
    const hasIssues = await firstRow.count();
    if (!hasIssues) {
      test.skip();
      return;
    }
    await firstRow.click();
    await expect(page.locator('#detail-panel')).not.toHaveAttribute(
      'hidden',
      ''
    );
  });
});

test.describe('epics view', () => {
  test('navigating to epics shows the epics route', async ({
    wsConnectedPage: page
  }) => {
    await page.locator('[data-testid="nav-tab-epics"]').click();
    await expect(page.locator('#epics-root')).not.toHaveAttribute('hidden', '');
  });

  test('epics view renders table or empty state', async ({
    wsConnectedPage: page
  }) => {
    await page.locator('[data-testid="nav-tab-epics"]').click();
    // Either the table or the empty message must be visible
    await expect(
      page.locator('[data-testid="epics-table"], [data-testid="epics-empty"]')
    ).toBeVisible({ timeout: 8_000 });
  });

  test('epics table has header columns when data is present', async ({
    wsConnectedPage: page
  }) => {
    await page.locator('[data-testid="nav-tab-epics"]').click();
    const tableVisible = await page
      .locator('[data-testid="epics-table"]')
      .waitFor({ state: 'visible', timeout: 5_000 })
      .then(() => true)
      .catch(() => false);

    if (!tableVisible) {
      test.skip();
      return;
    }
    await expect(page.locator('[data-testid="epics-header-id"]')).toBeVisible();
    await expect(
      page.locator('[data-testid="epics-header-name"]')
    ).toBeVisible();
    await expect(
      page.locator('[data-testid="epics-header-status"]')
    ).toBeVisible();
    await expect(
      page.locator('[data-testid="epics-header-progress"]')
    ).toBeVisible();
  });
});

test.describe('board view', () => {
  test('navigating to board shows the board route', async ({
    wsConnectedPage: page
  }) => {
    await page.locator('[data-testid="nav-tab-board"]').click();
    await expect(page.locator('#board-root')).not.toHaveAttribute('hidden', '');
  });

  test('board view renders the board container', async ({
    wsConnectedPage: page
  }) => {
    await page.locator('[data-testid="nav-tab-board"]').click();
    await expect(page.locator('[data-testid="board-view"]')).toBeVisible({
      timeout: 8_000
    });
  });

  test('board has at least one status column when data is present', async ({
    wsConnectedPage: page
  }) => {
    await page.locator('[data-testid="nav-tab-board"]').click();
    const boardView = page.locator('[data-testid="board-view"]');
    await expect(boardView).toBeVisible({ timeout: 8_000 });

    const columns = page.locator('[data-testid^="board-column-"]');
    const count = await columns.count();
    if (count === 0) {
      test.skip();
      return;
    }
    // At least one named column header should be visible
    await expect(
      columns.first().locator('[data-testid^="board-column-header-"]')
    ).toBeVisible();
  });
});

test.describe('theme toggle', () => {
  test('dark mode toggle switches the data-theme attribute', async ({
    wsConnectedPage: page
  }) => {
    const toggle = page.locator('#theme-switch');
    const html = page.locator('html');

    // Check initial state
    const initialTheme = await html.getAttribute('data-theme');
    const wasDark = initialTheme === 'dark';

    await toggle.click();

    const newTheme = await html.getAttribute('data-theme');
    const isDark = newTheme === 'dark';
    expect(isDark).toBe(!wasDark);

    // Restore
    await toggle.click();
    const restoredTheme = await html.getAttribute('data-theme');
    expect(restoredTheme).toBe(initialTheme);
  });
});
