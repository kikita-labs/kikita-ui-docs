import type { DocsComponentManifest } from '@core/docs-registry';

export const BREADCRUMBS_DOCS_MANIFEST = {
  kind: 'component',
  slug: 'breadcrumbs',
  label: 'Breadcrumbs',
  category: 'surfaces',
  description: 'Hierarchy trail.',
  importName: 'KuiBreadcrumbsDirective',
  status: 'available',
  exampleIds: ['basic-breadcrumbs-example'],
  loadPage: () => import('./breadcrumbs-page').then((module) => module.BreadcrumbsPage),
  loadPlayground: () =>
    import('./playground/breadcrumbs-playground-page').then(
      (module) => module.BreadcrumbsPlaygroundPage,
    ),
} as const satisfies DocsComponentManifest;
