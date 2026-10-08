import { Component } from '@angular/core';

import {
  type KuiChartAxesOptions,
  type KuiChartCartesianSeries,
  KuiLineChart,
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

import { LINE_CHART_API_ROWS } from '../line-chart.api-schema';
import { LINE_CHART_API_DESCRIPTION } from '../line-chart.docs-content';

const LINE_CHART_PLAYGROUND_CONTROLS = definePlaygroundControls([
  { key: 'seriesCount', label: 'series', kind: 'number', defaultValue: 2 },
  { key: 'area', label: 'area', kind: 'boolean', defaultValue: false },
  { key: 'patterns', label: 'patterns (with area)', kind: 'boolean', defaultValue: false },
  { key: 'gaps', label: 'gap in data', kind: 'boolean', defaultValue: false },
  ...CHART_PLAYGROUND_COMMON_CONTROLS,
  ...CHART_PLAYGROUND_AXES_CONTROLS,
] as const);

type LineChartPlaygroundValues = PlaygroundValues<typeof LINE_CHART_PLAYGROUND_CONTROLS>;

@Component({
  selector: 'app-line-chart-playground-page',
  imports: [ApiPlayground, ApiTable, KuiLineChart],
  templateUrl: './line-chart-playground-page.html',
  styleUrl: './line-chart-playground-page.scss',
})
export class LineChartPlaygroundPage {
  protected readonly apiDescription = LINE_CHART_API_DESCRIPTION;
  protected readonly apiRows = LINE_CHART_API_ROWS;
  protected readonly categories = CHART_SAMPLE_CATEGORIES;
  protected readonly playgroundControls = LINE_CHART_PLAYGROUND_CONTROLS;

  protected readonly buildPlaygroundSnippet = (
    values: LineChartPlaygroundValues,
  ): readonly CodeTab[] => {
    const attrString = serializePlaygroundAttributes([
      { name: 'ariaLabel', value: values.ariaLabel || null },
      playgroundBinding('series', 'series'),
      playgroundBinding('categories', 'categories'),
      { name: 'area', value: values.area },
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
        code: `<kui-line-chart${attrString} />`,
      },
    ];

    if (lines.length > 0) {
      tabs.push({ label: 'TS', language: 'ts', code: lines.join('\n') });
    }

    return tabs;
  };

  protected dataOf(values: LineChartPlaygroundValues): readonly KuiChartCartesianSeries[] {
    return values.empty ? [] : chartSampleSeries(values.seriesCount, values.gaps);
  }

  protected sizeOf(values: LineChartPlaygroundValues): 'sm' | 'md' | 'lg' {
    return values.size;
  }

  protected loadingOf(values: LineChartPlaygroundValues): boolean {
    return values.loading;
  }

  protected legendOf(values: LineChartPlaygroundValues): boolean | undefined {
    return chartLegendInput(values.legend);
  }

  protected valueFormatOf(
    values: LineChartPlaygroundValues,
  ): ReturnType<typeof chartValueFormatInput> {
    return chartValueFormatInput(values.valueFormat);
  }

  protected tooltipOf(values: LineChartPlaygroundValues): ReturnType<typeof chartTooltipInput> {
    return chartTooltipInput(values.tooltip);
  }

  protected ariaLabelOf(values: LineChartPlaygroundValues): string | undefined {
    return values.ariaLabel || undefined;
  }

  protected messagesOf(values: LineChartPlaygroundValues): ReturnType<typeof chartMessagesInput> {
    return chartMessagesInput(values.messages);
  }

  protected axesOf(values: LineChartPlaygroundValues): KuiChartAxesOptions {
    return chartAxesInput(values);
  }

  protected areaOf(values: LineChartPlaygroundValues): boolean {
    return values.area;
  }

  protected patternsOf(values: LineChartPlaygroundValues): boolean {
    return values.patterns;
  }
}
