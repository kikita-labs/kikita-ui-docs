import { ApiTableRow } from '../../../shared/docs-ui/api-table/api-table-row';

export const GROUP_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'orientation',
    type: `'horizontal' | 'vertical'`,
    defaultValue: `'horizontal'`,
    description: 'Layout direction for the grouped controls.',
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
];
