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
    description:
      'Hides automatic, explicit, and projected error messages while keeping invalid state.',
  },
  {
    name: 'required',
    type: 'boolean',
    description:
      'Explicit required marker override. Omit when Signal Forms can infer it. Also drives aria-required on the projected control.',
  },
  {
    name: 'size',
    type: `'xs' | 'sm' | 'md' | 'lg'`,
    description:
      'Field spacing and projected control size. Falls back to defaults.field.size, then the global defaults.size.',
  },
  {
    name: '[kuiLabel] / [kuiHint] / [kuiError]',
    type: 'marker directives',
    defaultValue: '-',
    description:
      'Projected label, hint and error with the same field wiring. kuiError is manual content: render it with @if.',
  },
  {
    name: '[kuiFieldAffix]',
    type: 'directive',
    defaultValue: '-',
    description:
      'Prefix, suffix, icon or action chrome inside the field: button hosts get action styling, kui-icon an icon slot, anything else muted text (emphasis input for full color). kuiFieldAffixIcon and kuiFieldAction are explicit overrides.',
  },
  {
    name: '.kui-input-group / KuiInputGroup',
    type: 'class and directive',
    defaultValue: '-',
    description:
      'Hand-built input group chrome; the directive delegates clicks on non-interactive chrome to the first enabled control.',
  },
  {
    name: 'KuiFieldOptions',
    type: 'interface',
    defaultValue: '-',
    description:
      'Shape of defaults.field: clearable, size and hideErrors. Controls inside the field take an explicit field size first, then their own defaults key, then defaults.field.size.',
  },
];
