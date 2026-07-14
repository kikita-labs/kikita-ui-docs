import type { DocsComponentManifest } from '@core/docs-registry';

export const DROPDOWN_DOCS_MANIFEST = {
  kind: 'component',
  slug: 'dropdown',
  label: 'Dropdown',
  category: 'surfaces',
  description: 'Projected option overlay used by select-like controls.',
  importName: 'KuiDropdownComponent',
  status: 'available',
  exampleIds: [
    'field-dropdown-example',
    'panel-width-dropdown-example',
    'standalone-dropdown-example',
  ],
  loadPage: () => import('./dropdown-page').then((module) => module.DropdownPage),
  loadPlayground: () =>
    import('./playground/dropdown-playground-page').then((module) => module.DropdownPlaygroundPage),
} as const satisfies DocsComponentManifest;
