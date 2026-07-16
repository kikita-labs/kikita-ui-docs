import { type ApiTableRow } from '@shared/docs-ui/api-table';

export const ICON_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'kui-icon',
    type: 'Component',
    defaultValue: '-',
    description: 'Renders an icon from a registered name, trusted inline SVG source, or image URL.',
  },
  {
    name: 'name',
    type: 'KuiIconName | undefined',
    defaultValue: 'undefined',
    description:
      'Icon name resolved from icons registered with provideKuiIcons(), falling back to the default Lucide resolver unless disabled.',
  },
  {
    name: 'source',
    type: 'KuiIconSource | undefined',
    defaultValue: 'undefined',
    description: 'Trusted static inline SVG markup. It takes precedence over name.',
  },
  {
    name: 'src',
    type: 'string | undefined',
    defaultValue: 'undefined',
    description: 'External image URL used when no source or registered name is provided.',
  },
  {
    name: 'label',
    type: 'string | undefined',
    defaultValue: 'undefined',
    description: 'Accessible name for meaningful icons. Omit it for decorative icons.',
  },
  {
    name: 'size',
    type: 'string',
    defaultValue: `'1em'`,
    description: 'CSS size applied to the square icon box, for example 16px, 1.25rem, or 2em.',
  },
  {
    name: 'provideKuiIcons(icons)',
    type: 'EnvironmentProviders',
    defaultValue: '-',
    description:
      'Registers a static map of trusted SVG strings, or an async KuiIconResolver function, for name-based icon lookup. Later registrations take precedence for names both define.',
  },
  {
    name: `provideKikitaUi({ icons })`,
    type: `'lucide' | false`,
    defaultValue: `'lucide'`,
    description:
      'Default icon set kui-icon resolves against when a name is not matched locally. Lazily fetches Lucide SVG markup from the jsDelivr CDN; set to false to opt out.',
  },
];
