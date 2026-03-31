import { describe, expect, test, vi } from 'vitest';
import { bootstrap } from './main.js';

/** @type {any} */
let CLIENT = null;

vi.mock('./ws.js', () => ({
  createWsClient: () => CLIENT
}));

describe('app/main workspace failure paths', () => {
  test('shows an error toast when restoring a saved workspace preference fails', async () => {
    CLIENT = {
      send: vi.fn(async (type, payload) => {
        if (type === 'list-workspaces') {
          return {
            workspaces: [
              { path: '/repo/current', database: '/repo/current/.beads' },
              { path: '/repo/other', database: '/repo/other/.beads' }
            ],
            current: {
              root_dir: '/repo/current',
              db_path: '/repo/current/.beads'
            }
          };
        }
        if (type === 'set-workspace') {
          expect(payload).toEqual({ path: '/repo/other' });
          throw new Error('workspace unavailable');
        }
        return null;
      }),
      on() {
        return () => {};
      },
      onConnection() {
        return () => {};
      },
      close() {},
      getState() {
        return 'open';
      }
    };

    window.localStorage.setItem('beads-ui.workspace', '/repo/other');
    document.body.innerHTML =
      '<div id="workspace-picker"></div><main id="app"></main>';
    const root = /** @type {HTMLElement} */ (document.getElementById('app'));

    bootstrap(root);
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();

    expect(CLIENT.send).toHaveBeenCalledWith('list-workspaces', {});
    expect(CLIENT.send).toHaveBeenCalledWith('set-workspace', {
      path: '/repo/other'
    });

    const select = /** @type {HTMLSelectElement | null} */ (
      document.querySelector('[data-testid="workspace-picker-select"]')
    );
    expect(select).not.toBeNull();
    expect(select?.value).toBe('/repo/current');

    const toasts = Array.from(document.querySelectorAll('.toast'));
    expect(
      toasts.some((el) =>
        (el.textContent || '').includes('Failed to switch workspace')
      )
    ).toBe(true);
  });
});
