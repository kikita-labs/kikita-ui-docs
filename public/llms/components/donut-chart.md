# Donut Chart

> Donut chart for shares of a whole.

- Status: available
- Route: /components/donut-chart
- Package: @kikita-labs/ui@2.0.0
- Import: KuiDonutChart from @kikita-labs/ui
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

Rendered at /components/donut-chart:

### basic-donut-chart-example

#### basic-donut-chart-example.html

```html
<div class="chart-example">
  <kui-donut-chart ariaLabel="Plan mix" [slices]="slices" />
</div>
```

#### basic-donut-chart-example.ts

```ts
import { Component } from '@angular/core';

import { type KuiChartSlice, KuiDonutChart } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-donut-chart-example',
  imports: [KuiDonutChart],
  templateUrl: './basic-donut-chart-example.html',
  styleUrl: './basic-donut-chart-example.scss',
})
export class BasicDonutChartExample {
  protected readonly slices: readonly KuiChartSlice[] = [
    { id: 'free', label: 'Free', value: 40 },
    { id: 'pro', label: 'Pro', value: 35 },
    { id: 'business', label: 'Business', value: 25 },
  ];
}
```

#### basic-donut-chart-example.scss

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

### donut-patterns-chart-example

#### donut-patterns-chart-example.html

```html
<div class="chart-example">
  <kui-donut-chart ariaLabel="Plan mix with patterns" [slices]="slices" [patterns]="true" />
</div>
```

#### donut-patterns-chart-example.ts

```ts
import { Component } from '@angular/core';

import { type KuiChartSlice, KuiDonutChart } from '@kikita-labs/ui';

@Component({
  selector: 'app-donut-patterns-chart-example',
  imports: [KuiDonutChart],
  templateUrl: './donut-patterns-chart-example.html',
  styleUrl: './donut-patterns-chart-example.scss',
})
export class DonutPatternsChartExample {
  protected readonly slices: readonly KuiChartSlice[] = [
    { id: 'free', label: 'Free', value: 40 },
    { id: 'pro', label: 'Pro', value: 35 },
    { id: 'business', label: 'Business', value: 25 },
  ];
}
```

#### donut-patterns-chart-example.scss

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

### donut-sizes-chart-example

#### donut-sizes-chart-example.html

```html
<div class="chart-example chart-example--stack">
  <kui-donut-chart ariaLabel="Small plan mix" [slices]="slices" size="sm" [legend]="false" />
  <kui-donut-chart ariaLabel="Large plan mix" [slices]="slices" size="lg" />
</div>
```

#### donut-sizes-chart-example.ts

```ts
import { Component } from '@angular/core';

import { type KuiChartSlice, KuiDonutChart } from '@kikita-labs/ui';

@Component({
  selector: 'app-donut-sizes-chart-example',
  imports: [KuiDonutChart],
  templateUrl: './donut-sizes-chart-example.html',
  styleUrl: './donut-sizes-chart-example.scss',
})
export class DonutSizesChartExample {
  protected readonly slices: readonly KuiChartSlice[] = [
    { id: 'free', label: 'Free', value: 40 },
    { id: 'pro', label: 'Pro', value: 35 },
    { id: 'business', label: 'Business', value: 25 },
  ];
}
```

#### donut-sizes-chart-example.scss

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

### donut-states-chart-example

#### donut-states-chart-example.html

```html
<div class="chart-example chart-example--stack">
  <kui-donut-chart ariaLabel="Loading plan mix" [slices]="slices" [loading]="true" size="sm" />
  <kui-donut-chart ariaLabel="Empty plan mix" [slices]="[]" size="sm" />
</div>
```

#### donut-states-chart-example.ts

```ts
import { Component } from '@angular/core';

import { type KuiChartSlice, KuiDonutChart } from '@kikita-labs/ui';

@Component({
  selector: 'app-donut-states-chart-example',
  imports: [KuiDonutChart],
  templateUrl: './donut-states-chart-example.html',
  styleUrl: './donut-states-chart-example.scss',
})
export class DonutStatesChartExample {
  protected readonly slices: readonly KuiChartSlice[] = [
    { id: 'free', label: 'Free', value: 40 },
    { id: 'pro', label: 'Pro', value: 35 },
  ];
}
```

#### donut-states-chart-example.scss

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
| slices | readonly KuiChartSlice[] | - | Required. { id?, label, value, color? }. Negative and non-finite values are dropped; a visible total of zero draws no arc. |
| patterns | boolean | false | Fills each slice with one of eight hatch patterns (colour independence). |

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

Available at /components/donut-chart/playground.
