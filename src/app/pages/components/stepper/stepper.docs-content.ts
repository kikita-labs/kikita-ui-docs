import { KIKITA_UI_PACKAGE_VERSION } from '@core/package';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

export const STEPPER_STATUS = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;

export const STEPPER_API_DESCRIPTION = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;

export const STEPPER_IMPORT_TABS: readonly CodeTab[] = [
  {
    label: 'Import',
    filename: 'stepper.ts',
    language: 'ts',
    code: `import { KuiStepComponent, KuiStepperComponent } from '@kikita-labs/ui';`,
  },
];
