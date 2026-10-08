import { type ApiTableRow } from '@shared/docs-ui/api-table';

export const CAROUSEL_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'itemsPerView',
    type: 'number | undefined',
    defaultValue: 'undefined',
    description:
      'How many slides are visible at once (defaults.carousel.itemsPerView, then 1). Invalid or non-positive static values use 1. The highest reachable index is slideCount - itemsPerView, and the dot picker renders exactly that many dots.',
  },
  {
    name: 'loop',
    type: 'boolean | undefined',
    defaultValue: 'undefined',
    description:
      'Wraps navigation at the edges instead of disabling Prev and Next there. Falls back to defaults.carousel.loop, then false.',
  },
  {
    name: 'autoplay',
    type: 'boolean | undefined',
    defaultValue: 'undefined',
    description:
      'Advances automatically on a timer and always shows Play/Pause; pauses while the pointer, focus or a touch is inside. Falls back to defaults.carousel.autoplay, then false.',
  },
  {
    name: 'autoplayInterval',
    type: 'number | undefined',
    defaultValue: 'undefined',
    description:
      'Autoplay delay between slides in ms (defaults.carousel.autoplayInterval, then 4000). Invalid or non-positive static values use 4000.',
  },
  {
    name: 'showArrows',
    type: 'boolean | undefined',
    defaultValue: 'undefined',
    description:
      'Shows the Prev and Next arrows (defaults.carousel.showArrows, then true). Swipe and scroll work regardless.',
  },
  {
    name: 'showDots',
    type: 'boolean | undefined',
    defaultValue: 'undefined',
    description:
      'Shows the dot picker below the track (defaults.carousel.showDots, then true). Swipe and scroll work regardless.',
  },
  {
    name: 'draggable',
    type: 'boolean | undefined',
    defaultValue: 'undefined',
    description:
      'Adds mouse drag-to-scroll on top of the always-native touch swipe (defaults.carousel.draggable, then true). false also locks wheel and trackpad scroll and removes the track from the tab order.',
  },
  {
    name: 'ariaLabel',
    type: 'string | undefined',
    defaultValue: 'undefined',
    description:
      'Accessible name of the region. Falls back to the carousel.label message (Slides); use a content-specific name that does not contain "carousel".',
  },
  {
    name: 'messages',
    type: 'Partial<KuiCarouselMessages> | undefined',
    defaultValue: 'undefined',
    description:
      'Per-instance text overrides for the label, role descriptions, controls and slide names. They win over scoped and root messages.',
  },
  {
    name: '[(index)]',
    type: 'number',
    defaultValue: '0',
    description:
      'Index of the first visible slide. A debounced scroll listener snaps it to the nearest slide after a swipe or drag.',
  },
  {
    name: '(indexChange)',
    type: 'number',
    defaultValue: '-',
    description: 'Emitted whenever index changes (model output).',
  },
  {
    name: '[kuiCarouselSlide]',
    type: 'content slot',
    defaultValue: '-',
    description:
      'Marks projected slide content: role="group" with aria-roledescription="slide" and an "N of total" name. It has no inputs.',
  },
  {
    name: '--kui-carousel-gap / -radius / -slide-radius',
    type: 'CSS custom properties',
    defaultValue: '-',
    description: 'Gap between slides and the region and slide corner radii.',
  },
  {
    name: '--kui-carousel-bg / -border / -slide-bg',
    type: 'CSS custom properties',
    defaultValue: '-',
    description: 'Region background and border and the slide backdrop.',
  },
  {
    name: '--kui-carousel-control-bg / -control-shadow',
    type: 'CSS custom properties',
    defaultValue: '-',
    description: 'Backdrop circle and shadow of the Prev, Next and Play controls.',
  },
  {
    name: '--kui-carousel-dot-bg / -dot-bg-active / -dot-size',
    type: 'CSS custom properties',
    defaultValue: '-',
    description: 'Colour of the dots, the active dot and the dot size.',
  },
  {
    name: 'KuiCarouselOptions',
    type: 'interface',
    defaultValue: '-',
    description:
      'Shape of defaults.carousel: itemsPerView, loop, autoplay, autoplayInterval, showArrows, showDots, draggable, previousIcon and nextIcon.',
  },
];
