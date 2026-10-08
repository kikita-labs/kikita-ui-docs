import { Component } from '@angular/core';

import { BAR_CHART_EXAMPLE_SOURCES } from '@generated/example-sources/bar-chart.generated';
import {
  BAR_CHART_COLOR_TOKEN_ROWS,
  BAR_CHART_DEFAULTS,
  BAR_CHART_GEOMETRY_TOKEN_ROWS,
} from '@generated/library-tables/bar-chart.generated';
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

import { BAR_CHART_API_ROWS } from './bar-chart.api-schema';
import {
  BAR_CHART_API_DESCRIPTION,
  BAR_CHART_IMPORT_TABS,
  BAR_CHART_STATUS,
} from './bar-chart.docs-content';
import {
  BarHorizontalChartExample,
  BarPatternsChartExample,
  BarStackedChartExample,
  BarStatesChartExample,
  BasicBarChartExample,
} from './examples';

@Component({
  selector: 'app-bar-chart-page',
  imports: [
    ApiTable,
    BarHorizontalChartExample,
    BarPatternsChartExample,
    BarStackedChartExample,
    BarStatesChartExample,
    BasicBarChartExample,
    ChartAccessibilitySections,
    ChartBehaviorSections,
    CodeTabs,
    DocSection,
    LivePreview,
    MessagesSection,
    PageHeader,
    PlaygroundRouteButton,
    ProviderDefaultsSection,
    TokenTablesSection,
  ],
  templateUrl: './bar-chart-page.html',
  styleUrl: './bar-chart-page.scss',
})
export class BarChartPage {
  protected readonly status = BAR_CHART_STATUS;
  protected readonly apiDescription = BAR_CHART_API_DESCRIPTION;
  protected readonly defaults = BAR_CHART_DEFAULTS;
  protected readonly colorTokenRows = BAR_CHART_COLOR_TOKEN_ROWS;
  protected readonly geometryTokenRows = BAR_CHART_GEOMETRY_TOKEN_ROWS;
  protected readonly messageGroups = [CHART_MESSAGES];
  protected readonly apiRows = BAR_CHART_API_ROWS;

  protected readonly importTabs = BAR_CHART_IMPORT_TABS;

  protected readonly basicTabs = BAR_CHART_EXAMPLE_SOURCES['basic-bar-chart-example'];

  protected readonly stackedTabs = BAR_CHART_EXAMPLE_SOURCES['bar-stacked-chart-example'];

  protected readonly orientationTabs = BAR_CHART_EXAMPLE_SOURCES['bar-horizontal-chart-example'];

  protected readonly patternsTabs = BAR_CHART_EXAMPLE_SOURCES['bar-patterns-chart-example'];

  protected readonly statesTabs = BAR_CHART_EXAMPLE_SOURCES['bar-states-chart-example'];
}
