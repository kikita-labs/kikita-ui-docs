# Checkbox

> Native checkbox styling with field state integration.

- Status: available
- Route: /components/checkbox
- Package: @kikita-labs/ui@1.1.0
- Import: KuiCheckboxDirective from @kikita-labs/ui
- Source docs: ../kikita-ui/docs/checkbox.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

```html
<kui-field label="Notifications" hint="Control product and release emails">
  <label>
    <input kuiCheckbox type="checkbox" />
    Receive updates
  </label>
</kui-field>
```

Inside `kui-field`, `kuiCheckbox` receives the field id, `aria-describedby`, and invalid state
automatically. Keep the native label around the checkbox for the option text itself.

## Examples

Rendered at /components/checkbox:

### basic-checkbox-example

#### basic-checkbox-example.html

```html
<kui-field label="Notifications" hint="Control product and release emails">
  <label class="checkbox-option">
    <input kuiCheckbox type="checkbox" [checked]="receiveUpdates()" />
    <span>Receive updates</span>
  </label>
</kui-field>
```

#### basic-checkbox-example.ts

```ts
import { Component, signal } from '@angular/core';

import { KuiCheckboxDirective, KuiFieldComponent } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-checkbox-example',
  imports: [KuiCheckboxDirective, KuiFieldComponent],
  templateUrl: './basic-checkbox-example.html',
  styleUrl: './basic-checkbox-example.scss',
})
export class BasicCheckboxExample {
  protected readonly receiveUpdates = signal(true);
}
```

#### basic-checkbox-example.scss

```scss
:host {
  display: block;
  inline-size: min(100%, 360px);
}

.checkbox-option {
  display: inline-flex;
  align-items: center;
  gap: var(--kui-space-2, 8px);
  color: var(--kui-color-text);
}
```

### checkbox-size-example

#### checkbox-size-example.html

```html
<div class="checkbox-size-example">
  <label class="checkbox-option">
    <input kuiCheckbox type="checkbox" size="xs" />
    <span>Extra small</span>
  </label>
  <label class="checkbox-option">
    <input kuiCheckbox type="checkbox" size="sm" checked />
    <span>Small</span>
  </label>
  <label class="checkbox-option">
    <input kuiCheckbox type="checkbox" size="md" checked />
    <span>Medium</span>
  </label>
  <label class="checkbox-option">
    <input kuiCheckbox type="checkbox" size="lg" />
    <span>Large</span>
  </label>
  <label class="checkbox-option">
    <input kuiCheckbox type="checkbox" disabled />
    <span>Disabled</span>
  </label>
  <label class="checkbox-option">
    <input kuiCheckbox type="checkbox" disabled checked />
    <span>Disabled and checked</span>
  </label>
  <label class="checkbox-option">
    <input kuiCheckbox type="checkbox" invalid />
    <span>Invalid</span>
  </label>
</div>
```

#### checkbox-size-example.ts

```ts
import { Component } from '@angular/core';

import { KuiCheckboxDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-checkbox-size-example',
  imports: [KuiCheckboxDirective],
  templateUrl: './checkbox-size-example.html',
  styleUrl: './checkbox-size-example.scss',
})
export class CheckboxSizeExample {}
```

#### checkbox-size-example.scss

```scss
.checkbox-size-example {
  display: grid;
  gap: var(--kui-space-3, 12px);
  justify-content: center;
}

.checkbox-option {
  display: inline-flex;
  align-items: center;
  gap: var(--kui-space-2, 8px);
  color: var(--kui-color-text);
}
```

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' | 'md' | Checkbox size mapped to Kikita checkbox tokens. |
| invalid | boolean | false | Marks the checkbox invalid outside a field error state. |
| id | string \| undefined | - | Explicit id override. Inside kui-field, the field id is used when omitted. |
| checked | boolean | false | Native checked state. Not a directive input; bind it directly on the input element. |
| disabled | boolean | false | Native disabled state. Not a directive input; bind it directly on the input element. |
| indeterminate | boolean | false | Native DOM property, not an HTML attribute or directive input. Set it imperatively on the element to show the dash-mark state; .kui-checkbox styles :indeterminate. |

## Accessibility

Rendered documentation, interactive examples, and the playground live at the HTML route above.

## Playground

Available at /components/checkbox/playground.
