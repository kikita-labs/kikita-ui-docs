import { type ApiTableRow } from '@shared/docs-ui/api-table';

export const MENU_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'ariaLabel',
    type: 'string | undefined',
    defaultValue: 'undefined',
    description:
      'Accessible name for the menu panel. Falls back to the menu.label message (Actions).',
  },
  {
    name: 'placement',
    type: `'top' | 'bottom' | 'left' | 'right' | undefined`,
    defaultValue: 'undefined',
    description:
      'Preferred side of the trigger the menu opens on. Falls back to defaults.menu.placement, then bottom. Auto-flips to the opposite side to fit the viewport.',
  },
  {
    name: 'menuAlign',
    type: `'start' | 'end' | undefined`,
    defaultValue: 'undefined',
    description:
      'Alignment along the trigger edge (defaults.menu.menuAlign, then start). For top/bottom placement, start is left-aligned and end is right-aligned. For left/right placement, start is top-aligned and end is bottom-aligned.',
  },
  {
    name: 'offset',
    type: 'number | undefined',
    defaultValue: 'undefined',
    description:
      'Pixel gap between the trigger and the menu panel. Falls back to defaults.menu.offset, then 4. A static numeric string is coerced.',
  },
  {
    name: 'minWidth',
    type: 'string | null | undefined',
    defaultValue: 'undefined',
    description:
      'Optional minimum inline size, applied to the visible panel as well as its overlay pane. Falls back to defaults.menu.minWidth, then none.',
  },
  {
    name: '[kuiMenuFor]',
    type: 'KuiMenu | undefined',
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
  {
    name: 'isOpen',
    type: 'WritableSignal<boolean>',
    defaultValue: 'false',
    description: 'Whether the menu is currently open. Read it from a template reference.',
  },
  {
    name: 'KuiMenuOptions',
    type: 'interface',
    defaultValue: '-',
    description: 'Shape of defaults.menu: placement, offset, menuAlign and minWidth.',
  },
];
