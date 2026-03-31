import { describe, expect, test } from 'vitest';
import { issueHashFor } from './issue-url.js';

describe('utils/issue-url', () => {
  test('builds a hash for supported views and URL-encodes the issue id', () => {
    expect(issueHashFor('epics', 'UI 1/2')).toBe('#/epics?issue=UI%201%2F2');
    expect(issueHashFor('board', 'UI-2')).toBe('#/board?issue=UI-2');
  });

  test('falls back to issues view for unsupported views', () => {
    expect(issueHashFor(/** @type {any} */ ('detail'), 'UI-9')).toBe(
      '#/issues?issue=UI-9'
    );
  });
});
