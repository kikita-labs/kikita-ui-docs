import type { DocsComponentManifest } from '@core/docs-registry';

export const BUTTON_DOCS_MANIFEST = {
  kind: 'component',
  slug: 'button',
  label: 'Button',
  category: 'actions',
  description: 'Primary command primitive for buttons and links.',
  importName: 'KuiButtonDirective',
  status: 'available',
  exampleIds: [
    'basic-button-example',
    'button-appearance-example',
    'button-size-example',
    'button-icon-example',
  ],
  loadPage: () => import('./button-page').then((module) => module.ButtonPage),
  loadPlayground: () =>
    import('./playground/button-playground-page').then((module) => module.ButtonPlaygroundPage),
} as const satisfies DocsComponentManifest;
