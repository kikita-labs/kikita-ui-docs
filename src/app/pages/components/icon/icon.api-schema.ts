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
    type: `'2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | string | number`,
    defaultValue: `'1em'`,
    description:
      'Named presets map to Kikita icon-size tokens. Numeric values become pixels, and arbitrary CSS size strings pass through.',
  },
  {
    name: 'provideKuiIcons(icons)',
    type: 'EnvironmentProviders',
    defaultValue: '-',
    description:
      'Registers a static map of trusted SVG strings, or an async KuiIconResolver function, for name-based icon lookup. Later registrations take precedence for names both define. Route-level only; component providers cannot accept EnvironmentProviders.',
  },
  {
    name: 'KUI_ICONS',
    type: 'InjectionToken<readonly KuiIconRegistry[]>',
    defaultValue: '-',
    description:
      "The multi-provider token behind provideKuiIcons(). Provide it directly in a component's own providers ({ provide: KUI_ICONS, multi: true, useValue }) to scope an icon-set override to that subtree.",
  },
  {
    name: `provideKikitaUi({ icons })`,
    type: `'lucide' | false`,
    defaultValue: `'lucide'`,
    description:
      'Default icon set kui-icon resolves against when a name is not matched locally. Lazily fetches Lucide SVG markup from the jsDelivr CDN; set to false to opt out.',
  },
];
