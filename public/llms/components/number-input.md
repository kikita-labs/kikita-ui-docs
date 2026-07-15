# Number Input

> Number input states with compact variant options.

- Status: available
- Route: /components/number-input
- Package: @kikita-labs/ui@0.4.4
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

- `basic-number-input-example`
- `compact-number-input-example`
- `field-number-input-example`
- `range-number-input-example`

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
