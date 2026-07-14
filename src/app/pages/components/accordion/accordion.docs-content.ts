import { KIKITA_UI_PACKAGE_LABEL, KIKITA_UI_PACKAGE_VERSION } from '@core/package';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

export const ACCORDION_STATUS = `Stable - ${KIKITA_UI_PACKAGE_LABEL} v${KIKITA_UI_PACKAGE_VERSION}`;

export const ACCORDION_API_DESCRIPTION = `Inputs verified against ${KIKITA_UI_PACKAGE_LABEL} v${KIKITA_UI_PACKAGE_VERSION} public typings.`;

export const ACCORDION_IMPORT_TABS: readonly CodeTab[] = [
  {
    label: 'Import',
    filename: 'accordion.ts',
    language: 'ts',
    code: `import { KuiAccordionComponent, KuiAccordionItemComponent } from '@kikita-labs/ui';`,
  },
];
