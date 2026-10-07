import { Component, computed, inject } from '@angular/core';

import { KuiDropdown, KuiField, KuiOption, KuiSelect, provideKuiDefaults } from '@kikita-labs/ui';

import { DocsRouteStateService } from '@core/navigation';
import { DocsVersionNavigationService, DocsVersionsService } from '@core/versions';

@Component({
  selector: 'app-version-switcher',
  imports: [KuiDropdown, KuiField, KuiOption, KuiSelect],
  providers: [provideKuiDefaults({ field: { size: 'sm' } })],
  templateUrl: './version-switcher.html',
  styleUrl: './version-switcher.scss',
})
export class VersionSwitcher {
  private readonly routeState = inject(DocsRouteStateService);
  private readonly docsVersions = inject(DocsVersionsService);
  private readonly versionNavigation = inject(DocsVersionNavigationService);

  protected readonly current = this.docsVersions.current;
  protected readonly versions = this.docsVersions.versions;

  /** A single entry means there is nothing to switch to, so the control stays out of the way. */
  protected readonly isSwitchable = computed(() => this.versions().length > 1);

  protected readonly versionLabel = (id: string): string =>
    this.versions().find((version) => version.id === id)?.label ?? id;

  /**
   * Picking another version first checks that the page exists there (the navigation service falls
   * back to that version's home) and then loads it.
   */
  protected select(id: unknown): void {
    const version = this.versions().find((candidate) => candidate.id === id);

    if (!version || version.id === this.current().id) {
      return;
    }

    void this.versionNavigation.open(version, this.routeState.path());
  }
}
