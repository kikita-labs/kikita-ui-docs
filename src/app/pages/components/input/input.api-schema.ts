import { type ApiTableRow } from '@shared/docs-ui/api-table';

export const INPUT_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'size',
    type: `'xs' | 'sm' | 'md' | 'lg' | undefined`,
    defaultValue: 'undefined',
    description:
      'Resolved in order: local size, parent Field effective size, defaults.input.size, root defaults.size, then md. The resolved value is written to data-kui-size.',
  },
  {
    name: 'invalid',
    type: 'boolean',
    defaultValue: 'false',
    description:
      'Marks a standalone input (or one outside a Field error state) invalid: sets data-kui-invalid and aria-invalid="true". With [formField] the Field state wins and this binding is not a manual override.',
  },
  {
    name: 'id',
    type: 'string | undefined',
    defaultValue: 'undefined',
    description:
      'Inside a Field, omitted uses the Field generated control id; outside, no id is added. An explicit id can leave the Field label for attribute pointing elsewhere.',
  },
  {
    name: 'KuiInputOptions',
    type: 'interface',
    defaultValue: '-',
    description: 'Shape of defaults.input: size.',
  },
];
