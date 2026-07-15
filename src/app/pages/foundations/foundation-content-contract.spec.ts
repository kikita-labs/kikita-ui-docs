import { DEFAULT_KUI_THEME } from '@kikita-labs/ui';

import type { KikitaUiOptions, KuiDensity } from '@kikita-labs/ui';

import type { CodeTab } from '@shared/docs-ui/code-tabs';

import {
  ACCESSIBILITY_FORM_TABS,
  ACCESSIBILITY_STATUS_TABS,
} from './accessibility/accessibility.docs-content';
import {
  DENSITY_PROVIDER_TABS,
  DENSITY_TOKEN_TABS,
  DENSITY_VALUE_ROWS,
} from './density/density.docs-content';
import {
  INSTALLATION_CLI_TABS,
  INSTALLATION_MANUAL_TABS,
  INSTALLATION_OPTION_ROWS,
  INSTALLATION_REGISTRY_TABS,
} from './installation/installation.docs-content';
import {
  THEMING_CONTRACT_TABS,
  THEMING_PROVIDER_TABS,
  THEMING_SEED_TABS,
  THEMING_UTILITY_ROWS,
} from './theming/theming.docs-content';
import {
  TOKENS_LAYER_TABS,
  TOKENS_SCALE_TABS,
  TOKENS_SEED_ROWS,
} from './tokens/tokens.docs-content';

const ALL_FOUNDATION_CODE_TABS: readonly CodeTab[] = [
  ...ACCESSIBILITY_FORM_TABS,
  ...ACCESSIBILITY_STATUS_TABS,
  ...DENSITY_PROVIDER_TABS,
  ...DENSITY_TOKEN_TABS,
  ...INSTALLATION_CLI_TABS,
  ...INSTALLATION_MANUAL_TABS,
  ...INSTALLATION_REGISTRY_TABS,
  ...THEMING_CONTRACT_TABS,
  ...THEMING_PROVIDER_TABS,
  ...THEMING_SEED_TABS,
  ...TOKENS_LAYER_TABS,
  ...TOKENS_SCALE_TABS,
];

const DENSITY_THEME_CONTRACT = {
  theme: {
    seeds: {
      ...DEFAULT_KUI_THEME.seeds,
      density: 'regular',
    },
  },
} as const satisfies KikitaUiOptions;

describe('foundation content contracts', () => {
  it('stores authored snippets as named canonical source records', () => {
    for (const tab of ALL_FOUNDATION_CODE_TABS) {
      expect(tab.filename).toBeTruthy();
      expect(tab.code.trim()).not.toBe('');
      expect(tab.label.trim()).not.toBe('');
    }
  });

  it('matches the installed package setup and schematic contract', () => {
    expect(INSTALLATION_REGISTRY_TABS[0].code).toContain('pnpm add @kikita-labs/ui');
    expect(INSTALLATION_CLI_TABS.map((tab) => tab.code)).toEqual([
      'ng add @kikita-labs/ui',
      'ng add @kikita-labs/ui --project my-app',
    ]);
    expect(INSTALLATION_MANUAL_TABS[0].code).toContain(
      'node_modules/@kikita-labs/ui/styles/kikita-ui.css',
    );
    expect(INSTALLATION_MANUAL_TABS[1].code).toContain(
      "provideKikitaUi({\n      scrollbars: 'styled'",
    );
    expect(INSTALLATION_MANUAL_TABS[1].code).toContain(
      "import { type ApplicationConfig } from '@angular/core';",
    );
    expect(INSTALLATION_OPTION_ROWS.map((row) => row.name)).toEqual([
      '--project',
      '--skip-provider',
      '--skip-styles',
      '--theme',
    ]);
  });

  it('keeps public theme utilities, token seeds, and density values exact', () => {
    const densityValues = DENSITY_VALUE_ROWS.map((row) => row.name) satisfies KuiDensity[];

    expect(densityValues).toEqual(['compact', 'regular', 'comfortable']);
    expect(DENSITY_THEME_CONTRACT.theme.seeds.density).toBe('regular');
    expect(DENSITY_PROVIDER_TABS[1].code).toContain('...DEFAULT_KUI_THEME.seeds');
    expect(THEMING_UTILITY_ROWS.map((row) => row.name)).toEqual([
      'createKuiTheme',
      'createKuiThemeVariableMap',
      'createKuiThemeCssText',
      'createKuiThemeStyleSheet',
    ]);
    expect(TOKENS_SEED_ROWS.map((row) => row.name)).toEqual([
      '--kui-seed-primary',
      '--kui-seed-neutral',
      '--kui-seed-success',
      '--kui-seed-warning',
      '--kui-seed-danger',
      '--kui-seed-info',
    ]);
    expect(ACCESSIBILITY_FORM_TABS[0].code).not.toContain(' formField');
  });
});
