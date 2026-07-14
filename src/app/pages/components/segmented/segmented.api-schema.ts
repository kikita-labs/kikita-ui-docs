import { type ApiTableRow } from '@shared/docs-ui/api-table';

export const SEGMENTED_API_ROWS: readonly ApiTableRow[] = [
  {
    name: '[(selected)]',
    type: 'string | number | null',
    defaultValue: 'null',
    description: 'Selected segment value. Use stable primitive values for predictable forms.',
  },
  {
    name: 'size',
    type: `'sm' | 'md' | 'lg'`,
    defaultValue: `'md'`,
    description: 'Control height and spacing for the whole segmented group.',
  },
  {
    name: 'button[kuiSegment].value',
    type: 'string | number | null',
    defaultValue: 'null',
    description: 'Value emitted when the segment is selected.',
  },
  {
    name: 'button[kuiSegment].disabled',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Disables one segment and removes it from keyboard selection.',
  },
];
