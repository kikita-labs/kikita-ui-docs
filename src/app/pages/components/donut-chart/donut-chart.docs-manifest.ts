import type { DocsComponentManifest } from '@core/docs-registry';

export const DONUT_CHART_DOCS_MANIFEST = {
  kind: 'component',
  slug: 'donut-chart',
  label: 'Donut Chart',
  category: 'data-identity',
  description: 'Donut chart for shares of a whole.',
  importName: 'KuiDonutChart',
  status: 'available',
  exampleIds: [
    'basic-donut-chart-example',
    'donut-patterns-chart-example',
    'donut-sizes-chart-example',
    'donut-states-chart-example',
  ],
  loadPage: () => import('./donut-chart-page').then((module) => module.DonutChartPage),
  loadPlayground: () =>
    import('./playground/donut-chart-playground-page').then(
      (module) => module.DonutChartPlaygroundPage,
    ),
} as const satisfies DocsComponentManifest;
