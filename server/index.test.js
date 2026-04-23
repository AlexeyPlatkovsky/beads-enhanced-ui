import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

/**
 * @param {{ config?: { root_dir: string, host: string, port: number, app_dir: string, url: string }, workspaceDatabase?: { source: string, exists: boolean, path: string } }} [options]
 */
function setupIndexMocks(options = {}) {
  const createApp = vi.fn(() => ({ app: true }));
  const listen = vi.fn((_port, _host, cb) => cb());
  const on = vi.fn();
  const createServer = vi.fn(() => ({ listen, on }));
  const printServerUrl = vi.fn();
  const getConfig = vi.fn(
    () =>
      options.config || {
        root_dir: '/repo',
        host: process.env.HOST || '127.0.0.1',
        port: Number(process.env.PORT || '3050'),
        app_dir: '/app',
        url: `http://${process.env.HOST || '127.0.0.1'}:${process.env.PORT || '3050'}`
      }
  );
  const resolveWorkspaceDatabase = vi.fn(
    () =>
      options.workspaceDatabase || {
        source: 'metadata',
        exists: true,
        path: '/repo/.beads'
      }
  );
  const registerWorkspace = vi.fn();
  const watchRegistry = vi.fn();
  const watchDb = vi.fn((_root, cb) => ({ cb, close: vi.fn() }));
  const attachWsServer = vi.fn(() => ({
    scheduleListRefresh: vi.fn()
  }));

  vi.doMock('node:http', () => ({ createServer }));
  vi.doMock('./app.js', () => ({ createApp }));
  vi.doMock('./cli/daemon.js', () => ({ printServerUrl }));
  vi.doMock('./config.js', () => ({ getConfig }));
  vi.doMock('./db.js', () => ({ resolveWorkspaceDatabase }));
  vi.doMock('./logging.js', () => ({
    debug: () => vi.fn(),
    enableAllDebug: vi.fn()
  }));
  vi.doMock('./registry-watcher.js', () => ({
    registerWorkspace,
    watchRegistry
  }));
  vi.doMock('./watcher.js', () => ({ watchDb }));
  vi.doMock('./ws.js', () => ({ attachWsServer }));

  return {
    createApp,
    listen,
    on,
    createServer,
    printServerUrl,
    getConfig,
    resolveWorkspaceDatabase,
    registerWorkspace,
    watchRegistry,
    watchDb,
    attachWsServer
  };
}

describe('server/index startup wiring', () => {
  const originalArgv = process.argv.slice();
  const originalEnv = { ...process.env };

  beforeEach(() => {
    vi.resetModules();
    delete process.env.HOST;
    delete process.env.PORT;
  });

  afterEach(() => {
    process.argv = [...originalArgv];
    process.env = { ...originalEnv };
    vi.restoreAllMocks();
  });

  test('applies argv host and port before reading config and wires listeners', async () => {
    const {
      createApp,
      listen,
      on,
      printServerUrl,
      getConfig,
      resolveWorkspaceDatabase,
      registerWorkspace,
      watchRegistry,
      watchDb,
      attachWsServer
    } = setupIndexMocks();

    process.argv = [
      'node',
      'server/index.js',
      '--host',
      '0.0.0.0',
      '--port',
      '4123'
    ];

    await import('./index.js');

    expect(getConfig).toHaveBeenCalledTimes(1);
    expect(createApp).toHaveBeenCalledWith(
      expect.objectContaining({ host: '0.0.0.0', port: 4123 })
    );
    expect(resolveWorkspaceDatabase).toHaveBeenCalledWith({ cwd: '/repo' });
    expect(registerWorkspace).toHaveBeenCalledWith({
      path: '/repo',
      database: '/repo/.beads'
    });
    expect(watchDb).toHaveBeenCalledWith('/repo', expect.any(Function));
    expect(attachWsServer).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ root_dir: '/repo', path: '/ws' })
    );
    expect(watchRegistry).toHaveBeenCalledWith(expect.any(Function), {
      debounce_ms: 500
    });
    expect(listen).toHaveBeenCalledWith(4123, '0.0.0.0', expect.any(Function));
    expect(printServerUrl).toHaveBeenCalledTimes(1);
    expect(on).toHaveBeenCalledWith('error', expect.any(Function));
  });

  test('skips dynamic workspace registration for home-default databases', async () => {
    const { registerWorkspace } = setupIndexMocks({
      config: {
        root_dir: '/repo',
        host: '127.0.0.1',
        port: 3050,
        app_dir: '/app',
        url: 'http://127.0.0.1:3050'
      },
      workspaceDatabase: {
        source: 'home-default',
        exists: true,
        path: '/repo/.beads'
      }
    });

    process.argv = ['node', 'server/index.js'];

    await import('./index.js');

    expect(registerWorkspace).not.toHaveBeenCalled();
  });
});
