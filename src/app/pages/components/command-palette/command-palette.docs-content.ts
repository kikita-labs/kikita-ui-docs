import { KIKITA_UI_PACKAGE_VERSION } from '@core/package';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

export const COMMAND_PALETTE_STATUS = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;

export const COMMAND_PALETTE_API_DESCRIPTION = `Inputs and outputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;

export const COMMAND_PALETTE_IMPORT_TABS: readonly CodeTab[] = [
  {
    label: 'Import',
    filename: 'command-palette.ts',
    language: 'ts',
    code: `import {
  KuiButtonDirective,
  KuiCommandGroup,
  KuiCommandItem,
  KuiCommandPaletteComponent,
} from '@kikita-labs/ui';`,
  },
];

export const COMMAND_PALETTE_ITEM_TABS: readonly CodeTab[] = [
  {
    label: 'Item data',
    language: 'ts',
    code: `const groups: readonly KuiCommandGroup[] = [
  {
    heading: 'Project',
    items: [
      {
        id: 'rename',
        label: 'Rename project',
        description: 'Update the display name.',
        meta: 'Project',
        badge: 'New',
        shortcut: ['F2'],
        icon: 'R',
        keywords: ['edit', 'title'],
      },
      {
        id: 'delete',
        label: 'Delete project',
        danger: true,
        disabled: true,
      },
    ],
  },
];`,
  },
];
