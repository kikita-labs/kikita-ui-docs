# Switch

> Native switch control styling for binary settings.

- Status: available
- Route: /components/switch
- Package: @kikita-labs/ui@0.6.3
- Import: KuiSwitchDirective from @kikita-labs/ui
- Source docs: ../kikita-ui/docs/switch.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

```html
<kui-field label="Notifications" hint="Control product and release notifications">
  <label>
    <input kuiSwitch type="checkbox" />
    Enable notifications
  </label>
</kui-field>
```

The directive adds `role="switch"` while keeping the native checkbox input, keyboard behavior, and
form behavior. Use `kui-field` for field-level label, hint, error, and description wiring; keep a
native label for the switch text itself.

## Examples

Rendered at /components/switch:

### basic-switch-example

#### basic-switch-example.html

```html
<kui-field label="Notifications" hint="Control product and release notifications">
  <label class="switch-option">
    <input kuiSwitch type="checkbox" checked />
    <span>Enable notifications</span>
  </label>
</kui-field>
```

#### basic-switch-example.ts

```ts
import { Component } from '@angular/core';

import { KuiFieldComponent, KuiSwitchDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-switch-example',
  imports: [KuiFieldComponent, KuiSwitchDirective],
  templateUrl: './basic-switch-example.html',
  styleUrl: './basic-switch-example.scss',
})
export class BasicSwitchExample {}
```

#### basic-switch-example.scss

```scss
:host {
  display: block;
  inline-size: min(100%, 360px);
}

.switch-option {
  display: inline-flex;
  align-items: center;
  gap: var(--kui-space-2, 8px);
  color: var(--kui-color-text);
}
```

### switch-size-example

#### switch-size-example.html

```html
<div class="switch-size-example">
  <label class="switch-option">
    <input kuiSwitch type="checkbox" size="xs" />
    <span>Extra small</span>
  </label>
  <label class="switch-option">
    <input kuiSwitch type="checkbox" size="sm" checked />
    <span>Small</span>
  </label>
  <label class="switch-option">
    <input kuiSwitch type="checkbox" size="md" checked />
    <span>Medium</span>
  </label>
  <label class="switch-option">
    <input kuiSwitch type="checkbox" size="lg" />
    <span>Large</span>
  </label>
</div>
```

#### switch-size-example.ts

```ts
import { Component } from '@angular/core';

import { KuiSwitchDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-switch-size-example',
  imports: [KuiSwitchDirective],
  templateUrl: './switch-size-example.html',
  styleUrl: './switch-size-example.scss',
})
export class SwitchSizeExample {}
```

#### switch-size-example.scss

```scss
.switch-size-example {
  display: grid;
  gap: var(--kui-space-3, 12px);
  justify-content: center;
}

.switch-option {
  display: inline-flex;
  align-items: center;
  gap: var(--kui-space-2, 8px);
  color: var(--kui-color-text);
}
```

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' | - | Switch size mapped to Kikita switch tokens. |
| invalid | boolean | - | Marks the switch invalid outside a field error state. |
| id | string \| undefined | - | Explicit id override. Inside kui-field, the field id is used when omitted. |

## Accessibility

Rendered documentation, interactive examples, and the playground live at the HTML route above.

## Playground

Available at /components/switch/playground.
