import { type ApiTableRow } from '@shared/docs-ui/api-table';

export const BREADCRUMBS_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'ol[kuiBreadcrumbs].size',
    type: `'sm' | 'md' | 'lg'`,
    defaultValue: `'md'`,
    description:
      'Font size, separator scale, and spacing for the full trail. Falls back to defaults.breadcrumbs.size, then the global defaults.size.',
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
  {
    name: '.kui-breadcrumb-truncate',
    type: 'CSS class',
    defaultValue: '-',
    description:
      'Added to the crumb that should shrink with an ellipsis; keep the trail non-wrapping. The maximum width is --kui-breadcrumb-truncate-max-width.',
  },
  {
    name: 'button.kui-breadcrumb-ellipsis',
    type: 'CSS class',
    defaultValue: '-',
    description:
      'Styles a button that stands in for hidden crumbs. Breadcrumbs does not manage the menu; wire it to kui-menu or kui-dropdown yourself.',
  },
  {
    name: 'span.kui-breadcrumb-icon',
    type: 'CSS class',
    defaultValue: '-',
    description: 'Optional leading icon wrapper, on the first crumb only.',
  },
  {
    name: 'KuiBreadcrumbsOptions',
    type: 'interface',
    defaultValue: '-',
    description:
      'Shape of defaults.breadcrumbs: size and separatorIcon (takes precedence over defaults.icons.separator).',
  },
];
