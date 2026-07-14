import type { ApiTableRow } from '@shared/docs-ui/api-table';
import type { CodeTab } from '@shared/docs-ui/code-tabs';

export const DENSITY_PROVIDER_TABS = [
  {
    label: 'Global density',
    filename: 'app.config.ts',
    language: 'ts',
    code: `import { provideKikitaUi } from '@kikita-labs/ui';

export const appConfig = {
  providers: [
    provideKikitaUi({
      defaults: {
        density: 'regular',
      },
    }),
  ],
};`,
  },
  {
    label: 'Theme seed',
    filename: 'app.config.ts',
    language: 'ts',
    code: `import { DEFAULT_KUI_THEME, provideKikitaUi } from '@kikita-labs/ui';

provideKikitaUi({
  theme: {
    seeds: {
      ...DEFAULT_KUI_THEME.seeds,
      density: 'regular',
    },
  },
});`,
  },
] as const satisfies readonly CodeTab[];

export const DENSITY_VALUE_ROWS = [
  {
    name: 'compact',
    type: 'KuiDensity',
    description:
      'Dense operational surfaces such as toolbars, tables, and high-frequency controls.',
  },
  {
    name: 'regular',
    type: 'KuiDensity',
    description: 'Default application density and the safest choice for documentation examples.',
  },
  {
    name: 'comfortable',
    type: 'KuiDensity',
    description:
      'Touch-heavy or spacious contexts where larger hit areas matter more than density.',
  },
] as const satisfies readonly ApiTableRow[];

export const DENSITY_CONTROL_ROWS = [
  {
    name: 'Control height (xs / sm / md / lg)',
    type: '28px / 32px / 40px / 44px',
    description:
      'Set only by data-kui-size on Input, Button, Icon-Button, Segmented, Tabs, and Group. Density does not affect height.',
  },
  {
    name: 'Button x padding',
    type: '8px / 12px / 16px',
    description: 'Horizontal control padding across compact, regular, and comfortable density.',
  },
] as const satisfies readonly ApiTableRow[];

export const DENSITY_TOKEN_TABS = [
  {
    label: 'Density tokens',
    filename: 'density.css',
    language: 'css',
    code: `--kui-btn-px-compact
--kui-btn-px-regular
--kui-btn-px-comfortable`,
  },
  {
    label: 'Resolved tokens',
    filename: 'resolved.css',
    language: 'css',
    code: `--kui-control-height-xs
--kui-control-height-sm
--kui-control-height-md
--kui-control-height-lg
--kui-btn-height
--kui-btn-px
--kui-input-px`,
  },
] as const satisfies readonly CodeTab[];
