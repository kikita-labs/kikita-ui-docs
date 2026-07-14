import { KIKITA_UI_PACKAGE_VERSION } from '@core/package';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

export const TREE_STATUS = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;

export const TREE_API_DESCRIPTION = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings and package docs.`;

export const TREE_IMPORT_TABS: readonly CodeTab[] = [
  {
    label: 'Import',
    filename: 'tree.ts',
    language: 'ts',
    code: `import { KuiTreeComponent, type KuiTreeNode } from '@kikita-labs/ui';`,
  },
];
