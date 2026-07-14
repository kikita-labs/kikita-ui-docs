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
