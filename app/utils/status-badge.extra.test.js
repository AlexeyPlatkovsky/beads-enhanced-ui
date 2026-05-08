import { describe, expect, test } from 'vitest';
import { createStatusBadge } from './status-badge.js';

describe('utils/status-badge extra branches', () => {
  test('defaults falsy statuses to open', () => {
    const badge = createStatusBadge(null);

    expect(badge.classList.contains('is-open')).toBe(true);
    expect(badge.textContent).toBe('Open');
  });

  test('renders open status label', () => {
    const badge = createStatusBadge('open');

    expect(badge.classList.contains('is-open')).toBe(true);
    expect(badge.textContent).toBe('Open');
  });

  test('renders closed status label', () => {
    const badge = createStatusBadge('closed');

    expect(badge.classList.contains('is-closed')).toBe(true);
    expect(badge.textContent).toBe('Closed');
  });
});
