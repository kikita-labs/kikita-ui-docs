import { type ApiTableRow } from '@shared/docs-ui/api-table';

export const COLOR_INPUT_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'kuiColorInput',
    type: 'directive',
    defaultValue: '-',
    description: 'Applies Kikita color-input styling and picker affordances to a native input.',
  },
  {
    name: 'size',
    type: `'xs' | 'sm' | 'md' | 'lg'`,
    defaultValue: `'md'`,
    description: 'Control height matched to Kikita UI size tokens.',
  },
  {
    name: 'invalid',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Applies an error border and inherits invalid state from parent kui-field.',
  },
  {
    name: 'id',
    type: 'string | undefined',
    defaultValue: 'field id',
    description: 'Native input id override.',
  },
  {
    name: 'swatchLabel',
    type: 'string',
    defaultValue: `'Open color picker'`,
    description: 'Accessible label for the swatch button.',
  },
];
