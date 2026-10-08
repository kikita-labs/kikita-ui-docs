import { KIKITA_UI_PACKAGE_LABEL } from '@core/package';
import type { CodeTab } from '@shared/docs-ui/code-tabs';

export const MEDIA_VIEWER_STATUS = `Stable - ${KIKITA_UI_PACKAGE_LABEL}`;

export const MEDIA_VIEWER_API_DESCRIPTION = `Inputs verified against ${KIKITA_UI_PACKAGE_LABEL} public typings.`;

export const MEDIA_VIEWER_IMPORT_TABS = [
  {
    label: 'Import',
    filename: 'media-viewer.ts',
    language: 'ts',
    code: `import { kuiMediaViewer } from '@kikita-labs/ui';
import type { KuiMediaViewerItem } from '@kikita-labs/ui';`,
  },
] as const satisfies readonly CodeTab[];
