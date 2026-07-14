import type { DocsComponentManifest } from '@core/docs-registry';

export const SEGMENTED_DOCS_MANIFEST = {
  kind: 'component',
  slug: 'segmented',
  label: 'Segmented',
  category: 'forms',
  description: 'Compact single-choice control rendered as adjacent segment buttons.',
  importName: 'KuiSegmentedComponent',
  status: 'available',
  exampleIds: ['basic-segmented-example'],
  loadPage: () => import('./segmented-page').then((module) => module.SegmentedPage),
  loadPlayground: () =>
    import('./playground/segmented-playground-page').then(
      (module) => module.SegmentedPlaygroundPage,
    ),
} as const satisfies DocsComponentManifest;
