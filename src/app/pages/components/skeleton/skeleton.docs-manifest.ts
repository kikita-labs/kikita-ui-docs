import type { DocsComponentManifest } from '@core/docs-registry';

export const SKELETON_DOCS_MANIFEST = {
  kind: 'component',
  slug: 'skeleton',
  label: 'Skeleton',
  category: 'feedback',
  description: 'Loading placeholder with reduced-motion behavior.',
  importName: 'KuiSkeletonDirective',
  status: 'available',
  exampleIds: [
    'skeleton-animation-example',
    'skeleton-composition-example',
    'skeleton-shapes-example',
  ],
  loadPage: () => import('./skeleton-page').then((module) => module.SkeletonPage),
  loadPlayground: () =>
    import('./playground/skeleton-playground-page').then((module) => module.SkeletonPlaygroundPage),
} as const satisfies DocsComponentManifest;
