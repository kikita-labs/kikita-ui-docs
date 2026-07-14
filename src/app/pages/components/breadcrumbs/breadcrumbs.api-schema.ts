import { type ApiTableRow } from '@shared/docs-ui/api-table';

export const BREADCRUMBS_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'ol[kuiBreadcrumbs].size',
    type: `'sm' | 'md' | 'lg'`,
    defaultValue: `'md'`,
    description: 'Font size, separator scale, and spacing for the full trail.',
  },
  {
    name: 'a[kuiBreadcrumbItem]',
    type: 'directive',
    defaultValue: '-',
    description: 'Native link crumb for navigable hierarchy levels.',
  },
  {
    name: 'span[kuiBreadcrumbItem]',
    type: 'directive',
    defaultValue: '-',
    description: 'Plain-text crumb for grouping labels or the current page.',
  },
  {
    name: 'span[kuiBreadcrumbItem].current',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Marks the final crumb as the current page and sets aria-current.',
  },
  {
    name: 'li[kuiBreadcrumbSeparator]',
    type: 'component',
    defaultValue: '-',
    description: 'Decorative separator list item hidden from assistive technology.',
  },
];
