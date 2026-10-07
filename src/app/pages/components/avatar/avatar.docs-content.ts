import { KIKITA_UI_PACKAGE_VERSION } from '@core/package';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

export const AVATAR_STATUS = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;

export const AVATAR_API_DESCRIPTION = `Inputs, provider defaults, messages and tokens verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;

export const AVATAR_IMPORT_TABS: readonly CodeTab[] = [
  {
    label: 'Import',
    filename: 'avatar.ts',
    language: 'ts',
    code: `import { KuiAvatar, KuiAvatarGroup } from '@kikita-labs/ui';`,
  },
];

export const AVATAR_MIGRATION_TABS: readonly CodeTab[] = [
  {
    label: 'Messages',
    filename: 'app.config.ts',
    language: 'ts',
    code: `provideKikitaUi({
  messages: {
    avatar: { statusOnline: 'available' },
    avatarGroup: { overflow: ({ count }) => '+' + count },
  },
});`,
  },
];
