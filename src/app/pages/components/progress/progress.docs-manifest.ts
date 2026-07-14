import type { DocsComponentManifest } from '@core/docs-registry';

export const PROGRESS_DOCS_MANIFEST = {
  kind: 'component',
  slug: 'progress',
  label: 'Progress',
  category: 'feedback',
  description: 'Progress status primitive for determinate and indeterminate work.',
  importName: 'KuiProgressComponent',
  status: 'available',
  exampleIds: [
    'basic-progress-example',
    'progress-circular-example',
    'progress-color-size-example',
  ],
  loadPage: () => import('./progress-page').then((module) => module.ProgressPage),
  loadPlayground: () =>
    import('./playground/progress-playground-page').then((module) => module.ProgressPlaygroundPage),
} as const satisfies DocsComponentManifest;
