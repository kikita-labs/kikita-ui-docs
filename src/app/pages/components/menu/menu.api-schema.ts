import { ApiTableRow } from '../../../shared/docs-ui/api-table/api-table-row';

export const MENU_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'ariaLabel',
    type: 'string',
    description: 'Accessible name for the menu panel. Defaults to Actions.',
  },
  {
    name: 'placement',
    type: `'top' | 'bottom' | 'left' | 'right'`,
    description:
      'Preferred side of the trigger the menu opens on. Defaults to bottom. Auto-flips to the opposite side to fit the viewport.',
  },
  {
    name: 'menuAlign',
    type: `'start' | 'end'`,
    description:
      "Alignment along the trigger edge. For top/bottom placement this is horizontal; for left/right placement it's vertical.",
  },
  {
    name: 'offset',
    type: 'number',
    description: 'Pixel gap between the trigger and the menu panel.',
  },
  {
    name: 'minWidth',
    type: 'string | null',
    description: 'Optional overlay minimum width.',
  },
  {
    name: '[kuiMenuFor]',
    type: 'KuiMenuComponent | undefined',
    description: 'Wires a native trigger to a menu instance and manages trigger ARIA state.',
  },
  {
    name: 'kuiMenuItem.appearance',
    type: `'neutral' | 'destructive'`,
    description: 'Visual treatment for an action item.',
  },
  {
    name: 'kuiMenuItem.disabled',
    type: 'boolean',
    description: 'Prevents activation and exposes disabled semantics.',
  },
];
