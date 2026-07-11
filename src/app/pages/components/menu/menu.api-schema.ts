import { ApiTableRow } from '../../../shared/docs-ui/api-table/api-table-row';

export const MENU_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'ariaLabel',
    type: 'string',
    defaultValue: `'Actions'`,
    description: 'Accessible name for the menu panel.',
  },
  {
    name: 'placement',
    type: `'top' | 'bottom' | 'left' | 'right'`,
    defaultValue: `'bottom'`,
    description:
      'Preferred side of the trigger the menu opens on. Auto-flips to the opposite side to fit the viewport.',
  },
  {
    name: 'menuAlign',
    type: `'start' | 'end'`,
    defaultValue: `'start'`,
    description:
      'Alignment along the trigger edge. For top/bottom placement, start is left-aligned and end is right-aligned. For left/right placement, start is top-aligned and end is bottom-aligned.',
  },
  {
    name: 'offset',
    type: 'number',
    defaultValue: '4',
    description: 'Pixel gap between the trigger and the menu panel.',
  },
  {
    name: 'minWidth',
    type: 'string | null',
    defaultValue: 'null',
    description: 'Optional overlay minimum width.',
  },
  {
    name: '[kuiMenuFor]',
    type: 'KuiMenuComponent | undefined',
    defaultValue: '-',
    description: 'Wires a native trigger to a menu instance and manages trigger ARIA state.',
  },
  {
    name: 'kuiMenuHeader',
    type: '-',
    defaultValue: '-',
    description:
      'Marks a non-interactive group heading inside the menu panel. Renders with role="presentation".',
  },
  {
    name: 'kuiSeparator',
    type: '-',
    defaultValue: '-',
    description:
      'Native hr[kuiSeparator] divider between menu item groups. See the Separator page for spacing and appearance inputs.',
  },
  {
    name: 'kuiMenuItem.appearance',
    type: `'neutral' | 'destructive'`,
    defaultValue: `'neutral'`,
    description: 'Visual treatment for an action item. Use destructive for dangerous actions.',
  },
  {
    name: 'kuiMenuItem.disabled',
    type: 'boolean',
    defaultValue: 'false',
    description:
      'Prevents activation and applies disabled/aria-disabled semantics. Disabled items are skipped by keyboard navigation.',
  },
];
