import { describe, expect, test } from 'vitest';
import { ISSUE_TYPES, typeLabel } from './issue-type.js';

describe('utils/issue-type', () => {
  test('exports canonical issue types in dropdown order', () => {
    expect(ISSUE_TYPES).toEqual(['bug', 'feature', 'task', 'epic', 'chore']);
  });

  test('maps known types to human labels and unknown types to blank', () => {
    expect(typeLabel('BUG')).toBe('Bug');
    expect(typeLabel('feature')).toBe('Feature');
    expect(typeLabel('task')).toBe('Task');
    expect(typeLabel('epic')).toBe('Epic');
    expect(typeLabel('chore')).toBe('Chore');
    expect(typeLabel('unknown')).toBe('');
  });
});
