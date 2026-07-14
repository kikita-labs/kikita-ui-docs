import { KIKITA_UI_PACKAGE_LABEL } from '@core/package';
import type { CodeTab } from '@shared/docs-ui/code-tabs';

export const TOAST_STATUS = `Stable - ${KIKITA_UI_PACKAGE_LABEL}`;

export const TOAST_API_DESCRIPTION = `API verified against ${KIKITA_UI_PACKAGE_LABEL} public typings.`;

export const TOAST_IMPORT_TABS = [
  {
    label: 'Import',
    filename: 'toast.ts',
    language: 'ts',
    code: `import { kuiToast, provideKuiToastOptions } from '@kikita-labs/ui';

// Import runtime styles once, application-wide:
import '@kikita-labs/ui/styles';`,
  },
] as const satisfies readonly CodeTab[];
