import type { DocsResourceManifest } from '@core/docs-registry';

export const AI_SUPPORT_DOCS_MANIFEST = {
  kind: 'resource',
  slug: 'ai-support',
  label: 'AI Support',
  description: 'Agent-readable docs, llms.txt, and local MCP setup for Kikita UI.',
  exampleIds: [],
  loadPage: () => import('./ai-support-page').then((module) => module.AiSupportPage),
} as const satisfies DocsResourceManifest;
