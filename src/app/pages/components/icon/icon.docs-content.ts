import { KIKITA_UI_PACKAGE_VERSION } from '@core/package';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

export const ICON_STATUS = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;

export const ICON_API_DESCRIPTION = `Inputs, icon content types and provider API verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;

export const ICON_IMPORT_TABS: readonly CodeTab[] = [
  {
    label: 'Component',
    filename: 'icon.ts',
    language: 'ts',
    code: `import { KuiIcon } from '@kikita-labs/ui';`,
  },
  {
    label: 'Registry',
    filename: 'app.config.ts',
    language: 'ts',
    code: `import { provideKikitaUi, provideKuiIcons } from '@kikita-labs/ui';

export const appConfig = {
  providers: [
    // 'lucide' is the default: unregistered names resolve against Lucide via jsDelivr.
    // Also registers the built-in brand set (KUI_BRAND_ICONS, e.g. 'kikita-brand').
    provideKikitaUi({ icons: 'lucide' }),
    provideKuiIcons({
      // Glyph data: safe from any source, drawn on the first pass.
      check: { node: [['path', { d: 'M3 8l3 3 7-7' }]], viewBox: '0 0 16 16' },
      // Trusted static markup, for rich SVG that glyph data cannot express.
      logo: '<svg viewBox="0 0 16 16" fill="none"><path d="M3 8l3 3 7-7" stroke="currentColor"/></svg>',
    }),
  ],
};`,
  },
  {
    label: 'Disable default',
    filename: 'app.config.ts',
    language: 'ts',
    code: `import { provideKikitaUi } from '@kikita-labs/ui';

export const appConfig = {
  providers: [
    // Opt out of the bundled Lucide/jsDelivr resolver -- also skips the built-in brand set
    // (e.g. 'kikita-brand'), since both register through the same icons option.
    provideKikitaUi({ icons: false }),
  ],
};`,
  },
  {
    label: 'Self-hosted Lucide',
    filename: 'app.config.ts',
    language: 'ts',
    code: `import { createKuiLucideResolver, provideKikitaUi, provideKuiIcons } from '@kikita-labs/ui';

export const appConfig = {
  providers: [
    provideKikitaUi({ icons: false }),
    // The same safe resolver for files you host yourself, so no icon request leaves your origin.
    provideKuiIcons(createKuiLucideResolver({ baseUrl: '/assets/lucide' })),
  ],
};`,
  },
  {
    label: 'CSP',
    filename: 'content-security-policy.txt',
    language: 'text',
    code: `Content-Security-Policy: connect-src 'self' https://cdn.jsdelivr.net`,
  },
];
