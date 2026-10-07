import { type ApiTableRow } from '@shared/docs-ui/api-table';

export const POPOVER_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'placement',
    type: `'top' | 'bottom' | 'left' | 'right' | undefined`,
    defaultValue: 'undefined',
    description:
      'Preferred side of the anchor (defaults.popover.placement, then bottom). Auto-flips to the opposite side to fit the viewport.',
  },
  {
    name: 'align',
    type: `'start' | 'center' | 'end' | undefined`,
    defaultValue: 'undefined',
    description:
      'Alignment of the panel along the anchor edge (defaults.popover.align, then center). Preserved after a placement flip.',
  },
  {
    name: 'arrow',
    type: 'boolean | undefined',
    defaultValue: 'undefined',
    description:
      'Shows the arrow caret pointing to the anchor. Falls back to defaults.popover.arrow, then false.',
  },
  {
    name: 'triggerType',
    type: `'click' | 'hover' | undefined`,
    defaultValue: 'undefined',
    description:
      'Falls back to defaults.popover.triggerType, then click. click toggles the panel on click and closes on outside click or ESC. hover opens on mouseenter and closes on mouseleave.',
  },
  {
    name: 'ariaLabel',
    type: 'string | undefined',
    defaultValue: 'undefined',
    description:
      'Accessible name for the role="dialog" panel. Falls back to the popover.label message (Popover); prefer content-specific text.',
  },
  {
    name: 'hoverDelay',
    type: 'number | undefined',
    defaultValue: 'undefined',
    description:
      'Delay in ms before closing on mouseleave in hover mode (defaults.popover.hoverDelay, then 100). Lets the mouse travel from trigger to panel.',
  },
  {
    name: 'offset',
    type: 'number | undefined',
    defaultValue: 'undefined',
    description:
      'Gap in px between the anchor and the panel (defaults.popover.offset, then 8). The arrow adds 6px automatically. A static numeric string is coerced.',
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
    type: 'KuiPopover | undefined',
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
    description: 'Panel z-index in browsers without the Popover API.',
  },
  {
    name: 'openFor(anchor)',
    type: '(anchor: Element) => void',
    defaultValue: '-',
    description: 'Opens the popover anchored to the given element.',
  },
  {
    name: 'toggleFor(anchor)',
    type: '(anchor: Element) => void',
    defaultValue: '-',
    description:
      'Toggles the popover for a trigger and reopens immediately when an exit animation is running.',
  },
  {
    name: 'close()',
    type: '() => void',
    defaultValue: '-',
    description: 'Closes the popover with the exit animation.',
  },
  {
    name: 'scheduleClose(delay)',
    type: '(delay: number) => void',
    defaultValue: '-',
    description: 'Schedules a close after delay ms (hover mode).',
  },
  {
    name: 'cancelClose()',
    type: '() => void',
    defaultValue: '-',
    description: 'Cancels a pending scheduled close.',
  },
  {
    name: 'KuiPopoverOptions',
    type: 'interface',
    defaultValue: '-',
    description:
      'Shape of defaults.popover: placement, offset, align, arrow, triggerType and hoverDelay.',
  },
];
