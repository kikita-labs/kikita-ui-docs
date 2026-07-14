import { type ApiTableRow } from '@shared/docs-ui/api-table';

export const BADGE_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'appearance',
    type: `'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info'`,
    defaultValue: `'neutral'`,
    description: 'Visual badge treatment mapped to Kikita UI status tokens.',
  },
  {
    name: 'size',
    type: `'xs' | 'sm' | 'md' | 'lg'`,
    defaultValue: `'md'`,
    description: 'Badge size mapped to Kikita UI text and spacing tokens.',
  },
  {
    name: '--kui-badge-height',
    type: 'CSS length',
    defaultValue: '22px',
    description: 'Badge block size. Overridden per size by the size input.',
  },
  {
    name: '--kui-badge-px',
    type: 'CSS length',
    defaultValue: '8px',
    description: 'Inline padding. Overridden per size by the size input.',
  },
  {
    name: '--kui-badge-radius',
    type: 'CSS length',
    defaultValue: 'var(--kui-radius-full)',
    description: 'Corner radius of the badge surface.',
  },
  {
    name: '--kui-badge-font-size',
    type: 'CSS length',
    defaultValue: '11px',
    description: 'Badge label font size. Overridden per size by the size input.',
  },
  {
    name: '--kui-badge-neutral-bg',
    type: 'CSS color',
    defaultValue: '-',
    description: 'Background color for the neutral appearance (default).',
  },
  {
    name: '--kui-badge-primary-bg',
    type: 'CSS color',
    defaultValue: '-',
    description: 'Background color for the primary appearance.',
  },
  {
    name: '--kui-badge-success-bg',
    type: 'CSS color',
    defaultValue: '-',
    description: 'Background color for the success appearance.',
  },
  {
    name: '--kui-badge-warning-bg',
    type: 'CSS color',
    defaultValue: '-',
    description: 'Background color for the warning appearance.',
  },
  {
    name: '--kui-badge-danger-bg',
    type: 'CSS color',
    defaultValue: '-',
    description: 'Background color for the danger appearance.',
  },
  {
    name: '--kui-badge-info-bg',
    type: 'CSS color',
    defaultValue: '-',
    description: 'Background color for the info appearance.',
  },
];
