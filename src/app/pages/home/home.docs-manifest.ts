import type { DocsPageManifest } from '@core/docs-registry';

export const HOME_DOCS_MANIFEST = {
  kind: 'page',
  id: 'home',
  label: 'Kikita UI',
  description: 'Angular component library documentation and external consumer verification.',
  routeSegment: '',
  loadPage: () => import('./home-page').then((module) => module.HomePage),
} as const satisfies DocsPageManifest;
