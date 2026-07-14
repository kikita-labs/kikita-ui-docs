import { KIKITA_UI_PACKAGE_LABEL, KIKITA_UI_PACKAGE_VERSION } from '@core/package';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

export const EMPTY_STATE_STATUS = `Stable - ${KIKITA_UI_PACKAGE_LABEL} v${KIKITA_UI_PACKAGE_VERSION}`;

export const EMPTY_STATE_API_DESCRIPTION = `Inputs verified against ${KIKITA_UI_PACKAGE_LABEL} v${KIKITA_UI_PACKAGE_VERSION} public typings.`;

export const EMPTY_STATE_IMPORT_TABS: readonly CodeTab[] = [
  {
    label: 'Import',
    filename: 'empty-state.ts',
    language: 'ts',
    code: `import {
  KuiButtonDirective,
  KuiEmptyStateActionsDirective,
  KuiEmptyStateComponent,
  KuiEmptyStateIconDirective,
} from '@kikita-labs/ui';`,
  },
];
