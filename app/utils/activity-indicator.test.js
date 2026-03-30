import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createActivityIndicator } from './activity-indicator.js';

describe('utils/activity-indicator', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('toggles hidden state while work is in flight', () => {
    const mount = document.createElement('div');
    const indicator = createActivityIndicator(mount);

    expect(mount.hasAttribute('hidden')).toBe(true);
    indicator.start();
    expect(mount.getAttribute('aria-busy')).toBe('true');
    indicator.done();
    expect(mount.hasAttribute('hidden')).toBe(true);
  });

  test('wrapSend tracks active requests and clears state after resolve', async () => {
    const mount = document.createElement('div');
    const indicator = createActivityIndicator(mount);
    const wrapped = indicator.wrapSend(
      vi.fn(
        async () =>
          new Promise((resolve) => {
            setTimeout(() => resolve('ok'), 10);
          })
      )
    );

    const promise = wrapped('list-issues');
    expect(indicator.getCount()).toBe(1);
    expect(indicator.getActiveRequests()).toHaveLength(1);

    vi.advanceTimersByTime(10);
    await expect(promise).resolves.toBe('ok');
    expect(indicator.getCount()).toBe(0);
    expect(indicator.getActiveRequests()).toHaveLength(0);
  });

  test('safety timeout clears stuck requests', () => {
    const mount = document.createElement('div');
    const indicator = createActivityIndicator(mount);
    const wrapped = indicator.wrapSend(() => new Promise(() => {}));

    void wrapped('list-issues');
    vi.advanceTimersByTime(30000);

    expect(indicator.getCount()).toBe(0);
    expect(indicator.getActiveRequests()).toHaveLength(0);
  });
});
