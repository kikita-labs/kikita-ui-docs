import { type ApiTableRow } from '@shared/docs-ui/api-table';

export const EMPTY_STATE_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'title',
    type: 'string',
    defaultValue: '-',
    description: 'Required empty-state title text. Visual text only, not a forced heading level.',
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
    description: 'Empty-state layout size. Small uses a compact horizontal layout.',
  },
  {
    name: '[kuiEmptyStateIcon]',
    type: 'KuiEmptyStateIconDirective',
    defaultValue: '-',
    description:
      'Marks projected visual content as the decorative icon slot. Kikita marks it aria-hidden.',
  },
  {
    name: '[kuiEmptyStateActions]',
    type: 'KuiEmptyStateActionsDirective',
    defaultValue: '-',
    description:
      'Marks projected content as the action slot for native buttons, links, or Kikita button directives.',
  },
];
