import { describe, expect, test } from 'vitest';
import { validateSubscribeListPayload } from './validators.js';

describe('server/validators', () => {
  test('rejects non-object payloads', () => {
    expect(validateSubscribeListPayload(null)).toEqual({
      ok: false,
      code: 'bad_request',
      message: 'payload must be an object'
    });
  });

  test('validates issue-detail subscriptions and trims params.id', () => {
    expect(
      validateSubscribeListPayload({
        id: 'sub-1',
        type: 'issue-detail',
        params: { id: ' UI-7 ' }
      })
    ).toEqual({
      ok: true,
      id: 'sub-1',
      spec: { type: 'issue-detail', params: { id: 'UI-7' } }
    });
  });

  test('validates closed-issues since filter and rejects invalid values', () => {
    expect(
      validateSubscribeListPayload({
        id: 'sub-2',
        type: 'closed-issues',
        params: { since: 123 }
      })
    ).toEqual({
      ok: true,
      id: 'sub-2',
      spec: { type: 'closed-issues', params: { since: 123 } }
    });

    expect(
      validateSubscribeListPayload({
        id: 'sub-2',
        type: 'closed-issues',
        params: { since: -1 }
      })
    ).toEqual({
      ok: false,
      code: 'bad_request',
      message: 'params.since must be a non-negative number (epoch ms)'
    });
  });

  test('rejects params for subscription types that do not accept them', () => {
    expect(
      validateSubscribeListPayload({
        id: 'sub-3',
        type: 'ready-issues',
        params: { extra: true }
      })
    ).toEqual({
      ok: false,
      code: 'bad_request',
      message: 'type ready-issues does not accept params'
    });
  });
});
