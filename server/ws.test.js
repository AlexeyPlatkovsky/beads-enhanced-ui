import { createServer } from 'node:http';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, expect, test, vi } from 'vitest';
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

describe('ws message handling', () => {
  test('invalid JSON yields bad_json error', () => {
    const ws = makeStubSocket();
    handleMessage(/** @type {any} */ (ws), Buffer.from('{oops'));
    expect(ws.sent.length).toBe(1);
    const obj = JSON.parse(ws.sent[0]);
    expect(obj.ok).toBe(false);
    expect(obj.error.code).toBe('bad_json');
  });

  test('invalid envelope yields bad_request', () => {
    const ws = makeStubSocket();
    handleMessage(
      /** @type {any} */ (ws),
      Buffer.from(JSON.stringify({ not: 'a request' }))
    );
    const last = ws.sent[ws.sent.length - 1];
    const obj = JSON.parse(last);
    expect(obj.ok).toBe(false);
    expect(obj.error.code).toBe('bad_request');
  });

  test('unknown message type returns unknown_type error', () => {
    const ws = makeStubSocket();
    const req = { id: '1', type: 'some-unknown', payload: {} };
    handleMessage(/** @type {any} */ (ws), Buffer.from(JSON.stringify(req)));
    const last = ws.sent[ws.sent.length - 1];
    const obj = JSON.parse(last);
    expect(obj.ok).toBe(false);
    expect(obj.error.code).toBe('unknown_type');
  });

  test('set-workspace broadcasts workspace-changed only to other clients', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-ws-'));
    const workspaceA = path.join(root, 'a');
    const workspaceB = path.join(root, 'b');
    fs.mkdirSync(path.join(workspaceA, '.beads'), { recursive: true });
    fs.mkdirSync(path.join(workspaceB, '.beads'), { recursive: true });
    fs.writeFileSync(path.join(workspaceA, '.beads', 'a.db'), '');
    fs.writeFileSync(path.join(workspaceB, '.beads', 'b.db'), '');

    const server = createServer();
    const watcher = { rebind: vi.fn(), path: path.join(workspaceA, '.beads') };
    const { wss } = attachWsServer(server, {
      path: '/ws',
      root_dir: workspaceA,
      watcher
    });
    const a = makeStubSocket();
    const b = makeStubSocket();
    wss.clients.add(/** @type {any} */ (a));
    wss.clients.add(/** @type {any} */ (b));

    await handleMessage(
      /** @type {any} */ (a),
      Buffer.from(
        JSON.stringify({
          id: 'set-1',
          type: /** @type {any} */ ('set-workspace'),
          payload: { path: workspaceB }
        })
      )
    );

    expect(watcher.rebind).toHaveBeenCalledWith({
      root_dir: path.resolve(workspaceB)
    });
    const aMessages = a.sent.map((msg) => JSON.parse(msg));
    const bMessages = b.sent.map((msg) => JSON.parse(msg));
    expect(aMessages.some((msg) => msg.type === 'set-workspace')).toBe(true);
    expect(aMessages.some((msg) => msg.type === 'workspace-changed')).toBe(
      false
    );
    expect(bMessages.some((msg) => msg.type === 'workspace-changed')).toBe(
      true
    );

    wss.close();
    server.close();
    fs.rmSync(root, { recursive: true, force: true });
  });
});

// Note: broadcast behavior is integration-tested later when a full server can run.
