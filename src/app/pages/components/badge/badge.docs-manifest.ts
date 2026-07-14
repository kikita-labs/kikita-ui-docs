import type { DocsComponentManifest } from '@core/docs-registry';

export const BADGE_DOCS_MANIFEST = {
  kind: 'component',
  slug: 'badge',
  label: 'Badge',
  category: 'feedback',
  description: 'Compact status or metadata marker.',
  importName: 'KuiBadgeDirective',
  status: 'available',
  exampleIds: ['badge-appearance-example', 'badge-size-example', 'basic-badge-example'],
  loadPage: () => import('./badge-page').then((module) => module.BadgePage),
  loadPlayground: () =>
    import('./playground/badge-playground-page').then((module) => module.BadgePlaygroundPage),
} as const satisfies DocsComponentManifest;
