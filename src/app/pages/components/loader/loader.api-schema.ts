import { type ApiTableRow } from '@shared/docs-ui/api-table';

export const LOADER_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'size',
    type: `'xs' | 'sm' | 'md' | 'lg' | undefined`,
    defaultValue: 'undefined',
    description:
      'Loader size. Falls back to defaults.loader.size, then the global defaults.size, then md.',
  },
  {
    name: 'label',
    type: 'string | undefined',
    defaultValue: 'undefined',
    description:
      'Accessible label rendered as aria-label and announced through the host role="status" and aria-live="polite". Falls back to the common.loading message (Loading).',
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
  {
    name: '--kui-loader-duration-reduced',
    type: 'CSS custom property',
    defaultValue: '-',
    description: 'Spin animation duration used when the user prefers reduced motion.',
  },
  {
    name: 'KuiLoaderOptions',
    type: 'interface',
    defaultValue: '-',
    description: 'Shape of defaults.loader: size.',
  },
];
