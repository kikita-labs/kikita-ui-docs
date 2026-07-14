import type { DocsComponentManifest } from '@core/docs-registry';

export const TEXTAREA_DOCS_MANIFEST = {
  kind: 'component',
  slug: 'textarea',
  label: 'Textarea',
  category: 'forms',
  description: 'Native multiline input styling with field integration.',
  importName: 'KuiTextareaDirective',
  status: 'available',
  exampleIds: ['basic-textarea-example', 'textarea-invalid-example', 'textarea-size-example'],
  loadPage: () => import('./textarea-page').then((module) => module.TextareaPage),
  loadPlayground: () =>
    import('./playground/textarea-playground-page').then((module) => module.TextareaPlaygroundPage),
} as const satisfies DocsComponentManifest;
