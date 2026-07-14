import type { DocsComponentManifest } from '@core/docs-registry';

export const TREE_DOCS_MANIFEST = {
  kind: 'component',
  slug: 'tree',
  label: 'Tree',
  category: 'data-identity',
  description: 'Hierarchical list.',
  importName: 'KuiTreeComponent',
  status: 'available',
  exampleIds: ['basic-tree-example'],
  loadPage: () => import('./tree-page').then((module) => module.TreePage),
  loadPlayground: () =>
    import('./playground/tree-playground-page').then((module) => module.TreePlaygroundPage),
} as const satisfies DocsComponentManifest;
