import { KIKITA_UI_PACKAGE_LABEL } from '@core/package';
import type { CodeTab } from '@shared/docs-ui/code-tabs';

export const SKELETON_STATUS = `Stable - ${KIKITA_UI_PACKAGE_LABEL}`;

export const SKELETON_API_DESCRIPTION = `Inputs verified against ${KIKITA_UI_PACKAGE_LABEL} public typings.`;

export const SKELETON_IMPORT_TABS = [
  {
    label: 'Import',
    filename: 'skeleton.ts',
    language: 'ts',
    code: `import { KuiSkeletonDirective } from '@kikita-labs/ui';`,
  },
] as const satisfies readonly CodeTab[];
