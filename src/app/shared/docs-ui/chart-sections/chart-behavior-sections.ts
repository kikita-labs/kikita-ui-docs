import { Component, input } from '@angular/core';

import { CodeTabs } from '../code-tabs';
import { DocSection } from '../doc-section';
import { CHART_LEGEND_TABS, CHART_TOOLTIP_TABS } from './constants/chart-code-tabs';
import { type ChartDocsType } from './interfaces/chart-docs-type';

/**
 * The behavior sections the four chart pages share (data contract, legend, sizes, loading and empty,
 * tooltip, alt-table, colour independence, keyboard and performance). The text follows the chart
 * type, so a page only passes which chart it documents.
 */
@Component({
  selector: 'app-chart-behavior-sections',
  imports: [CodeTabs, DocSection],
  templateUrl: './chart-behavior-sections.html',
  styleUrl: './chart-sections.scss',
})
export class ChartBehaviorSections {
  /** The chart type the page documents. */
  public readonly type = input.required<ChartDocsType>();

  protected readonly legendTabs = CHART_LEGEND_TABS;
  protected readonly tooltipTabs = CHART_TOOLTIP_TABS;
}
