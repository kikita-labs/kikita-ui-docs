import { KIKITA_UI_PACKAGE_VERSION } from '@core/package';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

export const TEXTAREA_STATUS = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;

export const TEXTAREA_API_DESCRIPTION = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;

export const TEXTAREA_IMPORT_TABS: readonly CodeTab[] = [
  {
    label: 'Import',
    filename: 'textarea.ts',
    language: 'ts',
    code: `import { KuiTextareaDirective } from '@kikita-labs/ui';`,
  },
];

export const TEXTAREA_SIGNAL_FORMS_TABS: readonly CodeTab[] = [
  {
    label: 'HTML',
    filename: 'textarea-signal-forms-example.html',
    language: 'html',
    code: `<kui-field label="Description" hint="Short project description">
  <textarea kuiTextarea [formField]="profileForm.description"></textarea>
</kui-field>`,
  },
];
