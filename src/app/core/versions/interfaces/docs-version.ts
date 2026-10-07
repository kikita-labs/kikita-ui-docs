import type { DocsVersionStatus } from '../types';

export interface DocsVersion {
  readonly id: string;
  readonly label: string;
  /** Same-origin absolute path of the version root, always ending with a slash. */
  readonly path: string;
  readonly status: DocsVersionStatus;
}
