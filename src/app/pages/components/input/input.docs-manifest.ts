import type { DocsComponentManifest } from '@core/docs-registry';

export const INPUT_DOCS_MANIFEST = {
  kind: 'component',
  slug: 'input',
  label: 'Input',
  category: 'forms',
  description: 'Native text input styling with field integration.',
  importName: 'KuiInputDirective',
  status: 'available',
  exampleIds: ['basic-input-example', 'input-group-example'],
  loadPage: () => import('./input-page').then((module) => module.InputPage),
  loadPlayground: () =>
    import('./playground/input-playground-page').then((module) => module.InputPlaygroundPage),
} as const satisfies DocsComponentManifest;
