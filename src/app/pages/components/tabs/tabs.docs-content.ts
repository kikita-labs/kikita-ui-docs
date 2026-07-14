import { KIKITA_UI_PACKAGE_LABEL, KIKITA_UI_PACKAGE_VERSION } from '@core/package';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

export const TABS_STATUS = `Stable - ${KIKITA_UI_PACKAGE_LABEL} v${KIKITA_UI_PACKAGE_VERSION}`;

export const TABS_API_DESCRIPTION = `Inputs verified against ${KIKITA_UI_PACKAGE_LABEL} v${KIKITA_UI_PACKAGE_VERSION} public typings.`;

export const TABS_IMPORT_TABS: readonly CodeTab[] = [
  {
    label: 'Import',
    filename: 'tabs.ts',
    language: 'ts',
    code: `import { KuiTabsComponent, KuiTabDirective, KuiTabPanelDirective } from '@kikita-labs/ui';`,
  },
];
