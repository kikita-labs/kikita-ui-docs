import type { DocsComponentManifest } from '@core/docs-registry';

export const COMMAND_PALETTE_DOCS_MANIFEST = {
  kind: 'component',
  slug: 'command-palette',
  label: 'Command Palette',
  category: 'actions',
  description: 'Searchable command overlay for application actions.',
  importName: 'KuiCommandPaletteComponent',
  status: 'available',
  exampleIds: ['basic-command-palette-example'],
  loadPage: () => import('./command-palette-page').then((module) => module.CommandPalettePage),
  loadPlayground: () =>
    import('./playground/command-palette-playground-page').then(
      (module) => module.CommandPalettePlaygroundPage,
    ),
} as const satisfies DocsComponentManifest;
