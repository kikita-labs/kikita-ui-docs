import { KIKITA_UI_PACKAGE_LABEL } from '@core/package';
import type { CodeTab } from '@shared/docs-ui/code-tabs';

export const OTP_INPUT_STATUS = `Stable - ${KIKITA_UI_PACKAGE_LABEL}`;

export const OTP_INPUT_API_DESCRIPTION = `Inputs verified against ${KIKITA_UI_PACKAGE_LABEL} public typings.`;

export const OTP_INPUT_IMPORT_TABS = [
  {
    label: 'Import',
    filename: 'otp-input.ts',
    language: 'ts',
    code: `import { KuiOtpInput } from '@kikita-labs/ui';`,
  },
] as const satisfies readonly CodeTab[];
