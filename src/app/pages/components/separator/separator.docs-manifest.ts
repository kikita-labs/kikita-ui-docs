import type { DocsComponentManifest } from '@core/docs-registry';

export const SEPARATOR_DOCS_MANIFEST = {
  kind: 'component',
  slug: 'separator',
  label: 'Separator',
  category: 'surfaces',
  description: 'Tokenized horizontal or vertical separator primitive.',
  importName: 'KuiSeparatorDirective',
  status: 'available',
  exampleIds: [
    'basic-separator-example',
    'separator-appearance-example',
    'separator-spacing-example',
    'separator-vertical-example',
  ],
  loadPage: () => import('./separator-page').then((module) => module.SeparatorPage),
  loadPlayground: () =>
    import('./playground/separator-playground-page').then(
      (module) => module.SeparatorPlaygroundPage,
    ),
} as const satisfies DocsComponentManifest;
