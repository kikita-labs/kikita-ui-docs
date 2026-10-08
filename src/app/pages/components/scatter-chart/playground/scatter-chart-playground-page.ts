import { Component } from '@angular/core';

import {
  type KuiChartAxesOptions,
  type KuiChartScatterSeries,
  KuiScatterChart,
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
  chartAxesAreDefault,
  chartAxesInput,
  chartAxesSnippet,
  chartLegendInput,
  chartMessagesInput,
  chartSampleScatter,
  chartTooltipInput,
  chartValueFormatInput,
} from '@shared/docs-ui/chart-sections/playground';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

import { SCATTER_CHART_API_ROWS } from '../scatter-chart.api-schema';
import { SCATTER_CHART_API_DESCRIPTION } from '../scatter-chart.docs-content';

const SCATTER_CHART_PLAYGROUND_CONTROLS = definePlaygroundControls([
  { key: 'seriesCount', label: 'series', kind: 'number', defaultValue: 2 },
  { key: 'bubble', label: 'bubble', kind: 'boolean', defaultValue: false },
  ...CHART_PLAYGROUND_COMMON_CONTROLS,
  ...CHART_PLAYGROUND_AXES_CONTROLS,
] as const);

type ScatterChartPlaygroundValues = PlaygroundValues<typeof SCATTER_CHART_PLAYGROUND_CONTROLS>;

@Component({
  selector: 'app-scatter-chart-playground-page',
  imports: [ApiPlayground, ApiTable, KuiScatterChart],
  templateUrl: './scatter-chart-playground-page.html',
  styleUrl: './scatter-chart-playground-page.scss',
})
export class ScatterChartPlaygroundPage {
  protected readonly apiDescription = SCATTER_CHART_API_DESCRIPTION;
  protected readonly apiRows = SCATTER_CHART_API_ROWS;
  protected readonly playgroundControls = SCATTER_CHART_PLAYGROUND_CONTROLS;

  protected readonly buildPlaygroundSnippet = (
    values: ScatterChartPlaygroundValues,
  ): readonly CodeTab[] => {
    const attrString = serializePlaygroundAttributes([
      { name: 'ariaLabel', value: values.ariaLabel || null },
      playgroundBinding('series', 'series'),
      { name: 'bubble', value: values.bubble },
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
        code: `<kui-scatter-chart${attrString} />`,
      },
    ];

    if (lines.length > 0) {
      tabs.push({ label: 'TS', language: 'ts', code: lines.join('\n') });
    }

    return tabs;
  };

  protected dataOf(values: ScatterChartPlaygroundValues): readonly KuiChartScatterSeries[] {
    return values.empty ? [] : chartSampleScatter(values.seriesCount);
  }

  protected sizeOf(values: ScatterChartPlaygroundValues): 'sm' | 'md' | 'lg' {
    return values.size;
  }

  protected loadingOf(values: ScatterChartPlaygroundValues): boolean {
    return values.loading;
  }

  protected legendOf(values: ScatterChartPlaygroundValues): boolean | undefined {
    return chartLegendInput(values.legend);
  }

  protected valueFormatOf(
    values: ScatterChartPlaygroundValues,
  ): ReturnType<typeof chartValueFormatInput> {
    return chartValueFormatInput(values.valueFormat);
  }

  protected tooltipOf(values: ScatterChartPlaygroundValues): ReturnType<typeof chartTooltipInput> {
    return chartTooltipInput(values.tooltip);
  }

  protected ariaLabelOf(values: ScatterChartPlaygroundValues): string | undefined {
    return values.ariaLabel || undefined;
  }

  protected messagesOf(
    values: ScatterChartPlaygroundValues,
  ): ReturnType<typeof chartMessagesInput> {
    return chartMessagesInput(values.messages);
  }

  protected axesOf(values: ScatterChartPlaygroundValues): KuiChartAxesOptions {
    return chartAxesInput(values);
  }

  protected bubbleOf(values: ScatterChartPlaygroundValues): boolean {
    return values.bubble;
  }
}
