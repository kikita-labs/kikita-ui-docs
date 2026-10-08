import type { ApiTableRow } from '@shared/docs-ui/api-table';
import type { CodeTab } from '@shared/docs-ui/code-tabs';

export const AUTO_FOCUS_USAGE_TABS = [
  {
    label: 'Import',
    filename: 'auto-focus.ts',
    language: 'ts',
    code: `import { KuiAutoFocus } from '@kikita-labs/ui';`,
  },
  {
    label: 'Attribute',
    filename: 'form.html',
    language: 'html',
    code: `<input kuiInput kuiAutoFocus />`,
  },
  {
    label: 'Bound value',
    filename: 'form.html',
    language: 'html',
    code: `<input kuiInput [kuiAutoFocus]="editing()" />`,
  },
  {
    label: 'Wrapper',
    filename: 'form.html',
    language: 'html',
    code: `<div kuiAutoFocus>
  <input kuiInput aria-label="Search" />
</div>`,
  },
] as const satisfies readonly CodeTab[];

export const AUTO_FOCUS_API_ROWS = [
  {
    name: 'kuiAutoFocus',
    type: 'boolean',
    description:
      'Enables focus (default false). The attribute without a value is true, and false to true focuses again.',
  },
  {
    name: 'kuiAutoFocusPreventScroll',
    type: 'boolean',
    description: 'Focuses without scrolling the element into view (default false).',
  },
] as const satisfies readonly ApiTableRow[];
