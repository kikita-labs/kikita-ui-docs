# Line Chart

> Line and area chart for trends over categories.

- Status: available
- Route: /components/line-chart
- Package: @kikita-labs/ui@2.0.0
- Import: KuiLineChart from @kikita-labs/ui
- Source docs: https://github.com/kikita-labs/kikita-ui/blob/v2.0.0/docs/chart.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

```html
<kui-line-chart ariaLabel="Sessions per day" [series]="series" [categories]="categories" />
```

```ts
protected readonly series: readonly KuiChartCartesianSeries[] = [
  { id: 'sessions', name: 'Sessions', data: [120, 180, 150, 220, 260, 210, 300] },
];
protected readonly categories = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
```

`ariaLabel` has a chart-type fallback name and should describe what the chart shows. It is distinct
from each point's own `aria-label` (its value).

## Examples

Rendered at /components/line-chart:

### basic-line-chart-example

#### basic-line-chart-example.html

```html
<div class="chart-example">
  <kui-line-chart ariaLabel="Sessions per day" [series]="series" [categories]="categories" />
</div>
```

#### basic-line-chart-example.ts

```ts
import { Component } from '@angular/core';

import { type KuiChartCartesianSeries,KuiLineChart } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-line-chart-example',
  imports: [KuiLineChart],
  templateUrl: './basic-line-chart-example.html',
  styleUrl: './basic-line-chart-example.scss',
})
export class BasicLineChartExample {
  protected readonly series: readonly KuiChartCartesianSeries[] = [
    { id: 'sessions', name: 'Sessions', data: [120, 180, 150, 220, 260, 210, 300] },
  ];
  protected readonly categories = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
}
```

#### basic-line-chart-example.scss

```scss
.chart-example {
  inline-size: 100%;
  min-inline-size: 0;
}

.chart-example--stack {
  display: grid;
  gap: var(--kui-space-6, 24px);
}
```

### line-area-chart-example

#### line-area-chart-example.html

```html
<div class="chart-example">
  <kui-line-chart
    ariaLabel="Traffic by source"
    [series]="series"
    [categories]="categories"
    [area]="true"
    [patterns]="true"
    [axes]="axes"
  />
</div>
```

#### line-area-chart-example.ts

```ts
import { Component } from '@angular/core';

import {
  type KuiChartAxesOptions,
  type KuiChartCartesianSeries,
  KuiLineChart,
} from '@kikita-labs/ui';

@Component({
  selector: 'app-line-area-chart-example',
  imports: [KuiLineChart],
  templateUrl: './line-area-chart-example.html',
  styleUrl: './line-area-chart-example.scss',
})
export class LineAreaChartExample {
  protected readonly series: readonly KuiChartCartesianSeries[] = [
    { id: 'sessions', name: 'Sessions', data: [120, 180, 150, 220, 260, 210, 300] },
    { id: 'signups', name: 'Sign-ups', data: [40, 65, 52, 90, 110, 80, 140] },
  ];
  protected readonly categories = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  protected readonly axes: KuiChartAxesOptions = { xTitle: 'Day', yTitle: 'Count' };
}
```

#### line-area-chart-example.scss

```scss
.chart-example {
  inline-size: 100%;
  min-inline-size: 0;
}

.chart-example--stack {
  display: grid;
  gap: var(--kui-space-6, 24px);
}
```

### line-gaps-chart-example

#### line-gaps-chart-example.html

```html
<div class="chart-example">
  <kui-line-chart
    ariaLabel="Sessions with a missing day"
    [series]="series"
    [categories]="categories"
    [tooltip]="formatTooltip"
    [valueFormat]="formatValue"
    size="sm"
  />
</div>
```

#### line-gaps-chart-example.ts

```ts
import { Component } from '@angular/core';

import { type KuiChartCartesianSeries, type KuiChartPoint,KuiLineChart } from '@kikita-labs/ui';

@Component({
  selector: 'app-line-gaps-chart-example',
  imports: [KuiLineChart],
  templateUrl: './line-gaps-chart-example.html',
  styleUrl: './line-gaps-chart-example.scss',
})
export class LineGapsChartExample {
  protected readonly series: readonly KuiChartCartesianSeries[] = [
    { id: 'sessions', name: 'Sessions', data: [120, 180, null, 220, 260, 210, 300] },
  ];
  protected readonly categories = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  protected readonly formatValue = (value: number): string => value.toLocaleString('en-US');

  protected readonly formatTooltip = (point: KuiChartPoint): string =>
    `${point.categoryLabel}: ${point.value.toLocaleString('en-US')} sessions`;
}
```

#### line-gaps-chart-example.scss

```scss
.chart-example {
  inline-size: 100%;
  min-inline-size: 0;
}

.chart-example--stack {
  display: grid;
  gap: var(--kui-space-6, 24px);
}
```

### line-external-legend-example

#### line-external-legend-example.html

```html
<div class="chart-example">
  <kui-line-chart
    #chartRef
    ariaLabel="Sessions and sign-ups"
    [series]="series"
    [categories]="categories"
    [legend]="false"
  />
  <kui-chart-legend [chart]="chartRef" />
</div>
```

#### line-external-legend-example.ts

```ts
import { Component } from '@angular/core';

import { type KuiChartCartesianSeries,KuiChartLegend, KuiLineChart } from '@kikita-labs/ui';

@Component({
  selector: 'app-line-external-legend-example',
  imports: [KuiChartLegend, KuiLineChart],
  templateUrl: './line-external-legend-example.html',
  styleUrl: './line-external-legend-example.scss',
})
export class LineExternalLegendExample {
  protected readonly series: readonly KuiChartCartesianSeries[] = [
    { id: 'sessions', name: 'Sessions', data: [120, 180, 150, 220, 260, 210, 300] },
    { id: 'signups', name: 'Sign-ups', data: [40, 65, 52, 90, 110, 80, 140] },
  ];
  protected readonly categories = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
}
```

#### line-external-legend-example.scss

```scss
.chart-example {
  inline-size: 100%;
  min-inline-size: 0;
}

.chart-example--stack {
  display: grid;
  gap: var(--kui-space-6, 24px);
}
```

### line-states-chart-example

#### line-states-chart-example.html

```html
<div class="chart-example chart-example--stack">
  <kui-line-chart
    ariaLabel="Loading sessions"
    [series]="series"
    [categories]="categories"
    [loading]="true"
    size="sm"
  />
  <kui-line-chart ariaLabel="Empty sessions" [series]="[]" size="sm" />
</div>
```

#### line-states-chart-example.ts

```ts
import { Component } from '@angular/core';

import { type KuiChartCartesianSeries,KuiLineChart } from '@kikita-labs/ui';

@Component({
  selector: 'app-line-states-chart-example',
  imports: [KuiLineChart],
  templateUrl: './line-states-chart-example.html',
  styleUrl: './line-states-chart-example.scss',
})
export class LineStatesChartExample {
  protected readonly series: readonly KuiChartCartesianSeries[] = [
    { id: 'sessions', name: 'Sessions', data: [120, 180, 150, 220, 260, 210, 300] },
  ];
  protected readonly categories = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
}
```

#### line-states-chart-example.scss

```scss
.chart-example {
  inline-size: 100%;
  min-inline-size: 0;
}

.chart-example--stack {
  display: grid;
  gap: var(--kui-space-6, 24px);
}
```

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| series | readonly KuiChartCartesianSeries[] | - | Required. { id?, name, color?, data }, with data aligned index for index with categories. null, NaN and Infinity are gaps. Without a non-gap value the empty composition renders. |
| categories | readonly string[] | [] | Category labels aligned with each series data. The shorter side wins. |
| area | boolean | false | Fills the area under each line. It is not a separate chart type. |
| patterns | boolean | false | With area, fills each area with one of eight hatch patterns (colour independence). |

## Accessibility

- The `<svg>` is the graphic: `role="graphics-document"` with the name and the role description
  (`aria-roledescription`). The wrapper has no role, and axis text, gridlines and decorative shapes
  are `aria-hidden`.
- Each point/bar/slice is `role="graphics-symbol img"` with its own `aria-label` (the same text as
  the tooltip) -- an indivisible graphical unit, per the WAI-ARIA Graphics Module.
- Roving tabindex across points/bars/slices (see Keyboard). The inline legend is a named group of
  native `<button aria-pressed>` items at least 24px high.
- The tooltip shown on hover is the same one shown on keyboard focus (one shared overlay, retargeted
  between marks). It is dismissible and persistent. On pointer hover it appears at the pointer and follows
  it; keyboard focus anchors it to the focused mark. On touch, a tap pins the tooltip open until an
  outside tap, `Escape`, or a tap on a different mark; it also always renders below 768px, since it is
  the primary way to read a chart's exact value.
- Pointer hit targets: a line chart shows the tooltip while the pointer is on the point (its marker plus a
  3px margin), a scatter chart on the point's hit circle (at least 12px in radius), a bar chart on the bar
  itself and a donut on the slice.
- Text is at least 12px on screen: axis text defaults to 13px and keeps its pixel size at any width.
- `prefers-reduced-motion: reduce` disables the hover/dim transition and the donut sweep.
- The alt-table is a real accessible alternative to the graphic, not a decorative duplicate.

Automated checks (keyboard, accessibility tree, axe, forced-colours media emulation, reduced motion)
are in `chart-contract.spec.ts` and `accessibility.spec.ts`. A session with a real screen reader has
not been run and stays pending.

## Playground

Available at /components/line-chart/playground.
