# Segmented

> Compact single-choice control rendered as adjacent segment buttons.

- Status: available
- Route: /components/segmented
- Package: @kikita-labs/ui@1.6.0
- Import: KuiSegmentedComponent from @kikita-labs/ui
- Source docs: https://github.com/kikita-labs/kikita-ui/blob/v1.6.0/docs/segmented.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

```html
<kui-segmented [(value)]="view">
  <button kuiSegment value="list">List</button>
  <button kuiSegment value="grid">Grid</button>
  <button kuiSegment value="calendar">Calendar</button>
</kui-segmented>
```

### Sizes

```html
<kui-segmented size="sm" [(value)]="view">...</kui-segmented>
```

### Signal Forms

`kui-segmented` implements `FormValueControl<string>`, so it takes `[formField]` directly
(it is not a native element, so `[formField]` goes on `kui-segmented` itself, not on `kui-field`):

```html
<kui-field label="View">
  <kui-segmented [formField]="myForm.view">
    <button kuiSegment value="list">List</button>
    <button kuiSegment value="grid">Grid</button>
  </kui-segmented>
</kui-field>
```

## Examples

Rendered at /components/segmented:

### basic-segmented-example

#### basic-segmented-example.html

```html
<div class="basic-segmented-example">
  <kui-segmented [(value)]="view" aria-label="Project view">
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
| [(value)] | string | '' | Selected segment value. Implements FormValueControl for [formField] integration, or bind directly for standalone use. |
| [(selected)] | string | '' | Deprecated alias for value, kept in sync with it. Use value instead; planned for removal in the next major version. |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' | 'md' | Control height and spacing for the whole segmented group. |
| disabled | boolean | false | Disables every segment. Set by [formField] or directly. |
| invalid | boolean | false | Marks the control as having validation errors. Set by [formField]. |
| errors | readonly WithOptionalFieldTree<ValidationError>[] | [] | Current validation errors. Set by [formField]. |
| touched | boolean | false | Whether the control has been touched. Set by [formField]. |
| (touch) | void | - | Emitted when a segment is selected; marks the control as touched in the form system. |
| button[kuiSegment].value | string | '' | Value emitted when the segment is selected. |
| button[kuiSegment].disabled | boolean | false | Disables one segment and removes it from keyboard selection. |

## Accessibility

- `role="radiogroup"` on `kui-segmented`
- `role="radio"` and `aria-checked` on each segment
- Roving `tabindex`

## Playground

Available at /components/segmented/playground.
