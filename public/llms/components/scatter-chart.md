# Scatter Chart

> Scatter and bubble chart for two numeric measures.

- Status: available
- Route: /components/scatter-chart
- Package: @kikita-labs/ui@2.0.0
- Import: KuiScatterChart from @kikita-labs/ui
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

Rendered at /components/scatter-chart:

### basic-scatter-chart-example

#### basic-scatter-chart-example.html

```html
<div class="chart-example">
  <kui-scatter-chart ariaLabel="Age vs. income" [series]="series" [axes]="axes" />
</div>
```

#### basic-scatter-chart-example.ts

```ts
import { Component } from '@angular/core';

import {
  type KuiChartAxesOptions,
  type KuiChartScatterSeries,
  KuiScatterChart,
} from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-scatter-chart-example',
  imports: [KuiScatterChart],
  templateUrl: './basic-scatter-chart-example.html',
  styleUrl: './basic-scatter-chart-example.scss',
})
export class BasicScatterChartExample {
  protected readonly series: readonly KuiChartScatterSeries[] = [
    {
      id: 'free',
      name: 'Free plan',
      points: [
        { x: 22, y: 32000 },
        { x: 29, y: 41000 },
        { x: 35, y: 52000 },
        { x: 41, y: 61000 },
      ],
    },
    {
      id: 'pro',
      name: 'Pro plan',
      points: [
        { x: 26, y: 48000 },
        { x: 33, y: 67000 },
        { x: 44, y: 82000 },
        { x: 52, y: 95000 },
      ],
    },
  ];
  protected readonly axes: KuiChartAxesOptions = { xTitle: 'Age', yTitle: 'Income (USD)' };
}
```

#### basic-scatter-chart-example.scss

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

### scatter-bubble-chart-example

#### scatter-bubble-chart-example.html

```html
<div class="chart-example">
  <kui-scatter-chart
    ariaLabel="Accounts by age, income and seats"
    [series]="series"
    [bubble]="true"
  />
</div>
```

#### scatter-bubble-chart-example.ts

```ts
import { Component } from '@angular/core';

import { type KuiChartScatterSeries,KuiScatterChart } from '@kikita-labs/ui';

@Component({
  selector: 'app-scatter-bubble-chart-example',
  imports: [KuiScatterChart],
  templateUrl: './scatter-bubble-chart-example.html',
  styleUrl: './scatter-bubble-chart-example.scss',
})
export class ScatterBubbleChartExample {
  protected readonly series: readonly KuiChartScatterSeries[] = [
    {
      id: 'accounts',
      name: 'Accounts',
      points: [
        { x: 22, y: 32000, r: 6 },
        { x: 29, y: 41000, r: 9 },
        { x: 35, y: 52000, r: 7 },
        { x: 41, y: 61000, r: 14 },
      ],
    },
  ];
}
```

#### scatter-bubble-chart-example.scss

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

### scatter-states-chart-example

#### scatter-states-chart-example.html

```html
<div class="chart-example chart-example--stack">
  <kui-scatter-chart ariaLabel="Loading accounts" [series]="series" [loading]="true" size="sm" />
  <kui-scatter-chart ariaLabel="Empty accounts" [series]="[]" size="sm" />
</div>
```

#### scatter-states-chart-example.ts

```ts
import { Component } from '@angular/core';

import { type KuiChartScatterSeries,KuiScatterChart } from '@kikita-labs/ui';

@Component({
  selector: 'app-scatter-states-chart-example',
  imports: [KuiScatterChart],
  templateUrl: './scatter-states-chart-example.html',
  styleUrl: './scatter-states-chart-example.scss',
})
export class ScatterStatesChartExample {
  protected readonly series: readonly KuiChartScatterSeries[] = [
    {
      id: 'accounts',
      name: 'Accounts',
      points: [
        { x: 22, y: 32000 },
        { x: 41, y: 61000 },
      ],
    },
  ];
}
```

#### scatter-states-chart-example.scss

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
| series | readonly KuiChartScatterSeries[] | - | Required. { id?, name, color?, points: { x, y, r? }[] }. A point with a non-finite x, y or r is dropped. Without a point the empty composition renders. |
| bubble | boolean | false | Reads r from each point as the radius in CSS pixels. It is not clamped; the consumer owns a radius that fits the plot. |

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

Available at /components/scatter-chart/playground.
