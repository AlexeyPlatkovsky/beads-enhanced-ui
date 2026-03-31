/**
 * Contract tests for workspace protocol handlers.
 *
 * Verifies the exact envelope shapes returned by list-workspaces,
 * get-workspace, and set-workspace handlers — independent of business
 * logic already covered by server/ws.test.js.
 */
import { createServer } from 'node:http';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { attachWsServer, handleMessage } from './ws.js';

/** @returns {any} */
function makeStubSocket() {
  return {
    sent: /** @type {string[]} */ ([]),
    readyState: 1,
    OPEN: 1,
    /** @param {string} msg */
    send(msg) {
      this.sent.push(String(msg));
    },
    ping: vi.fn(),
    terminate: vi.fn()
  };
}

/**
 * Parse the last message sent to a stub socket.
 * @param {ReturnType<typeof makeStubSocket>} ws
 */
function lastReply(ws) {
  expect(ws.sent.length).toBeGreaterThan(0);
  return JSON.parse(ws.sent[ws.sent.length - 1]);
}

/** @type {string} */
let tmpRoot;
/** @type {string} */
let workspaceA;
/** @type {ReturnType<import('node:http').createServer>} */
let server;
/** @type {{ wss: import('ws').WebSocketServer }} */
let wsServer;

beforeEach(() => {
  tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-contract-'));
  workspaceA = path.join(tmpRoot, 'ws-a');
  fs.mkdirSync(path.join(workspaceA, '.beads'), { recursive: true });
  fs.writeFileSync(path.join(workspaceA, '.beads', 'test.db'), '');

  server = createServer();
  const watcher = {
    rebind: vi.fn(),
    path: path.join(workspaceA, '.beads')
  };
  wsServer = attachWsServer(server, {
    path: '/ws',
    root_dir: workspaceA,
    watcher
  });
});

afterEach(() => {
  wsServer.wss.close();
  server.close();
  fs.rmSync(tmpRoot, { recursive: true, force: true });
});

describe('get-workspace handler contract', () => {
  test('replies with ok=true envelope', async () => {
    const ws = makeStubSocket();
    await handleMessage(
      /** @type {any} */ (ws),
      Buffer.from(JSON.stringify({ id: 'gw-1', type: 'get-workspace' }))
    );
    const reply = lastReply(ws);
    expect(reply.ok).toBe(true);
    expect(reply.id).toBe('gw-1');
    expect(reply.type).toBe('get-workspace');
  });

  test('payload has root_dir and db_path strings', async () => {
    const ws = makeStubSocket();
    await handleMessage(
      /** @type {any} */ (ws),
      Buffer.from(JSON.stringify({ id: 'gw-2', type: 'get-workspace' }))
    );
    const reply = lastReply(ws);
    expect(typeof reply.payload.root_dir).toBe('string');
    expect(typeof reply.payload.db_path).toBe('string');
  });

  test('root_dir matches the workspace the server was started with', async () => {
    const ws = makeStubSocket();
    await handleMessage(
      /** @type {any} */ (ws),
      Buffer.from(JSON.stringify({ id: 'gw-3', type: 'get-workspace' }))
    );
    const reply = lastReply(ws);
    expect(path.normalize(reply.payload.root_dir)).toBe(
      path.normalize(workspaceA)
    );
  });
});

describe('list-workspaces handler contract', () => {
  test('replies with ok=true envelope', async () => {
    const ws = makeStubSocket();
    await handleMessage(
      /** @type {any} */ (ws),
      Buffer.from(JSON.stringify({ id: 'lw-1', type: 'list-workspaces' }))
    );
    const reply = lastReply(ws);
    expect(reply.ok).toBe(true);
    expect(reply.id).toBe('lw-1');
    expect(reply.type).toBe('list-workspaces');
  });

  test('payload has workspaces array and current object', async () => {
    const ws = makeStubSocket();
    await handleMessage(
      /** @type {any} */ (ws),
      Buffer.from(JSON.stringify({ id: 'lw-2', type: 'list-workspaces' }))
    );
    const reply = lastReply(ws);
    expect(Array.isArray(reply.payload.workspaces)).toBe(true);
    expect(typeof reply.payload.current).toBe('object');
    expect(reply.payload.current).not.toBeNull();
  });

  test('current workspace has root_dir and db_path', async () => {
    const ws = makeStubSocket();
    await handleMessage(
      /** @type {any} */ (ws),
      Buffer.from(JSON.stringify({ id: 'lw-3', type: 'list-workspaces' }))
    );
    const reply = lastReply(ws);
    const { current } = reply.payload;
    expect(typeof current.root_dir).toBe('string');
    expect(typeof current.db_path).toBe('string');
  });
});

describe('set-workspace handler contract', () => {
  test('replies with ok=true for a valid workspace path', async () => {
    const workspaceB = path.join(tmpRoot, 'ws-b');
    fs.mkdirSync(path.join(workspaceB, '.beads'), { recursive: true });
    fs.writeFileSync(path.join(workspaceB, '.beads', 'b.db'), '');

    const ws = makeStubSocket();
    await handleMessage(
      /** @type {any} */ (ws),
      Buffer.from(
        JSON.stringify({
          id: 'sw-1',
          type: 'set-workspace',
          payload: { path: workspaceB }
        })
      )
    );
    const reply = lastReply(ws);
    expect(reply.ok).toBe(true);
    expect(reply.id).toBe('sw-1');
    expect(reply.type).toBe('set-workspace');
  });

  test('ok reply payload has changed boolean and workspace object', async () => {
    const workspaceB = path.join(tmpRoot, 'ws-b2');
    fs.mkdirSync(path.join(workspaceB, '.beads'), { recursive: true });
    fs.writeFileSync(path.join(workspaceB, '.beads', 'b2.db'), '');

    const ws = makeStubSocket();
    await handleMessage(
      /** @type {any} */ (ws),
      Buffer.from(
        JSON.stringify({
          id: 'sw-2',
          type: 'set-workspace',
          payload: { path: workspaceB }
        })
      )
    );
    const reply = lastReply(ws);
    expect(typeof reply.payload.changed).toBe('boolean');
    expect(typeof reply.payload.workspace).toBe('object');
    expect(reply.payload.workspace).not.toBeNull();
  });

  test('workspace in ok reply has root_dir and db_path strings', async () => {
    const workspaceB = path.join(tmpRoot, 'ws-b3');
    fs.mkdirSync(path.join(workspaceB, '.beads'), { recursive: true });
    fs.writeFileSync(path.join(workspaceB, '.beads', 'b3.db'), '');

    const ws = makeStubSocket();
    await handleMessage(
      /** @type {any} */ (ws),
      Buffer.from(
        JSON.stringify({
          id: 'sw-3',
          type: 'set-workspace',
          payload: { path: workspaceB }
        })
      )
    );
    const reply = lastReply(ws);
    const { workspace } = reply.payload;
    expect(typeof workspace.root_dir).toBe('string');
    expect(typeof workspace.db_path).toBe('string');
  });

  test('switching to same workspace returns changed=false', async () => {
    const ws = makeStubSocket();
    // Switch to the same workspace that was set up in beforeEach
    await handleMessage(
      /** @type {any} */ (ws),
      Buffer.from(
        JSON.stringify({
          id: 'sw-4',
          type: 'set-workspace',
          payload: { path: workspaceA }
        })
      )
    );
    const reply = lastReply(ws);
    expect(reply.ok).toBe(true);
    expect(reply.payload.changed).toBe(false);
  });

  test('missing path returns ok=false error with bad_request code', async () => {
    const ws = makeStubSocket();
    await handleMessage(
      /** @type {any} */ (ws),
      Buffer.from(
        JSON.stringify({ id: 'sw-err-1', type: 'set-workspace', payload: {} })
      )
    );
    const reply = lastReply(ws);
    expect(reply.ok).toBe(false);
    expect(reply.id).toBe('sw-err-1');
    expect(reply.type).toBe('set-workspace');
    expect(reply.error.code).toBe('bad_request');
    expect(typeof reply.error.message).toBe('string');
  });

  test('empty path string returns ok=false error with bad_request code', async () => {
    const ws = makeStubSocket();
    await handleMessage(
      /** @type {any} */ (ws),
      Buffer.from(
        JSON.stringify({
          id: 'sw-err-2',
          type: 'set-workspace',
          payload: { path: '' }
        })
      )
    );
    const reply = lastReply(ws);
    expect(reply.ok).toBe(false);
    expect(reply.error.code).toBe('bad_request');
  });

  test('null payload returns ok=false error with bad_request code', async () => {
    const ws = makeStubSocket();
    await handleMessage(
      /** @type {any} */ (ws),
      Buffer.from(
        JSON.stringify({
          id: 'sw-err-3',
          type: 'set-workspace',
          payload: null
        })
      )
    );
    const reply = lastReply(ws);
    expect(reply.ok).toBe(false);
    expect(reply.error.code).toBe('bad_request');
  });
});

describe('error envelope contract', () => {
  test('bad_json error has ok=false, error.code, error.message', async () => {
    const ws = makeStubSocket();
    await handleMessage(/** @type {any} */ (ws), Buffer.from('{invalid json'));
    const reply = lastReply(ws);
    expect(reply.ok).toBe(false);
    expect(typeof reply.error.code).toBe('string');
    expect(typeof reply.error.message).toBe('string');
    expect(reply.error.code).toBe('bad_json');
  });

  test('bad_request error has ok=false, error.code, error.message', async () => {
    const ws = makeStubSocket();
    await handleMessage(
      /** @type {any} */ (ws),
      Buffer.from(JSON.stringify({ not: 'a valid envelope' }))
    );
    const reply = lastReply(ws);
    expect(reply.ok).toBe(false);
    expect(typeof reply.error.code).toBe('string');
    expect(typeof reply.error.message).toBe('string');
  });

  test('unknown_type error has ok=false, error.code, error.message', async () => {
    const ws = makeStubSocket();
    await handleMessage(
      /** @type {any} */ (ws),
      Buffer.from(
        JSON.stringify({ id: 'unk-1', type: 'not-a-real-type', payload: {} })
      )
    );
    const reply = lastReply(ws);
    expect(reply.ok).toBe(false);
    expect(reply.error.code).toBe('unknown_type');
    expect(typeof reply.error.message).toBe('string');
  });

  test('error reply correlates id back to request', async () => {
    const ws = makeStubSocket();
    await handleMessage(
      /** @type {any} */ (ws),
      Buffer.from(
        JSON.stringify({ id: 'err-corr-1', type: 'set-workspace', payload: {} })
      )
    );
    const reply = lastReply(ws);
    expect(reply.id).toBe('err-corr-1');
  });
});
