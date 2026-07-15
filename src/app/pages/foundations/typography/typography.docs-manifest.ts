import type { DocsFoundationManifest } from '@core/docs-registry';

export const TYPOGRAPHY_DOCS_MANIFEST = {
  kind: 'foundation',
  slug: 'typography',
  label: 'Typography',
  description: 'Semantic type-role classes, text tones, and the kuiText directive.',
  loadPage: () => import('./typography-page').then((module) => module.TypographyPage),
} as const satisfies DocsFoundationManifest;
