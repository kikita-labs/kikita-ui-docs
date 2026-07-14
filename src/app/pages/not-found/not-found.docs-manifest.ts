import type { DocsPageManifest } from '@core/docs-registry';

export const NOT_FOUND_DOCS_MANIFEST = {
  kind: 'page',
  id: 'not-found',
  label: 'Page not found',
  description: 'Recovery page for documentation URLs that do not exist.',
  routeSegment: '**',
  routeData: { docsLayout: 'not-found' },
  loadPage: () => import('./docs-not-found-page').then((module) => module.DocsNotFoundPage),
} as const satisfies DocsPageManifest;
