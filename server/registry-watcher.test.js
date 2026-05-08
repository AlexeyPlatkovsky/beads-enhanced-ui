import path from 'node:path';
import { beforeEach, describe, expect, test, vi } from 'vitest';

/** @type {Array<{ dir: string, cb: (event: string, filename?: string) => void, close: ReturnType<typeof vi.fn> }>} */
const watchers = [];
let registryContent = '[]';
let directoryExists = true;
let homeDir = '/home/test';

vi.mock('node:os', () => ({
  default: { homedir: () => homeDir },
  homedir: () => homeDir
}));

vi.mock('node:fs', () => ({
  default: {
    existsSync: vi.fn(() => directoryExists),
    readFileSync: vi.fn(() => registryContent),
    watch: vi.fn((dir, _opts, cb) => {
      const close = vi.fn();
      watchers.push({ dir, cb, close });
      return { close };
    })
  },
  existsSync: vi.fn(() => directoryExists),
  readFileSync: vi.fn(() => registryContent),
  watch: vi.fn((dir, _opts, cb) => {
    const close = vi.fn();
    watchers.push({ dir, cb, close });
    return { close };
  })
}));

describe('server/registry-watcher', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.useFakeTimers();
    watchers.length = 0;
    registryContent = '[]';
    directoryExists = true;
    homeDir = '/home/test';
  });

  test('registerWorkspace exposes dynamic workspaces and deduplicates by path', async () => {
    registryContent = JSON.stringify([
      {
        workspace_path: '/repo/a',
        database_path: '/repo/a/.beads',
        pid: 1,
        version: '1',
        socket_path: '',
        started_at: ''
      }
    ]);
    const mod = await import('./registry-watcher.js');

    mod.registerWorkspace({ path: '/repo/a', database: '/repo/a/dynamic.db' });
    mod.registerWorkspace({ path: '/repo/b', database: '/repo/b/.beads' });

    expect(mod.getInMemoryWorkspaces()).toHaveLength(2);
    expect(mod.getAvailableWorkspaces()).toEqual([
      {
        path: '/repo/a',
        database: '/repo/a/.beads',
        pid: 1,
        version: '1'
      },
      expect.objectContaining({
        path: path.resolve('/repo/b'),
        database: '/repo/b/.beads',
        pid: expect.any(Number),
        version: 'dynamic'
      })
    ]);
  });

  test('findWorkspaceEntry matches nested directories under a workspace', async () => {
    registryContent = JSON.stringify([
      {
        workspace_path: '/repo/workspace',
        database_path: '/repo/workspace/.beads',
        pid: 1,
        version: '1',
        socket_path: '',
        started_at: ''
      }
    ]);
    const mod = await import('./registry-watcher.js');

    expect(mod.findWorkspaceEntry('/repo/workspace/subdir')).toEqual(
      expect.objectContaining({ workspace_path: '/repo/workspace' })
    );
  });

  test('watchRegistry debounces matching file events', async () => {
    registryContent = JSON.stringify([
      {
        workspace_path: '/repo/workspace',
        database_path: '/repo/workspace/.beads',
        pid: 1,
        version: '1',
        socket_path: '',
        started_at: ''
      }
    ]);
    const mod = await import('./registry-watcher.js');
    const onChange = vi.fn();

    const handle = mod.watchRegistry(onChange, { debounce_ms: 50 });
    watchers[0].cb('change', 'registry.json');
    watchers[0].cb('rename', 'registry.json');
    vi.advanceTimersByTime(49);
    expect(onChange).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);

    expect(onChange).toHaveBeenCalledWith([
      expect.objectContaining({ workspace_path: '/repo/workspace' })
    ]);

    handle.close();
    expect(watchers[0].close).toHaveBeenCalled();
  });

  test('returns a no-op watcher when registry directory is unavailable', async () => {
    directoryExists = false;
    const mod = await import('./registry-watcher.js');

    const handle = mod.watchRegistry(vi.fn());
    handle.close();

    expect(watchers).toHaveLength(0);
  });

  test('treats malformed registry content as an empty registry', async () => {
    registryContent = '{not-json';
    const mod = await import('./registry-watcher.js');
    const onChange = vi.fn();

    mod.watchRegistry(onChange, { debounce_ms: 25 });
    watchers[0].cb('change', 'registry.json');
    vi.advanceTimersByTime(25);

    expect(mod.readRegistry()).toEqual([]);
    expect(onChange).toHaveBeenCalledWith([]);
  });
});
