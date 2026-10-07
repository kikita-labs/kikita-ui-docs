import type { DocsVersion } from '../interfaces';

/** Maps the current router path onto the same page inside another version. */
export function resolveDocsVersionPageUrl(version: DocsVersion, pagePath: string): string {
  return `${version.path}${pagePath.replace(/^\/+/, '')}`;
}
