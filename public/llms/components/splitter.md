# Splitter

> Draggable multi-pane layout with resizable gutters.

- Status: available
- Route: /components/splitter
- Package: @kikita-labs/ui@2.0.0
- Import: KuiSplitter from @kikita-labs/ui
- Source docs: https://github.com/kikita-labs/kikita-ui/blob/v2.0.0/docs/splitter.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

```html
<kui-splitter orientation="horizontal" (sizesChange)="onResize($event)">
  <kui-splitter-pane size="30" [minSize]="15" [collapsible]="true">
    <app-file-tree />
  </kui-splitter-pane>
  <kui-splitter-pane size="70" [minSize]="30">
    <app-editor />
  </kui-splitter-pane>
</kui-splitter>
```

```ts
protected onResize(sizes: readonly number[]): void {
  // sizes[i] is the percentage width/height of pane i
}
```

`size` on `kui-splitter-pane` is only the initial/requested share -- `kui-splitter` owns the live
size from then on (drag and keyboard both write back into it). Panes without an explicit `size`
split the remaining space evenly among themselves, the same way flex items without an explicit
basis share leftover space.

## Examples

Rendered at /components/splitter:

### basic-splitter-example

#### basic-splitter-example.html

```html
<div class="splitter-example">
  <kui-splitter (sizesChange)="onResize($event)">
    <kui-splitter-pane [size]="30" [minSize]="15" [collapsible]="true">
      <div class="splitter-example__pane">Files</div>
    </kui-splitter-pane>
    <kui-splitter-pane [size]="70" [minSize]="30">
      <div class="splitter-example__pane">Editor</div>
    </kui-splitter-pane>
  </kui-splitter>
</div>
<p>Sizes: {{ sizes().join(' / ') }}</p>
```

#### basic-splitter-example.ts

```ts
import { Component, signal } from '@angular/core';

import { KuiSplitter, KuiSplitterPane } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-splitter-example',
  imports: [KuiSplitter, KuiSplitterPane],
  templateUrl: './basic-splitter-example.html',
  styleUrl: './basic-splitter-example.scss',
})
export class BasicSplitterExample {
  protected readonly sizes = signal<readonly number[]>([30, 70]);

  protected onResize(sizes: readonly number[]): void {
    this.sizes.set(sizes);
  }
}
```

#### basic-splitter-example.scss

```scss
.splitter-example {
  block-size: 220px;
  inline-size: 100%;
}

.splitter-example__pane {
  display: grid;
  place-items: center;
  block-size: 100%;
  padding: var(--kui-space-3, 12px);
  color: var(--kui-color-text);
}
```

### splitter-nested-example

#### splitter-nested-example.html

```html
<div class="splitter-example">
  <kui-splitter orientation="vertical">
    <kui-splitter-pane>
      <kui-splitter orientation="horizontal">
        <kui-splitter-pane [size]="25">
          <div class="splitter-example__pane">Tree</div>
        </kui-splitter-pane>
        <kui-splitter-pane [size]="75">
          <div class="splitter-example__pane">Editor</div>
        </kui-splitter-pane>
      </kui-splitter>
    </kui-splitter-pane>
    <kui-splitter-pane [size]="30" [minSize]="10" [collapsible]="true">
      <div class="splitter-example__pane">Terminal</div>
    </kui-splitter-pane>
  </kui-splitter>
</div>
```

#### splitter-nested-example.ts

```ts
import { Component } from '@angular/core';

import { KuiSplitter, KuiSplitterPane } from '@kikita-labs/ui';

@Component({
  selector: 'app-splitter-nested-example',
  imports: [KuiSplitter, KuiSplitterPane],
  templateUrl: './splitter-nested-example.html',
  styleUrl: './splitter-nested-example.scss',
})
export class SplitterNestedExample {}
```

#### splitter-nested-example.scss

```scss
.splitter-example {
  block-size: 300px;
  inline-size: 100%;
}

.splitter-example__pane {
  display: grid;
  place-items: center;
  block-size: 100%;
  padding: var(--kui-space-3, 12px);
  color: var(--kui-color-text);
}
```

### splitter-multiple-example

#### splitter-multiple-example.html

```html
<div class="splitter-example">
  <kui-splitter>
    <kui-splitter-pane [size]="20">
      <div class="splitter-example__pane">One</div>
    </kui-splitter-pane>
    <kui-splitter-pane>
      <div class="splitter-example__pane">Two</div>
    </kui-splitter-pane>
    <kui-splitter-pane>
      <div class="splitter-example__pane">Three</div>
    </kui-splitter-pane>
  </kui-splitter>
</div>
<div class="splitter-example">
  <kui-splitter [disabled]="true">
    <kui-splitter-pane>
      <div class="splitter-example__pane">Locked one</div>
    </kui-splitter-pane>
    <kui-splitter-pane>
      <div class="splitter-example__pane">Locked two</div>
    </kui-splitter-pane>
  </kui-splitter>
</div>
```

#### splitter-multiple-example.ts

```ts
import { Component } from '@angular/core';

import { KuiSplitter, KuiSplitterPane } from '@kikita-labs/ui';

@Component({
  selector: 'app-splitter-multiple-example',
  imports: [KuiSplitter, KuiSplitterPane],
  templateUrl: './splitter-multiple-example.html',
  styleUrl: './splitter-multiple-example.scss',
})
export class SplitterMultipleExample {}
```

#### splitter-multiple-example.scss

```scss
.splitter-example {
  block-size: 220px;
  inline-size: 100%;
}

.splitter-example__pane {
  display: grid;
  place-items: center;
  block-size: 100%;
  padding: var(--kui-space-3, 12px);
  color: var(--kui-color-text);
}
```

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| kui-splitter orientation | 'horizontal' \| 'vertical' \| undefined | undefined | Pane layout direction (defaults.splitter.orientation, then horizontal). Horizontal puts the panes side by side with a vertical gutter line. |
| kui-splitter disabled | boolean | false | Disables every gutter: aria-disabled, tabindex -1, and no drag or keyboard resize. Pane content stays interactive. |
| (sizesChange) | readonly number[] | - | Emitted with the full sizes array, in percent, on every drag or keyboard resize. |
| kui-splitter-pane size | number \| undefined | undefined | Initial or requested share in percent. The splitter owns the live size afterwards. Panes without a size split the remaining space evenly. |
| kui-splitter-pane minSize | number \| undefined | undefined | Minimum share in percent, clamped to 0-100 (defaults.splitter.minSize, then 10). Drag and keyboard resizing clamp to it; invalid static values use 10. |
| kui-splitter-pane collapsible | boolean | false | Adds a one-touch collapse button to the adjacent gutter. Only meaningful on the first or last pane; the flag of a middle pane is ignored. |
| currentSize | Signal<number> | - | Live share of a pane in percent, reflecting drag and keyboard changes. |
| collapsed | Signal<boolean> | - | True while the pane is collapsed to its minSize. |
| toggleCollapse() | () => void | - | Toggles the collapse state. A no-op when collapsible is false or the pane is in the middle. |
| --kui-splitter-pane-bg / -pane-border / -radius | CSS custom properties | - | Container background, border and corner radius. |
| --kui-splitter-gutter-size | CSS custom property | --kui-space-2 | Width or height of the interactive gutter strip. |
| --kui-splitter-gutter-line / -line-hover / -line-active / -line-disabled | CSS custom properties | - | Gutter line colour by state. |
| --kui-splitter-thumb-bg / -thumb-bg-hover / -thumb-bg-active | CSS custom properties | - | Default grip colour by state. |
| --kui-splitter-collapse-btn-bg / -collapse-btn-fg / -focus-ring | CSS custom properties | - | One-touch collapse button colours and the focus-visible ring of a gutter. |
| KuiSplitterOptions | interface | - | Shape of defaults.splitter: orientation and minSize. |

## Accessibility

- Each gutter renders an inner `role="separator"` element, focusable (`tabIndex="0"` unless
  `disabled`), following the W3C ARIA APG Window Splitter Pattern. The `kui-splitter-gutter` host
  carries no role; it only positions the separator and the optional collapse button.
- `aria-orientation` describes the gutter's own line, not the panes' layout: panes laid out
  horizontally have a _vertical_ line, so `aria-orientation="vertical"`, and vice versa.
- `aria-valuenow`/`aria-valuemin`/`aria-valuemax` track the size of the pane _before_ the gutter in
  DOM order, recalculated on every resize from the same value that drives the visual `flex-basis` --
  they can never drift out of sync with what's on screen.
- `aria-controls` points at the id of that same before-pane. Each `kui-splitter-pane` renders a
  generated `id` on its element for this, replacing any `id` set on the pane in a template.
- The one-touch collapse button has its own `aria-label` ("Collapse pane" / "Expand pane"), not
  relying on the chevron icon alone. It is a sibling of the separator, not a child, because a
  focusable separator must not contain an interactive control. It stays out of the tab order; the
  keyboard equivalent is `Enter` on the separator.
- `disabled` sets `aria-disabled="true"` and `tabIndex="-1"`, removing the gutter from the tab
  order, not just dimming it.

| Key                                      | Action                                                                                                    |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `Tab` / `Shift+Tab`                      | Focus each gutter in turn.                                                                                |
| `←`/`→` (horizontal), `↑`/`↓` (vertical) | Resize the before-pane by 2%. `Shift` for a 10% step.                                                     |
| `Home` / `End`                           | Collapse the before-pane to its `minSize` / expand it to the max (bounded by the after-pane's `minSize`). |
| `Enter`                                  | Toggle collapse on the adjacent pane -- only when it is `collapsible`.                                    |
| `Escape`                                 | Cancel an active drag, reverting to the sizes from before it started.                                     |

## Playground

Available at /components/splitter/playground.
