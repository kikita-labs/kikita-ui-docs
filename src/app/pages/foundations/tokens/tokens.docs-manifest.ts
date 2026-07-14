import type { DocsFoundationManifest } from '@core/docs-registry';

export const TOKENS_DOCS_MANIFEST = {
  kind: 'foundation',
  slug: 'tokens',
  label: 'Tokens',
  description: 'Design token categories exposed through Kikita CSS variables.',
  loadPage: () => import('./tokens-page').then((module) => module.TokensPage),
} as const satisfies DocsFoundationManifest;
