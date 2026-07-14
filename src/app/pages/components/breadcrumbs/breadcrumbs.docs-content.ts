import { KIKITA_UI_PACKAGE_VERSION } from '@core/package';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

export const BREADCRUMBS_STATUS = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;

export const BREADCRUMBS_API_DESCRIPTION = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;

export const BREADCRUMBS_IMPORT_TABS: readonly CodeTab[] = [
  {
    label: 'Import',
    filename: 'breadcrumbs.ts',
    language: 'ts',
    code: `import {
  KuiBreadcrumbItemDirective,
  KuiBreadcrumbSeparatorComponent,
  KuiBreadcrumbsDirective,
} from '@kikita-labs/ui';`,
  },
];
