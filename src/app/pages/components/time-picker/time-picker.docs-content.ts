import { KIKITA_UI_PACKAGE_LABEL } from '@core/package';
import type { CodeTab } from '@shared/docs-ui/code-tabs';

export const TIME_PICKER_STATUS = `Stable - ${KIKITA_UI_PACKAGE_LABEL}`;

export const TIME_PICKER_API_DESCRIPTION = `Inputs verified against ${KIKITA_UI_PACKAGE_LABEL} public typings.`;

export const TIME_PICKER_IMPORT_TABS = [
  {
    label: 'Import',
    filename: 'time-picker.ts',
    language: 'ts',
    code: `import { KuiDropdown, KuiField, KuiTimePicker, KuiTimePickerPanel } from '@kikita-labs/ui';`,
  },
] as const satisfies readonly CodeTab[];
