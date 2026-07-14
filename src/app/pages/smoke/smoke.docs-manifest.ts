import type { DocsResourceManifest } from '@core/docs-registry';

export const SMOKE_DOCS_MANIFEST = {
  kind: 'resource',
  slug: 'smoke',
  label: 'Package Smoke',
  description: 'External consumer verification for package imports, styles, and providers.',
  exampleIds: ['package-smoke-consumer'],
  loadPage: () => import('./package-smoke-page').then((module) => module.PackageSmokePage),
} as const satisfies DocsResourceManifest;
