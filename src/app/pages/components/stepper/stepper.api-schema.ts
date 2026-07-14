import { type ApiTableRow } from '@shared/docs-ui/api-table';

export const STEPPER_API_ROWS: readonly ApiTableRow[] = [
  {
    name: '[(currentIndex)]',
    type: 'number',
    defaultValue: '0',
    description: 'Zero-based active step index.',
  },
  {
    name: 'orientation',
    type: `'horizontal' | 'vertical'`,
    defaultValue: `'horizontal'`,
    description: 'Step list layout direction.',
  },
  {
    name: 'size',
    type: `'sm' | 'md' | 'lg'`,
    defaultValue: `'md'`,
    description: 'Circle size and label scale.',
  },
  {
    name: 'linear',
    type: 'boolean',
    defaultValue: 'true',
    description: 'Prevents jumping forward to upcoming steps when true.',
  },
  {
    name: 'compact',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Shows step circles without labels or descriptions.',
  },
  {
    name: 'kui-step.label',
    type: 'string',
    defaultValue: `''`,
    description: 'Primary step label.',
  },
  {
    name: 'kui-step.description',
    type: 'string',
    defaultValue: `''`,
    description: 'Optional secondary line below the label.',
  },
  {
    name: 'kui-step.hasError',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Marks the step as errored and disables later steps.',
  },
  {
    name: 'kui-step.disabled',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Forces a step to render disabled.',
  },
];
