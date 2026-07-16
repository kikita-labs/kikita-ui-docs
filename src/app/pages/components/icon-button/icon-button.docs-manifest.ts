import type { DocsComponentManifest } from '@core/docs-registry';

export const ICON_BUTTON_DOCS_MANIFEST = {
  kind: 'component',
  slug: 'icon-button',
  label: 'Icon Button',
  category: 'actions',
  description: 'Compact icon-only action control.',
  importName: 'KuiIconButtonDirective',
  status: 'available',
  exampleIds: [
    'icon-button-appearance-example',
    'icon-button-size-example',
    'icon-button-icon-example',
  ],
  loadPage: () => import('./icon-button-page').then((module) => module.IconButtonPage),
  loadPlayground: () =>
    import('./playground/icon-button-playground-page').then(
      (module) => module.IconButtonPlaygroundPage,
    ),
} as const satisfies DocsComponentManifest;
