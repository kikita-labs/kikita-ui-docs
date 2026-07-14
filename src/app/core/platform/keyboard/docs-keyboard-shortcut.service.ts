import { isPlatformBrowser } from '@angular/common';
import { DOCUMENT, inject, Injectable, PLATFORM_ID } from '@angular/core';

import { docsPlatformFailure, type DocsPlatformResult, docsPlatformSuccess } from '../result';

@Injectable({ providedIn: 'root' })
export class DocsKeyboardShortcutService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  public registerCommandPalette(onOpen: () => void): DocsPlatformResult<() => void> {
    if (!this.isBrowser) {
      return docsPlatformFailure('unavailable');
    }

    const listener = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        onOpen();
      }
    };

    this.document.addEventListener('keydown', listener);

    return docsPlatformSuccess(() => this.document.removeEventListener('keydown', listener));
  }
}
