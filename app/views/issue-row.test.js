import { render } from 'lit-html';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { createIssueRowRenderer } from './issue-row.js';

describe('views/issue-row', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  test('edits title inline and submits changes on Enter', async () => {
    const mount = document.createElement('table');
    document.body.appendChild(mount);
    const onUpdate = vi.fn().mockResolvedValue(undefined);
    const navigate = vi.fn();
    const issue = { id: 'UI-1', title: 'Old title', priority: 2 };
    const row = createIssueRowRenderer({
      navigate,
      onUpdate,
      requestRender: () => {
        render(row(issue), mount);
      }
    });

    render(row(issue), mount);

    const display = /** @type {HTMLElement} */ (
      mount.querySelector('[data-testid="issue-row-UI-1-title-display"]')
    );
    display.click();
    await Promise.resolve();

    const input = /** @type {HTMLInputElement} */ (
      mount.querySelector('[data-testid="issue-row-UI-1-title-input"]')
    );
    input.value = 'Updated title';
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await Promise.resolve();

    expect(onUpdate).toHaveBeenCalledWith('UI-1', { title: 'Updated title' });
    expect(navigate).not.toHaveBeenCalled();
  });

  test('ignores row navigation when interacting with form controls', () => {
    const mount = document.createElement('table');
    document.body.appendChild(mount);
    const navigate = vi.fn();
    const row = createIssueRowRenderer({
      navigate,
      onUpdate: vi.fn().mockResolvedValue(undefined),
      requestRender: () => {}
    });

    render(
      row({
        id: 'UI-2',
        title: 'Title',
        status: 'open',
        priority: 2
      }),
      mount
    );

    const select = /** @type {HTMLSelectElement} */ (
      mount.querySelector('[data-testid="issue-row-UI-2-status-select"]')
    );
    select.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(navigate).not.toHaveBeenCalled();
  });

  test('can hide dependency column when disabled', () => {
    const mount = document.createElement('table');
    document.body.appendChild(mount);
    const row = createIssueRowRenderer({
      navigate: () => {},
      onUpdate: vi.fn().mockResolvedValue(undefined),
      requestRender: () => {},
      show_dependencies: false
    });

    render(
      row({
        id: 'UI-3',
        title: 'Title',
        dependency_count: 2,
        dependent_count: 1
      }),
      mount
    );

    expect(mount.querySelector('[data-testid="issue-row-UI-3-deps"]')).toBe(
      null
    );
  });
});
