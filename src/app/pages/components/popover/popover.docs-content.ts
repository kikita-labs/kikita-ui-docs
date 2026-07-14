import { KIKITA_UI_PACKAGE_LABEL, KIKITA_UI_PACKAGE_VERSION } from '@core/package';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

export const POPOVER_STATUS = `Stable - ${KIKITA_UI_PACKAGE_LABEL} v${KIKITA_UI_PACKAGE_VERSION}`;

export const POPOVER_API_DESCRIPTION = `Inputs verified against ${KIKITA_UI_PACKAGE_LABEL} v${KIKITA_UI_PACKAGE_VERSION} public typings.`;

export const POPOVER_IMPORT_TABS: readonly CodeTab[] = [
  {
    label: 'Import',
    filename: 'popover.ts',
    language: 'ts',
    code: `import { KuiButtonDirective, KuiPopoverComponent, KuiPopoverForDirective } from '@kikita-labs/ui';`,
  },
];
