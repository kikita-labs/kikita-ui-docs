# Slider

> Native range input styling with field and Signal Forms support.

- Status: available
- Route: /components/slider
- Package: @kikita-labs/ui@1.0.0
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

### basic-slider-example

#### basic-slider-example.html

```html
<div class="basic-slider-example">
  <kui-field label="Volume" hint="Use arrow keys, Home, and End.">
    <input type="range" kuiSlider min="0" max="100" value="60" />
  </kui-field>

  <input
    type="range"
    kuiSlider
    color="success"
    size="lg"
    min="0"
    max="100"
    value="40"
    minLabel="0"
    maxLabel="100"
    aria-label="Progress"
  />
</div>
```

#### basic-slider-example.ts

```ts
import { Component } from '@angular/core';

import { KuiFieldComponent, KuiSliderDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-slider-example',
  imports: [KuiFieldComponent, KuiSliderDirective],
  templateUrl: './basic-slider-example.html',
  styleUrl: './basic-slider-example.scss',
})
export class BasicSliderExample {}
```

#### basic-slider-example.scss

```scss
.basic-slider-example {
  display: grid;
  gap: var(--kui-space-6, 24px);
  inline-size: 100%;
  max-inline-size: 360px;
}
```

### slider-disabled-example

#### slider-disabled-example.html

```html
<div class="slider-disabled-example">
  <kui-field label="Storage limit" hint="Disabled until a plan is selected.">
    <input type="range" kuiSlider min="0" max="100" value="25" disabled />
  </kui-field>

  <input type="range" kuiSlider min="0" max="100" value="70" invalid aria-label="Invalid slider" />
</div>
```

#### slider-disabled-example.ts

```ts
import { Component } from '@angular/core';

import { KuiFieldComponent, KuiSliderDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-slider-disabled-example',
  imports: [KuiFieldComponent, KuiSliderDirective],
  templateUrl: './slider-disabled-example.html',
  styleUrl: './slider-disabled-example.scss',
})
export class SliderDisabledExample {}
```

#### slider-disabled-example.scss

```scss
.slider-disabled-example {
  display: grid;
  gap: var(--kui-space-6, 24px);
  inline-size: 100%;
  max-inline-size: 360px;
}
```

### slider-field-example

#### slider-field-example.html

```html
<div class="slider-field-example">
  <kui-field label="Volume" hint="Signal Forms native range binding">
    <input type="range" kuiSlider [formField]="settingsForm.volume" />
  </kui-field>
</div>
```

#### slider-field-example.ts

```ts
import { Component, signal } from '@angular/core';
import { form, FormField, max, min } from '@angular/forms/signals';

import { KuiFieldComponent, KuiSliderDirective } from '@kikita-labs/ui';

interface SettingsModel {
  readonly volume: number;
}

@Component({
  selector: 'app-slider-field-example',
  imports: [FormField, KuiFieldComponent, KuiSliderDirective],
  templateUrl: './slider-field-example.html',
  styleUrl: './slider-field-example.scss',
})
export class SliderFieldExample {
  private readonly settingsModel = signal<SettingsModel>({ volume: 60 });

  protected readonly settingsForm = form(this.settingsModel, (path) => {
    min(path.volume, 0);
    max(path.volume, 100);
  });
}
```

#### slider-field-example.scss

```scss
.slider-field-example {
  display: grid;
  gap: var(--kui-space-6, 24px);
  inline-size: 100%;
  max-inline-size: 360px;
}
```

### slider-range-example

#### slider-range-example.html

```html
<div class="slider-range-example">
  <kui-field label="Playback speed" hint="min 0.5, max 2, step 0.25">
    <input
      type="range"
      kuiSlider
      min="0.5"
      max="2"
      step="0.25"
      value="1"
      minLabel="0.5x"
      maxLabel="2x"
    />
  </kui-field>

  <kui-field label="Rating" hint="min 1, max 5, step 1">
    <input type="range" kuiSlider min="1" max="5" step="1" value="3" minLabel="1" maxLabel="5" />
  </kui-field>
</div>
```

#### slider-range-example.ts

```ts
import { Component } from '@angular/core';

import { KuiFieldComponent, KuiSliderDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-slider-range-example',
  imports: [KuiFieldComponent, KuiSliderDirective],
  templateUrl: './slider-range-example.html',
  styleUrl: './slider-range-example.scss',
})
export class SliderRangeExample {}
```

#### slider-range-example.scss

```scss
.slider-range-example {
  display: grid;
  gap: var(--kui-space-6, 24px);
  inline-size: 100%;
  max-inline-size: 360px;
}
```

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
