import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { showToast } from './toast.js';

describe('utils/toast', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    document.body.innerHTML = '';
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('renders a toast with variant styling and removes it after the timeout', () => {
    showToast('Saved', 'success', 1000);

    const toast = /** @type {HTMLElement} */ (document.querySelector('.toast'));
    expect(toast.textContent).toBe('Saved');
    expect(toast.style.background).toBe('rgb(21, 109, 54)');

    vi.advanceTimersByTime(1000);
    expect(document.querySelector('.toast')).toBeNull();
  });

  test('uses error styling for error variant', () => {
    showToast('Broken', 'error', 500);

    const toast = /** @type {HTMLElement} */ (document.querySelector('.toast'));
    expect(toast.style.background).toBe('rgb(159, 32, 17)');
  });

  test('uses info styling by default', () => {
    showToast('Heads up');

    const toast = /** @type {HTMLElement} */ (document.querySelector('.toast'));
    expect(toast.style.background).toBe('rgba(0, 0, 0, 0.85)');
  });
});
