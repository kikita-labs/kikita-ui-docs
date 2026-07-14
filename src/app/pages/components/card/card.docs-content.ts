import { KIKITA_UI_PACKAGE_LABEL, KIKITA_UI_PACKAGE_VERSION } from '@core/package';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

export const CARD_STATUS = `Stable - ${KIKITA_UI_PACKAGE_LABEL} v${KIKITA_UI_PACKAGE_VERSION}`;

export const CARD_API_DESCRIPTION = `Inputs verified against ${KIKITA_UI_PACKAGE_LABEL} v${KIKITA_UI_PACKAGE_VERSION} public typings.`;

export const CARD_IMPORT_TABS: readonly CodeTab[] = [
  {
    label: 'Import',
    filename: 'card.ts',
    language: 'ts',
    code: `import { KuiCardDirective } from '@kikita-labs/ui';`,
  },
];
