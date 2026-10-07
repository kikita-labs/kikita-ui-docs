import { KIKITA_UI_PACKAGE_VERSION } from '@core/package';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

export const FIELD_STATUS = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;

export const FIELD_API_DESCRIPTION = `Inputs, projected markers, provider defaults and tokens verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;

export const FIELD_IMPORT_TABS: readonly CodeTab[] = [
  {
    label: 'Import',
    filename: 'field.ts',
    language: 'ts',
    code: `import {
  KuiError,
  KuiField,
  KuiFieldAffix,
  KuiHint,
  KuiInput,
  KuiInputGroup,
  KuiLabel,
  provideKuiDefaults,
} from '@kikita-labs/ui';`,
  },
];

export const FIELD_FORMS_TABS: readonly CodeTab[] = [
  {
    label: 'Signal Forms',
    filename: 'profile.html',
    language: 'html',
    code: `<kui-field label="Project" hint="Minimum 3 characters">
  <input kuiInput [formField]="profileForm.project" />
</kui-field>

<!-- hideErrors keeps the invalid state but hides the rendered messages -->
<kui-field label="Project" hint="Minimum 3 characters" hideErrors>
  <input kuiInput [formField]="profileForm.project" />
</kui-field>`,
  },
];

export const FIELD_LABEL_TABS: readonly CodeTab[] = [
  {
    label: 'kuiLabel',
    filename: 'email.html',
    language: 'html',
    code: `<kui-field>
  <label kuiLabel>Email</label>
  <input kuiInput type="email" [formField]="profileForm.email" />
  <p kuiHint>Use your work email</p>

  @if (shouldShowEmailError()) {
    <p kuiError>Email is required</p>
  }
</kui-field>`,
  },
];
