import type { DocsComponentManifest } from '@core/docs-registry';

export const EMPTY_STATE_DOCS_MANIFEST = {
  kind: 'component',
  slug: 'empty-state',
  label: 'Empty State',
  category: 'feedback',
  description: 'Known empty, error, no-access, and success content states.',
  importName: 'KuiEmptyStateComponent',
  status: 'available',
  exampleIds: [
    'basic-empty-state-example',
    'empty-state-context-example',
    'empty-state-size-example',
  ],
  loadPage: () => import('./empty-state-page').then((module) => module.EmptyStatePage),
  loadPlayground: () =>
    import('./playground/empty-state-playground-page').then(
      (module) => module.EmptyStatePlaygroundPage,
    ),
} as const satisfies DocsComponentManifest;
