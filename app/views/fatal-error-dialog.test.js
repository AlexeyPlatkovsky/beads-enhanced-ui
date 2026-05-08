import { describe, expect, test, vi } from 'vitest';
import { createFatalErrorDialog } from './fatal-error-dialog.js';

if (typeof HTMLDialogElement !== 'undefined') {
  const proto = /** @type {any} */ (HTMLDialogElement.prototype);
  if (typeof proto.showModal !== 'function') {
    proto.showModal = function showModal() {
      this.setAttribute('open', '');
    };
    proto.close = function close() {
      this.removeAttribute('open');
    };
  }
}

describe('views/fatal-error-dialog', () => {
  test('renders title, message, and detail when opened', () => {
    const mount = document.createElement('div');
    const dialog = createFatalErrorDialog(mount);

    dialog.open('Boom', 'Something failed', 'stack trace');

    expect(
      dialog.getElement().querySelector('#fatal-error-title')?.textContent
    ).toBe('Boom');
    expect(
      dialog.getElement().querySelector('#fatal-error-message')?.textContent
    ).toBe('Something failed');
    const detail = /** @type {HTMLElement} */ (
      dialog.getElement().querySelector('#fatal-error-detail')
    );
    expect(detail.textContent).toBe('stack trace');
    expect(detail.hasAttribute('hidden')).toBe(false);
  });

  test('hides detail block when no diagnostics are provided', () => {
    const mount = document.createElement('div');
    const dialog = createFatalErrorDialog(mount);

    dialog.open('', '', '');

    const detail = /** @type {HTMLElement} */ (
      dialog.getElement().querySelector('#fatal-error-detail')
    );
    expect(detail.textContent).toBe('No additional diagnostics available.');
    expect(detail.hasAttribute('hidden')).toBe(true);
  });

  test('reload button refreshes the page and dismiss closes dialog', () => {
    const mount = document.createElement('div');
    const dialog = createFatalErrorDialog(mount);
    const reloadSpy = vi.fn();
    const originalLocation = window.location;

    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { reload: reloadSpy }
    });

    dialog.open('Boom', 'Something failed');
    /** @type {HTMLButtonElement} */ (
      dialog.getElement().querySelector('#fatal-error-reload')
    ).click();
    expect(reloadSpy).toHaveBeenCalledTimes(1);

    /** @type {HTMLButtonElement} */ (
      dialog.getElement().querySelector('#fatal-error-close')
    ).click();
    expect(dialog.getElement().hasAttribute('open')).toBe(false);

    Object.defineProperty(window, 'location', {
      configurable: true,
      value: originalLocation
    });
  });

  test('cancel event prevents default and closes the dialog', () => {
    const mount = document.createElement('div');
    const dialog = createFatalErrorDialog(mount);
    const ev = new Event('cancel', { bubbles: true, cancelable: true });

    dialog.open('Boom', 'Something failed');
    dialog.getElement().dispatchEvent(ev);

    expect(ev.defaultPrevented).toBe(true);
    expect(dialog.getElement().hasAttribute('open')).toBe(false);
  });

  test('falls back to setting open when showModal throws', () => {
    const mount = document.createElement('div');
    const dialog = createFatalErrorDialog(mount);
    const element = dialog.getElement();
    const originalShowModal = element.showModal;

    element.showModal = () => {
      throw new Error('not supported');
    };

    dialog.open('Boom', 'Something failed');

    expect(element.hasAttribute('open')).toBe(true);
    element.showModal = originalShowModal;
  });

  test('falls back to setting open when showModal is unavailable', () => {
    const mount = document.createElement('div');
    const dialog = createFatalErrorDialog(mount);
    const element = dialog.getElement();
    const originalShowModal = element.showModal;

    // @ts-expect-error exercise runtime fallback when the method is absent
    element.showModal = undefined;

    dialog.open('Boom', 'Something failed');

    expect(element.hasAttribute('open')).toBe(true);
    element.showModal = originalShowModal;
  });
});
