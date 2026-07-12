import { ApiTableRow } from '../../../shared/docs-ui/api-table/api-table-row';

export const SCROLLBAR_API_ROWS: readonly ApiTableRow[] = [
  {
    name: '.kui-scroll',
    type: 'CSS class',
    description:
      'Local opt-in for Kikita scrollbar token styling. Apply to the element that actually scrolls (the one with overflow: auto/scroll set), not a non-scrolling wrapper.',
  },
  {
    name: 'provideKikitaUi({ scrollbars })',
    type: `KuiScrollbarMode = 'native' | 'styled'`,
    defaultValue: `'native'`,
    description:
      'App-wide scrollbar mode for application-owned scroll containers. Sets data-kui-scrollbars on the document root. Kikita-owned internal scroll areas (dropdown, dialog body, drawer body, command palette list) use Kikita scrollbar tokens automatically regardless of this option.',
  },
  {
    name: '--kui-scrollbar-size',
    type: 'CSS custom property',
    description: 'Scrollbar thickness.',
  },
  {
    name: '--kui-scrollbar-radius',
    type: 'CSS custom property',
    description: 'Corner radius of the scrollbar thumb.',
  },
  {
    name: '--kui-scrollbar-track',
    type: 'CSS custom property',
    description: 'Scrollbar track background color.',
  },
  {
    name: '--kui-scrollbar-thumb-min',
    type: 'CSS custom property',
    description: 'Minimum thumb length so short thumbs stay grabbable.',
  },
  {
    name: '--kui-scrollbar-thumb-inset',
    type: 'CSS custom property',
    description: 'Inset spacing between the thumb and the track edge.',
  },
  {
    name: '--kui-color-scrollbar-thumb',
    type: 'CSS custom property',
    description: 'Thumb color in the resting state.',
  },
  {
    name: '--kui-color-scrollbar-thumb-hover',
    type: 'CSS custom property',
    description: 'Thumb color on hover.',
  },
  {
    name: '--kui-color-scrollbar-thumb-active',
    type: 'CSS custom property',
    description: 'Thumb color while being dragged.',
  },
];
