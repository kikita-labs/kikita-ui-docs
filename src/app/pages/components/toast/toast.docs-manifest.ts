import type { DocsComponentManifest } from '@core/docs-registry';

export const TOAST_DOCS_MANIFEST = {
  kind: 'component',
  slug: 'toast',
  label: 'Toast',
  category: 'feedback',
  description: 'Global notifications with actions and live-region semantics.',
  importName: 'KuiToastService',
  status: 'available',
  exampleIds: ['basic-toast-example', 'toast-action-example', 'toast-position-example'],
  loadPage: () => import('./toast-page').then((module) => module.ToastPage),
  loadPlayground: () =>
    import('./playground/toast-playground-page').then((module) => module.ToastPlaygroundPage),
} as const satisfies DocsComponentManifest;
