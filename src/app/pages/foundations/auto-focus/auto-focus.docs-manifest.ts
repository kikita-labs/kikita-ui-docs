import type { DocsFoundationManifest } from '@core/docs-registry';

export const AUTO_FOCUS_DOCS_MANIFEST = {
  kind: 'foundation',
  slug: 'auto-focus',
  label: 'Auto Focus',
  description:
    'kuiAutoFocus moves focus to its host, or to the first focusable element inside it, after the browser has rendered.',
  loadPage: () => import('./auto-focus-page').then((module) => module.AutoFocusPage),
} as const satisfies DocsFoundationManifest;
