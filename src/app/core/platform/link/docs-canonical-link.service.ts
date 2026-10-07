import { DOCUMENT, inject, Injectable } from '@angular/core';

const CANONICAL_SELECTOR = 'link[rel="canonical"]';

/**
 * Owns the document's single `<link rel="canonical">`. It also runs during prerender, so the
 * tag is part of the static HTML that crawlers read.
 */
@Injectable({ providedIn: 'root' })
export class DocsCanonicalLinkService {
  private readonly document = inject(DOCUMENT);

  public set(href: string): void {
    const existing = this.document.head.querySelector<HTMLLinkElement>(CANONICAL_SELECTOR);
    const link = existing ?? this.document.createElement('link');

    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', href);

    if (!existing) {
      this.document.head.appendChild(link);
    }
  }

  public clear(): void {
    this.document.head.querySelector(CANONICAL_SELECTOR)?.remove();
  }
}
