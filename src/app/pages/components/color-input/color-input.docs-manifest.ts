import type { DocsComponentManifest } from '@core/docs-registry';

export const COLOR_INPUT_DOCS_MANIFEST = {
  kind: 'component',
  slug: 'color-input',
  label: 'Color Input',
  category: 'forms',
  description: 'Color value input.',
  importName: 'KuiColorInputDirective',
  status: 'available',
  exampleIds: ['basic-color-input-example'],
  loadPage: () => import('./color-input-page').then((module) => module.ColorInputPage),
  loadPlayground: () =>
    import('./playground/color-input-playground-page').then(
      (module) => module.ColorInputPlaygroundPage,
    ),
} as const satisfies DocsComponentManifest;
