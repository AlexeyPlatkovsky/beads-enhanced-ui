import { describe, expect, test, vi } from 'vitest';
import { createWorkspacePicker } from './workspace-picker.js';

function createStore(state) {
  let current = state;
  /** @type {Array<(state: any) => void>} */
  const subscribers = [];
  return {
    getState: () => current,
    subscribe(fn) {
      subscribers.push(fn);
      return () => {
        const index = subscribers.indexOf(fn);
        if (index >= 0) {
          subscribers.splice(index, 1);
        }
      };
    },
    setState(next) {
      current = next;
      for (const fn of subscribers) {
        fn(current);
      }
    }
  };
}

describe('views/workspace-picker', () => {
  test('shows a simple label when only one workspace is available', () => {
    const mount = document.createElement('div');
    const store = createStore({
      workspace: {
        current: { path: '/repo/current' },
        available: [{ path: '/repo/current' }]
      }
    });

    createWorkspacePicker(mount, store, vi.fn());

    expect(
      mount.querySelector('[data-testid="workspace-picker-label"]')?.textContent
    ).toBe('current');
    expect(
      mount.querySelector('[data-testid="workspace-picker-select"]')
    ).toBeNull();
  });

  test('disables select and shows loading indicator while switching', async () => {
    const mount = document.createElement('div');
    const store = createStore({
      workspace: {
        current: { path: '/repo/current' },
        available: [{ path: '/repo/current' }, { path: '/repo/other' }]
      }
    });
    let resolveChange;
    const onWorkspaceChange = vi.fn(
      () =>
        new Promise((resolve) => {
          resolveChange = resolve;
        })
    );

    createWorkspacePicker(mount, store, onWorkspaceChange);

    const select = /** @type {HTMLSelectElement} */ (
      mount.querySelector('[data-testid="workspace-picker-select"]')
    );
    select.value = '/repo/other';
    select.dispatchEvent(new Event('change'));

    expect(onWorkspaceChange).toHaveBeenCalledWith('/repo/other');
    expect(select.disabled).toBe(true);
    expect(
      mount.querySelector('[data-testid="workspace-picker-loading"]')
    ).toBeTruthy();

    resolveChange();
    await Promise.resolve();

    expect(
      /** @type {HTMLSelectElement} */ (
        mount.querySelector('[data-testid="workspace-picker-select"]')
      ).disabled
    ).toBe(false);
  });
});
