import { describe, expect, test } from 'vitest';
import { toDisplayIssueId } from './issue-id-format.js';

describe('utils/issue-id-format', () => {
  test('returns the provided id unchanged', () => {
    expect(toDisplayIssueId('UI-123')).toBe('UI-123');
  });

  test('falls back to an empty string for falsy ids', () => {
    expect(toDisplayIssueId('')).toBe('');
  });
});
