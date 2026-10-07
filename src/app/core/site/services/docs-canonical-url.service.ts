import { LocationStrategy } from '@angular/common';
import { inject, Injectable } from '@angular/core';

import { DOCS_SITE_ORIGIN } from '../constants';
import { createDocsCanonicalUrl } from '../helpers';

@Injectable({ providedIn: 'root' })
export class DocsCanonicalUrlService {
  private readonly baseHref = inject(LocationStrategy).getBaseHref();

  public forPath(pagePath: string): string {
    return createDocsCanonicalUrl(DOCS_SITE_ORIGIN, this.baseHref, pagePath);
  }

  /** Absolute URL of this version's site root, without a trailing slash. */
  public root(): string {
    return this.forPath('/').replace(/\/$/, '');
  }
}
