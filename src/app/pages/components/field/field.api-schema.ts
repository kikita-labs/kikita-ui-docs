import { type ApiTableRow } from '@shared/docs-ui/api-table';

export const FIELD_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'label',
    type: 'string',
    description: 'Visible label shorthand. Prefer this for simple field labels.',
  },
  {
    name: 'hint',
    type: 'string',
    description:
      'Optional help text rendered below the control and wired through aria-describedby.',
  },
  {
    name: 'error',
    type: 'string',
    description:
      'Explicit error text rendered below the control and wired through aria-describedby.',
  },
  {
    name: 'hideErrors',
    type: 'boolean',
    description: 'Hides automatically inferred Angular Signal Forms error messages.',
  },
  {
    name: 'required',
    type: 'boolean',
    description: 'Explicit required marker override. Omit when Signal Forms can infer it.',
  },
  {
    name: 'size',
    type: `'xs' | 'sm' | 'md' | 'lg'`,
    description: 'Field spacing and projected control size.',
  },
];
