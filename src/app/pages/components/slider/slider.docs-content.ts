import { KIKITA_UI_PACKAGE_VERSION } from '@core/package';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

export const SLIDER_STATUS = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;

export const SLIDER_API_DESCRIPTION = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;

export const SLIDER_IMPORT_TABS: readonly CodeTab[] = [
  {
    label: 'Import',
    filename: 'slider.ts',
    language: 'ts',
    code: `import { KuiSliderDirective } from '@kikita-labs/ui';`,
  },
];
