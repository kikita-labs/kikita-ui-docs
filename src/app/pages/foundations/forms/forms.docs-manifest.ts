import type { DocsFoundationManifest } from '@core/docs-registry';

export const FORMS_DOCS_MANIFEST = {
  kind: 'foundation',
  slug: 'forms',
  label: 'Forms',
  description:
    'Kikita UI is Signal Forms first: put the control directive and [formField] on the same element and wrap it in kui-field for the label, hint, error and required marker.',
  loadPage: () => import('./forms-page').then((module) => module.FormsPage),
} as const satisfies DocsFoundationManifest;
