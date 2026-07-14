import type { DocsComponentManifest } from '@core/docs-registry';

export const CARD_DOCS_MANIFEST = {
  kind: 'component',
  slug: 'card',
  label: 'Card',
  category: 'surfaces',
  description: 'Surface, elevated, and sunken content container.',
  importName: 'KuiCardDirective',
  status: 'available',
  exampleIds: [
    'basic-card-example',
    'card-appearance-example',
    'card-interactive-example',
    'card-size-example',
  ],
  loadPage: () => import('./card-page').then((module) => module.CardPage),
  loadPlayground: () =>
    import('./playground/card-playground-page').then((module) => module.CardPlaygroundPage),
} as const satisfies DocsComponentManifest;
