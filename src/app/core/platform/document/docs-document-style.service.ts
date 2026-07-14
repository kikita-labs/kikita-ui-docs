import { isPlatformBrowser } from '@angular/common';
import { DOCUMENT, inject, Injectable, PLATFORM_ID } from '@angular/core';

import { docsPlatformFailure, type DocsPlatformResult, docsPlatformSuccess } from '../result';

@Injectable({ providedIn: 'root' })
export class DocsDocumentStyleService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  public setRootTheme(theme: string): DocsPlatformResult<void> {
    if (!this.isBrowser) {
      return docsPlatformFailure('unavailable');
    }

    this.document.documentElement.dataset['kuiTheme'] = theme;
    this.document.documentElement.style.colorScheme = theme;

    return docsPlatformSuccess(undefined);
  }

  public setRootScrollLocked(locked: boolean): DocsPlatformResult<void> {
    if (!this.isBrowser) {
      return docsPlatformFailure('unavailable');
    }

    this.document.documentElement.classList.toggle('docs-scroll-locked', locked);

    return docsPlatformSuccess(undefined);
  }

  public applyStyleSheet(id: string, cssText: string): DocsPlatformResult<void> {
    if (!this.isBrowser) {
      return docsPlatformFailure('unavailable');
    }

    const existingStyle = this.document.getElementById(id);
    const style = existingStyle ?? this.document.createElement('style');

    style.id = id;
    style.textContent = cssText;

    if (!existingStyle) {
      this.document.head.appendChild(style);
    }

    return docsPlatformSuccess(undefined);
  }
}
