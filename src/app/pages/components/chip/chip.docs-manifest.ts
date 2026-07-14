import type { DocsComponentManifest } from '@core/docs-registry';

export const CHIP_DOCS_MANIFEST = {
  kind: 'component',
  slug: 'chip',
  label: 'Chip',
  category: 'data-identity',
  description: 'Compact token for selected values, filters, and entity references.',
  importName: 'KuiChipDirective',
  status: 'available',
  exampleIds: [
    'basic-chip-example',
    'chip-states-example',
    'interactive-chip-example',
    'removable-chip-example',
  ],
  loadPage: () => import('./chip-page').then((module) => module.ChipPage),
  loadPlayground: () =>
    import('./playground/chip-playground-page').then((module) => module.ChipPlaygroundPage),
} as const satisfies DocsComponentManifest;
