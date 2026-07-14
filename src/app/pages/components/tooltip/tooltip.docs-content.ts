import { KIKITA_UI_PACKAGE_VERSION } from '@core/package';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

export const TOOLTIP_STATUS = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;

export const TOOLTIP_API_DESCRIPTION = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;

export const TOOLTIP_IMPORT_TABS: readonly CodeTab[] = [
  {
    label: 'Import',
    filename: 'tooltip.ts',
    language: 'ts',
    code: `import { KuiTooltipDirective } from '@kikita-labs/ui';`,
  },
];
