import { type ApiTableRow } from '@shared/docs-ui/api-table';

export const EMPTY_STATE_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'heading',
    type: 'string | undefined',
    defaultValue: '-',
    description:
      'Optional empty-state heading text; omit it for a description-only state. Visual text only, not a forced heading level.',
  },
  {
    name: 'description',
    type: 'string | null',
    defaultValue: 'null',
    description: 'Optional supporting text rendered below the title.',
  },
  {
    name: 'context',
    type: `'no-data' | 'no-results' | 'error' | 'no-access' | 'success'`,
    defaultValue: `'no-data'`,
    description: 'Semantic context. Only changes the icon accent, not layout.',
  },
  {
    name: 'size',
    type: `'sm' | 'md' | 'lg'`,
    defaultValue: `'md'`,
    description:
      'Empty-state layout size. Small uses a compact horizontal layout. Falls back to defaults.emptyState.size, then the global defaults.size.',
  },
  {
    name: '[kuiEmptyStateIcon]',
    type: 'KuiEmptyStateIcon',
    defaultValue: '-',
    description:
      'Marks projected visual content as the decorative icon slot. Kikita marks it aria-hidden.',
  },
  {
    name: '[kuiEmptyStateActions]',
    type: 'KuiEmptyStateActions',
    defaultValue: '-',
    description:
      'Marks projected content as the action slot for native buttons, links, or Kikita button directives.',
  },
  {
    name: 'KuiEmptyStateOptions',
    type: 'interface',
    defaultValue: '-',
    description: 'Shape of defaults.emptyState: size.',
  },
];
