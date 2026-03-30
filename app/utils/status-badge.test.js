import { describe, expect, test } from 'vitest';
import { createStatusBadge } from './status-badge.js';

describe('utils/status-badge', () => {
  test('renders known statuses with accessible text', () => {
    const badge = createStatusBadge('in_progress');

    expect(badge.classList.contains('status-badge')).toBe(true);
    expect(badge.classList.contains('is-in_progress')).toBe(true);
    expect(badge.getAttribute('aria-label')).toBe('Status: In progress');
    expect(badge.textContent).toBe('In progress');
  });

  test('uses unknown label for unsupported statuses', () => {
    const badge = createStatusBadge('mystery');

    expect(badge.textContent).toBe('Unknown');
    expect(badge.getAttribute('title')).toBe('Unknown');
  });
});
