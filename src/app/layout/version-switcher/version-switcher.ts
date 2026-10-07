import { Component, computed, inject } from '@angular/core';

import {
  KuiButtonDirective,
  KuiMenuComponent,
  KuiMenuForDirective,
  KuiMenuItemDirective,
} from '@kikita-labs/ui';

import { DocsRouteStateService } from '@core/navigation';
import {
  DocsVersionNavigationService,
  DocsVersionsService,
  isPlainPrimaryClick,
} from '@core/versions';

import type { VersionSwitcherItem } from './interfaces';

@Component({
  selector: 'app-version-switcher',
  imports: [KuiButtonDirective, KuiMenuComponent, KuiMenuForDirective, KuiMenuItemDirective],
  templateUrl: './version-switcher.html',
  styleUrl: './version-switcher.scss',
})
export class VersionSwitcher {
  private readonly routeState = inject(DocsRouteStateService);
  private readonly docsVersions = inject(DocsVersionsService);
  private readonly versionNavigation = inject(DocsVersionNavigationService);

  protected readonly current = this.docsVersions.current;
  protected readonly items = computed<readonly VersionSwitcherItem[]>(() => {
    const path = this.routeState.path();
    const currentId = this.current().id;

    return this.docsVersions.versions().map((version) => ({
      version,
      href: this.docsVersions.pageUrl(version, path),
      isCurrent: version.id === currentId,
    }));
  });
  /** A single entry means there is nothing to switch to, so the control stays out of the way. */
  protected readonly isSwitchable = computed(() => this.items().length > 1);

  /**
   * A plain click first checks that the page exists in the target version. Modified clicks and
   * the href itself keep working as ordinary links.
   */
  protected select(event: MouseEvent, item: VersionSwitcherItem): void {
    if (item.isCurrent || !isPlainPrimaryClick(event)) {
      return;
    }

    event.preventDefault();
    void this.versionNavigation.open(item.version, this.routeState.path());
  }
}
