import type { DocsComponentManifest } from '@core/docs-registry';

export const SWITCH_DOCS_MANIFEST = {
  kind: 'component',
  slug: 'switch',
  label: 'Switch',
  category: 'forms',
  description: 'Native switch control styling for binary settings.',
  importName: 'KuiSwitchDirective',
  status: 'available',
  exampleIds: ['basic-switch-example', 'switch-size-example'],
  loadPage: () => import('./switch-page').then((module) => module.SwitchPage),
  loadPlayground: () =>
    import('./playground/switch-playground-page').then((module) => module.SwitchPlaygroundPage),
} as const satisfies DocsComponentManifest;
