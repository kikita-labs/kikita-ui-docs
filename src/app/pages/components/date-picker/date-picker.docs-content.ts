import { KIKITA_UI_PACKAGE_VERSION } from '@core/package';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

export const DATE_PICKER_STATUS = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;

export const DATE_PICKER_API_DESCRIPTION = `Directive inputs, outputs, provider defaults, messages and paired calendar composition verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;

export const DATE_PICKER_IMPORT_TABS: readonly CodeTab[] = [
  {
    label: 'Import',
    filename: 'date-picker.ts',
    language: 'ts',
    code: `import {
  KuiCalendar,
  KuiDatePicker,
  KuiDropdown,
  KuiField,
} from '@kikita-labs/ui';`,
  },
];

export const DATE_PICKER_MANUAL_TABS: readonly CodeTab[] = [
  {
    label: 'Manual binding',
    filename: 'meeting.html',
    language: 'html',
    code: `<!-- Still supported: bind the calendar yourself (not deprecated) -->
<kui-field label="Meeting date">
  <input kuiDatePicker [(value)]="date" [(viewDate)]="viewDate" />
  <kui-dropdown panelRole="dialog" panelWidth="auto" maxHeight="420px">
    <kui-calendar flat [(value)]="date" [(viewDate)]="viewDate" showFooter />
  </kui-dropdown>
</kui-field>`,
  },
];
