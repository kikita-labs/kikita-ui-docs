import type { DocsComponentManifest } from '@core/docs-registry';

export const TOOLTIP_DOCS_MANIFEST = {
  kind: 'component',
  slug: 'tooltip',
  label: 'Tooltip',
  category: 'feedback',
  description: 'Hover and focus hint.',
  importName: 'KuiTooltipDirective',
  status: 'available',
  exampleIds: ['basic-tooltip-example'],
  loadPage: () => import('./tooltip-page').then((module) => module.TooltipPage),
  loadPlayground: () =>
    import('./playground/tooltip-playground-page').then((module) => module.TooltipPlaygroundPage),
} as const satisfies DocsComponentManifest;
