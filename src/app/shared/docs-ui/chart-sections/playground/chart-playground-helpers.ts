import {
  type KuiChartAxesOptions,
  type KuiChartGridLines,
  type KuiChartMessages,
  type KuiChartPoint,
  type KuiChartTooltipFormatter,
  type KuiChartValueFormat,
} from '@kikita-labs/ui';

/** The `messages` override the chart playgrounds apply when their `messages` control is `custom`. */
export const CHART_PLAYGROUND_MESSAGES: Partial<KuiChartMessages> = {
  noData: 'Nothing to show yet',
  viewTable: 'Data table',
  viewChart: 'Graph',
};

/** Number format of the playground `valueFormat` control `currency`. */
export const chartCurrencyFormat: KuiChartValueFormat = (value) =>
  `$${value.toLocaleString('en-US')}`;

/** Tooltip text of the playground `tooltip` control `custom`. */
export const chartCustomTooltip: KuiChartTooltipFormatter = (point: KuiChartPoint) =>
  `${point.seriesName}: ${point.value.toLocaleString('en-US')}`;

/** The `legend` input a playground `legend` control value stands for. */
export function chartLegendInput(choice: 'auto' | 'show' | 'hide'): boolean | undefined {
  return choice === 'auto' ? undefined : choice === 'show';
}

/** The `valueFormat` input for a playground control value (`undefined` keeps the default). */
export function chartValueFormatInput(
  choice: 'compact' | 'currency',
): KuiChartValueFormat | undefined {
  return choice === 'currency' ? chartCurrencyFormat : undefined;
}

/** The `tooltip` input for a playground control value (`undefined` keeps the default). */
export function chartTooltipInput(
  choice: 'default' | 'custom',
): KuiChartTooltipFormatter | undefined {
  return choice === 'custom' ? chartCustomTooltip : undefined;
}

/** The `messages` input for a playground control value. */
export function chartMessagesInput(
  choice: 'default' | 'custom',
): Partial<KuiChartMessages> | undefined {
  return choice === 'custom' ? CHART_PLAYGROUND_MESSAGES : undefined;
}

/** The values of the shared axis controls. */
export interface ChartPlaygroundAxesValues {
  readonly xTitle: string;
  readonly yTitle: string;
  readonly gridLines: KuiChartGridLines;
  readonly showX: boolean;
  readonly showY: boolean;
}

/** The `axes` input of a cartesian chart for the shared axis controls. */
export function chartAxesInput(values: ChartPlaygroundAxesValues): KuiChartAxesOptions {
  return {
    x: values.showX,
    y: values.showY,
    gridLines: values.gridLines,
    ...(values.xTitle ? { xTitle: values.xTitle } : {}),
    ...(values.yTitle ? { yTitle: values.yTitle } : {}),
  };
}

/** True while the shared axis controls still equal the chart defaults. */
export function chartAxesAreDefault(values: ChartPlaygroundAxesValues): boolean {
  return (
    values.showX && values.showY && values.gridLines === 'both' && !values.xTitle && !values.yTitle
  );
}

/** The `axes` object literal shown in a playground snippet. */
export function chartAxesSnippet(values: ChartPlaygroundAxesValues): string {
  const parts = [
    values.showX ? null : 'x: false',
    values.showY ? null : 'y: false',
    values.gridLines === 'both' ? null : `gridLines: '${values.gridLines}'`,
    values.xTitle ? `xTitle: '${values.xTitle.replaceAll("'", "\\'")}'` : null,
    values.yTitle ? `yTitle: '${values.yTitle.replaceAll("'", "\\'")}'` : null,
  ].filter((part): part is string => part !== null);

  return `{ ${parts.join(', ')} }`;
}
