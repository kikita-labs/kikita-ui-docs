import type { DocsComponentManifest } from '@core/docs-registry';

export const PAGINATION_DOCS_MANIFEST = {
  kind: 'component',
  slug: 'pagination',
  label: 'Pagination',
  category: 'data-identity',
  description: 'Page navigation with numbers, steps, a summary and a rows-per-page picker.',
  importName: 'KuiPagination',
  status: 'available',
  exampleIds: [
    'basic-pagination-example',
    'pagination-variants-example',
    'pagination-window-example',
    'pagination-table-example',
  ],
  loadPage: () => import('./pagination-page').then((module) => module.PaginationPage),
  loadPlayground: () =>
    import('./playground/pagination-playground-page').then(
      (module) => module.PaginationPlaygroundPage,
    ),
} as const satisfies DocsComponentManifest;
