import type { DocsComponentManifest } from '@core/docs-registry';

export const FIELD_DOCS_MANIFEST = {
  kind: 'component',
  slug: 'field',
  label: 'Field',
  category: 'forms',
  description: 'Label, hint, error, and form-control composition.',
  importName: 'KuiFieldComponent',
  status: 'available',
  exampleIds: ['basic-field-example'],
  loadPage: () => import('./field-page').then((module) => module.FieldPage),
  loadPlayground: () =>
    import('./playground/field-playground-page').then((module) => module.FieldPlaygroundPage),
} as const satisfies DocsComponentManifest;
