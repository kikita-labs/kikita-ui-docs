import { KIKITA_UI_PACKAGE_LABEL, KIKITA_UI_PACKAGE_VERSION } from '@core/package';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

export const ACCORDION_STATUS = `Stable - ${KIKITA_UI_PACKAGE_LABEL} v${KIKITA_UI_PACKAGE_VERSION}`;

export const ACCORDION_API_DESCRIPTION = `Inputs, provider defaults and tokens verified against ${KIKITA_UI_PACKAGE_LABEL} v${KIKITA_UI_PACKAGE_VERSION} public typings.`;

export const ACCORDION_IMPORT_TABS: readonly CodeTab[] = [
  {
    label: 'Import',
    filename: 'accordion.ts',
    language: 'ts',
    code: `import { KuiAccordion, KuiAccordionItem } from '@kikita-labs/ui';`,
  },
];

export const ACCORDION_MIGRATION_TABS: readonly CodeTab[] = [
  {
    label: 'Configuration inputs',
    filename: 'settings.html',
    language: 'html',
    code: `<!-- 1.x: mode, appearance and size were two-way models -->
<kui-accordion [(mode)]="mode" />

<!-- 2.0: plain inputs; only expandedItems is two-way -->
<kui-accordion [mode]="mode()" [(expandedItems)]="expanded" />`,
  },
];
