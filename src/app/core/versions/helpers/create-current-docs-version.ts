import type { DocsVersion } from '../interfaces';

/** The entry this build represents when `versions.json` is unavailable. */
export function createCurrentDocsVersion(id: string, baseHref: string): DocsVersion {
  return {
    id,
    label: id,
    path: baseHref.endsWith('/') ? baseHref : `${baseHref}/`,
    status: 'latest',
  };
}
