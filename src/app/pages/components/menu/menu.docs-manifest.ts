import type { DocsComponentManifest } from '@core/docs-registry';

export const MENU_DOCS_MANIFEST = {
  kind: 'component',
  slug: 'menu',
  label: 'Menu',
  category: 'actions',
  description: 'Anchored command menu with keyboard focus behavior.',
  importName: 'KuiMenuComponent',
  status: 'available',
  exampleIds: ['basic-menu-example', 'menu-content-example'],
  loadPage: () => import('./menu-page').then((module) => module.MenuPage),
  loadPlayground: () =>
    import('./playground/menu-playground-page').then((module) => module.MenuPlaygroundPage),
} as const satisfies DocsComponentManifest;
