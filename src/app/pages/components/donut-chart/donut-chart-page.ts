import { Component } from '@angular/core';

import { DONUT_CHART_EXAMPLE_SOURCES } from '@generated/example-sources/donut-chart.generated';
import {
  DONUT_CHART_COLOR_TOKEN_ROWS,
  DONUT_CHART_DEFAULTS,
  DONUT_CHART_GEOMETRY_TOKEN_ROWS,
} from '@generated/library-tables/donut-chart.generated';
import { CHART_MESSAGES } from '@generated/library-tables/messages.generated';
import { ApiTable } from '@shared/docs-ui/api-table';
import { ChartAccessibilitySections, ChartBehaviorSections } from '@shared/docs-ui/chart-sections';
import { CodeTabs } from '@shared/docs-ui/code-tabs';
import { DocSection } from '@shared/docs-ui/doc-section';
import { LivePreview } from '@shared/docs-ui/live-preview';
import { MessagesSection } from '@shared/docs-ui/messages-section';
import { PageHeader } from '@shared/docs-ui/page-header';
import { PlaygroundRouteButton } from '@shared/docs-ui/playground-route-button';
import { ProviderDefaultsSection } from '@shared/docs-ui/provider-defaults-section';
import { TokenTablesSection } from '@shared/docs-ui/token-tables-section';

import { DONUT_CHART_API_ROWS } from './donut-chart.api-schema';
import {
  DONUT_CHART_API_DESCRIPTION,
  DONUT_CHART_IMPORT_TABS,
  DONUT_CHART_STATUS,
} from './donut-chart.docs-content';
import {
  BasicDonutChartExample,
  DonutPatternsChartExample,
  DonutSizesChartExample,
  DonutStatesChartExample,
} from './examples';

@Component({
  selector: 'app-donut-chart-page',
  imports: [
    ApiTable,
    BasicDonutChartExample,
    ChartAccessibilitySections,
    ChartBehaviorSections,
    CodeTabs,
    DocSection,
    DonutPatternsChartExample,
    DonutSizesChartExample,
    DonutStatesChartExample,
    LivePreview,
    MessagesSection,
    PageHeader,
    PlaygroundRouteButton,
    ProviderDefaultsSection,
    TokenTablesSection,
  ],
  templateUrl: './donut-chart-page.html',
  styleUrl: './donut-chart-page.scss',
})
export class DonutChartPage {
  protected readonly status = DONUT_CHART_STATUS;
  protected readonly apiDescription = DONUT_CHART_API_DESCRIPTION;
  protected readonly defaults = DONUT_CHART_DEFAULTS;
  protected readonly colorTokenRows = DONUT_CHART_COLOR_TOKEN_ROWS;
  protected readonly geometryTokenRows = DONUT_CHART_GEOMETRY_TOKEN_ROWS;
  protected readonly messageGroups = [CHART_MESSAGES];
  protected readonly apiRows = DONUT_CHART_API_ROWS;

  protected readonly importTabs = DONUT_CHART_IMPORT_TABS;

  protected readonly basicTabs = DONUT_CHART_EXAMPLE_SOURCES['basic-donut-chart-example'];

  protected readonly patternsTabs = DONUT_CHART_EXAMPLE_SOURCES['donut-patterns-chart-example'];

  protected readonly sizesTabs = DONUT_CHART_EXAMPLE_SOURCES['donut-sizes-chart-example'];

  protected readonly statesTabs = DONUT_CHART_EXAMPLE_SOURCES['donut-states-chart-example'];
}
