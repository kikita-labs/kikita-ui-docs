import { ApiTableRow } from '../../../shared/docs-ui/api-table/api-table-row';

export const PROGRESS_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'type',
    type: `'linear' | 'circular'`,
    defaultValue: `'linear'`,
    description: 'Progress shape.',
  },
  {
    name: 'value',
    type: 'number | null',
    defaultValue: 'null',
    description:
      'Progress value from 0 to 100. Values are clamped visually. null renders the indeterminate animation.',
  },
  {
    name: 'color',
    type: `'primary' | 'success' | 'warning' | 'danger' | 'neutral'`,
    defaultValue: `'primary'`,
    description: 'Semantic color.',
  },
  {
    name: 'size',
    type: `'xs' | 'sm' | 'md' | 'lg' | 'xl'`,
    defaultValue: `'md'`,
    description: 'Linear thickness or circular diameter.',
  },
  {
    name: 'content projection',
    type: 'text | template',
    defaultValue: '-',
    description: 'Projected content is rendered centered inside circular progress.',
  },
];
