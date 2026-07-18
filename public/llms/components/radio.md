# Radio

> Native radio control styling for exclusive choices.

- Status: available
- Route: /components/radio
- Package: @kikita-labs/ui@0.7.0
- Import: KuiRadioDirective from @kikita-labs/ui
- Source docs: ../kikita-ui/docs/radio.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

```html
<kui-field label="Plan" hint="Choose a billing plan">
  <div role="radiogroup">
    <label>
      <input kuiRadio type="radio" name="plan" value="starter" />
      Starter
    </label>
    <label>
      <input kuiRadio type="radio" name="plan" value="pro" />
      Pro
    </label>
  </div>
</kui-field>
```

Use a shared native `name` for mutually exclusive radio choices. Use `kui-field` for the
field-level label, hint, error, and description wiring; keep native labels for each option.

## Examples

Rendered at /components/radio:

### basic-radio-example

#### basic-radio-example.html

```html
<kui-field label="Plan" hint="Choose a billing plan">
  <div role="radiogroup" class="radio-group" aria-label="Plan">
    <label class="radio-option">
      <input
        kuiRadio
        type="radio"
        name="plan"
        value="starter"
        [checked]="plan() === 'starter'"
        (change)="plan.set('starter')"
      />
      <span>Starter</span>
    </label>
    <label class="radio-option">
      <input
        kuiRadio
        type="radio"
        name="plan"
        value="pro"
        [checked]="plan() === 'pro'"
        (change)="plan.set('pro')"
      />
      <span>Pro</span>
    </label>
  </div>
</kui-field>
```

#### basic-radio-example.ts

```ts
import { Component, signal } from '@angular/core';

import { KuiFieldComponent, KuiRadioDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-radio-example',
  imports: [KuiFieldComponent, KuiRadioDirective],
  templateUrl: './basic-radio-example.html',
  styleUrl: './basic-radio-example.scss',
})
export class BasicRadioExample {
  protected readonly plan = signal('starter');
}
```

#### basic-radio-example.scss

```scss
:host {
  display: block;
  inline-size: min(100%, 360px);
}

.radio-group {
  display: grid;
  gap: var(--kui-space-2, 8px);
}

.radio-option {
  display: inline-flex;
  align-items: center;
  gap: var(--kui-space-2, 8px);
  color: var(--kui-color-text);
}
```

### radio-disabled-example

#### radio-disabled-example.html

```html
<div role="radiogroup" class="radio-group" aria-label="Delivery speed">
  <label class="radio-option">
    <input kuiRadio type="radio" name="delivery" value="standard" checked />
    <span>Standard</span>
  </label>
  <label class="radio-option">
    <input kuiRadio type="radio" name="delivery" value="express" />
    <span>Express</span>
  </label>
  <label class="radio-option radio-option--disabled">
    <input kuiRadio type="radio" name="delivery" value="same-day" disabled />
    <span>Same day (unavailable in this region)</span>
  </label>
</div>
```

#### radio-disabled-example.ts

```ts
import { Component } from '@angular/core';

import { KuiRadioDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-radio-disabled-example',
  imports: [KuiRadioDirective],
  templateUrl: './radio-disabled-example.html',
  styleUrl: './radio-disabled-example.scss',
})
export class RadioDisabledExample {}
```

#### radio-disabled-example.scss

```scss
.radio-group {
  display: grid;
  gap: var(--kui-space-2, 8px);
}

.radio-option {
  display: inline-flex;
  align-items: center;
  gap: var(--kui-space-2, 8px);
  color: var(--kui-color-text);
}

.radio-option--disabled {
  color: var(--kui-color-text-secondary);
}
```

### radio-invalid-example

#### radio-invalid-example.html

```html
<kui-field label="Payment method" error="Select a payment method to continue" required>
  <div role="radiogroup" class="radio-group" aria-label="Payment method">
    <label class="radio-option">
      <input kuiRadio type="radio" name="payment" value="card" />
      <span>Card</span>
    </label>
    <label class="radio-option">
      <input kuiRadio type="radio" name="payment" value="bank-transfer" />
      <span>Bank transfer</span>
    </label>
  </div>
</kui-field>
```

#### radio-invalid-example.ts

```ts
import { Component } from '@angular/core';

import { KuiFieldComponent, KuiRadioDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-radio-invalid-example',
  imports: [KuiFieldComponent, KuiRadioDirective],
  templateUrl: './radio-invalid-example.html',
  styleUrl: './radio-invalid-example.scss',
})
export class RadioInvalidExample {}
```

#### radio-invalid-example.scss

```scss
:host {
  display: block;
  inline-size: min(100%, 360px);
}

.radio-group {
  display: grid;
  gap: var(--kui-space-2, 8px);
}

.radio-option {
  display: inline-flex;
  align-items: center;
  gap: var(--kui-space-2, 8px);
  color: var(--kui-color-text);
}
```

### radio-size-example

#### radio-size-example.html

```html
<div class="radio-size-example">
  <label class="radio-option">
    <input kuiRadio type="radio" name="radio-size-xs" size="xs" checked />
    <span>Extra small</span>
  </label>
  <label class="radio-option">
    <input kuiRadio type="radio" name="radio-size-sm" size="sm" checked />
    <span>Small</span>
  </label>
  <label class="radio-option">
    <input kuiRadio type="radio" name="radio-size-md" size="md" checked />
    <span>Medium</span>
  </label>
  <label class="radio-option">
    <input kuiRadio type="radio" name="radio-size-lg" size="lg" checked />
    <span>Large</span>
  </label>
</div>
```

#### radio-size-example.ts

```ts
import { Component } from '@angular/core';

import { KuiRadioDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-radio-size-example',
  imports: [KuiRadioDirective],
  templateUrl: './radio-size-example.html',
  styleUrl: './radio-size-example.scss',
})
export class RadioSizeExample {}
```

#### radio-size-example.scss

```scss
.radio-size-example {
  display: grid;
  gap: var(--kui-space-3, 12px);
  justify-content: center;
}

.radio-option {
  display: inline-flex;
  align-items: center;
  gap: var(--kui-space-2, 8px);
  color: var(--kui-color-text);
}
```

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' | - | Radio size mapped to Kikita radio tokens. |
| invalid | boolean | - | Marks the radio invalid outside a kui-field error state. |
| id | string \| undefined | - | Explicit id override. Inside kui-field, the field id is used when omitted. |

## Accessibility

Rendered documentation, interactive examples, and the playground live at the HTML route above.

## Playground

Available at /components/radio/playground.
