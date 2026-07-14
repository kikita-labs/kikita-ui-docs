import { KIKITA_UI_PACKAGE_VERSION } from '@core/package';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

export const AVATAR_STATUS = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;

export const AVATAR_API_DESCRIPTION = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;

export const AVATAR_IMPORT_TABS: readonly CodeTab[] = [
  {
    label: 'Import',
    filename: 'avatar.ts',
    language: 'ts',
    code: `import { KuiAvatarComponent, KuiAvatarGroupComponent } from '@kikita-labs/ui';`,
  },
];
