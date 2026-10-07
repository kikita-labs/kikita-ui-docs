import { Component, computed, inject } from '@angular/core';

import { DocsRouteStateService } from '@core/navigation';
import {
  DocsVersionNavigationService,
  DocsVersionsService,
  isPlainPrimaryClick,
} from '@core/versions';

import { VERSION_BANNER_MESSAGES } from './constants';

@Component({
  selector: 'app-version-banner',
  templateUrl: './version-banner.html',
  styleUrl: './version-banner.scss',
})
export class VersionBanner {
  private readonly routeState = inject(DocsRouteStateService);
  private readonly docsVersions = inject(DocsVersionsService);
  private readonly versionNavigation = inject(DocsVersionNavigationService);

  protected readonly message = computed(
    () => VERSION_BANNER_MESSAGES[this.docsVersions.current().status] ?? null,
  );
  protected readonly latestLabel = computed(() => this.docsVersions.latest().label);
  protected readonly latestHref = computed(() =>
    this.docsVersions.pageUrl(this.docsVersions.latest(), this.routeState.path()),
  );

  /** Falls back to the latest version's home when the page no longer exists there. */
  protected openLatest(event: MouseEvent): void {
    if (!isPlainPrimaryClick(event)) {
      return;
    }

    event.preventDefault();
    void this.versionNavigation.open(this.docsVersions.latest(), this.routeState.path());
  }
}
