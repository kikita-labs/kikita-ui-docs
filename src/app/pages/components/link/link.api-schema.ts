import { type ApiTableRow } from '@shared/docs-ui/api-table';

export const LINK_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'tone',
    type: `'default' | 'muted' | 'primary' | 'success' | 'warning' | 'danger' | undefined`,
    defaultValue: 'undefined',
    description:
      'Rest colour only; hover, focus and active never change it. Falls back to defaults.link.tone, then primary.',
  },
  {
    name: 'underline',
    type: `'always' | 'hover' | 'none' | undefined`,
    defaultValue: 'undefined',
    description:
      'When the link is underlined (defaults.link.underline, then hover). Use always inside running text; hover also underlines on focus-visible and active.',
  },
  {
    name: 'variant',
    type: `'body-lg' | 'body' | 'body-sm' | 'caption'`,
    defaultValue: `'body'`,
    description:
      'Forwarded to the composed kuiText directive. The link has no typography scale of its own and ignores defaults.typography.',
  },
  {
    name: 'iconStart / iconEnd',
    type: 'string | undefined',
    defaultValue: 'undefined',
    description:
      'Decorative icon name rendered through kui-icon before or after the content. An explicit iconEnd replaces the external-link glyph.',
  },
  {
    name: 'target / rel',
    type: 'string | undefined',
    defaultValue: 'undefined',
    description:
      'Reflected onto the host as native attributes. rel is merged with noopener noreferrer for external links.',
  },
  {
    name: 'external',
    type: 'boolean | undefined',
    defaultValue: 'target() === "_blank"',
    description:
      'Marks the link as leaving the app: adds rel="noopener noreferrer", the external-link glyph (unless iconEnd is set) and a hidden "(opens in a new tab)" suffix to the name.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: 'false',
    description:
      'A disabled anchor gets aria-disabled, tabindex -1 and a blocked click; a button also gets the native disabled attribute.',
  },
  {
    name: 'href, type, (click)',
    type: 'native attributes',
    defaultValue: '-',
    description:
      'Plain bindings on the host a or button. There is no as input: use a button without a real href for a JS-driven action.',
  },
  {
    name: '--kui-link-color-default / -muted / -primary / -success / -warning / -danger / -disabled',
    type: 'CSS custom properties',
    defaultValue: '-',
    description: 'Rest colour per tone and the disabled colour.',
  },
  {
    name: '--kui-link-focus-ring / -radius-focus',
    type: 'CSS custom properties',
    defaultValue: '-',
    description: 'Focus ring shadow and its corner radius.',
  },
  {
    name: '--kui-link-decoration-thickness-rest / -active',
    type: 'CSS custom properties',
    defaultValue: '-',
    description: 'Underline thickness at rest and on hover, focus and active.',
  },
  {
    name: '--kui-link-gap',
    type: 'CSS custom property',
    defaultValue: '-',
    description: 'Gap between the icons and the text.',
  },
  {
    name: 'KuiLinkOptions',
    type: 'interface',
    defaultValue: '-',
    description: 'Shape of defaults.link: tone, underline and externalIcon.',
  },
];
