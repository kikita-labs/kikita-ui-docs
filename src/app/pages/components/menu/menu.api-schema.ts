import { ApiTableRow } from '../../../shared/docs-ui/api-table/api-table-row';

export const MENU_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'ariaLabel',
    type: 'string',
    description: 'Accessible name for the menu panel. Defaults to Actions.',
  },
  {
    name: 'menuAlign',
    type: `'start' | 'end'`,
    description: 'Horizontal alignment relative to the trigger.',
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
