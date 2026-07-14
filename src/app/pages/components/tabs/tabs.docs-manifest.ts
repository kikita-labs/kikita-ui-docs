import type { DocsComponentManifest } from '@core/docs-registry';

export const TABS_DOCS_MANIFEST = {
  kind: 'component',
  slug: 'tabs',
  label: 'Tabs',
  category: 'surfaces',
  description: 'Line and pill tab navigation with optional panel wiring.',
  importName: 'KuiTabsComponent',
  status: 'available',
  exampleIds: [
    'basic-tabs-example',
    'navigation-tabs-example',
    'pill-tabs-example',
    'vertical-tabs-example',
  ],
  loadPage: () => import('./tabs-page').then((module) => module.TabsPage),
  loadPlayground: () =>
    import('./playground/tabs-playground-page').then((module) => module.TabsPlaygroundPage),
} as const satisfies DocsComponentManifest;
