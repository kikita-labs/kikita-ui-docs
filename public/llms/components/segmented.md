# Segmented

> Compact single-choice control rendered as adjacent segment buttons.

- Status: available
- Route: /components/segmented
- Package: @kikita-labs/ui@1.1.0
- Import: KuiSegmentedComponent from @kikita-labs/ui
- Source docs: ../kikita-ui/docs/segmented.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

```html
<kui-segmented [(selected)]="view">
  <button kuiSegment value="list">List</button>
  <button kuiSegment value="grid">Grid</button>
  <button kuiSegment value="calendar">Calendar</button>
</kui-segmented>
```

### Sizes

```html
<kui-segmented size="sm" [(selected)]="view">...</kui-segmented>
```

## Examples

Rendered at /components/segmented:

### basic-segmented-example

#### basic-segmented-example.html

```html
<div class="basic-segmented-example">
  <kui-segmented [(selected)]="view" aria-label="Project view">
    <button kuiSegment value="list">List</button>
    <button kuiSegment value="board">Board</button>
    <button kuiSegment value="timeline">Timeline</button>
  </kui-segmented>

  <p>Selected view: {{ view() }}</p>
</div>
```

#### basic-segmented-example.ts

```ts
import { Component, signal } from '@angular/core';

import { KuiSegmentDirective, KuiSegmentedComponent } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-segmented-example',
  imports: [KuiSegmentDirective, KuiSegmentedComponent],
  templateUrl: './basic-segmented-example.html',
  styleUrl: './basic-segmented-example.scss',
})
export class BasicSegmentedExample {
  protected readonly view = signal('list');
}
```

#### basic-segmented-example.scss

```scss
.basic-segmented-example {
  display: grid;
  gap: var(--kui-space-3, 12px);
  justify-items: center;
}

.basic-segmented-example p {
  margin: 0;
  color: var(--kui-color-text-muted);
  font-size: var(--kui-font-size-sm);
}
```

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [(selected)] | string \| number \| null | null | Selected segment value. Use stable primitive values for predictable forms. |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Control height and spacing for the whole segmented group. |
| button[kuiSegment].value | string \| number \| null | null | Value emitted when the segment is selected. |
| button[kuiSegment].disabled | boolean | false | Disables one segment and removes it from keyboard selection. |

## Accessibility

- `role="radiogroup"` on `kui-segmented`
- `role="radio"` and `aria-checked` on each segment
- Roving `tabindex`

## Playground

Available at /components/segmented/playground.
