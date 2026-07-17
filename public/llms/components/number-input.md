# Number Input

> Number input states with compact variant options.

- Status: available
- Route: /components/number-input
- Package: @kikita-labs/ui@0.6.1
- Import: KuiNumberInputDirective from @kikita-labs/ui
- Source docs: ../kikita-ui/docs/number-input.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

```html
<!-- Standalone -->
<input type="number" kuiNumberInput min="0" max="100" aria-label="Quantity" />

<!-- With ngModel -->
<input type="number" kuiNumberInput min="1" max="99" [(ngModel)]="qty" aria-label="Quantity" />

<!-- In a kui-field -->
<kui-field label="Count" hint="Enter a value from 1 to 100">
  <input type="number" kuiNumberInput min="1" max="100" [(ngModel)]="qty" />
</kui-field>
```

Variant B, with minus/plus controls on the sides, is the default and recommended
for most use cases. Variant A uses stacked arrows on the right and is more compact.

```html
<input type="number" kuiNumberInput variant="a" min="0" max="99" [(ngModel)]="qty" />
```

## Examples

Rendered at /components/number-input:

### basic-number-input-example

#### basic-number-input-example.html

```html
<input type="number" kuiNumberInput min="0" max="100" aria-label="Quantity" value="4" />
<input
  type="number"
  kuiNumberInput
  size="sm"
  min="0"
  max="10"
  aria-label="Small quantity"
  value="2"
/>
<input
  type="number"
  kuiNumberInput
  disabled
  min="0"
  max="10"
  aria-label="Disabled quantity"
  value="3"
/>
```

#### basic-number-input-example.ts

```ts
import { Component } from '@angular/core';

import { KuiNumberInputDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-number-input-example',
  imports: [KuiNumberInputDirective],
  templateUrl: './basic-number-input-example.html',
  styleUrl: './basic-number-input-example.scss',
})
export class BasicNumberInputExample {}
```

#### basic-number-input-example.scss

```scss
:host {
  display: flex;
  flex-wrap: wrap;
  gap: var(--kui-space-4, 16px);
  align-items: center;
}
```

### compact-number-input-example

#### compact-number-input-example.html

```html
<input
  type="number"
  kuiNumberInput
  variant="a"
  min="0"
  max="99"
  aria-label="Compact quantity"
  value="12"
/>
<input
  type="number"
  kuiNumberInput
  variant="b"
  min="0"
  max="99"
  aria-label="Default quantity"
  value="12"
/>
```

#### compact-number-input-example.ts

```ts
import { Component } from '@angular/core';

import { KuiNumberInputDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-compact-number-input-example',
  imports: [KuiNumberInputDirective],
  templateUrl: './compact-number-input-example.html',
  styleUrl: './compact-number-input-example.scss',
})
export class CompactNumberInputExample {}
```

#### compact-number-input-example.scss

```scss
:host {
  display: flex;
  flex-wrap: wrap;
  gap: var(--kui-space-4, 16px);
  align-items: center;
}
```

### field-number-input-example

#### field-number-input-example.html

```html
<kui-field label="Seats" hint="Choose between 1 and 10 seats">
  <input type="number" kuiNumberInput min="1" max="10" value="4" />
</kui-field>

<kui-field label="Discount" error="Discount must be at least 0%" required>
  <input type="number" kuiNumberInput invalid min="0" max="100" value="-5" />
</kui-field>
```

#### field-number-input-example.ts

```ts
import { Component } from '@angular/core';

import { KuiFieldComponent, KuiNumberInputDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-field-number-input-example',
  imports: [KuiFieldComponent, KuiNumberInputDirective],
  templateUrl: './field-number-input-example.html',
  styleUrl: './field-number-input-example.scss',
})
export class FieldNumberInputExample {}
```

#### field-number-input-example.scss

```scss
:host {
  display: flex;
  flex-wrap: wrap;
  gap: var(--kui-space-4, 16px);
  align-items: flex-start;
}
```

### range-number-input-example

#### range-number-input-example.html

```html
<input
  type="number"
  kuiNumberInput
  min="0"
  max="20"
  step="5"
  aria-label="Step of five"
  value="10"
/>
<input
  type="number"
  kuiNumberInput
  invalid
  min="1"
  max="10"
  aria-label="Invalid quantity"
  value="0"
/>
```

#### range-number-input-example.ts

```ts
import { Component } from '@angular/core';

import { KuiNumberInputDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-range-number-input-example',
  imports: [KuiNumberInputDirective],
  templateUrl: './range-number-input-example.html',
  styleUrl: './range-number-input-example.scss',
})
export class RangeNumberInputExample {}
```

#### range-number-input-example.scss

```scss
:host {
  display: flex;
  flex-wrap: wrap;
  gap: var(--kui-space-4, 16px);
  align-items: center;
}
```

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' | 'md' | Control height from --kui-control-height-*. Generated buttons scale to match. |
| variant | 'a' \| 'b' | 'b' | Button layout. b places minus/plus controls on the sides (recommended). a stacks compact arrow controls on the right. |
| invalid | boolean | false | Applies an error border. Also inherited automatically from a parent kui-field with an error. |
| id | string \| undefined | - | Id override for the native input. Falls back to the parent kui-field control id. |
| min | string \| number | - | Native HTML attribute placed directly on the input. Decrement stops and disables at this value. |
| max | string \| number | - | Native HTML attribute placed directly on the input. Increment stops and disables at this value. |
| step | string \| number | 1 | Native HTML attribute. Amount the generated buttons and arrow keys step by. |
| disabled | boolean | false | Native HTML attribute. Sets data-kui-disabled on the container and disables both generated buttons. |
| readonly | boolean | false | Native HTML attribute. Sets data-kui-readonly on the container and disables both generated buttons. |
| --kui-number-input-border | CSS custom property | --kui-color-border | Border color in the default state. |
| --kui-number-input-divider | CSS custom property | --kui-color-border | Divider color between the buttons and the native input. |
| --kui-number-input-btn-bg | CSS custom property | transparent | Generated button background in the default state. |
| --kui-number-input-btn-bg-hover | CSS custom property | --kui-color-surface-elevated | Generated button background on hover. |
| --kui-number-input-btn-text | CSS custom property | --kui-color-text-secondary | Generated button icon color. |

## Accessibility

- The native `input[type=number]` keeps its built-in keyboard and screen-reader semantics.
- Generated buttons use `aria-label="Decrease value"` and `aria-label="Increase value"`.
- Generated buttons use native `disabled` plus `aria-disabled="true"` when stepping is not available.
- Place the input inside `kui-field` to inherit label, hint, error, and id wiring.

## Playground

Available at /components/number-input/playground.
