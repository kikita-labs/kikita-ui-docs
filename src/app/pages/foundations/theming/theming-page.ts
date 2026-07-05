import { Component } from '@angular/core';
import { ApiTableRow } from '../../../shared/docs-ui/api-table/api-table-row';
import { ApiTable } from '../../../shared/docs-ui/api-table/api-table';
import { CodeTab } from '../../../shared/docs-ui/code-tabs/code-tab';
import { CodeTabs } from '../../../shared/docs-ui/code-tabs/code-tabs';
import { DocSection } from '../../../shared/docs-ui/doc-section/doc-section';
import { PageHeader } from '../../../shared/docs-ui/page-header/page-header';

@Component({
  selector: 'app-theming-page',
  imports: [ApiTable, CodeTabs, DocSection, PageHeader],
  templateUrl: './theming-page.html',
  styleUrl: './theming-page.scss',
})
export class ThemingPage {
  protected readonly contractTabs: readonly CodeTab[] = [
    {
      label: 'Pipeline',
      language: 'text',
      code: `seed tokens -> OKLCH palettes -> semantic tokens -> component tokens`,
    },
    {
      label: 'Mode',
      language: 'html',
      code: `<html data-kui-theme="dark"></html>`,
    },
  ];

  protected readonly providerTabs: readonly CodeTab[] = [
    {
      label: 'Default',
      language: 'ts',
      code: `import { ApplicationConfig } from '@angular/core';
import { provideKikitaUi } from '@kikita-labs/ui';

export const appConfig: ApplicationConfig = {
  providers: [provideKikitaUi()],
};`,
    },
    {
      label: 'Docs app',
      language: 'ts',
      code: `provideKikitaUi({
  scrollbars: 'styled',
});`,
    },
  ];

  protected readonly seedTabs: readonly CodeTab[] = [
    {
      label: 'Theme seeds',
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
  ];

  protected readonly utilityRows: readonly ApiTableRow[] = [
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
  ];
}
