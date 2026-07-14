import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { DocsKeyboardShortcutService } from './docs-keyboard-shortcut.service';

describe('DocsKeyboardShortcutService', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('owns the command-palette shortcut and exposes deterministic cleanup', () => {
    TestBed.configureTestingModule({ providers: [DocsKeyboardShortcutService] });
    const onOpen = vi.fn();
    const registration = TestBed.inject(DocsKeyboardShortcutService).registerCommandPalette(onOpen);
    const event = new KeyboardEvent('keydown', { ctrlKey: true, key: 'k' });

    document.dispatchEvent(event);
    expect(onOpen).toHaveBeenCalledOnce();

    if (registration.ok) {
      registration.value();
    }

    document.dispatchEvent(new KeyboardEvent('keydown', { metaKey: true, key: 'k' }));
    expect(onOpen).toHaveBeenCalledOnce();
  });

  it('returns a server fallback without registering a document listener', () => {
    const addEventListener = vi.spyOn(document, 'addEventListener');

    TestBed.configureTestingModule({
      providers: [DocsKeyboardShortcutService, { provide: PLATFORM_ID, useValue: 'server' }],
    });

    expect(TestBed.inject(DocsKeyboardShortcutService).registerCommandPalette(vi.fn())).toEqual({
      ok: false,
      reason: 'unavailable',
    });
    expect(addEventListener).not.toHaveBeenCalledWith('keydown', expect.any(Function));
  });
});
