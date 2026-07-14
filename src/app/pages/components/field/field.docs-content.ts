import { KIKITA_UI_PACKAGE_VERSION } from '@core/package';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

export const FIELD_STATUS = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;

export const FIELD_API_DESCRIPTION = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;

export const FIELD_IMPORT_TABS: readonly CodeTab[] = [
  {
    label: 'Import',
    filename: 'field.ts',
    language: 'ts',
    code: `import { KuiFieldComponent } from '@kikita-labs/ui';`,
  },
];
