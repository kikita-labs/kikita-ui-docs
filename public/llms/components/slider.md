# Slider

> Native range input styling with field and Signal Forms support.

- Status: available
- Route: /components/slider
- Package: @kikita-labs/ui@0.4.3
- Import: KuiSliderDirective from @kikita-labs/ui
- Source docs: ../kikita-ui/docs/slider.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

```html
<kui-field label="Volume" hint="Use arrow keys, Home, and End.">
  <input type="range" kuiSlider min="0" max="100" value="60" />
</kui-field>
```

Use native range input semantics first. For visible labels and helper text, prefer a wrapping
`kui-field` instead of hand-written labels or description ids.
When projected inside `kui-field`, `kuiSlider` inherits the field id, `aria-describedby`,
`aria-invalid`, and visual invalid state.

```html
<input
  type="range"
  kuiSlider
  color="success"
  size="lg"
  minLabel="0"
  maxLabel="100"
  aria-label="Progress"
/>
```

## Examples

Rendered at /components/slider:

- `basic-slider-example`
- `slider-disabled-example`
- `slider-field-example`
- `slider-range-example`

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| kuiSlider | directive | - | Selector input[type=range][kuiSlider]. Applies Kikita UI slider styling and behavior to a native range input. |
| color | 'primary' \| 'success' \| 'danger' \| 'neutral' | 'primary' | Semantic color applied to the generated slider fill and thumb. |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Visual size of the generated slider control. |
| minLabel | string | '' | Optional label rendered below the minimum side of the track. |
| maxLabel | string | '' | Optional label rendered below the maximum side of the track. |
| disabled | boolean | false | Mirrors disabled styling on the generated slider wrapper. |
| invalid | boolean | false | Applies invalid styling outside a kui-field error state. |
| id | string \| undefined | - | Explicit native input id. Falls back to the parent kui-field control id. |
| min / max / step / value | native attributes | - | Native range input attributes. kuiSlider reads them directly; use them (or Signal Forms min/max validators) instead of a directive input. |
| kuiTooltip | string | - | When set to a non-empty string on the same host, the static tooltip text wins over the default value tooltip. Otherwise kuiSlider shows the current numeric value in a tooltip on hover. |
| [formField] | FieldTree<number> (from @angular/forms/signals) | - | Angular Signal Forms binding. Owns native value, disabled, and validation state; kuiSlider keeps the generated track and thumb visuals in sync. Do not add native min/max alongside formField; use the min(...) and max(...) schema validators instead. |

## Accessibility

Rendered documentation, interactive examples, and the playground live at the HTML route above.

## Playground

Available at /components/slider/playground.
