import { KIKITA_UI_PACKAGE_VERSION } from '@core/package';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

export const DATE_PICKER_STATUS = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;

export const DATE_PICKER_API_DESCRIPTION = `Directive inputs, outputs, and paired calendar composition verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;

export const DATE_PICKER_IMPORT_TABS: readonly CodeTab[] = [
  {
    label: 'Import',
    filename: 'date-picker.ts',
    language: 'ts',
    code: `import {
  KuiCalendarComponent,
  KuiDatePickerDirective,
  KuiDropdownComponent,
  KuiFieldComponent,
} from '@kikita-labs/ui';`,
  },
];
