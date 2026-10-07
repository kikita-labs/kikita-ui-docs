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
    type: `'xs' | 'sm' | 'md' | 'lg' | undefined`,
    defaultValue: 'undefined',
    description:
      'Control height and spacing for the whole segmented group. Falls back to defaults.segmented.size, then the global defaults.size, then md.',
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
      'Emitted whenever an enabled segment is selected, including one that was already selected; marks the control as touched in the form system. Focus and blur alone do not emit it.',
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
  {
    name: 'focus(options?)',
    type: '(options?: FocusOptions) => void',
    defaultValue: '-',
    description:
      'Focuses the selected segment, or the first enabled one when nothing is selected, so Signal Forms focusBoundControl() reaches the control. Does nothing while every segment is disabled.',
  },
  {
    name: 'required',
    type: '-',
    defaultValue: '-',
    description:
      'Not available: a segmented control always shows one active segment, so it exposes no required state.',
  },
  {
    name: 'KuiSegmentedOptions',
    type: 'interface',
    defaultValue: '-',
    description: 'Shape of defaults.segmented: size.',
  },
];
