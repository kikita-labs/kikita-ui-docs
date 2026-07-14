import { KIKITA_UI_PACKAGE_VERSION } from '@core/package';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

export const FILE_UPLOAD_STATUS = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;

export const FILE_UPLOAD_API_DESCRIPTION = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings and package docs.`;

export const FILE_UPLOAD_IMPORT_TABS: readonly CodeTab[] = [
  {
    label: 'Import',
    filename: 'file-upload.ts',
    language: 'ts',
    code: `import { KuiFileUploadComponent, type KuiUploadFile } from '@kikita-labs/ui';`,
  },
];
