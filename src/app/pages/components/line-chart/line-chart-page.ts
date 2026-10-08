import { Component } from '@angular/core';

import { LINE_CHART_EXAMPLE_SOURCES } from '@generated/example-sources/line-chart.generated';
import {
  LINE_CHART_COLOR_TOKEN_ROWS,
  LINE_CHART_DEFAULTS,
  LINE_CHART_GEOMETRY_TOKEN_ROWS,
} from '@generated/library-tables/line-chart.generated';
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

import {
  BasicLineChartExample,
  LineAreaChartExample,
  LineExternalLegendExample,
  LineGapsChartExample,
  LineStatesChartExample,
} from './examples';
import { LINE_CHART_API_ROWS } from './line-chart.api-schema';
import {
  LINE_CHART_API_DESCRIPTION,
  LINE_CHART_IMPORT_TABS,
  LINE_CHART_STATUS,
} from './line-chart.docs-content';

@Component({
  selector: 'app-line-chart-page',
  imports: [
    ApiTable,
    BasicLineChartExample,
    ChartAccessibilitySections,
    ChartBehaviorSections,
    CodeTabs,
    DocSection,
    LineAreaChartExample,
    LineExternalLegendExample,
    LineGapsChartExample,
    LineStatesChartExample,
    LivePreview,
    MessagesSection,
    PageHeader,
    PlaygroundRouteButton,
    ProviderDefaultsSection,
    TokenTablesSection,
  ],
  templateUrl: './line-chart-page.html',
  styleUrl: './line-chart-page.scss',
})
export class LineChartPage {
  protected readonly status = LINE_CHART_STATUS;
  protected readonly apiDescription = LINE_CHART_API_DESCRIPTION;
  protected readonly defaults = LINE_CHART_DEFAULTS;
  protected readonly colorTokenRows = LINE_CHART_COLOR_TOKEN_ROWS;
  protected readonly geometryTokenRows = LINE_CHART_GEOMETRY_TOKEN_ROWS;
  protected readonly messageGroups = [CHART_MESSAGES];
  protected readonly apiRows = LINE_CHART_API_ROWS;

  protected readonly importTabs = LINE_CHART_IMPORT_TABS;

  protected readonly basicTabs = LINE_CHART_EXAMPLE_SOURCES['basic-line-chart-example'];

  protected readonly areaTabs = LINE_CHART_EXAMPLE_SOURCES['line-area-chart-example'];

  protected readonly gapsTabs = LINE_CHART_EXAMPLE_SOURCES['line-gaps-chart-example'];

  protected readonly legendExampleTabs = LINE_CHART_EXAMPLE_SOURCES['line-external-legend-example'];

  protected readonly statesTabs = LINE_CHART_EXAMPLE_SOURCES['line-states-chart-example'];
}
