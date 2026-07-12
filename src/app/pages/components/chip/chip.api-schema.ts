import { ApiTableRow } from '../../../shared/docs-ui/api-table/api-table-row';

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
    description: 'Chip size. sm is the size used inside Select and Combobox controls.',
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
    name: 'removed',
    type: 'output: void',
    defaultValue: '-',
    description: 'Emitted when a nested button[kuiChipRemove] is clicked.',
  },
  {
    name: 'kuiChipRemove',
    type: 'directive on button',
    defaultValue: '-',
    description:
      'Marks a native button as the chip remove action. Needs its own aria-label, for example "Remove Design".',
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
];
