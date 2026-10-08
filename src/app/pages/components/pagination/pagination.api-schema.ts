import { type ApiTableRow } from '@shared/docs-ui/api-table';

export const PAGINATION_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'variant',
    type: `'full' | 'compact' | 'simple' | undefined`,
    defaultValue: 'undefined',
    description:
      'Layout preset (defaults.pagination.variant, then compact). compact is First, Prev, numbers with ellipsis, Next and Last; simple is Prev, "Page X of Y" and Next; full adds the summary and the rows-per-page picker.',
  },
  {
    name: 'size',
    type: `'xs' | 'sm' | 'md' | 'lg' | undefined`,
    defaultValue: 'undefined',
    description: 'Control size on the Button scale. Falls back to the root defaults.size, then md.',
  },
  {
    name: 'totalPages',
    type: 'number',
    defaultValue: '-',
    description:
      'Required total page count. Static numeric values are coerced; an invalid or non-positive value uses 1.',
  },
  {
    name: '[(currentPage)]',
    type: 'number',
    defaultValue: '1',
    description:
      'Current page, 1-based. A plain two-way model, not a form value, so pagination is never placed in kui-field. An out-of-range binding is clamped.',
  },
  {
    name: 'siblingCount',
    type: 'number | undefined',
    defaultValue: 'undefined',
    description:
      'Page numbers shown beside the current page before an ellipsis (defaults.pagination.siblingCount, then 1).',
  },
  {
    name: 'boundaryCount',
    type: 'number | undefined',
    defaultValue: 'undefined',
    description:
      'Page numbers always shown at each edge (defaults.pagination.boundaryCount, then 1).',
  },
  {
    name: '[(pageSize)]',
    type: 'number',
    defaultValue: '25',
    description:
      'Rows per page, used by the full variant. Changing the picker sets pageSize and resets currentPage to 1 in the same update.',
  },
  {
    name: 'pageSizeOptions',
    type: 'readonly number[] | undefined',
    defaultValue: 'undefined',
    description:
      'Choices of the rows-per-page picker, full variant only (defaults.pagination.pageSizeOptions, then [10, 25, 50, 100]).',
  },
  {
    name: 'totalItems',
    type: 'number | undefined',
    defaultValue: 'totalPages * pageSize',
    description: 'Total item count for the "Showing X-Y of Z" summary, full variant only.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: 'false',
    description:
      'Disables every control with the native attribute, removing them from the tab order.',
  },
  {
    name: 'ariaLabel',
    type: 'string | undefined',
    defaultValue: 'undefined',
    description:
      'Accessible name of the nav landmark. Falls back to the pagination.label message (Pagination).',
  },
  {
    name: 'messages',
    type: 'Partial<KuiPaginationMessages> | undefined',
    defaultValue: 'undefined',
    description:
      'Per-instance text overrides: button names, rowsPerPage, summary and page. They win over scoped and root messages.',
  },
  {
    name: '(currentPageChange)',
    type: 'number',
    defaultValue: '-',
    description: 'Emitted whenever currentPage changes (model output).',
  },
  {
    name: '(pageSizeChange)',
    type: 'number',
    defaultValue: '-',
    description: 'Emitted whenever pageSize changes (model output).',
  },
  {
    name: '--kui-pagination-gap / -summary-gap / -ellipsis-color',
    type: 'CSS custom properties',
    defaultValue: '-',
    description:
      'Gap between the controls, gap between the summary row and the controls, and the ellipsis and secondary text colour.',
  },
  {
    name: '--kui-pagination-page-min-size-{xs,sm,md,lg} / -page-size-width',
    type: 'CSS custom properties',
    defaultValue: '-',
    description:
      'Square size of the page-number buttons per size and the fixed width (76px) of the rows-per-page picker.',
  },
  {
    name: 'KuiPaginationOptions',
    type: 'interface',
    defaultValue: '-',
    description:
      'Shape of defaults.pagination: variant, siblingCount, boundaryCount, pageSizeOptions and the four step icons.',
  },
];
