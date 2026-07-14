import type { DocsComponentManifest } from '@core/docs-registry';

export const NUMBER_INPUT_DOCS_MANIFEST = {
  kind: 'component',
  slug: 'number-input',
  label: 'Number Input',
  category: 'forms',
  description: 'Number input states with compact variant options.',
  importName: 'KuiNumberInputDirective',
  status: 'available',
  exampleIds: [
    'basic-number-input-example',
    'compact-number-input-example',
    'field-number-input-example',
    'range-number-input-example',
  ],
  loadPage: () => import('./number-input-page').then((module) => module.NumberInputPage),
  loadPlayground: () =>
    import('./playground/number-input-playground-page').then(
      (module) => module.NumberInputPlaygroundPage,
    ),
} as const satisfies DocsComponentManifest;
