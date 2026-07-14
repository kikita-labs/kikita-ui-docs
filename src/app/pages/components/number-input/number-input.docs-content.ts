import { KIKITA_UI_PACKAGE_VERSION } from '@core/package';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

export const NUMBER_INPUT_STATUS = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;

export const NUMBER_INPUT_API_DESCRIPTION = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;

export const NUMBER_INPUT_IMPORT_TABS: readonly CodeTab[] = [
  {
    label: 'Import',
    filename: 'number-input.ts',
    language: 'ts',
    code: `import { KuiNumberInputDirective } from '@kikita-labs/ui';`,
  },
];

export const NUMBER_INPUT_SIGNAL_FORMS_TABS: readonly CodeTab[] = [
  {
    label: 'HTML',
    filename: 'signal-forms-number-input.html',
    language: 'html',
    code: `<kui-field label="Count" hint="Enter a value from 1 to 100">
  <input type="number" kuiNumberInput [formField]="profileForm.count" />
</kui-field>`,
  },
];
