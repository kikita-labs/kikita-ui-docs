import { DEFAULT_KUI_THEME } from '@kikita-labs/ui';

import type { KikitaUiOptions, KuiDensity } from '@kikita-labs/ui';

import type { CodeTab } from '@shared/docs-ui/code-tabs';

import {
  ACCESSIBILITY_FORM_TABS,
  ACCESSIBILITY_STATUS_TABS,
} from './accessibility/accessibility.docs-content';
import { AUTO_FOCUS_USAGE_TABS } from './auto-focus/auto-focus.docs-content';
import {
  DEFAULTS_ICONS_TABS,
  DEFAULTS_REACTIVE_TABS,
  DEFAULTS_SET_TABS,
} from './defaults/defaults.docs-content';
import {
  DENSITY_PROVIDER_TABS,
  DENSITY_TOKEN_TABS,
  DENSITY_VALUE_ROWS,
} from './density/density.docs-content';
import {
  FORMS_COMPONENT_TABS,
  FORMS_CUSTOM_TABS,
  FORMS_MODEL_TABS,
  FORMS_PATTERN_TABS,
} from './forms/forms.docs-content';
import {
  INSTALLATION_CLI_TABS,
  INSTALLATION_ICON_TABS,
  INSTALLATION_MANUAL_TABS,
  INSTALLATION_OPTION_ROWS,
  INSTALLATION_REGISTRY_TABS,
  INSTALLATION_STYLE_TABS,
  INSTALLATION_UPGRADE_TABS,
} from './installation/installation.docs-content';
import {
  INTERNATIONALIZATION_PLURAL_TABS,
  INTERNATIONALIZATION_QUICK_TABS,
  INTERNATIONALIZATION_RUNTIME_TABS,
  INTERNATIONALIZATION_SUBTREE_TABS,
} from './internationalization/internationalization.docs-content';
import { MIGRATION_AUTOMATIC_TABS } from './migration/migration.docs-content';
import {
  STRUCTURAL_ICONS_GLYPH_TABS,
  STRUCTURAL_ICONS_REPLACE_TABS,
  STRUCTURAL_ICONS_STROKE_CODE_TABS,
} from './structural-icons/structural-icons.docs-content';
import {
  THEMING_CONTRACT_TABS,
  THEMING_CONTRAST_TABS,
  THEMING_OVERRIDE_TABS,
  THEMING_PROVIDER_TABS,
  THEMING_SEED_TABS,
  THEMING_SHARED_TOKEN_TABS,
  THEMING_UTILITY_ROWS,
} from './theming/theming.docs-content';
import {
  TOKENS_LAYER_TABS,
  TOKENS_SCALE_TABS,
  TOKENS_SEED_ROWS,
  TOKENS_SHARED_TABS,
} from './tokens/tokens.docs-content';

const ALL_FOUNDATION_CODE_TABS: readonly CodeTab[] = [
  ...FORMS_MODEL_TABS,
  ...FORMS_PATTERN_TABS,
  ...FORMS_CUSTOM_TABS,
  ...FORMS_COMPONENT_TABS,
  ...AUTO_FOCUS_USAGE_TABS,
  ...STRUCTURAL_ICONS_REPLACE_TABS,
  ...STRUCTURAL_ICONS_GLYPH_TABS,
  ...STRUCTURAL_ICONS_STROKE_CODE_TABS,
  ...DEFAULTS_SET_TABS,
  ...DEFAULTS_REACTIVE_TABS,
  ...DEFAULTS_ICONS_TABS,
  ...INTERNATIONALIZATION_QUICK_TABS,
  ...INTERNATIONALIZATION_RUNTIME_TABS,
  ...INTERNATIONALIZATION_SUBTREE_TABS,
  ...INTERNATIONALIZATION_PLURAL_TABS,
  ...MIGRATION_AUTOMATIC_TABS,
  ...ACCESSIBILITY_FORM_TABS,
  ...ACCESSIBILITY_STATUS_TABS,
  ...DENSITY_PROVIDER_TABS,
  ...DENSITY_TOKEN_TABS,
  ...INSTALLATION_CLI_TABS,
  ...INSTALLATION_ICON_TABS,
  ...INSTALLATION_STYLE_TABS,
  ...INSTALLATION_UPGRADE_TABS,
  ...INSTALLATION_MANUAL_TABS,
  ...INSTALLATION_REGISTRY_TABS,
  ...THEMING_CONTRACT_TABS,
  ...THEMING_CONTRAST_TABS,
  ...THEMING_OVERRIDE_TABS,
  ...THEMING_SHARED_TOKEN_TABS,
  ...THEMING_PROVIDER_TABS,
  ...THEMING_SEED_TABS,
  ...TOKENS_LAYER_TABS,
  ...TOKENS_SCALE_TABS,
  ...TOKENS_SHARED_TABS,
];

const DENSITY_THEME_CONTRACT = {
  theme: {
    seeds: {
      ...DEFAULT_KUI_THEME.seeds,
      density: 'regular',
    },
  },
} as const satisfies KikitaUiOptions;

const ROOT_SIZE_DEFAULT_CONTRACT = {
  defaults: {
    size: 'sm',
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
    expect(ROOT_SIZE_DEFAULT_CONTRACT.defaults.size).toBe('sm');
    expect(DENSITY_PROVIDER_TABS[0].code).toContain('...DEFAULT_KUI_THEME.seeds');
    expect(DENSITY_PROVIDER_TABS[1].code).toContain("size: 'sm'");
    expect(DENSITY_PROVIDER_TABS[1].code).not.toContain('density');
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
    expect(TOKENS_SEED_ROWS.map((row) => row.type)).toEqual([
      DEFAULT_KUI_THEME.seeds?.color.primary,
      DEFAULT_KUI_THEME.seeds?.color.neutral,
      DEFAULT_KUI_THEME.seeds?.color.success,
      DEFAULT_KUI_THEME.seeds?.color.warning,
      DEFAULT_KUI_THEME.seeds?.color.danger,
      DEFAULT_KUI_THEME.seeds?.color.info,
    ]);
    expect(ACCESSIBILITY_FORM_TABS[0].code).not.toContain(' formField');
  });
});
