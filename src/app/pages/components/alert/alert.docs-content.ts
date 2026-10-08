import { KIKITA_UI_PACKAGE_LABEL } from '@core/package';
import type { CodeTab } from '@shared/docs-ui/code-tabs';

export const ALERT_STATUS = `Stable - ${KIKITA_UI_PACKAGE_LABEL}`;

export const ALERT_API_DESCRIPTION = `Inputs verified against ${KIKITA_UI_PACKAGE_LABEL} public typings.`;

export const ALERT_IMPORT_TABS = [
  {
    label: 'Import',
    filename: 'alert.ts',
    language: 'ts',
    code: `import { KuiAlert } from '@kikita-labs/ui';

// Only for custom content slots:
import { KuiAlertActions, KuiAlertIcon, KuiAlertMessage, KuiAlertTitle } from '@kikita-labs/ui';`,
  },
] as const satisfies readonly CodeTab[];
