import { isPlatformBrowser } from '@angular/common';
import { DOCUMENT, inject, Injectable, PLATFORM_ID } from '@angular/core';

import { docsPlatformFailure, type DocsPlatformResult, docsPlatformSuccess } from '../result';

@Injectable({ providedIn: 'root' })
export class DocsLocationService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  /** Leaves the Angular app with a full page load, e.g. to another documentation version. */
  public navigate(url: string): DocsPlatformResult<void> {
    const view = this.document.defaultView;

    if (!this.isBrowser || !view) {
      return docsPlatformFailure('unavailable');
    }

    view.location.assign(url);

    return docsPlatformSuccess(undefined);
  }
}
