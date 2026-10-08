import type { DocsFoundationManifest } from '@core/docs-registry';

export const DEFAULTS_DOCS_MANIFEST = {
  kind: 'foundation',
  slug: 'defaults',
  label: 'Defaults',
  description:
    'Set shared preferences such as size, shape, clearable or toast placement once for the application or for a subtree, instead of repeating them in every template.',
  loadPage: () => import('./defaults-page').then((module) => module.DefaultsPage),
} as const satisfies DocsFoundationManifest;
