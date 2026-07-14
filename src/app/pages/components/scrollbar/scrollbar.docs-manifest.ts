import type { DocsComponentManifest } from '@core/docs-registry';

export const SCROLLBAR_DOCS_MANIFEST = {
  kind: 'component',
  slug: 'scrollbar',
  label: 'Scrollbar',
  category: 'data-identity',
  description: 'Tokenized native scroll container utility.',
  importName: '.kui-scroll',
  status: 'available',
  exampleIds: ['local-scroll-container-example'],
  loadPage: () => import('./scrollbar-page').then((module) => module.ScrollbarPage),
} as const satisfies DocsComponentManifest;
