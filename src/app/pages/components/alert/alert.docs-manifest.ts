import type { DocsComponentManifest } from '@core/docs-registry';

export const ALERT_DOCS_MANIFEST = {
  kind: 'component',
  slug: 'alert',
  label: 'Alert',
  category: 'feedback',
  description: 'Inline notification embedded in the page content flow.',
  importName: 'KuiAlert',
  status: 'available',
  exampleIds: [
    'basic-alert-example',
    'alert-shape-example',
    'alert-action-example',
    'alert-custom-content-example',
    'alert-banner-example',
  ],
  loadPage: () => import('./alert-page').then((module) => module.AlertPage),
  loadPlayground: () =>
    import('./playground/alert-playground-page').then((module) => module.AlertPlaygroundPage),
} as const satisfies DocsComponentManifest;
