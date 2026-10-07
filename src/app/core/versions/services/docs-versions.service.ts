import { LocationStrategy } from '@angular/common';
import { computed, inject, Injectable, signal } from '@angular/core';

import { KIKITA_UI_PACKAGE_VERSION } from '@core/package';
import { DocsRemoteJsonService } from '@core/platform/remote-json';

import { DOCS_VERSIONS_MANIFEST_FILE } from '../constants';
import {
  createCurrentDocsVersion,
  createDocsVersionId,
  parseDocsVersions,
  resolveDocsSiteRoot,
  resolveDocsVersionPageUrl,
} from '../helpers';
import type { DocsVersion } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class DocsVersionsService {
  private readonly remoteJson = inject(DocsRemoteJsonService);
  private readonly baseHref = inject(LocationStrategy).getBaseHref();
  private readonly currentId = createDocsVersionId(KIKITA_UI_PACKAGE_VERSION);
  private readonly manifest = signal<readonly DocsVersion[] | null>(null);

  /** Entries from `versions.json`, or only this build while the manifest is unavailable. */
  public readonly versions = computed(
    () => this.manifest() ?? [createCurrentDocsVersion(this.currentId, this.baseHref)],
  );
  public readonly current = computed(
    () =>
      this.versions().find((version) => version.id === this.currentId) ??
      createCurrentDocsVersion(this.currentId, this.baseHref),
  );
  public readonly latest = computed(
    () => this.versions().find((version) => version.status === 'latest') ?? this.current(),
  );

  constructor() {
    void this.refresh();
  }

  public pageUrl(version: DocsVersion, pagePath: string): string {
    return resolveDocsVersionPageUrl(version, pagePath);
  }

  private async refresh(): Promise<void> {
    const siteRoot = resolveDocsSiteRoot(this.baseHref, this.currentId);
    const result = await this.remoteJson.load(`${siteRoot}${DOCS_VERSIONS_MANIFEST_FILE}`);

    if (!result.ok) {
      return;
    }

    const versions = parseDocsVersions(result.value);

    if (versions) {
      this.manifest.set(versions);
    }
  }
}
