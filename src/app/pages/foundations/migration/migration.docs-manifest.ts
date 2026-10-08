import type { DocsFoundationManifest } from '@core/docs-registry';

export const MIGRATION_DOCS_MANIFEST = {
  kind: 'foundation',
  slug: 'migration',
  label: 'Migrating to 2.0',
  description:
    'Every breaking change of @kikita-labs/ui 2.0: renamed exports, provider defaults, locale and messages, icons, tokens, component behaviour and the charts.',
  loadPage: () => import('./migration-page').then((module) => module.MigrationPage),
} as const satisfies DocsFoundationManifest;
