import type { DocsComponentManifest } from '@core/docs-registry';

export const RADIO_DOCS_MANIFEST = {
  kind: 'component',
  slug: 'radio',
  label: 'Radio',
  category: 'forms',
  description: 'Native radio control styling for exclusive choices.',
  importName: 'KuiRadioDirective',
  status: 'available',
  exampleIds: [
    'basic-radio-example',
    'radio-disabled-example',
    'radio-invalid-example',
    'radio-size-example',
  ],
  loadPage: () => import('./radio-page').then((module) => module.RadioPage),
  loadPlayground: () =>
    import('./playground/radio-playground-page').then((module) => module.RadioPlaygroundPage),
} as const satisfies DocsComponentManifest;
