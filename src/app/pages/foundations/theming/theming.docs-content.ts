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
