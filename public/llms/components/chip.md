# Chip

> Compact token for selected values, filters, and entity references.

- Status: available
- Route: /components/chip
- Package: @kikita-labs/ui@0.6.2
- Import: KuiChipDirective from @kikita-labs/ui
- Source docs: ../kikita-ui/docs/chip.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

```html
<span kuiChip>Design</span>

<span kuiChip size="sm" appearance="primary" (removed)="removeTag('design')">
  <span class="kui-chip-label">Design</span>
  <button kuiChipRemove aria-label="Remove Design">...</button>
</span>

<button kuiChip type="button">Filter</button>
```

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

import { KuiChipDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-chip-example',
  imports: [KuiChipDirective],
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

import { KuiChipDirective, KuiChipRemoveDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-chip-states-example',
  imports: [KuiChipDirective, KuiChipRemoveDirective],
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

import { KuiChipDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-interactive-chip-example',
  imports: [KuiChipDirective],
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
    <span kuiChip appearance="primary" (removed)="removeTag(tag)">
      <span class="kui-chip-label">{{ tag }}</span>
      <button kuiChipRemove type="button" [attr.aria-label]="'Remove ' + tag"></button>
    </span>
  }
</div>
```

#### removable-chip-example.ts

```ts
import { Component, signal } from '@angular/core';

import { KuiChipDirective, KuiChipRemoveDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-removable-chip-example',
  imports: [KuiChipDirective, KuiChipRemoveDirective],
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
| removed | output: void | - | Emitted when a nested button[kuiChipRemove] is clicked. |
| kuiChipRemove | directive on button | - | Marks a native button as the chip remove action. Needs its own aria-label, for example "Remove Design". |
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
- Remove action must be a native `button[kuiChipRemove]`.
- Remove buttons need an accessible name such as `aria-label="Remove Design"`.
- Disabled chips mark remove buttons as `aria-disabled="true"` and `tabindex="-1"`.
- Select and Combobox own keyboard behavior for Delete/Backspace selected-value removal.

## Playground

Available at /components/chip/playground.
