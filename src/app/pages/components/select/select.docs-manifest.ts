import type { DocsComponentManifest } from '@core/docs-registry';

export const SELECT_DOCS_MANIFEST = {
  kind: 'component',
  slug: 'select',
  label: 'Select',
  category: 'forms',
  description: 'Dropdown-backed selection control for single and multiple values.',
  importName: 'KuiSelectDirective',
  status: 'available',
  exampleIds: ['basic-select-example', 'multiple-select-example'],
  loadPage: () => import('./select-page').then((module) => module.SelectPage),
  loadPlayground: () =>
    import('./playground/select-playground-page').then((module) => module.SelectPlaygroundPage),
} as const satisfies DocsComponentManifest;
