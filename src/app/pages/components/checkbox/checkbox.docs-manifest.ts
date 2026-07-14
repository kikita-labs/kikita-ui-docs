import type { DocsComponentManifest } from '@core/docs-registry';

export const CHECKBOX_DOCS_MANIFEST = {
  kind: 'component',
  slug: 'checkbox',
  label: 'Checkbox',
  category: 'forms',
  description: 'Native checkbox styling with field state integration.',
  importName: 'KuiCheckboxDirective',
  status: 'available',
  exampleIds: ['basic-checkbox-example', 'checkbox-size-example'],
  loadPage: () => import('./checkbox-page').then((module) => module.CheckboxPage),
  loadPlayground: () =>
    import('./playground/checkbox-playground-page').then((module) => module.CheckboxPlaygroundPage),
} as const satisfies DocsComponentManifest;
