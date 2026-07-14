import type { DocsComponentManifest } from '@core/docs-registry';

export const POPOVER_DOCS_MANIFEST = {
  kind: 'component',
  slug: 'popover',
  label: 'Popover',
  category: 'surfaces',
  description: 'Anchored content surface for contextual UI.',
  importName: 'KuiPopoverComponent',
  status: 'available',
  exampleIds: ['action-popover-example', 'basic-popover-example', 'hover-popover-example'],
  loadPage: () => import('./popover-page').then((module) => module.PopoverPage),
  loadPlayground: () =>
    import('./playground/popover-playground-page').then((module) => module.PopoverPlaygroundPage),
} as const satisfies DocsComponentManifest;
