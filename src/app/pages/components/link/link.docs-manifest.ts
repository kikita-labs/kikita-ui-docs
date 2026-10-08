import type { DocsComponentManifest } from '@core/docs-registry';

export const LINK_DOCS_MANIFEST = {
  kind: 'component',
  slug: 'link',
  label: 'Link',
  category: 'actions',
  description: 'Inline interactive text for navigation or a JS-driven action.',
  importName: 'KuiLink',
  status: 'available',
  exampleIds: [
    'basic-link-example',
    'link-underline-example',
    'link-icons-example',
    'link-actions-example',
  ],
  loadPage: () => import('./link-page').then((module) => module.LinkPage),
  loadPlayground: () =>
    import('./playground/link-playground-page').then((module) => module.LinkPlaygroundPage),
} as const satisfies DocsComponentManifest;
