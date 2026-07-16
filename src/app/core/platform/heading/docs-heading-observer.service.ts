import { isPlatformBrowser } from '@angular/common';
import { DOCUMENT, inject, Injectable, PLATFORM_ID } from '@angular/core';

const DOCS_ACTIVE_HEADING_OFFSET = 96;
const DOCS_SCROLL_END_TOLERANCE = 2;

@Injectable({ providedIn: 'root' })
export class DocsHeadingObserverService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  public observe(
    headingIds: readonly string[],
    onActiveHeadingChange: (headingId: string) => void,
  ): () => void {
    const window = this.document.defaultView;
    const Observer = window?.IntersectionObserver;

    if (!this.isBrowser || !window || headingIds.length === 0) {
      return () => undefined;
    }

    const headings = headingIds
      .map((headingId) => this.document.getElementById(headingId))
      .filter((heading): heading is HTMLElement => heading !== null);

    if (headings.length === 0) {
      return () => undefined;
    }

    const publishCurrentHeading = () => {
      const activeHeadingId = this.getCurrentHeadingId(headings);

      if (activeHeadingId) {
        onActiveHeadingChange(activeHeadingId);
      }
    };
    const observer = Observer
      ? new Observer(
          (entries) => {
            const visibleEntry = entries
              .filter((entry) => entry.isIntersecting)
              .sort((left, right) => left.boundingClientRect.top - right.boundingClientRect.top)[0];

            if (visibleEntry?.target.id) {
              onActiveHeadingChange(visibleEntry.target.id);
            }
          },
          {
            rootMargin: `-${DOCS_ACTIVE_HEADING_OFFSET}px 0px -65%`,
            threshold: 0,
          },
        )
      : null;

    headings.forEach((heading) => observer?.observe(heading));
    window.addEventListener('scroll', publishCurrentHeading, { passive: true });
    window.addEventListener('resize', publishCurrentHeading);
    publishCurrentHeading();

    return () => {
      observer?.disconnect();
      window.removeEventListener('scroll', publishCurrentHeading);
      window.removeEventListener('resize', publishCurrentHeading);
    };
  }

  private getCurrentHeadingId(headings: readonly HTMLElement[]): string | null {
    const window = this.document.defaultView;
    const documentElement = this.document.documentElement;
    const body = this.document.body;

    if (!window || !documentElement || headings.length === 0) {
      return null;
    }

    const scrollTop = window.scrollY || documentElement.scrollTop || body?.scrollTop || 0;
    const viewportHeight = window.innerHeight || documentElement.clientHeight || 0;
    const scrollHeight = Math.max(
      documentElement.scrollHeight,
      body?.scrollHeight ?? 0,
      documentElement.offsetHeight,
      body?.offsetHeight ?? 0,
    );

    if (
      scrollHeight > 0 &&
      scrollTop + viewportHeight >= scrollHeight - DOCS_SCROLL_END_TOLERANCE
    ) {
      return headings.at(-1)?.id ?? null;
    }

    let activeHeadingId = headings[0]?.id ?? null;

    for (const heading of headings) {
      if (heading.getBoundingClientRect().top > DOCS_ACTIVE_HEADING_OFFSET) {
        break;
      }

      activeHeadingId = heading.id;
    }

    return activeHeadingId;
  }
}
