import { type ApiTableRow } from '@shared/docs-ui/api-table';

export const AVATAR_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'src',
    type: 'string | undefined',
    defaultValue: 'undefined',
    description: 'Image URL. Falls back to initials, then the icon fallback, on load error.',
  },
  {
    name: 'name',
    type: 'string | undefined',
    defaultValue: 'undefined',
    description: 'Used to derive initials, the palette hash, and the accessible label.',
  },
  {
    name: 'initials',
    type: 'string | undefined',
    defaultValue: 'auto',
    description: 'Explicit one or two character initials, overriding the value derived from name.',
  },
  {
    name: 'alt',
    type: 'string | undefined',
    defaultValue: 'name',
    description: 'Image alt text and accessible label override.',
  },
  {
    name: 'size',
    type: `'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'`,
    defaultValue: `'md'`,
    description:
      'Fixed avatar size. Falls back to defaults.avatar.size, then the global defaults.size.',
  },
  {
    name: 'shape',
    type: `'circle' | 'square'`,
    defaultValue: `'circle'`,
    description:
      'circle is intended for people; square is intended for entities such as bots, teams, or projects. Falls back to defaults.avatar.shape.',
  },
  {
    name: 'status',
    type: `'online' | 'away' | 'busy' | 'offline' | undefined`,
    defaultValue: 'undefined',
    description:
      'Optional presence indicator. Appended to the accessible label; the dot itself is decorative.',
  },
  {
    name: 'paletteIndex',
    type: 'number | undefined',
    defaultValue: 'auto',
    description:
      'Palette slot from 1 to 7 used for the fallback background and text color. A static numeric attribute is coerced and finite values clamp to 1-7.',
  },
  {
    name: 'loading',
    type: 'boolean',
    defaultValue: 'false',
    description:
      'Renders the avatar using the internal [kuiSkeleton] loading treatment and hides avatar content.',
  },
  {
    name: 'kui-avatar-group avatars',
    type: 'readonly KuiAvatarItem[]',
    defaultValue: '[]',
    description: 'Items rendered by the group. Each item accepts the same fields as kui-avatar.',
  },
  {
    name: 'kui-avatar-group max',
    type: 'number',
    defaultValue: '4',
    description:
      'Maximum visible avatars before the group collapses the rest into a +N overflow avatar. Falls back to defaults.avatarGroup.max; a static numeric attribute is coerced, and an invalid or less-than-one value resolves to 1.',
  },
  {
    name: 'kui-avatar-group size',
    type: 'KuiAvatarSize',
    defaultValue: `'md'`,
    description:
      'Size applied to every avatar in the group, including the overflow avatar. Falls back to defaults.avatarGroup.size, then the global defaults.size.',
  },
  {
    name: 'kui-avatar-group shape',
    type: 'KuiAvatarShape',
    defaultValue: `'circle'`,
    description:
      'Shape applied to every avatar in the group, including the overflow avatar. Falls back to defaults.avatarGroup.shape.',
  },
  {
    name: 'kui-avatar-group label',
    type: 'string | undefined',
    defaultValue: `'Avatar group'`,
    description:
      'Accessible label for the group container. Undefined when omitted: the rendered text comes from the avatarGroup.label message.',
  },
  {
    name: '.kui-avatar-action',
    type: 'CSS class',
    defaultValue: '-',
    description:
      'Applied to an external native button wrapping a kui-avatar to make it interactive. kui-avatar itself must not be made clickable.',
  },
  {
    name: 'KuiAvatarItem',
    type: 'interface',
    defaultValue: '-',
    description:
      'Item of kui-avatar-group avatars: the same fields as kui-avatar (src, name, initials, alt, status, paletteIndex).',
  },
  {
    name: 'KuiAvatarOptions / KuiAvatarGroupOptions',
    type: 'interfaces',
    defaultValue: '-',
    description:
      'Shapes of defaults.avatar (size, shape) and defaults.avatarGroup (size, shape, max).',
  },
  {
    name: 'KuiAvatarMessages / KuiAvatarGroupMessages',
    type: 'interfaces',
    defaultValue: '-',
    description:
      'Typed messages of the avatar (fallback name, status words, name with status) and of the group (label, overflow text).',
  },
];
