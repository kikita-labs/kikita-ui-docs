import type { ApiTableRow } from '@shared/docs-ui/api-table';
import type { CodeTab } from '@shared/docs-ui/code-tabs';

export const MIGRATION_AUTOMATIC_TABS = [
  {
    label: 'Update',
    filename: 'terminal',
    language: 'bash',
    code: `ng update @kikita-labs/ui`,
  },
  {
    label: 'Run again',
    filename: 'terminal',
    language: 'bash',
    code: `ng update @kikita-labs/ui --migrate-only --from=1.8.0 --to=2.0.0`,
  },
  {
    label: 'Find leftovers',
    filename: 'terminal',
    language: 'bash',
    code: `git grep -nE "Kui[A-Za-z]+(Component|Directive)\\b|KuiToastService|kuiProvideLocale"`,
  },
] as const satisfies readonly CodeTab[];

export const MIGRATION_RENAMED_ROWS = [
  {
    name: 'KuiButtonDirective',
    type: 'KuiButton',
    description: 'A directive loses its suffix.',
  },
  {
    name: 'KuiTabsComponent',
    type: 'KuiTabs',
    description: 'A component loses its suffix.',
  },
  {
    name: 'KuiToastService',
    type: 'KuiToast',
    description: 'A service loses its suffix; kuiToast() still returns it.',
  },
  {
    name: 'KuiSelectCellComponent',
    type: 'KuiSelectCell',
    description: 'Table selection parts are renamed the same way.',
  },
  {
    name: 'kuiProvideLocale',
    type: 'provideKuiLocale',
    description: 'Returns Provider[] and accepts a Signal.',
  },
] as const satisfies readonly ApiTableRow[];

export const MIGRATION_PROVIDER_ROWS = [
  {
    name: 'KUI_BUTTON_OPTIONS, KUI_FIELD_OPTIONS, KUI_SELECT_OPTIONS',
    type: 'provideKuiDefaults({ button, field, select })',
    description: 'The injection tokens are removed.',
  },
  {
    name: 'KUI_COMBOBOX_OPTIONS, KUI_TOOLTIP_OPTIONS, KUI_TOAST_OPTIONS',
    type: 'provideKuiDefaults({ combobox, tooltip, toast })',
    description: 'The injection tokens are removed.',
  },
  {
    name: 'kuiProvideButtonOptions, kuiProvideFieldOptions, kuiProvideSelectOptions',
    type: 'provideKuiDefaults',
    description: 'Deprecated, forward to provideKuiDefaults, removed in 3.0.',
  },
  {
    name: 'kuiProvideComboboxOptions, kuiProvideTooltipOptions, provideKuiToastOptions',
    type: 'provideKuiDefaults',
    description: 'Deprecated, forward to provideKuiDefaults, removed in 3.0.',
  },
  {
    name: 'provideKikitaUi({ tooltip })',
    type: 'provideKikitaUi({ defaults: { tooltip } })',
    description: 'Deprecated.',
  },
  {
    name: 'KikitaUiDefaults',
    type: 'KuiComponentDefaults',
    description: 'Deprecated alias, removed in 3.0.',
  },
  {
    name: 'KuiButtonOptions as { button, iconButton }',
    type: 'KuiButtonProviderOptions',
    description: 'KuiButtonOptions now describes one button.',
  },
] as const satisfies readonly ApiTableRow[];
