import type { DocsComponentManifest } from '@core/docs-registry';

export const ICON_DOCS_MANIFEST = {
  kind: 'component',
  slug: 'icon',
  label: 'Icon',
  category: 'data-identity',
  description: 'SVG icon renderer.',
  importName: 'KuiIconComponent',
  status: 'available',
  exampleIds: ['basic-icon-example'],
  loadPage: () => import('./icon-page').then((module) => module.IconPage),
  loadPlayground: () =>
    import('./playground/icon-playground-page').then((module) => module.IconPlaygroundPage),
} as const satisfies DocsComponentManifest;
