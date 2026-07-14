import { isPlatformBrowser } from '@angular/common';
import { DOCUMENT, inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DocsHeadingObserverService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  public observe(
    headingIds: readonly string[],
    onActiveHeadingChange: (headingId: string) => void,
  ): () => void {
    const Observer = this.document.defaultView?.IntersectionObserver;

    if (!this.isBrowser || !Observer || headingIds.length === 0) {
      return () => undefined;
    }

    const headings = headingIds
      .map((headingId) => this.document.getElementById(headingId))
      .filter((heading): heading is HTMLElement => heading !== null);

    if (headings.length === 0) {
      return () => undefined;
    }

    const observer = new Observer(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => left.boundingClientRect.top - right.boundingClientRect.top)[0];

        if (visibleEntry?.target.id) {
          onActiveHeadingChange(visibleEntry.target.id);
        }
      },
      {
        rootMargin: '-96px 0px -65%',
        threshold: 0,
      },
    );

    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }
}
