/**
 * Contract tests for the client-server protocol.
 *
 * These tests lock down the exact shapes of RequestEnvelope and
 * ReplyEnvelope objects and the full set of registered MESSAGE_TYPES.
 * They serve as a living contract reference for both client and server.
 */
import { describe, expect, test } from 'vitest';
import {
  MESSAGE_TYPES,
  decodeReply,
  decodeRequest,
  isMessageType,
  isReply,
  isRequest,
  makeError,
  makeOk,
  makeRequest
} from './protocol.js';

// Full enumeration from protocol.js — adding a type here forces a
// corresponding addition to the registry, making omissions visible.
const KNOWN_MESSAGE_TYPES = [
  // Mutations
  'list-issues',
  'update-status',
  'edit-text',
  'update-priority',
  'create-issue',
  'list-ready',
  'dep-add',
  'dep-remove',
  'epic-status',
  'update-assignee',
  'label-add',
  'label-remove',
  // Subscription lifecycle
  'subscribe-list',
  'unsubscribe-list',
  // Server-push subscription events
  'snapshot',
  'upsert',
  'delete',
  // Comments
  'get-comments',
  'add-comment',
  // Issue lifecycle
  'delete-issue',
  // Workspace management
  'list-workspaces',
  'set-workspace',
  'get-workspace',
  // Server-initiated broadcast
  'workspace-changed'
];

describe('MESSAGE_TYPES contract', () => {
  test('all expected types are registered', () => {
    for (const t of KNOWN_MESSAGE_TYPES) {
      expect(MESSAGE_TYPES, `expected '${t}' in MESSAGE_TYPES`).toContain(t);
    }
  });

  test('no unexpected types are present', () => {
    for (const t of MESSAGE_TYPES) {
      expect(
        KNOWN_MESSAGE_TYPES,
        `unexpected type '${t}' found in MESSAGE_TYPES`
      ).toContain(t);
    }
  });

  test('isMessageType accepts every registered type', () => {
    for (const t of KNOWN_MESSAGE_TYPES) {
      expect(isMessageType(t), `isMessageType('${t}') should be true`).toBe(
        true
      );
    }
  });

  test('isMessageType rejects unknown strings', () => {
    expect(isMessageType('unknown-type')).toBe(false);
    expect(isMessageType('')).toBe(false);
    expect(isMessageType(42)).toBe(false);
    expect(isMessageType(null)).toBe(false);
  });
});

describe('RequestEnvelope contract', () => {
  test('makeRequest produces all required fields', () => {
    const req = makeRequest('edit-text', { id: 'UI-1', field: 'title' }, 'r-1');
    expect(typeof req.id).toBe('string');
    expect(req.id).toBe('r-1');
    expect(req.type).toBe('edit-text');
    expect(req.payload).toEqual({ id: 'UI-1', field: 'title' });
  });

  test('makeRequest auto-generates id when omitted', () => {
    const req = makeRequest('edit-text', {});
    expect(typeof req.id).toBe('string');
    expect(req.id.length).toBeGreaterThan(0);
  });

  test('two makeRequest calls without explicit id produce different ids', () => {
    const a = makeRequest('edit-text', {});
    const b = makeRequest('edit-text', {});
    expect(a.id).not.toBe(b.id);
  });

  test('isRequest returns true for valid envelope', () => {
    const req = makeRequest('subscribe-list', { id: 'sub-1', type: 'open' });
    expect(isRequest(req)).toBe(true);
  });

  test('isRequest returns false when id is missing', () => {
    expect(isRequest({ type: 'edit-text', payload: {} })).toBe(false);
  });

  test('isRequest returns false when type is missing', () => {
    expect(isRequest({ id: 'r-1', payload: {} })).toBe(false);
  });

  test('isRequest returns false for non-object', () => {
    expect(isRequest(null)).toBe(false);
    expect(isRequest('string')).toBe(false);
    expect(isRequest(42)).toBe(false);
    expect(isRequest([])).toBe(false);
  });

  test('decodeRequest returns envelope for valid input', () => {
    const raw = { id: 'r-2', type: 'list-issues', payload: {} };
    const decoded = decodeRequest(raw);
    expect(decoded.id).toBe('r-2');
    expect(decoded.type).toBe('list-issues');
  });

  test('decodeRequest throws for missing id', () => {
    expect(() => decodeRequest({ type: 'edit-text' })).toThrow(
      'Invalid request envelope'
    );
  });

  test('decodeRequest throws for empty object', () => {
    expect(() => decodeRequest({})).toThrow('Invalid request envelope');
  });
});

describe('ok ReplyEnvelope contract', () => {
  test('makeOk echoes id and type from originating request', () => {
    const req = makeRequest('list-issues', {}, 'r-3');
    const reply = makeOk(req, []);
    expect(reply.id).toBe('r-3');
    expect(reply.type).toBe('list-issues');
    expect(reply.ok).toBe(true);
  });

  test('makeOk carries payload through', () => {
    const req = makeRequest('get-workspace', {}, 'r-4');
    const ws = { root_dir: '/tmp/ws', db_path: '/tmp/ws/.beads/a.db' };
    const reply = makeOk(req, ws);
    expect(reply.payload).toEqual(ws);
  });

  test('ok reply has no error field', () => {
    const req = makeRequest('get-workspace', {}, 'r-5');
    const reply = makeOk(req, {});
    expect('error' in reply).toBe(false);
  });

  test('isReply accepts valid ok envelope', () => {
    const req = makeRequest('list-issues', {}, 'r-6');
    expect(isReply(makeOk(req, []))).toBe(true);
  });

  test('decodeReply accepts ok envelope', () => {
    const req = makeRequest('list-issues', {}, 'r-7');
    const decoded = decodeReply(JSON.parse(JSON.stringify(makeOk(req, []))));
    expect(decoded.ok).toBe(true);
    expect(decoded.id).toBe('r-7');
  });
});

describe('error ReplyEnvelope contract', () => {
  test('makeError produces required fields: id, ok=false, type, error.code, error.message', () => {
    const req = makeRequest('edit-text', {}, 'r-8');
    const reply = makeError(req, 'not_found', 'Issue not found');
    if (!reply.error) {
      throw new Error('expected error reply');
    }
    expect(reply.id).toBe('r-8');
    expect(reply.ok).toBe(false);
    expect(reply.type).toBe('edit-text');
    expect(typeof reply.error.code).toBe('string');
    expect(typeof reply.error.message).toBe('string');
    expect(reply.error.code).toBe('not_found');
    expect(reply.error.message).toBe('Issue not found');
  });

  test('makeError includes optional details when provided', () => {
    const req = makeRequest('edit-text', {}, 'r-9');
    const reply = makeError(req, 'internal', 'Error', { trace: 'abc' });
    if (!reply.error) {
      throw new Error('expected error reply');
    }
    expect(reply.error.details).toEqual({ trace: 'abc' });
  });

  test('makeError omits details when not provided', () => {
    const req = makeRequest('edit-text', {}, 'r-10');
    const reply = makeError(req, 'not_found', 'Not found');
    if (!reply.error) {
      throw new Error('expected error reply');
    }
    expect(reply.error.details).toBeUndefined();
  });

  test('isReply accepts valid error envelope', () => {
    const req = makeRequest('edit-text', {}, 'r-11');
    expect(isReply(makeError(req, 'not_found', 'Not found'))).toBe(true);
  });

  test('isReply rejects error envelope missing error.code', () => {
    expect(
      isReply({
        id: 'r-1',
        ok: false,
        type: 'edit-text',
        error: { message: 'oops' }
      })
    ).toBe(false);
  });

  test('isReply rejects error envelope missing error.message', () => {
    expect(
      isReply({
        id: 'r-1',
        ok: false,
        type: 'edit-text',
        error: { code: 'err' }
      })
    ).toBe(false);
  });

  test('isReply rejects ok=false envelope with no error object', () => {
    expect(isReply({ id: 'r-1', ok: false, type: 'edit-text' })).toBe(false);
  });

  test('isReply rejects ok=false with null error', () => {
    expect(
      isReply({ id: 'r-1', ok: false, type: 'edit-text', error: null })
    ).toBe(false);
  });

  test('decodeReply accepts error envelope', () => {
    const req = makeRequest('edit-text', {}, 'r-12');
    const decoded = decodeReply(
      JSON.parse(JSON.stringify(makeError(req, 'bad_request', 'Bad request')))
    );
    expect(decoded.ok).toBe(false);
    if (!('error' in decoded) || !decoded.error) {
      throw new Error('expected error to be present');
    }
    expect(decoded.error.code).toBe('bad_request');
    expect(decoded.error.message).toBe('Bad request');
  });

  test('decodeReply throws for ok=false envelope missing error.code', () => {
    expect(() =>
      decodeReply({
        id: 'r-1',
        ok: false,
        type: 'edit-text',
        error: { message: 'x' }
      })
    ).toThrow();
  });

  test('decodeReply throws for ok envelope missing id', () => {
    expect(() => decodeReply({ ok: true, type: 'list-issues' })).toThrow();
  });
});

describe('broadcast event contract (server → client, unsolicited)', () => {
  test('workspace-changed is a registered message type', () => {
    expect(isMessageType('workspace-changed')).toBe(true);
  });

  test('snapshot, upsert, delete are registered push event types', () => {
    expect(isMessageType('snapshot')).toBe(true);
    expect(isMessageType('upsert')).toBe(true);
    expect(isMessageType('delete')).toBe(true);
  });
});
