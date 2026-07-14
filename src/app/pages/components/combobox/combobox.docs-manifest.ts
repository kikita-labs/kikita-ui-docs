import type { DocsComponentManifest } from '@core/docs-registry';

export const COMBOBOX_DOCS_MANIFEST = {
  kind: 'component',
  slug: 'combobox',
  label: 'Combobox',
  category: 'forms',
  description: 'Searchable input with projected options and async mode.',
  importName: 'KuiComboboxDirective',
  status: 'available',
  exampleIds: [
    'async-combobox-example',
    'basic-combobox-example',
    'combobox-field-states-example',
    'free-combobox-example',
  ],
  loadPage: () => import('./combobox-page').then((module) => module.ComboboxPage),
  loadPlayground: () =>
    import('./playground/combobox-playground-page').then((module) => module.ComboboxPlaygroundPage),
} as const satisfies DocsComponentManifest;
