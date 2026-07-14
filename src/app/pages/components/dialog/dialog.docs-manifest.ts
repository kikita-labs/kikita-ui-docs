import type { DocsComponentManifest } from '@core/docs-registry';

export const DIALOG_DOCS_MANIFEST = {
  kind: 'component',
  slug: 'dialog',
  label: 'Dialog',
  category: 'surfaces',
  description: 'Typed modal overlay service and host contract.',
  importName: 'kuiDialog',
  status: 'available',
  exampleIds: ['basic-dialog-example', 'dialog-confirm-example', 'dialog-sizes-example'],
  loadPage: () => import('./dialog-page').then((module) => module.DialogPage),
  loadPlayground: () =>
    import('./playground/dialog-playground-page').then((module) => module.DialogPlaygroundPage),
} as const satisfies DocsComponentManifest;
