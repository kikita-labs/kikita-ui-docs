import type { DocsFoundationManifest } from '@core/docs-registry';

export const THEMING_DOCS_MANIFEST = {
  kind: 'foundation',
  slug: 'theming',
  label: 'Theming',
  description: 'Theme provider setup and theme customization basics.',
  loadPage: () => import('./theming-page').then((module) => module.ThemingPage),
} as const satisfies DocsFoundationManifest;
