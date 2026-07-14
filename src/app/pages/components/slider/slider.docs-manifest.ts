import type { DocsComponentManifest } from '@core/docs-registry';

export const SLIDER_DOCS_MANIFEST = {
  kind: 'component',
  slug: 'slider',
  label: 'Slider',
  category: 'forms',
  description: 'Native range input styling with field and Signal Forms support.',
  importName: 'KuiSliderDirective',
  status: 'available',
  exampleIds: [
    'basic-slider-example',
    'slider-disabled-example',
    'slider-field-example',
    'slider-range-example',
  ],
  loadPage: () => import('./slider-page').then((module) => module.SliderPage),
  loadPlayground: () =>
    import('./playground/slider-playground-page').then((module) => module.SliderPlaygroundPage),
} as const satisfies DocsComponentManifest;
