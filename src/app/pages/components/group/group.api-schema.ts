import { type ApiTableRow } from '@shared/docs-ui/api-table';

export const GROUP_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'orientation',
    type: `'horizontal' | 'vertical'`,
    defaultValue: `'horizontal'`,
    description:
      'Layout direction for the grouped controls. Falls back to defaults.group.orientation.',
  },
  {
    name: 'size',
    type: `'xs' | 'sm' | 'md' | 'lg'`,
    defaultValue: `'md'`,
    description:
      'Size inherited by grouped controls through CSS variables. Set on the group instead of each child.',
  },
  {
    name: 'collapsed',
    type: 'boolean',
    defaultValue: 'false',
    description:
      'Collapses adjacent control borders into a single visual group, removing the double border between children.',
  },
  {
    name: 'rounded',
    type: 'boolean',
    defaultValue: 'true',
    description:
      'Keeps the outer group corners rounded when collapsed. Set to false for square outer corners.',
  },
  {
    name: 'KuiGroupOptions',
    type: 'interface',
    defaultValue: '-',
    description:
      'Shape of defaults.group: size, orientation, collapsed and rounded. Each input is undefined when omitted and falls back to it.',
  },
];
