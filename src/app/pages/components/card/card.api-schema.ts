import { type ApiTableRow } from '@shared/docs-ui/api-table';

export const CARD_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'appearance',
    type: `'surface' | 'elevated' | 'sunken'`,
    defaultValue: `'surface'`,
    description:
      'Visual surface treatment: flat surface, elevated shadow, or sunken inset. Falls back to defaults.card.appearance.',
  },
  {
    name: 'size',
    type: `'xs' | 'sm' | 'md' | 'lg'`,
    defaultValue: `'md'`,
    description:
      'Card padding size, mapped to the shared Kikita size scale. An explicit local size wins, then defaults.card.size, then the global defaults.size.',
  },
  {
    name: 'interactive',
    type: 'boolean',
    defaultValue: 'false',
    description:
      'Enables hover and focus-visible affordances for clickable cards. Does not add semantics or keyboard behavior; choose an interactive host element (button, a) for that.',
  },
];
