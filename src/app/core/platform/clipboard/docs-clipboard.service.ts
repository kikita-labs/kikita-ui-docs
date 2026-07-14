import { isPlatformBrowser } from '@angular/common';
import { DOCUMENT, inject, Injectable, PLATFORM_ID } from '@angular/core';

import { docsPlatformFailure, type DocsPlatformResult, docsPlatformSuccess } from '../result';

@Injectable({ providedIn: 'root' })
export class DocsClipboardService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  public async writeText(text: string): Promise<DocsPlatformResult<void>> {
    if (!this.isBrowser) {
      return docsPlatformFailure('unavailable');
    }

    const clipboard = this.document.defaultView?.navigator.clipboard;

    if (!clipboard?.writeText) {
      return docsPlatformFailure('unavailable');
    }

    try {
      await clipboard.writeText(text);

      return docsPlatformSuccess(undefined);
    } catch (error: unknown) {
      return docsPlatformFailure(
        error instanceof Error && error.name === 'NotAllowedError' ? 'denied' : 'failed',
      );
    }
  }
}
