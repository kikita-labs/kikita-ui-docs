import { type ApiTableRow } from '@shared/docs-ui/api-table';

export const CHIP_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'appearance',
    type: `'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info'`,
    defaultValue: `'neutral'`,
    description: 'Semantic visual treatment mapped to Kikita UI status tokens.',
  },
  {
    name: 'size',
    type: `'xs' | 'sm' | 'md' | 'lg'`,
    defaultValue: `'md'`,
    description:
      'Chip size. sm is the size used inside Select and Combobox controls. Falls back to defaults.chip.size, then the global defaults.size.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Reduces opacity and makes the nested remove action inert.',
  },
  {
    name: 'invalid',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Shows the invalid border treatment.',
  },
  {
    name: 'removable',
    type: 'boolean',
    defaultValue: 'false',
    description:
      'Renders a default remove button (crossmark icon) as the last child. Primary way to make a chip removable; use kuiChipRemove instead only for a custom icon or extra content.',
  },
  {
    name: 'removeLabel',
    type: 'string | undefined',
    defaultValue: `'Remove'`,
    description:
      'Accessible name for the default remove button rendered by removable. Provide a value-specific label, for example "Remove Design".',
  },
  {
    name: 'removed',
    type: 'output: void',
    defaultValue: '-',
    description:
      'Emitted when the default remove button or a nested button[kuiChipRemove] is activated.',
  },
  {
    name: 'kuiChipRemove',
    type: 'directive on button',
    defaultValue: '-',
    description:
      'Marks a native button as the chip remove action. Use only when the default removable button is not enough (custom icon, extra content); do not combine both on the same chip. Needs its own aria-label, for example "Remove Design".',
  },
  {
    name: '--kui-chip-bg',
    type: 'CSS color',
    defaultValue: '-',
    description: 'Chip background color.',
  },
  {
    name: '--kui-chip-bg-hover',
    type: 'CSS color',
    defaultValue: '-',
    description: 'Chip background color on hover for interactive chips.',
  },
  {
    name: '--kui-chip-border',
    type: 'CSS color',
    defaultValue: '-',
    description: 'Chip border color.',
  },
  {
    name: '--kui-chip-text',
    type: 'CSS color',
    defaultValue: '-',
    description: 'Chip label text color.',
  },
  {
    name: '--kui-chip-radius',
    type: 'CSS length',
    defaultValue: '-',
    description: 'Chip corner radius.',
  },
  {
    name: '--kui-chip-height-xs',
    type: 'CSS length',
    defaultValue: '-',
    description: 'Chip block size for size="xs".',
  },
  {
    name: '--kui-chip-height-sm',
    type: 'CSS length',
    defaultValue: '-',
    description: 'Chip block size for size="sm".',
  },
  {
    name: '--kui-chip-height-md',
    type: 'CSS length',
    defaultValue: '-',
    description: 'Chip block size for size="md" (default).',
  },
  {
    name: '--kui-chip-height-lg',
    type: 'CSS length',
    defaultValue: '-',
    description: 'Chip block size for size="lg".',
  },
  {
    name: '--kui-chip-remove-color',
    type: 'CSS color',
    defaultValue: '-',
    description: 'Remove icon color.',
  },
  {
    name: '--kui-chip-remove-color-hover',
    type: 'CSS color',
    defaultValue: '-',
    description: 'Remove icon color on hover.',
  },
  {
    name: '--kui-chip-disabled-opacity',
    type: 'CSS number',
    defaultValue: '-',
    description: 'Opacity applied to the whole chip when disabled.',
  },
  {
    name: 'KuiChipOptions',
    type: 'interface',
    defaultValue: '-',
    description:
      'Shape of defaults.chip: size and removeIcon (takes precedence over defaults.icons.remove).',
  },
];
