import type { ApiTableRow } from '@shared/docs-ui/api-table';
import type { CodeTab } from '@shared/docs-ui/code-tabs';

export const THEMING_CONTRACT_TABS = [
  {
    label: 'Pipeline',
    filename: 'theme-pipeline.txt',
    language: 'text',
    code: `seed tokens -> OKLCH palettes -> semantic tokens -> component tokens`,
  },
  {
    label: 'Mode',
    filename: 'index.html',
    language: 'html',
    code: `<html data-kui-theme="dark"></html>`,
  },
] as const satisfies readonly CodeTab[];

export const THEMING_PROVIDER_TABS = [
  {
    label: 'Default',
    filename: 'app.config.ts',
    language: 'ts',
    code: `import { type ApplicationConfig } from '@angular/core';
import { provideKikitaUi } from '@kikita-labs/ui';

export const appConfig: ApplicationConfig = {
  providers: [provideKikitaUi()],
};`,
  },
  {
    label: 'Docs app',
    filename: 'app.config.ts',
    language: 'ts',
    code: `provideKikitaUi({
  scrollbars: 'styled',
});`,
  },
] as const satisfies readonly CodeTab[];

export const THEMING_SEED_TABS = [
  {
    label: 'Theme seeds',
    filename: 'app.config.ts',
    language: 'ts',
    code: `provideKikitaUi({
  theme: {
    seeds: {
      color: {
        primary: 'oklch(0.52 0.25 285)',
        neutral: 'oklch(0.5 0.01 80)',
        success: 'oklch(0.54 0.16 145)',
        warning: 'oklch(0.74 0.16 75)',
        danger: 'oklch(0.54 0.22 25)',
        info: 'oklch(0.58 0.16 215)',
      },
      radius: 8,
      density: 'regular',
    },
  },
});`,
  },
] as const satisfies readonly CodeTab[];

export const THEMING_UTILITY_ROWS = [
  {
    name: 'createKuiTheme',
    type: '(options?: KuiThemeOptions) => KuiGeneratedTheme',
    description: 'Generates a theme object from seed options.',
  },
  {
    name: 'createKuiThemeVariableMap',
    type: '(theme, mode?) => KuiCssVariableMap',
    description: 'Flattens a generated theme into CSS variable names and values.',
  },
  {
    name: 'createKuiThemeCssText',
    type: '(theme, selector, mode?) => string',
    description: 'Serializes variables for a selector.',
  },
  {
    name: 'createKuiThemeStyleSheet',
    type: '(theme) => string',
    description: 'Serializes light and dark theme CSS for tooling or docs output.',
  },
] as const satisfies readonly ApiTableRow[];

export const THEMING_OVERRIDE_ROWS = [
  {
    name: 'A seed in provideKikitaUi({ theme })',
    type: 'whole theme',
    description:
      'Palette, semantic roles and literal component tokens are regenerated for every element.',
  },
  {
    name: 'A semantic token on any element',
    type: 'element and below',
    description:
      '--kui-color-danger-fill on an element restyles that element and everything below it; on the root it changes the whole page.',
  },
  {
    name: 'A component token on any element',
    type: 'element and below',
    description:
      '--kui-btn-danger-bg restyles that one component part for the element and everything below it.',
  },
  {
    name: 'A palette step or a type role alias',
    type: 'set globally',
    description:
      'Not reliable on an element: semantic tokens and --kui-type-* are resolved from them on the root, so set them there.',
  },
] as const satisfies readonly ApiTableRow[];

export const THEMING_OVERRIDE_TABS = [
  {
    label: 'Region',
    filename: 'billing.css',
    language: 'css',
    code: `.billing-panel {
  --kui-btn-danger-bg: oklch(0.5 0.2 25);
  --kui-btn-danger-bg-hov: oklch(0.44 0.2 25);
}`,
  },
] as const satisfies readonly CodeTab[];

export const THEMING_CONTRAST_TABS = [
  {
    label: 'Default profile',
    filename: 'app.config.ts',
    language: 'ts',
    code: `import { DEFAULT_KUI_THEME, provideKuiTheme } from '@kikita-labs/ui';

provideKuiTheme({ ...DEFAULT_KUI_THEME, contrast: 'soft' });`,
  },
  {
    label: 'Switch at runtime',
    filename: 'contrast.ts',
    language: 'ts',
    code: `document.documentElement.setAttribute('data-kui-contrast', 'strict');`,
  },
] as const satisfies readonly CodeTab[];

export const THEMING_SHARED_TOKEN_TABS = [
  {
    label: 'Behaviour tokens',
    filename: 'styles.css',
    language: 'css',
    code: `:root {
  --kui-opacity-disabled: 0.4; /* every disabled control, option and cell */
  --kui-focus-ring-width: 2px; /* standalone controls; parts use --kui-focus-ring-width-sm */
  --kui-duration-base: 120ms; /* enter animations and control state changes */
  --kui-color-scrim: oklch(0 0 0 / 0.65); /* behind Dialog, Drawer and Command Palette */
}`,
  },
] as const satisfies readonly CodeTab[];

export const THEMING_COLOUR_ROLE_ROWS = [
  {
    name: '--kui-color-on-fill on a solid fill',
    type: '--kui-color-<role>-on-fill',
    description: 'White or near-black, whichever reaches 4.5:1 on that fill.',
  },
  {
    name: '--kui-color-<role>-fill as text or an icon colour',
    type: '--kui-color-<role>-text',
    description: '4.5:1 on every surface.',
  },
  {
    name: '--kui-color-<role>-fill as a border, outline, bar or mark',
    type: '--kui-color-<role>-indicator',
    description: '3:1 on every light surface.',
  },
  {
    name: '--kui-color-border on an interactive control',
    type: '--kui-color-border-control',
    description: 'A 3:1 boundary at rest; the hover value is --kui-color-border-control-hover.',
  },
  {
    name: '--kui-color-primary-focus-ring or a box-shadow ring',
    type: 'a 2px outline in --kui-color-focus',
    description: 'Visible in forced-colors mode and 3:1.',
  },
  {
    name: '--kui-color-text-disabled on placeholders',
    type: '--kui-color-text-placeholder',
    description: '4.5:1; disabled text stays for disabled controls.',
  },
] as const satisfies readonly ApiTableRow[];

export const THEMING_CONTRAST_ROWS = [
  {
    name: 'KuiThemeContrast',
    type: "'strict' | 'soft'",
    description: 'Contrast profile name and the value of the data-kui-contrast attribute.',
  },
  {
    name: 'DEFAULT_KUI_THEME_CONTRAST',
    type: 'KuiThemeContrast',
    description: 'Profile a theme uses when the contrast option is not set.',
  },
  {
    name: 'KuiGeneratedContrast',
    type: '{ name; media?; light; dark }',
    description:
      'Variables one profile changes relative to the default, emitted as [data-kui-contrast] rules and an optional media query.',
  },
] as const satisfies readonly ApiTableRow[];
