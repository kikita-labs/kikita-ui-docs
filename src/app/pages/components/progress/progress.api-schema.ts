import { type ApiTableRow } from '@shared/docs-ui/api-table';

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
      'Progress value from 0 to 100. Values are clamped visually. A static numeric attribute is coerced; null or an invalid value renders the indeterminate animation.',
  },
  {
    name: 'color',
    type: `'primary' | 'success' | 'warning' | 'danger' | 'neutral' | undefined`,
    defaultValue: 'undefined',
    description:
      'Semantic color of the filled part. Falls back to defaults.progress.color, then primary.',
  },
  {
    name: 'size',
    type: `'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined`,
    defaultValue: 'undefined',
    description:
      'Linear thickness or circular diameter. Falls back to defaults.progress.size, then the root size default, then md.',
  },
  {
    name: 'content projection',
    type: 'text | template',
    defaultValue: '-',
    description: 'Projected content is rendered centered inside circular progress.',
  },
  {
    name: 'KuiProgressOptions',
    type: 'interface',
    defaultValue: '-',
    description: 'Shape of defaults.progress: size and color.',
  },
];
