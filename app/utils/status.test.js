import { describe, expect, test } from 'vitest';
import { STATUSES, statusLabel } from './status.js';

describe('utils/status', () => {
  test('exports canonical statuses', () => {
    expect(STATUSES).toEqual(['open', 'in_progress', 'closed']);
  });

  test('formats known and unknown statuses', () => {
    expect(statusLabel('open')).toBe('Open');
    expect(statusLabel('in_progress')).toBe('In progress');
    expect(statusLabel('closed')).toBe('Closed');
    expect(statusLabel('custom')).toBe('custom');
    expect(statusLabel('')).toBe('Open');
  });
});
