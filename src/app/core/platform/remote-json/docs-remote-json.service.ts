import { isPlatformBrowser } from '@angular/common';
import { DOCUMENT, inject, Injectable, PLATFORM_ID } from '@angular/core';

import { docsPlatformFailure, type DocsPlatformResult, docsPlatformSuccess } from '../result';

@Injectable({ providedIn: 'root' })
export class DocsRemoteJsonService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  /** Loads a same-origin JSON file; the payload stays `unknown` until the caller validates it. */
  public async load(url: string): Promise<DocsPlatformResult<unknown>> {
    const view = this.document.defaultView;

    if (!this.isBrowser || !view) {
      return docsPlatformFailure('unavailable');
    }

    try {
      const response = await view.fetch(url, { cache: 'no-cache' });

      if (!response.ok) {
        return docsPlatformFailure('failed');
      }

      return docsPlatformSuccess<unknown>(await response.json());
    } catch {
      return docsPlatformFailure('failed');
    }
  }
}
