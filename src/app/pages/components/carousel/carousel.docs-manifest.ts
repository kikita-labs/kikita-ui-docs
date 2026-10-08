import type { DocsComponentManifest } from '@core/docs-registry';

export const CAROUSEL_DOCS_MANIFEST = {
  kind: 'component',
  slug: 'carousel',
  label: 'Carousel',
  category: 'data-identity',
  description: 'Horizontal strip of slides with arrows, a dot picker and optional autoplay.',
  importName: 'KuiCarousel',
  status: 'available',
  exampleIds: [
    'basic-carousel-example',
    'carousel-items-example',
    'carousel-autoplay-example',
    'carousel-controls-example',
    'carousel-messages-example',
  ],
  loadPage: () => import('./carousel-page').then((module) => module.CarouselPage),
  loadPlayground: () =>
    import('./playground/carousel-playground-page').then((module) => module.CarouselPlaygroundPage),
} as const satisfies DocsComponentManifest;
