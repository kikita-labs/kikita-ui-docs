# Bar Chart

> Vertical or horizontal, grouped or stacked bar chart.

- Status: available
- Route: /components/bar-chart
- Package: @kikita-labs/ui@2.0.0
- Import: KuiBarChart from @kikita-labs/ui
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

Rendered at /components/bar-chart:

### basic-bar-chart-example

#### basic-bar-chart-example.html

```html
<div class="chart-example">
  <kui-bar-chart ariaLabel="MRR by plan" [series]="series" [categories]="categories" />
</div>
```

#### basic-bar-chart-example.ts

```ts
import { Component } from '@angular/core';

import { KuiBarChart, type KuiChartCartesianSeries } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-bar-chart-example',
  imports: [KuiBarChart],
  templateUrl: './basic-bar-chart-example.html',
  styleUrl: './basic-bar-chart-example.scss',
})
export class BasicBarChartExample {
  protected readonly series: readonly KuiChartCartesianSeries[] = [
    { id: 'mrr', name: 'MRR', data: [0, 4200, 9800, 15600] },
  ];
  protected readonly categories = ['Free', 'Pro', 'Business', 'Enterprise'];
}
```

#### basic-bar-chart-example.scss

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

### bar-stacked-chart-example

#### bar-stacked-chart-example.html

```html
<div class="chart-example chart-example--stack">
  <kui-bar-chart ariaLabel="Grouped by day" [series]="series" [categories]="categories" size="sm" />
  <kui-bar-chart
    ariaLabel="Stacked by day"
    [series]="series"
    [categories]="categories"
    [stacked]="true"
    size="sm"
  />
</div>
```

#### bar-stacked-chart-example.ts

```ts
import { Component } from '@angular/core';

import { KuiBarChart, type KuiChartCartesianSeries } from '@kikita-labs/ui';

@Component({
  selector: 'app-bar-stacked-chart-example',
  imports: [KuiBarChart],
  templateUrl: './bar-stacked-chart-example.html',
  styleUrl: './bar-stacked-chart-example.scss',
})
export class BarStackedChartExample {
  protected readonly series: readonly KuiChartCartesianSeries[] = [
    { id: 'sessions', name: 'Sessions', data: [120, 180, 150, 220, 260, 210, 300] },
    { id: 'signups', name: 'Sign-ups', data: [40, 65, 52, 90, 110, 80, 140] },
  ];
  protected readonly categories = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
}
```

#### bar-stacked-chart-example.scss

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

### bar-horizontal-chart-example

#### bar-horizontal-chart-example.html

```html
<div class="chart-example">
  <kui-bar-chart
    ariaLabel="MRR by plan"
    orientation="horizontal"
    [series]="series"
    [categories]="categories"
    [axes]="axes"
  />
</div>
```

#### bar-horizontal-chart-example.ts

```ts
import { Component } from '@angular/core';

import {
  KuiBarChart,
  type KuiChartAxesOptions,
  type KuiChartCartesianSeries,
} from '@kikita-labs/ui';

@Component({
  selector: 'app-bar-horizontal-chart-example',
  imports: [KuiBarChart],
  templateUrl: './bar-horizontal-chart-example.html',
  styleUrl: './bar-horizontal-chart-example.scss',
})
export class BarHorizontalChartExample {
  protected readonly series: readonly KuiChartCartesianSeries[] = [
    { id: 'mrr', name: 'MRR', data: [0, 4200, 9800, 15600] },
  ];
  protected readonly categories = ['Free', 'Pro', 'Business', 'Enterprise'];
  protected readonly axes: KuiChartAxesOptions = { xTitle: 'Plan', yTitle: 'MRR (USD)' };
}
```

#### bar-horizontal-chart-example.scss

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

### bar-patterns-chart-example

#### bar-patterns-chart-example.html

```html
<div class="chart-example">
  <kui-bar-chart
    ariaLabel="Sessions and sign-ups"
    [series]="series"
    [categories]="categories"
    [patterns]="true"
  />
</div>
```

#### bar-patterns-chart-example.ts

```ts
import { Component } from '@angular/core';

import { KuiBarChart, type KuiChartCartesianSeries } from '@kikita-labs/ui';

@Component({
  selector: 'app-bar-patterns-chart-example',
  imports: [KuiBarChart],
  templateUrl: './bar-patterns-chart-example.html',
  styleUrl: './bar-patterns-chart-example.scss',
})
export class BarPatternsChartExample {
  protected readonly series: readonly KuiChartCartesianSeries[] = [
    { id: 'sessions', name: 'Sessions', data: [120, 180, 150, 220, 260, 210, 300] },
    { id: 'signups', name: 'Sign-ups', data: [40, 65, 52, 90, 110, 80, 140] },
  ];
  protected readonly categories = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
}
```

#### bar-patterns-chart-example.scss

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

### bar-states-chart-example

#### bar-states-chart-example.html

```html
<div class="chart-example chart-example--stack">
  <kui-bar-chart
    ariaLabel="Loading MRR"
    [series]="series"
    [categories]="categories"
    [loading]="true"
    size="sm"
  />
  <kui-bar-chart ariaLabel="Empty MRR" [series]="[]" size="sm" />
</div>
```

#### bar-states-chart-example.ts

```ts
import { Component } from '@angular/core';

import { KuiBarChart, type KuiChartCartesianSeries } from '@kikita-labs/ui';

@Component({
  selector: 'app-bar-states-chart-example',
  imports: [KuiBarChart],
  templateUrl: './bar-states-chart-example.html',
  styleUrl: './bar-states-chart-example.scss',
})
export class BarStatesChartExample {
  protected readonly series: readonly KuiChartCartesianSeries[] = [
    { id: 'mrr', name: 'MRR', data: [0, 4200, 9800, 15600] },
  ];
  protected readonly categories = ['Free', 'Pro', 'Business', 'Enterprise'];
}
```

#### bar-states-chart-example.scss

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
| series | readonly KuiChartCartesianSeries[] | - | Required. { id?, name, color?, data }, with data aligned index for index with categories. Without a non-gap value the empty composition renders. |
| categories | readonly string[] | [] | Category labels aligned with each series data. The shorter side wins. |
| orientation | 'vertical' \| 'horizontal' | 'vertical' | Flips the on-screen bar direction only; axes.x and axes.y stay semantic. |
| stacked | boolean | false | Stacks the series within each category. Only meaningful with more than one series; positive and negative values stack separately. Hiding a series recomputes the domain. |
| patterns | boolean | false | Fills each series with one of eight hatch patterns (colour independence). |

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

Available at /components/bar-chart/playground.
