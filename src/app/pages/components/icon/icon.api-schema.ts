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
      'Icon name resolved from icons registered with provideKuiIcons(), falling back to the default pinned Lucide resolver unless disabled. A name in a static registry renders on the first pass; others render when the async resolver settles.',
  },
  {
    name: 'source',
    type: 'KuiIconContent | undefined',
    defaultValue: 'undefined',
    description:
      'Direct icon content: KuiIconGlyph data (safe from any source) or trusted static inline SVG markup. It takes precedence over name and renders synchronously.',
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
      "Registers kui-icon's default resolvers: Lucide (lazily fetched SVG markup from the jsDelivr CDN) and the built-in KUI_BRAND_ICONS set (currently just the 'kikita-brand' wordmark, resolved locally). Set to false to opt out of both.",
  },
  {
    name: 'strokeWidth',
    type: 'number | string | undefined',
    defaultValue: 'undefined',
    description:
      'Stroke width in glyph-grid units (24 by 24 for Lucide). Sets --kui-icon-stroke-width on the host; unset keeps the icon weight or the token of an ancestor.',
  },
  {
    name: 'absoluteStrokeWidth',
    type: 'boolean',
    defaultValue: 'false',
    description:
      'Keeps the stroke the same number of pixels at any icon size. Sets --kui-icon-vector-effect: non-scaling-stroke on the host.',
  },
  {
    name: 'KuiIconGlyph / KuiIconContent',
    type: 'types',
    defaultValue: '-',
    description:
      'Glyph data { node, viewBox? } drawn through an allowlist, and the union of glyph data and trusted SVG markup accepted by source and by registries.',
  },
  {
    name: 'createKuiLucideResolver(options?)',
    type: '(options?: KuiLucideResolverOptions) => KuiIconResolver',
    defaultValue: '-',
    description:
      'The safe Lucide resolver for another lucide-static version or for files you host (baseUrl, no trailing slash). Fetched text is converted to glyph data, never inserted as markup.',
  },
  {
    name: 'KUI_LUCIDE_STATIC_VERSION',
    type: 'string',
    defaultValue: `'1.51.0'`,
    description:
      'The exact lucide-static version of the default resolver. It changes only with a library release.',
  },
  {
    name: '--kui-icon-stroke-width / --kui-icon-vector-effect',
    type: 'CSS custom properties',
    defaultValue: '-',
    description:
      'Set by strokeWidth and absoluteStrokeWidth; set them on :root or a subtree to restyle every stroke-based icon, structural icons included.',
  },
];
