import type { DocsPageManifest } from '@core/docs-registry';

export const COMPONENTS_OVERVIEW_DOCS_MANIFEST = {
  kind: 'page',
  id: 'components-overview',
  label: 'Component overview',
  description: 'Public Kikita UI primitives grouped by product use case.',
  routeSegment: null,
  loadPage: () =>
    import('./components-overview-page').then((module) => module.ComponentsOverviewPage),
} as const satisfies DocsPageManifest;
