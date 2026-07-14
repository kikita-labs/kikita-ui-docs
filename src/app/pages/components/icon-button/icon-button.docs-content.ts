import { KIKITA_UI_PACKAGE_VERSION } from '@core/package';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

export const ICON_BUTTON_STATUS = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;

export const ICON_BUTTON_API_DESCRIPTION = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;

export const ICON_BUTTON_IMPORT_TABS: readonly CodeTab[] = [
  {
    label: 'Import',
    filename: 'icon-button.ts',
    language: 'ts',
    code: `import { KuiIconButtonDirective, KuiIconComponent } from '@kikita-labs/ui';`,
  },
];
