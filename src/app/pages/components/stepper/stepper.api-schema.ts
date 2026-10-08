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
    type: `'horizontal' | 'vertical' | undefined`,
    defaultValue: 'undefined',
    description:
      'Step list layout direction. Falls back to defaults.stepper.orientation, then horizontal.',
  },
  {
    name: 'size',
    type: `'sm' | 'md' | 'lg' | undefined`,
    defaultValue: 'undefined',
    description:
      'Circle size and label scale. Falls back to defaults.stepper.size, then the root size, then md.',
  },
  {
    name: 'linear',
    type: 'boolean | undefined',
    defaultValue: 'undefined',
    description:
      'When true, only completed steps can be clicked to go back; when false, upcoming steps can be clicked to jump forward. Falls back to defaults.stepper.linear, then true.',
  },
  {
    name: 'compact',
    type: 'boolean | undefined',
    defaultValue: 'undefined',
    description:
      'Shows step circles (dots) without labels or descriptions. Falls back to defaults.stepper.compact, then false.',
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
  {
    name: '--kui-stepper-connector-color',
    type: 'CSS custom property',
    defaultValue: '-',
    description: 'Connector line colour.',
  },
  {
    name: '--kui-stepper-connector-color-done',
    type: 'CSS custom property',
    defaultValue: '-',
    description: 'Connector line colour after a completed step.',
  },
  {
    name: '--kui-stepper-circle-size',
    type: 'CSS custom property',
    defaultValue: '-',
    description: 'Step circle diameter.',
  },
  {
    name: '--kui-stepper-fg-upcoming',
    type: 'CSS custom property',
    defaultValue: '-',
    description: 'Foreground of an upcoming step.',
  },
  {
    name: '--kui-stepper-fg-current',
    type: 'CSS custom property',
    defaultValue: '-',
    description: 'Foreground of the current step.',
  },
  {
    name: '--kui-stepper-fg-done',
    type: 'CSS custom property',
    defaultValue: '-',
    description: 'Foreground of a completed step.',
  },
  {
    name: '--kui-stepper-fg-error',
    type: 'CSS custom property',
    defaultValue: '-',
    description: 'Foreground of an errored step.',
  },
  {
    name: 'KuiStepperOptions',
    type: 'interface',
    defaultValue: '-',
    description: 'Shape of defaults.stepper: size, orientation, linear and compact.',
  },
];
