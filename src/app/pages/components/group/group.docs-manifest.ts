import type { DocsComponentManifest } from '@core/docs-registry';

export const GROUP_DOCS_MANIFEST = {
  kind: 'component',
  slug: 'group',
  label: 'Group',
  category: 'forms',
  description: 'Grouped control chrome for adjacent actions and fields.',
  importName: 'KuiGroupDirective',
  status: 'available',
  exampleIds: [
    'basic-group-example',
    'group-field-example',
    'group-orientation-example',
    'group-size-example',
  ],
  loadPage: () => import('./group-page').then((module) => module.GroupPage),
  loadPlayground: () =>
    import('./playground/group-playground-page').then((module) => module.GroupPlaygroundPage),
} as const satisfies DocsComponentManifest;
