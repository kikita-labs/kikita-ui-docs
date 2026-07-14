import type { DocsComponentManifest } from '@core/docs-registry';

export const DRAWER_DOCS_MANIFEST = {
  kind: 'component',
  slug: 'drawer',
  label: 'Drawer',
  category: 'surfaces',
  description: 'Side and edge overlay surface for focused workflows.',
  importName: 'kuiDrawer',
  status: 'available',
  exampleIds: ['basic-drawer-example', 'drawer-sides-example', 'drawer-sizes-example'],
  loadPage: () => import('./drawer-page').then((module) => module.DrawerPage),
  loadPlayground: () =>
    import('./playground/drawer-playground-page').then((module) => module.DrawerPlaygroundPage),
} as const satisfies DocsComponentManifest;
