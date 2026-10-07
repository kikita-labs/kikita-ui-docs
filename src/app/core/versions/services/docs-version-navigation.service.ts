import { inject, Injectable } from '@angular/core';

import { DocsLocationService } from '@core/platform/location';
import { DocsPageProbeService } from '@core/platform/page-probe';

import { resolveDocsVersionPageUrl } from '../helpers';
import type { DocsVersion } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class DocsVersionNavigationService {
  private readonly pageProbe = inject(DocsPageProbeService);
  private readonly location = inject(DocsLocationService);

  /**
   * Opens the same page in another version, or that version's home when the page does not
   * exist there. An inconclusive probe keeps the same-page target so the browser decides.
   */
  public async open(version: DocsVersion, pagePath: string): Promise<void> {
    const target = resolveDocsVersionPageUrl(version, pagePath);
    const probe = await this.pageProbe.exists(target);
    const isMissing = probe.ok && !probe.value;

    this.location.navigate(isMissing ? version.path : target);
  }
}
