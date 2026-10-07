# Chip

> Compact token for selected values, filters, and entity references.

- Status: available
- Route: /components/chip
- Package: @kikita-labs/ui@2.0.0
- Import: KuiChip from @kikita-labs/ui
- Source docs: https://github.com/kikita-labs/kikita-ui/blob/v2.0.0/docs/chip.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

```html
<span kuiChip>Design</span>

<!-- Primary way to make a chip removable: the `removable` input renders a default
     crossmark button and wires up `removed` for you. -->
<span
  kuiChip
  size="sm"
  appearance="primary"
  removable
  removeLabel="Remove Design"
  (removed)="removeTag('design')"
>
  <span class="kui-chip-label">Design</span>
</span>

<button kuiChip type="button">Filter</button>
```

Only reach for `button[kuiChipRemove]` when the default button in `removable` isn't
enough — a custom icon, extra markup, or a design that needs a fully custom remove
control. It's a behavior-only directive (click handling, ARIA wiring) with no visual
of its own: project whatever content you want as the button's children, for example a
`kuiIconButton`:

```html
<span kuiChip size="sm" appearance="primary" (removed)="removeTag('design')">
  <span class="kui-chip-label">Design</span>
  <button kuiChipRemove kuiIconButton icon="x" size="xs" aria-label="Remove Design"></button>
</span>
```

`kuiIconButton` is its own directive; import `KuiIconButton` alongside
`KuiChip`/`KuiChipRemove` to use this pattern. See [Icon
Button](icon-button.md).

Do not combine `removable` and a projected `button[kuiChipRemove]` on the same chip —
pick one.

## Examples

Rendered at /components/chip:

### basic-chip-example

#### basic-chip-example.html

```html
<div class="basic-chip-example">
  <span kuiChip>Design</span>
  <span kuiChip appearance="primary">Engineering</span>
  <span kuiChip appearance="success">Shipped</span>
</div>
```

#### basic-chip-example.ts

```ts
import { Component } from '@angular/core';

import { KuiChip } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-chip-example',
  imports: [KuiChip],
  templateUrl: './basic-chip-example.html',
  styleUrl: './basic-chip-example.scss',
})
export class BasicChipExample {}
```

#### basic-chip-example.scss

```scss
.basic-chip-example {
  display: flex;
  flex-wrap: wrap;
  gap: var(--kui-space-3, 12px);
  align-items: center;
  justify-content: center;
}
```

### chip-states-example

#### chip-states-example.html

```html
<div class="chip-states-example">
  <span kuiChip disabled>
    <span class="kui-chip-label">Design</span>
    <button kuiChipRemove type="button" aria-label="Remove Design"></button>
  </span>
  <span kuiChip invalid appearance="danger">Missing owner</span>
</div>
```

#### chip-states-example.ts

```ts
import { Component } from '@angular/core';

import { KuiChip, KuiChipRemove } from '@kikita-labs/ui';

@Component({
  selector: 'app-chip-states-example',
  imports: [KuiChip, KuiChipRemove],
  templateUrl: './chip-states-example.html',
  styleUrl: './chip-states-example.scss',
})
export class ChipStatesExample {}
```

#### chip-states-example.scss

```scss
.chip-states-example {
  display: flex;
  flex-wrap: wrap;
  gap: var(--kui-space-3, 12px);
  align-items: center;
  justify-content: center;
}
```

### interactive-chip-example

#### interactive-chip-example.html

```html
<div class="interactive-chip-example">
  <button
    kuiChip
    type="button"
    [appearance]="selected() === 'all' ? 'primary' : 'neutral'"
    (click)="select('all')"
  >
    All
  </button>
  <button
    kuiChip
    type="button"
    [appearance]="selected() === 'open' ? 'primary' : 'neutral'"
    (click)="select('open')"
  >
    Open
  </button>
  <button
    kuiChip
    type="button"
    [appearance]="selected() === 'closed' ? 'primary' : 'neutral'"
    (click)="select('closed')"
  >
    Closed
  </button>
</div>
```

#### interactive-chip-example.ts

```ts
import { Component, signal } from '@angular/core';

import { KuiChip } from '@kikita-labs/ui';

@Component({
  selector: 'app-interactive-chip-example',
  imports: [KuiChip],
  templateUrl: './interactive-chip-example.html',
  styleUrl: './interactive-chip-example.scss',
})
export class InteractiveChipExample {
  protected readonly selected = signal<'all' | 'open' | 'closed'>('all');

  protected select(filter: 'all' | 'open' | 'closed'): void {
    this.selected.set(filter);
  }
}
```

#### interactive-chip-example.scss

```scss
.interactive-chip-example {
  display: flex;
  flex-wrap: wrap;
  gap: var(--kui-space-3, 12px);
  align-items: center;
  justify-content: center;
}
```

### removable-chip-example

#### removable-chip-example.html

```html
<div class="removable-chip-example">
  @for (tag of tags(); track tag) {
    <span
      kuiChip
      appearance="primary"
      removable
      [removeLabel]="'Remove ' + tag"
      (removed)="removeTag(tag)"
    >
      <span class="kui-chip-label">{{ tag }}</span>
    </span>
  }
</div>
```

#### removable-chip-example.ts

```ts
import { Component, signal } from '@angular/core';

import { KuiChip } from '@kikita-labs/ui';

@Component({
  selector: 'app-removable-chip-example',
  imports: [KuiChip],
  templateUrl: './removable-chip-example.html',
  styleUrl: './removable-chip-example.scss',
})
export class RemovableChipExample {
  protected readonly tags = signal(['Design', 'Engineering', 'Product']);

  protected removeTag(tag: string): void {
    this.tags.update((current) => current.filter((existing) => existing !== tag));
  }
}
```

#### removable-chip-example.scss

```scss
.removable-chip-example {
  display: flex;
  flex-wrap: wrap;
  gap: var(--kui-space-3, 12px);
  align-items: center;
  justify-content: center;
}
```

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| appearance | 'neutral' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' | 'neutral' | Semantic visual treatment mapped to Kikita UI status tokens. |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' | 'md' | Chip size. sm is the size used inside Select and Combobox controls. |
| disabled | boolean | false | Reduces opacity and makes the nested remove action inert. |
| invalid | boolean | false | Shows the invalid border treatment. |
| removable | boolean | false | Renders a default remove button (crossmark icon) as the last child. Primary way to make a chip removable; use kuiChipRemove instead only for a custom icon or extra content. |
| removeLabel | string \| undefined | 'Remove' | Accessible name for the default remove button rendered by removable. Provide a value-specific label, for example "Remove Design". |
| removed | output: void | - | Emitted when the default remove button or a nested button[kuiChipRemove] is activated. |
| kuiChipRemove | directive on button | - | Marks a native button as the chip remove action. Use only when the default removable button is not enough (custom icon, extra content); do not combine both on the same chip. Needs its own aria-label, for example "Remove Design". |
| --kui-chip-bg | CSS color | - | Chip background color. |
| --kui-chip-bg-hover | CSS color | - | Chip background color on hover for interactive chips. |
| --kui-chip-border | CSS color | - | Chip border color. |
| --kui-chip-text | CSS color | - | Chip label text color. |
| --kui-chip-radius | CSS length | - | Chip corner radius. |
| --kui-chip-height-xs | CSS length | - | Chip block size for size="xs". |
| --kui-chip-height-sm | CSS length | - | Chip block size for size="sm". |
| --kui-chip-height-md | CSS length | - | Chip block size for size="md" (default). |
| --kui-chip-height-lg | CSS length | - | Chip block size for size="lg". |
| --kui-chip-remove-color | CSS color | - | Remove icon color. |
| --kui-chip-remove-color-hover | CSS color | - | Remove icon color on hover. |
| --kui-chip-disabled-opacity | CSS number | - | Opacity applied to the whole chip when disabled. |

## Accessibility

- Static chip: use a non-interactive host such as `span`.
- Interactive chip: use a native `button` or `a`.
- Remove action is a native `<button>`, either the `removable` default or a projected
  `button[kuiChipRemove]`.
- Give the remove button an accessible name: `removeLabel` for `removable`, or an
  explicit `aria-label` such as `aria-label="Remove Design"` on a custom
  `button[kuiChipRemove]`.
- Disabled chips mark remove buttons as `aria-disabled="true"` and `tabindex="-1"`.
- Select and Combobox own keyboard behavior for Delete/Backspace selected-value removal.

## Playground

Available at /components/chip/playground.
