import type { DocsFoundationManifest } from '@core/docs-registry';

export const DENSITY_DOCS_MANIFEST = {
  kind: 'foundation',
  slug: 'density',
  label: 'Density',
  description: 'Spacing and control density expectations for product UIs.',
  loadPage: () => import('./density-page').then((module) => module.DensityPage),
} as const satisfies DocsFoundationManifest;
