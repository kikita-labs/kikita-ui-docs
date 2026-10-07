import { type ApiTableRow } from '@shared/docs-ui/api-table';

export const COMMAND_PALETTE_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'open',
    type: 'ModelSignal<boolean>',
    description: 'Two-way model controlling overlay visibility.',
  },
  {
    name: 'groups',
    type: 'readonly KuiCommandGroup[]',
    description: 'Command groups rendered in the list.',
  },
  {
    name: 'loading',
    type: 'boolean',
    description: 'Renders skeleton rows and sets aria-busy.',
  },
  {
    name: 'placeholder',
    type: 'string | undefined',
    description:
      'Search input placeholder. Undefined when omitted: the text comes from the commandPalette.placeholder message.',
  },
  {
    name: 'label',
    type: 'string | undefined',
    description:
      'Accessible label for the modal dialog and search input. Defaults to the commandPalette.label message.',
  },
  {
    name: 'emptyText',
    type: 'string | undefined',
    description:
      'Empty-state title when no command matches. Defaults to the commandPalette.empty message.',
  },
  {
    name: 'query',
    type: 'ModelSignal<string>',
    description: 'Two-way model for the current search value.',
  },
  {
    name: 'selected',
    type: 'OutputEmitterRef<KuiCommandItem>',
    description: 'Emits the selected command item.',
  },
  {
    name: 'messages',
    type: 'Partial<KuiCommandPaletteMessages> | undefined',
    defaultValue: 'undefined',
    description:
      'Per-instance text overrides (placeholder, label, empty, emptyDescription, clearSearch, key hints and the rest). They win over scoped and root messages.',
  },
  {
    name: 'KuiCommandItem.id',
    type: 'string',
    defaultValue: '-',
    description:
      'Required stable key, unique across every group of one palette. Development builds report empty, whitespace-containing and duplicate ids.',
  },
];
