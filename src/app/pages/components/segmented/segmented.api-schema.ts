import { type ApiTableRow } from '@shared/docs-ui/api-table';

export const SEGMENTED_API_ROWS: readonly ApiTableRow[] = [
  {
    name: '[(value)]',
    type: 'string',
    defaultValue: `''`,
    description:
      'Selected segment value. Implements FormValueControl for [formField] integration, or bind directly for standalone use.',
  },
  {
    name: '[(selected)]',
    type: 'string',
    defaultValue: `''`,
    description:
      'Deprecated alias for value, kept in sync with it. Use value instead; planned for removal in the next major version.',
  },
  {
    name: 'size',
    type: `'xs' | 'sm' | 'md' | 'lg'`,
    defaultValue: `'md'`,
    description: 'Control height and spacing for the whole segmented group.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Disables every segment. Set by [formField] or directly.',
  },
  {
    name: 'invalid',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Marks the control as having validation errors. Set by [formField].',
  },
  {
    name: 'errors',
    type: 'readonly WithOptionalFieldTree<ValidationError>[]',
    defaultValue: '[]',
    description: 'Current validation errors. Set by [formField].',
  },
  {
    name: 'touched',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Whether the control has been touched. Set by [formField].',
  },
  {
    name: '(touch)',
    type: 'void',
    defaultValue: '-',
    description:
      'Emitted when a segment is selected; marks the control as touched in the form system.',
  },
  {
    name: 'button[kuiSegment].value',
    type: 'string',
    defaultValue: `''`,
    description: 'Value emitted when the segment is selected.',
  },
  {
    name: 'button[kuiSegment].disabled',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Disables one segment and removes it from keyboard selection.',
  },
];
