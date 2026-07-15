# Color Input

> Color value input.

- Status: available
- Route: /components/color-input
- Package: @kikita-labs/ui@0.4.4
- Import: KuiColorInputDirective from @kikita-labs/ui
- Source docs: ../kikita-ui/docs/color-input.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

```html
<kui-field label="Primary seed" hint="Hex or oklch().">
  <input kuiColorInput value="#5b4fe0" />
</kui-field>
```

OKLCH values are accepted as text seed values:

```html
<kui-field label="Primary seed">
  <input kuiColorInput value="oklch(0.52 0.25 285)" />
</kui-field>
```

Hex values also enable the browser-native color picker from the swatch button:

```html
<kui-field label="Danger seed">
  <input kuiColorInput value="#e0002a" />
</kui-field>
```

## Examples

Rendered at /components/color-input:

- `basic-color-input-example`

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| kuiColorInput | directive | - | Applies Kikita color-input styling and picker affordances to a native input. |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' | 'md' | Control height matched to Kikita UI size tokens. |
| invalid | boolean | false | Applies an error border and inherits invalid state from parent kui-field. |
| id | string \| undefined | field id | Native input id override. |
| swatchLabel | string | 'Open color picker' | Accessible label for the swatch button. |

## Accessibility

- The control uses a native text input for editable value semantics.
- The swatch is a native button with an accessible name containing the current
  value.
- The chevron is a native button and rotates while the picker is open.
- The 2D surface exposes slider semantics and supports arrow-key changes.
- The hue control is a native range input.
- The swatch focus ring is visible and does not shift layout.
- Invalid state is exposed through `aria-invalid`.
- Place the input inside `kui-field` for label and description wiring.

## Playground

Available at /components/color-input/playground.
