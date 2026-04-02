import { describe, expect, test } from 'vitest';
import { createPriorityBadge, emojiForPriority } from './priority-badge.js';

describe('utils/priority-badge', () => {
  test('renders badge text, class, and accessibility label', () => {
    const badge = createPriorityBadge(1);

    expect(badge.classList.contains('priority-badge')).toBe(true);
    expect(badge.classList.contains('is-p1')).toBe(true);
    expect(badge.getAttribute('aria-label')).toBe('Priority: High');
    expect(badge.textContent).toContain('High');
  });

  test('clamps out-of-range priorities and falls back to medium emoji', () => {
    const badge = createPriorityBadge(99);

    expect(badge.classList.contains('is-p4')).toBe(true);
    expect(emojiForPriority(99)).not.toBe('');
    expect(emojiForPriority(-1)).not.toBe('');
  });

  test('defaults null priorities to medium', () => {
    const badge = createPriorityBadge(null);

    expect(badge.classList.contains('is-p2')).toBe(true);
    expect(badge.getAttribute('title')).toBe('Medium');
  });
});
