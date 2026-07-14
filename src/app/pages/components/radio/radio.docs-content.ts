import { KIKITA_UI_PACKAGE_VERSION } from '@core/package';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

export const RADIO_STATUS = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;

export const RADIO_API_DESCRIPTION = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;

export const RADIO_IMPORT_TABS: readonly CodeTab[] = [
  {
    label: 'Import',
    filename: 'radio.ts',
    language: 'ts',
    code: `import { KuiFieldComponent, KuiRadioDirective } from '@kikita-labs/ui';`,
  },
];

export const RADIO_SIGNAL_FORMS_TABS: readonly CodeTab[] = [
  {
    label: 'HTML',
    language: 'html',
    code: `<kui-field label="Plan" hint="Choose a billing plan">
  <label>
    <input kuiRadio type="radio" name="plan" value="pro" [formField]="billingForm.plan" />
    Pro
  </label>
</kui-field>`,
  },
];
