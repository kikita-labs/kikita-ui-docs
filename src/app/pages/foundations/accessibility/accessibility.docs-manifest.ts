import type { DocsFoundationManifest } from '@core/docs-registry';

export const ACCESSIBILITY_DOCS_MANIFEST = {
  kind: 'foundation',
  slug: 'accessibility',
  label: 'Accessibility',
  description: 'Keyboard, semantics, focus, and WCAG expectations.',
  loadPage: () => import('./accessibility-page').then((module) => module.AccessibilityPage),
} as const satisfies DocsFoundationManifest;
