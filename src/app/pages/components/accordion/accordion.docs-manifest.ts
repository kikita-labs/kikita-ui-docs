import type { DocsComponentManifest } from '@core/docs-registry';

export const ACCORDION_DOCS_MANIFEST = {
  kind: 'component',
  slug: 'accordion',
  label: 'Accordion',
  category: 'surfaces',
  description: 'Disclosure component for grouped expandable content.',
  importName: 'KuiAccordionComponent',
  status: 'available',
  exampleIds: [
    'appearance-accordion-example',
    'basic-accordion-example',
    'icon-accordion-example',
    'multi-accordion-example',
  ],
  loadPage: () => import('./accordion-page').then((module) => module.AccordionPage),
  loadPlayground: () =>
    import('./playground/accordion-playground-page').then(
      (module) => module.AccordionPlaygroundPage,
    ),
} as const satisfies DocsComponentManifest;
