import { KIKITA_UI_PACKAGE_VERSION } from '@core/package';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

export const CHECKBOX_STATUS = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;

export const CHECKBOX_API_DESCRIPTION = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;

export const CHECKBOX_IMPORT_TABS: readonly CodeTab[] = [
  {
    label: 'Import',
    filename: 'checkbox.ts',
    language: 'ts',
    code: `import { KuiCheckbox, KuiField } from '@kikita-labs/ui';`,
  },
];

export const CHECKBOX_FORMS_TABS: readonly CodeTab[] = [
  {
    label: 'Signal Forms',
    filename: 'settings.html',
    language: 'html',
    code: `<kui-field label="Notifications" hint="Control product and release emails">
  <label>
    <input kuiCheckbox type="checkbox" [formField]="settingsForm.receiveUpdates" />
    Receive updates
  </label>
</kui-field>`,
  },
];
