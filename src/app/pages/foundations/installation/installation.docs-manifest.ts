import type { DocsFoundationManifest } from '@core/docs-registry';

export const INSTALLATION_DOCS_MANIFEST = {
  kind: 'foundation',
  slug: 'installation',
  label: 'Installation',
  description: 'Package installation and global stylesheet setup.',
  loadPage: () => import('./installation-page').then((module) => module.InstallationPage),
} as const satisfies DocsFoundationManifest;
