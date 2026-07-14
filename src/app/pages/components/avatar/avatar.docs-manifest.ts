import type { DocsComponentManifest } from '@core/docs-registry';

export const AVATAR_DOCS_MANIFEST = {
  kind: 'component',
  slug: 'avatar',
  label: 'Avatar',
  category: 'data-identity',
  description: 'User or entity identity with image, initials, and status.',
  importName: 'KuiAvatarComponent',
  status: 'available',
  exampleIds: [
    'avatar-button-example',
    'avatar-group-example',
    'avatar-sizes-shapes-example',
    'avatar-status-example',
    'basic-avatar-example',
  ],
  loadPage: () => import('./avatar-page').then((module) => module.AvatarPage),
  loadPlayground: () =>
    import('./playground/avatar-playground-page').then((module) => module.AvatarPlaygroundPage),
} as const satisfies DocsComponentManifest;
