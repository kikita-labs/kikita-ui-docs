import { KIKITA_UI_PACKAGE_VERSION } from '@core/package';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

export const DROPDOWN_STATUS = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;

export const DROPDOWN_API_DESCRIPTION = `API verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;

export const DROPDOWN_IMPORT_TABS: readonly CodeTab[] = [
  {
    label: 'Import',
    filename: 'dropdown.ts',
    language: 'ts',
    code: `import { KuiDropdownComponent, KuiDropdownForDirective, KuiOptionDirective } from '@kikita-labs/ui';

// Import runtime styles once, application-wide:
import '@kikita-labs/ui/styles';`,
  },
];
