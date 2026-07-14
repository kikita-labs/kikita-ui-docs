import type { DocsPageManifest } from '@core/docs-registry';

export const DRAFT_DOCS_MANIFEST = {
  kind: 'page',
  id: 'draft',
  label: 'Documentation draft',
  description: 'Shared status page for documentation sections that are not published yet.',
  routeSegment: null,
  loadPage: () => import('./docs-draft-page').then((module) => module.DocsDraftPage),
} as const satisfies DocsPageManifest;
