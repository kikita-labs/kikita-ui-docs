import { ApiTableRow } from '../../../shared/docs-ui/api-table/api-table-row';

export const LOADER_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'size',
    type: `'xs' | 'sm' | 'md' | 'lg'`,
    defaultValue: `'md'`,
    description: 'Loader size mapped to Kikita UI loader tokens.',
  },
  {
    name: 'label',
    type: 'string',
    defaultValue: `'Loading'`,
    description:
      'Accessible label rendered as aria-label. Also announced through the host role="status" and aria-live="polite".',
  },
  {
    name: '--kui-loader-size',
    type: 'CSS custom property',
    defaultValue: '-',
    description: 'Overrides the rendered loader diameter for the current size step.',
  },
  {
    name: '--kui-loader-track',
    type: 'CSS custom property',
    defaultValue: '-',
    description: 'Overrides the loader track (background ring) color.',
  },
  {
    name: '--kui-loader-fill',
    type: 'CSS custom property',
    defaultValue: '-',
    description: 'Overrides the loader spinning fill color.',
  },
  {
    name: '--kui-loader-border-width',
    type: 'CSS custom property',
    defaultValue: '-',
    description: 'Overrides the loader ring stroke width.',
  },
  {
    name: '--kui-loader-duration',
    type: 'CSS custom property',
    defaultValue: '-',
    description: 'Overrides the spin animation duration.',
  },
];
