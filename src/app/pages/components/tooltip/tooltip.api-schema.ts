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
    type: `'top' | 'bottom' | 'left' | 'right' | undefined`,
    defaultValue: 'undefined',
    description:
      'Preferred placement relative to the trigger (defaults.tooltip.placement, then top). The CDK overlay can still adjust.',
  },
  {
    name: 'offset',
    type: 'number | undefined',
    defaultValue: 'undefined',
    description:
      'Gap in px between the trigger and the tooltip. Falls back to defaults.tooltip.offset, then 6. A static numeric string is coerced.',
  },
  {
    name: 'triggerType',
    type: `'auto' | 'hover' | 'click' | 'none' | undefined`,
    defaultValue: 'undefined',
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
    defaultValue: '-',
    description:
      'Shape of defaults.tooltip: triggerType, placement and offset, for app-wide and scoped tooltip defaults.',
  },
  {
    name: 'provideKuiDefaults({ tooltip })',
    type: '(defaults: KuiComponentDefaults) => Provider',
    defaultValue: '-',
    description:
      'Provides merged tooltip defaults for a component or route subtree; a local input wins and each level merges with its parent per property.',
  },
  {
    name: 'provideKikitaUi({ defaults: { tooltip } })',
    type: 'KikitaUiOptions.defaults?: KuiComponentDefaults',
    defaultValue: '-',
    description: 'Sets the root tooltip defaults through the main Kikita UI provider.',
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
