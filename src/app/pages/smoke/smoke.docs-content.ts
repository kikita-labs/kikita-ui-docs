import type { ApiTableRow } from '@shared/docs-ui/api-table';

export const SMOKE_API_ROWS = [
  {
    name: 'provideKikitaUi',
    type: 'ApplicationConfig provider',
    description: 'Installed in app.config.ts with styled scrollbars enabled.',
  },
  {
    name: 'KuiField',
    type: 'standalone component',
    description: 'Wraps the input with package-provided label, hint, and field semantics.',
  },
  {
    name: 'KuiInput',
    type: 'standalone directive',
    description: 'Applies Kikita UI input styling to a native input.',
  },
  {
    name: 'KuiButton',
    type: 'standalone directive',
    description: 'Applies Kikita UI button styling to a native button.',
  },
] as const satisfies readonly ApiTableRow[];
