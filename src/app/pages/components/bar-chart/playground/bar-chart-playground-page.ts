import { Component } from '@angular/core';

import {
  KuiBarChart,
  type KuiChartAxesOptions,
  type KuiChartCartesianSeries,
} from '@kikita-labs/ui';

import {
  ApiPlayground,
  definePlaygroundControls,
  playgroundBinding,
  type PlaygroundValues,
  serializePlaygroundAttributes,
} from '@shared/docs-ui/api-playground';
import { ApiTable } from '@shared/docs-ui/api-table';
import {
  CHART_PLAYGROUND_AXES_CONTROLS,
  CHART_PLAYGROUND_COMMON_CONTROLS,
  CHART_SAMPLE_CATEGORIES,
  chartAxesAreDefault,
  chartAxesInput,
  chartAxesSnippet,
  chartLegendInput,
  chartMessagesInput,
  chartSampleSeries,
  chartTooltipInput,
  chartValueFormatInput,
} from '@shared/docs-ui/chart-sections/playground';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

import { BAR_CHART_API_ROWS } from '../bar-chart.api-schema';
import { BAR_CHART_API_DESCRIPTION } from '../bar-chart.docs-content';

const BAR_CHART_PLAYGROUND_CONTROLS = definePlaygroundControls([
  { key: 'seriesCount', label: 'series', kind: 'number', defaultValue: 2 },
  {
    key: 'orientation',
    label: 'orientation',
    kind: 'enum',
    options: ['vertical', 'horizontal'],
    defaultValue: 'vertical',
  },
  { key: 'stacked', label: 'stacked', kind: 'boolean', defaultValue: false },
  { key: 'patterns', label: 'patterns', kind: 'boolean', defaultValue: false },
  { key: 'gaps', label: 'gap in data', kind: 'boolean', defaultValue: false },
  ...CHART_PLAYGROUND_COMMON_CONTROLS,
  ...CHART_PLAYGROUND_AXES_CONTROLS,
] as const);

type BarChartPlaygroundValues = PlaygroundValues<typeof BAR_CHART_PLAYGROUND_CONTROLS>;

@Component({
  selector: 'app-bar-chart-playground-page',
  imports: [ApiPlayground, ApiTable, KuiBarChart],
  templateUrl: './bar-chart-playground-page.html',
  styleUrl: './bar-chart-playground-page.scss',
})
export class BarChartPlaygroundPage {
  protected readonly apiDescription = BAR_CHART_API_DESCRIPTION;
  protected readonly apiRows = BAR_CHART_API_ROWS;
  protected readonly categories = CHART_SAMPLE_CATEGORIES;
  protected readonly playgroundControls = BAR_CHART_PLAYGROUND_CONTROLS;

  protected readonly buildPlaygroundSnippet = (
    values: BarChartPlaygroundValues,
  ): readonly CodeTab[] => {
    const attrString = serializePlaygroundAttributes([
      { name: 'ariaLabel', value: values.ariaLabel || null },
      playgroundBinding('series', 'series'),
      playgroundBinding('categories', 'categories'),
      { name: 'orientation', value: values.orientation, defaultValue: 'vertical' },
      { name: 'stacked', value: values.stacked },
      { name: 'patterns', value: values.patterns },
      { name: 'size', value: values.size, defaultValue: 'md' },
      { name: 'loading', value: values.loading },
      playgroundBinding(
        'legend',
        values.legend === 'auto' ? null : String(values.legend === 'show'),
      ),
      playgroundBinding('valueFormat', values.valueFormat === 'currency' ? 'formatValue' : null),
      playgroundBinding('tooltip', values.tooltip === 'custom' ? 'formatTooltip' : null),
      playgroundBinding('messages', values.messages === 'custom' ? 'messages' : null),
      playgroundBinding('axes', chartAxesAreDefault(values) ? null : 'axes'),
    ]);
    const lines: string[] = [];

    if (values.empty === false) {
      lines.push(
        `protected readonly categories = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];`,
      );
    }
    if (!chartAxesAreDefault(values)) {
      lines.push(`protected readonly axes: KuiChartAxesOptions = ${chartAxesSnippet(values)};`);
    }
    if (values.valueFormat === 'currency') {
      lines.push(
        'protected readonly formatValue = (value: number): string => `$${value.toLocaleString("en-US")}`;',
      );
    }

    if (values.tooltip === 'custom') {
      lines.push(
        'protected readonly formatTooltip = (point: KuiChartPoint): string => `${point.seriesName}: ${point.value}`;',
      );
    }

    const tabs: CodeTab[] = [
      {
        label: 'HTML',
        language: 'html',
        code: `<kui-bar-chart${attrString} />`,
      },
    ];

    if (lines.length > 0) {
      tabs.push({ label: 'TS', language: 'ts', code: lines.join('\n') });
    }

    return tabs;
  };

  protected dataOf(values: BarChartPlaygroundValues): readonly KuiChartCartesianSeries[] {
    return values.empty ? [] : chartSampleSeries(values.seriesCount, values.gaps);
  }

  protected sizeOf(values: BarChartPlaygroundValues): 'sm' | 'md' | 'lg' {
    return values.size;
  }

  protected loadingOf(values: BarChartPlaygroundValues): boolean {
    return values.loading;
  }

  protected legendOf(values: BarChartPlaygroundValues): boolean | undefined {
    return chartLegendInput(values.legend);
  }

  protected valueFormatOf(
    values: BarChartPlaygroundValues,
  ): ReturnType<typeof chartValueFormatInput> {
    return chartValueFormatInput(values.valueFormat);
  }

  protected tooltipOf(values: BarChartPlaygroundValues): ReturnType<typeof chartTooltipInput> {
    return chartTooltipInput(values.tooltip);
  }

  protected ariaLabelOf(values: BarChartPlaygroundValues): string | undefined {
    return values.ariaLabel || undefined;
  }

  protected messagesOf(values: BarChartPlaygroundValues): ReturnType<typeof chartMessagesInput> {
    return chartMessagesInput(values.messages);
  }

  protected axesOf(values: BarChartPlaygroundValues): KuiChartAxesOptions {
    return chartAxesInput(values);
  }

  protected orientationOf(values: BarChartPlaygroundValues): 'vertical' | 'horizontal' {
    return values.orientation;
  }

  protected stackedOf(values: BarChartPlaygroundValues): boolean {
    return values.stacked;
  }

  protected patternsOf(values: BarChartPlaygroundValues): boolean {
    return values.patterns;
  }
}
