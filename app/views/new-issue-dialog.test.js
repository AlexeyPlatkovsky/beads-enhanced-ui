import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createNewIssueDialog } from './new-issue-dialog.js';

if (typeof HTMLDialogElement !== 'undefined') {
  const proto = /** @type {any} */ (HTMLDialogElement.prototype);
  if (typeof proto.showModal !== 'function') {
    proto.showModal = function showModal() {
      this.setAttribute('open', '');
    };
    proto.close = function close() {
      this.removeAttribute('open');
    };
  }
}

describe('views/new-issue-dialog', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    window.localStorage.clear();
    document.body.innerHTML = '<div id="mount"></div>';
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('open restores saved defaults and focuses the title field', async () => {
    window.localStorage.setItem('beads-ui.new.type', 'bug');
    window.localStorage.setItem('beads-ui.new.priority', '1');
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));
    const dialog = createNewIssueDialog(
      mount,
      vi.fn(),
      { gotoIssue: vi.fn() },
      undefined
    );

    dialog.open();
    vi.runAllTimers();

    const type = /** @type {HTMLSelectElement} */ (
      document.getElementById('new-type')
    );
    const priority = /** @type {HTMLSelectElement} */ (
      document.getElementById('new-priority')
    );
    const title = /** @type {HTMLInputElement} */ (
      document.getElementById('new-title')
    );

    expect(type.value).toBe('bug');
    expect(priority.value).toBe('1');
    expect(document.activeElement).toBe(title);
  });

  test('shows validation error when title is missing', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));
    const sendFn = vi.fn();
    const dialog = createNewIssueDialog(
      mount,
      sendFn,
      { gotoIssue: vi.fn() },
      undefined
    );

    dialog.open();
    const form = /** @type {HTMLFormElement} */ (
      document.getElementById('new-issue-form')
    );
    form.dispatchEvent(
      new Event('submit', { bubbles: true, cancelable: true })
    );
    await Promise.resolve();

    const error = /** @type {HTMLElement} */ (
      document.getElementById('new-issue-error')
    );
    expect(error.textContent).toBe('Title is required');
    expect(sendFn).not.toHaveBeenCalled();
  });

  test('creates issue, applies labels, persists defaults, and navigates', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));
    const sendFn = vi.fn(async (type, payload) => {
      if (type === 'create-issue') {
        return { created: true, payload };
      }
      if (type === 'list-issues') {
        return [
          { id: 'UI-20', title: 'New bug' },
          { id: 'UI-25', title: 'New bug' }
        ];
      }
      return null;
    });
    const gotoIssue = vi.fn();
    const store = { setState: vi.fn(), getState: () => ({}) };
    const dialog = createNewIssueDialog(mount, sendFn, { gotoIssue }, store);

    dialog.open();
    vi.runAllTimers();

    /** @type {HTMLInputElement} */ (
      document.getElementById('new-title')
    ).value = 'New bug';
    /** @type {HTMLSelectElement} */ (
      document.getElementById('new-type')
    ).value = 'bug';
    /** @type {HTMLSelectElement} */ (
      document.getElementById('new-priority')
    ).value = '1';
    /** @type {HTMLInputElement} */ (
      document.getElementById('new-labels')
    ).value = 'alpha, beta';
    /** @type {HTMLTextAreaElement} */ (
      document.getElementById('new-description')
    ).value = 'Description';

    const form = /** @type {HTMLFormElement} */ (
      document.getElementById('new-issue-form')
    );
    form.dispatchEvent(
      new Event('submit', { bubbles: true, cancelable: true })
    );
    await vi.waitFor(() => {
      expect(gotoIssue).toHaveBeenCalledWith('UI-25');
    });

    expect(sendFn).toHaveBeenCalledWith('create-issue', {
      title: 'New bug',
      type: 'bug',
      priority: 1,
      description: 'Description'
    });
    expect(sendFn).toHaveBeenCalledWith('label-add', {
      id: 'UI-25',
      label: 'alpha'
    });
    expect(sendFn).toHaveBeenCalledWith('label-add', {
      id: 'UI-25',
      label: 'beta'
    });
    expect(gotoIssue).toHaveBeenCalledWith('UI-25');
    expect(store.setState).toHaveBeenCalledWith({ selected_id: 'UI-25' });
    expect(window.localStorage.getItem('beads-ui.new.type')).toBe('bug');
    expect(window.localStorage.getItem('beads-ui.new.priority')).toBe('1');
    expect(
      /** @type {HTMLDialogElement} */ (
        document.getElementById('new-issue-dialog')
      ).hasAttribute('open')
    ).toBe(false);
  });
});
