import type { DocsComponentManifest } from '@core/docs-registry';

export const BAR_CHART_DOCS_MANIFEST = {
  kind: 'component',
  slug: 'bar-chart',
  label: 'Bar Chart',
  category: 'data-identity',
  description: 'Vertical or horizontal, grouped or stacked bar chart.',
  importName: 'KuiBarChart',
  status: 'available',
  exampleIds: [
    'basic-bar-chart-example',
    'bar-stacked-chart-example',
    'bar-horizontal-chart-example',
    'bar-patterns-chart-example',
    'bar-states-chart-example',
  ],
  loadPage: () => import('./bar-chart-page').then((module) => module.BarChartPage),
  loadPlayground: () =>
    import('./playground/bar-chart-playground-page').then(
      (module) => module.BarChartPlaygroundPage,
    ),
} as const satisfies DocsComponentManifest;
