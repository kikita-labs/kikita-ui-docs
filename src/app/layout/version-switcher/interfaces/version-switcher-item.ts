import type { DocsVersion } from '@core/versions';

export interface VersionSwitcherItem {
  readonly version: DocsVersion;
  readonly href: string;
  readonly isCurrent: boolean;
}
