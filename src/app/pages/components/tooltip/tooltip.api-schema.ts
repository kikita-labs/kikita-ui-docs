import { type ApiTableRow } from '@shared/docs-ui/api-table';

export const TOOLTIP_API_ROWS: readonly ApiTableRow[] = [
  {
    name: '[kuiTooltip]',
    type: 'string',
    defaultValue: `''`,
    description: 'Tooltip text content. Empty or whitespace-only text does not render a tooltip.',
  },
  {
    name: 'placement',
    type: `'top' | 'bottom' | 'left' | 'right'`,
    defaultValue: `'top'`,
    description: 'Preferred placement relative to the trigger. The CDK overlay can still adjust.',
  },
  {
    name: 'triggerType',
    type: `'auto' | 'hover' | 'click' | 'none'`,
    defaultValue: `'auto'`,
    description:
      'Local interaction override. auto uses hover/focus for mouse input and tap for touch input.',
  },
  {
    name: 'KuiTooltipTriggerType',
    type: 'enum: Auto | Hover | Click | None',
    defaultValue: 'Auto',
    description: 'Enum values accepted by triggerType and tooltip provider options.',
  },
  {
    name: 'KuiTooltipOptions',
    type: 'interface',
    defaultValue: '{ triggerType: auto }',
    description:
      'Shape of the defaults.tooltip key for app-wide and scoped tooltip trigger defaults.',
  },
  {
    name: 'provideKuiDefaults({ tooltip })',
    type: '(defaults: KuiComponentDefaults) => Provider',
    defaultValue: '-',
    description:
      'Provides merged tooltip defaults for a component or route subtree; local triggerType wins.',
  },
  {
    name: 'provideKikitaUi({ tooltip })',
    type: 'KikitaUiOptions.tooltip?: KuiTooltipOptions',
    defaultValue: '{ triggerType: auto }',
    description: 'Sets the root tooltip trigger default through the main Kikita UI provider.',
  },
  {
    name: 'role',
    type: `'tooltip'`,
    defaultValue: `'tooltip'`,
    description: 'The floating element is exposed as a tooltip while it exists.',
  },
  {
    name: 'aria-describedby',
    type: 'string | null',
    defaultValue: 'null',
    description: 'Applied only while the tooltip is visible, preventing stale removed ids.',
  },
  {
    name: 'CSS variables',
    type: '--kui-tooltip-*',
    defaultValue: '-',
    description: 'Controls padding, radius, colors, and shadow through documented tooltip tokens.',
  },
];
