import type { DocsComponentManifest } from '@core/docs-registry';

export const SPLITTER_DOCS_MANIFEST = {
  kind: 'component',
  slug: 'splitter',
  label: 'Splitter',
  category: 'surfaces',
  description: 'Draggable multi-pane layout with resizable gutters.',
  importName: 'KuiSplitter',
  status: 'available',
  exampleIds: ['basic-splitter-example', 'splitter-nested-example', 'splitter-multiple-example'],
  loadPage: () => import('./splitter-page').then((module) => module.SplitterPage),
  loadPlayground: () =>
    import('./playground/splitter-playground-page').then((module) => module.SplitterPlaygroundPage),
} as const satisfies DocsComponentManifest;
