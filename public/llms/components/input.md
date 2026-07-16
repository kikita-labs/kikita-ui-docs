# Input

> Native text input styling with field integration.

- Status: available
- Route: /components/input
- Package: @kikita-labs/ui@0.4.6
- Import: KuiInputDirective from @kikita-labs/ui
- Source docs: ../kikita-ui/docs/input.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

```html
<input kuiInput placeholder="Email" />
```

Inside `kui-field`, `kuiInput` automatically wires label, hint, error, and invalid ARIA attributes.
Use `textarea[kuiTextarea]` for multiline controls.

## Examples

Rendered at /components/input:

### basic-input-example

#### basic-input-example.html

```html
<div class="basic-input-example">
  <input kuiInput type="email" aria-label="Work email" placeholder="mira@company.dev" />
  <input kuiInput aria-label="Project slug" value="kikita-ui" />
  <input kuiInput invalid aria-label="Invalid project slug" value="Invalid value" />
</div>
```

#### basic-input-example.ts

```ts
import { Component } from '@angular/core';

import { KuiInputDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-input-example',
  imports: [KuiInputDirective],
  templateUrl: './basic-input-example.html',
  styleUrl: './basic-input-example.scss',
})
export class BasicInputExample {}
```

#### basic-input-example.scss

```scss
.basic-input-example {
  display: grid;
  inline-size: min(100%, 360px);
  gap: var(--kui-space-4, 16px);
}
```

### input-group-example

#### input-group-example.html

```html
<kui-field label="Project URL" hint="Affixes are visual field chrome.">
  <div class="kui-input-group input-group-example">
    <span kuiFieldAffix>https://</span>
    <input kuiInput aria-label="Project slug" value="kikita-ui" />
    <span kuiFieldAffix>.dev</span>
  </div>
</kui-field>
```

#### input-group-example.ts

```ts
import { Component } from '@angular/core';

import {
  KuiFieldAffixDirective,
  KuiFieldComponent,
  KuiInputDirective,
  KuiInputGroupDirective,
} from '@kikita-labs/ui';

@Component({
  selector: 'app-input-group-example',
  imports: [KuiFieldAffixDirective, KuiFieldComponent, KuiInputDirective, KuiInputGroupDirective],
  templateUrl: './input-group-example.html',
  styleUrl: './input-group-example.scss',
})
export class InputGroupExample {}
```

#### input-group-example.scss

```scss
.input-group-example {
  inline-size: min(100%, 380px);
}
```

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' | - | Native input height and spacing size. |
| invalid | boolean | - | Marks the input invalid outside a field error state. |
| id | string | - | Explicit id override. Inside kui-field, the field id is used when omitted. |

## Accessibility

Rendered documentation, interactive examples, and the playground live at the HTML route above.

## Playground

Available at /components/input/playground.
