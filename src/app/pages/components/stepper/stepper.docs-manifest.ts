import type { DocsComponentManifest } from '@core/docs-registry';

export const STEPPER_DOCS_MANIFEST = {
  kind: 'component',
  slug: 'stepper',
  label: 'Stepper',
  category: 'surfaces',
  description: 'Multi-step progress and navigation indicator.',
  importName: 'KuiStepperComponent',
  status: 'available',
  exampleIds: ['basic-stepper-example'],
  loadPage: () => import('./stepper-page').then((module) => module.StepperPage),
  loadPlayground: () =>
    import('./playground/stepper-playground-page').then((module) => module.StepperPlaygroundPage),
} as const satisfies DocsComponentManifest;
