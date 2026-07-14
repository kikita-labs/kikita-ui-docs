import { type ApiTableRow } from '@shared/docs-ui/api-table';

export const SLIDER_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'kuiSlider',
    type: 'directive',
    description:
      'Selector input[type=range][kuiSlider]. Applies Kikita UI slider styling and behavior to a native range input.',
  },
  {
    name: 'color',
    type: `'primary' | 'success' | 'danger' | 'neutral'`,
    defaultValue: `'primary'`,
    description: 'Semantic color applied to the generated slider fill and thumb.',
  },
  {
    name: 'size',
    type: `'sm' | 'md' | 'lg'`,
    defaultValue: `'md'`,
    description: 'Visual size of the generated slider control.',
  },
  {
    name: 'minLabel',
    type: 'string',
    defaultValue: `''`,
    description: 'Optional label rendered below the minimum side of the track.',
  },
  {
    name: 'maxLabel',
    type: 'string',
    defaultValue: `''`,
    description: 'Optional label rendered below the maximum side of the track.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Mirrors disabled styling on the generated slider wrapper.',
  },
  {
    name: 'invalid',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Applies invalid styling outside a kui-field error state.',
  },
  {
    name: 'id',
    type: 'string | undefined',
    description: 'Explicit native input id. Falls back to the parent kui-field control id.',
  },
  {
    name: 'min / max / step / value',
    type: 'native attributes',
    description:
      'Native range input attributes. kuiSlider reads them directly; use them (or Signal Forms min/max validators) instead of a directive input.',
  },
  {
    name: 'kuiTooltip',
    type: 'string',
    description:
      'When set to a non-empty string on the same host, the static tooltip text wins over the default value tooltip. Otherwise kuiSlider shows the current numeric value in a tooltip on hover.',
  },
  {
    name: '[formField]',
    type: 'FieldTree<number> (from @angular/forms/signals)',
    description:
      'Angular Signal Forms binding. Owns native value, disabled, and validation state; kuiSlider keeps the generated track and thumb visuals in sync. Do not add native min/max alongside formField; use the min(...) and max(...) schema validators instead.',
  },
];
