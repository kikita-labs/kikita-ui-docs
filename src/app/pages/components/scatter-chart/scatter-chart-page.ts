import { Component } from '@angular/core';

import { SCATTER_CHART_EXAMPLE_SOURCES } from '@generated/example-sources/scatter-chart.generated';
import { CHART_MESSAGES } from '@generated/library-tables/messages.generated';
import {
  SCATTER_CHART_COLOR_TOKEN_ROWS,
  SCATTER_CHART_DEFAULTS,
  SCATTER_CHART_GEOMETRY_TOKEN_ROWS,
} from '@generated/library-tables/scatter-chart.generated';
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

import {
  BasicScatterChartExample,
  ScatterBubbleChartExample,
  ScatterStatesChartExample,
} from './examples';
import { SCATTER_CHART_API_ROWS } from './scatter-chart.api-schema';
import {
  SCATTER_CHART_API_DESCRIPTION,
  SCATTER_CHART_IMPORT_TABS,
  SCATTER_CHART_STATUS,
} from './scatter-chart.docs-content';

@Component({
  selector: 'app-scatter-chart-page',
  imports: [
    ApiTable,
    BasicScatterChartExample,
    ChartAccessibilitySections,
    ChartBehaviorSections,
    CodeTabs,
    DocSection,
    LivePreview,
    MessagesSection,
    PageHeader,
    PlaygroundRouteButton,
    ProviderDefaultsSection,
    ScatterBubbleChartExample,
    ScatterStatesChartExample,
    TokenTablesSection,
  ],
  templateUrl: './scatter-chart-page.html',
  styleUrl: './scatter-chart-page.scss',
})
export class ScatterChartPage {
  protected readonly status = SCATTER_CHART_STATUS;
  protected readonly apiDescription = SCATTER_CHART_API_DESCRIPTION;
  protected readonly defaults = SCATTER_CHART_DEFAULTS;
  protected readonly colorTokenRows = SCATTER_CHART_COLOR_TOKEN_ROWS;
  protected readonly geometryTokenRows = SCATTER_CHART_GEOMETRY_TOKEN_ROWS;
  protected readonly messageGroups = [CHART_MESSAGES];
  protected readonly apiRows = SCATTER_CHART_API_ROWS;

  protected readonly importTabs = SCATTER_CHART_IMPORT_TABS;

  protected readonly basicTabs = SCATTER_CHART_EXAMPLE_SOURCES['basic-scatter-chart-example'];

  protected readonly bubbleTabs = SCATTER_CHART_EXAMPLE_SOURCES['scatter-bubble-chart-example'];

  protected readonly statesTabs = SCATTER_CHART_EXAMPLE_SOURCES['scatter-states-chart-example'];
}
