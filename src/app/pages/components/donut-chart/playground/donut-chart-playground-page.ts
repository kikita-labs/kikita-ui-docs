import { Component } from '@angular/core';

import { type KuiChartSlice, KuiDonutChart } from '@kikita-labs/ui';

import {
  ApiPlayground,
  definePlaygroundControls,
  playgroundBinding,
  type PlaygroundValues,
  serializePlaygroundAttributes,
} from '@shared/docs-ui/api-playground';
import { ApiTable } from '@shared/docs-ui/api-table';
import {
  CHART_PLAYGROUND_COMMON_CONTROLS,
  chartLegendInput,
  chartMessagesInput,
  chartSampleSlices,
  chartTooltipInput,
  chartValueFormatInput,
} from '@shared/docs-ui/chart-sections/playground';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

import { DONUT_CHART_API_ROWS } from '../donut-chart.api-schema';
import { DONUT_CHART_API_DESCRIPTION } from '../donut-chart.docs-content';

const DONUT_CHART_PLAYGROUND_CONTROLS = definePlaygroundControls([
  { key: 'sliceCount', label: 'slices', kind: 'number', defaultValue: 3 },
  { key: 'patterns', label: 'patterns', kind: 'boolean', defaultValue: false },
  ...CHART_PLAYGROUND_COMMON_CONTROLS,
] as const);

type DonutChartPlaygroundValues = PlaygroundValues<typeof DONUT_CHART_PLAYGROUND_CONTROLS>;

@Component({
  selector: 'app-donut-chart-playground-page',
  imports: [ApiPlayground, ApiTable, KuiDonutChart],
  templateUrl: './donut-chart-playground-page.html',
  styleUrl: './donut-chart-playground-page.scss',
})
export class DonutChartPlaygroundPage {
  protected readonly apiDescription = DONUT_CHART_API_DESCRIPTION;
  protected readonly apiRows = DONUT_CHART_API_ROWS;
  protected readonly playgroundControls = DONUT_CHART_PLAYGROUND_CONTROLS;

  protected readonly buildPlaygroundSnippet = (
    values: DonutChartPlaygroundValues,
  ): readonly CodeTab[] => {
    const attrString = serializePlaygroundAttributes([
      { name: 'ariaLabel', value: values.ariaLabel || null },
      playgroundBinding('slices', 'slices'),
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
    ]);
    const lines: string[] = [];

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
        code: `<kui-donut-chart${attrString} />`,
      },
    ];

    if (lines.length > 0) {
      tabs.push({ label: 'TS', language: 'ts', code: lines.join('\n') });
    }

    return tabs;
  };

  protected dataOf(values: DonutChartPlaygroundValues): readonly KuiChartSlice[] {
    return values.empty ? [] : chartSampleSlices(values.sliceCount);
  }

  protected sizeOf(values: DonutChartPlaygroundValues): 'sm' | 'md' | 'lg' {
    return values.size;
  }

  protected loadingOf(values: DonutChartPlaygroundValues): boolean {
    return values.loading;
  }

  protected legendOf(values: DonutChartPlaygroundValues): boolean | undefined {
    return chartLegendInput(values.legend);
  }

  protected valueFormatOf(
    values: DonutChartPlaygroundValues,
  ): ReturnType<typeof chartValueFormatInput> {
    return chartValueFormatInput(values.valueFormat);
  }

  protected tooltipOf(values: DonutChartPlaygroundValues): ReturnType<typeof chartTooltipInput> {
    return chartTooltipInput(values.tooltip);
  }

  protected ariaLabelOf(values: DonutChartPlaygroundValues): string | undefined {
    return values.ariaLabel || undefined;
  }

  protected messagesOf(values: DonutChartPlaygroundValues): ReturnType<typeof chartMessagesInput> {
    return chartMessagesInput(values.messages);
  }

  protected patternsOf(values: DonutChartPlaygroundValues): boolean {
    return values.patterns;
  }
}
