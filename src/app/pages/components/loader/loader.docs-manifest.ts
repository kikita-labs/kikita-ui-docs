import type { DocsComponentManifest } from '@core/docs-registry';

export const LOADER_DOCS_MANIFEST = {
  kind: 'component',
  slug: 'loader',
  label: 'Loader',
  category: 'feedback',
  description: 'Inline loading indicator for buttons and status areas.',
  importName: 'KuiLoaderDirective',
  status: 'available',
  exampleIds: ['basic-loader-example', 'loader-button-example', 'loader-size-example'],
  loadPage: () => import('./loader-page').then((module) => module.LoaderPage),
  loadPlayground: () =>
    import('./playground/loader-playground-page').then((module) => module.LoaderPlaygroundPage),
} as const satisfies DocsComponentManifest;
