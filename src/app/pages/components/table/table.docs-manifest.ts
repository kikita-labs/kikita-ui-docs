import type { DocsComponentManifest } from '@core/docs-registry';

export const TABLE_DOCS_MANIFEST = {
  kind: 'component',
  slug: 'table',
  label: 'Table',
  category: 'data-identity',
  description: 'Native table styling, sorting context, and selection cells.',
  importName: 'KuiTableDirective',
  status: 'available',
  exampleIds: [
    'basic-sortable-table-example',
    'combined-table-example',
    'row-selection-table-example',
    'sticky-header-table-example',
  ],
  loadPage: () => import('./table-page').then((module) => module.TablePage),
  loadPlayground: () =>
    import('./playground/table-playground-page').then((module) => module.TablePlaygroundPage),
} as const satisfies DocsComponentManifest;
