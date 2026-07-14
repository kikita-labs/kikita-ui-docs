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
    type: 'string',
    description: 'Search input placeholder.',
  },
  {
    name: 'label',
    type: 'string',
    description: 'Accessible label for the modal dialog and search input.',
  },
  {
    name: 'emptyText',
    type: 'string',
    description: 'Empty-state title when no command matches.',
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
];
