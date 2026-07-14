import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { DocsClipboardService } from './docs-clipboard.service';

describe('DocsClipboardService', () => {
  const clipboardDescriptor = Object.getOwnPropertyDescriptor(window.navigator, 'clipboard');

  afterEach(() => {
    if (clipboardDescriptor) {
      Object.defineProperty(window.navigator, 'clipboard', clipboardDescriptor);
    } else {
      Reflect.deleteProperty(window.navigator, 'clipboard');
    }

    TestBed.resetTestingModule();
  });

  it('writes text through the browser clipboard capability', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);

    setClipboard({ writeText });
    TestBed.configureTestingModule({ providers: [DocsClipboardService] });

    const result = await TestBed.inject(DocsClipboardService).writeText('copy me');

    expect(result).toEqual({ ok: true, value: undefined });
    expect(writeText).toHaveBeenCalledWith('copy me');
  });

  it('returns a typed denied result when clipboard permission is rejected', async () => {
    const deniedError = new Error('denied');

    deniedError.name = 'NotAllowedError';
    setClipboard({ writeText: vi.fn().mockRejectedValue(deniedError) });
    TestBed.configureTestingModule({ providers: [DocsClipboardService] });

    await expect(TestBed.inject(DocsClipboardService).writeText('copy me')).resolves.toEqual({
      ok: false,
      reason: 'denied',
    });
  });

  it('returns an unavailable server fallback without touching the clipboard', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);

    setClipboard({ writeText });
    TestBed.configureTestingModule({
      providers: [DocsClipboardService, { provide: PLATFORM_ID, useValue: 'server' }],
    });

    await expect(TestBed.inject(DocsClipboardService).writeText('copy me')).resolves.toEqual({
      ok: false,
      reason: 'unavailable',
    });
    expect(writeText).not.toHaveBeenCalled();
  });

  function setClipboard(clipboard: Pick<Clipboard, 'writeText'>): void {
    Object.defineProperty(window.navigator, 'clipboard', {
      configurable: true,
      value: clipboard,
    });
  }
});
