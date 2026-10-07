import { isPlatformBrowser } from '@angular/common';
import { DOCUMENT, inject, Injectable, PLATFORM_ID } from '@angular/core';

import { docsPlatformFailure, type DocsPlatformResult, docsPlatformSuccess } from '../result';

@Injectable({ providedIn: 'root' })
export class DocsPageProbeService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  /** Asks the host whether a same-origin page exists; only a network failure is an error. */
  public async exists(url: string): Promise<DocsPlatformResult<boolean>> {
    const view = this.document.defaultView;

    if (!this.isBrowser || !view) {
      return docsPlatformFailure('unavailable');
    }

    try {
      const response = await view.fetch(url, { method: 'HEAD', cache: 'no-cache' });

      return docsPlatformSuccess(response.ok);
    } catch {
      return docsPlatformFailure('failed');
    }
  }
}
