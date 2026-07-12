import { ApiTableRow } from '../../../shared/docs-ui/api-table/api-table-row';

export const POPOVER_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'placement',
    type: `'top' | 'bottom' | 'left' | 'right'`,
    defaultValue: `'bottom'`,
    description:
      'Preferred side of the anchor. Auto-flips to the opposite side to fit the viewport.',
  },
  {
    name: 'align',
    type: `'start' | 'center' | 'end'`,
    defaultValue: `'center'`,
    description: 'Alignment of the panel along the anchor edge. Preserved after a placement flip.',
  },
  {
    name: 'arrow',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Shows the arrow caret pointing to the anchor.',
  },
  {
    name: 'triggerType',
    type: `'click' | 'hover'`,
    defaultValue: `'click'`,
    description:
      'click toggles the panel on click and closes on outside click or ESC. hover opens on mouseenter and closes on mouseleave.',
  },
  {
    name: 'ariaLabel',
    type: 'string',
    defaultValue: `'Popover'`,
    description: 'Accessible name for the role="dialog" panel. Prefer content-specific text.',
  },
  {
    name: 'hoverDelay',
    type: 'number',
    defaultValue: '100',
    description:
      'Delay in ms before closing on mouseleave in hover mode. Lets the mouse travel from trigger to panel.',
  },
  {
    name: 'offset',
    type: 'number',
    defaultValue: '8',
    description: 'Gap in px between the anchor and the panel. The arrow adds 6px automatically.',
  },
  {
    name: 'trapFocus',
    type: 'boolean',
    defaultValue: 'false',
    description:
      'Traps focus inside the panel and auto-focuses the first focusable element on open.',
  },
  {
    name: 'open',
    type: 'boolean (model)',
    defaultValue: 'false',
    description:
      'Current open state exposed for trigger integrations via openChange. Not intended as a standalone controlled API.',
  },
  {
    name: '[kuiPopoverFor]',
    type: 'KuiPopoverComponent | undefined',
    defaultValue: '-',
    description:
      'Wires any element as a trigger for a kui-popover. Sets aria-expanded and aria-haspopup="dialog" automatically.',
  },
  {
    name: '.kui-popover-title',
    type: '-',
    defaultValue: '-',
    description: 'Optional CSS class for a semi-bold sm title inside the projected content.',
  },
  {
    name: '.kui-popover-desc',
    type: '-',
    defaultValue: '-',
    description:
      'Optional CSS class for secondary sm supporting text inside the projected content.',
  },
  {
    name: '--kui-popover-bg',
    type: 'CSS custom property',
    defaultValue: 'var(--kui-color-surface-elevated)',
    description: 'Panel background.',
  },
  {
    name: '--kui-popover-border',
    type: 'CSS custom property',
    defaultValue: 'var(--kui-color-border)',
    description: 'Panel border color.',
  },
  {
    name: '--kui-popover-radius',
    type: 'CSS custom property',
    defaultValue: 'var(--kui-radius-lg)',
    description: 'Panel corner radius.',
  },
  {
    name: '--kui-popover-shadow',
    type: 'CSS custom property',
    defaultValue: 'var(--kui-shadow-lg)',
    description: 'Panel drop shadow.',
  },
  {
    name: '--kui-popover-padding-x',
    type: 'CSS custom property',
    defaultValue: 'var(--kui-space-4)',
    description: 'Panel horizontal padding.',
  },
  {
    name: '--kui-popover-padding-y',
    type: 'CSS custom property',
    defaultValue: 'var(--kui-space-4)',
    description: 'Panel vertical padding.',
  },
  {
    name: '--kui-popover-min-width',
    type: 'CSS custom property',
    defaultValue: '160px',
    description: 'Minimum panel width.',
  },
  {
    name: '--kui-popover-max-width',
    type: 'CSS custom property',
    defaultValue: '320px',
    description: 'Maximum panel width.',
  },
  {
    name: '--kui-popover-arrow-size',
    type: 'CSS custom property',
    defaultValue: '10px',
    description: 'Arrow caret size.',
  },
  {
    name: '--kui-z-popover',
    type: 'CSS custom property',
    defaultValue: '400',
    description: 'Panel z-index, between Dropdown (300) and Dialog (500).',
  },
];
