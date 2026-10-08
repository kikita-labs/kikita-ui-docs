import type { DocsFoundationManifest } from '@core/docs-registry';

export const INTERNATIONALIZATION_DOCS_MANIFEST = {
  kind: 'foundation',
  slug: 'internationalization',
  label: 'Internationalization',
  description:
    'Locale and messages are two independent settings: the locale formats dates, numbers and plurals, the messages translate the text the library owns.',
  loadPage: () =>
    import('./internationalization-page').then((module) => module.InternationalizationPage),
} as const satisfies DocsFoundationManifest;
