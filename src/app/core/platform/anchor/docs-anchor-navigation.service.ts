import { isPlatformBrowser, Location, ViewportScroller } from '@angular/common';
import { DOCUMENT, inject, Injectable, PLATFORM_ID } from '@angular/core';

import { DocsMediaService } from '../media';
import { docsPlatformFailure, type DocsPlatformResult, docsPlatformSuccess } from '../result';

const DOCS_ANCHOR_OFFSET = 84;

@Injectable({ providedIn: 'root' })
export class DocsAnchorNavigationService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly location = inject(Location);
  private readonly media = inject(DocsMediaService);
  private readonly viewportScroller = inject(ViewportScroller);

  public async navigate(fragment: string): Promise<DocsPlatformResult<void>> {
    if (!this.isBrowser) {
      return docsPlatformFailure('unavailable');
    }

    try {
      const currentPath = this.location.path(true);
      const currentFragment = currentPath.split('#')[1];

      if (currentFragment !== fragment) {
        const [pathWithoutFragment] = currentPath.split('#');

        // Location.go() updates the URL without a Router navigation, so the
        // Router's own scroll-position-restoration (which resets to top on
        // every navigation) never fires and can't race our manual scroll below.
        this.location.go(`${pathWithoutFragment}#${fragment}`);
      }

      const target = this.document.getElementById(fragment);

      if (!target) {
        return docsPlatformFailure('unavailable');
      }

      const currentScrollTop = this.viewportScroller.getScrollPosition()[1];
      const top = target.getBoundingClientRect().top + currentScrollTop - DOCS_ANCHOR_OFFSET;

      this.viewportScroller.scrollToPosition([0, top], {
        behavior: this.media.prefersReducedMotion() ? 'auto' : 'smooth',
      });
      target.tabIndex = -1;
      target.focus({ preventScroll: true });

      return docsPlatformSuccess(undefined);
    } catch {
      return docsPlatformFailure('failed');
    }
  }

  public urlFor(fragment: string): DocsPlatformResult<string> {
    if (!this.isBrowser || !this.document.defaultView) {
      return docsPlatformFailure('unavailable');
    }

    const url = new URL(this.document.location.href);

    url.hash = fragment;

    return docsPlatformSuccess(url.toString());
  }
}
