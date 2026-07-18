# Field

> Label, hint, error, and form-control composition.

- Status: available
- Route: /components/field
- Package: @kikita-labs/ui@0.7.0
- Import: KuiFieldComponent from @kikita-labs/ui
- Source docs: ../kikita-ui/docs/field.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

```html
<kui-field label="Email" hint="Use your work email" required>
  <input kuiInput type="email" />
</kui-field>

<kui-field label="Email" error="Email is required">
  <input kuiInput type="email" />
</kui-field>
```

When `kuiInput` is projected inside `kui-field`, it receives the field id, `aria-describedby`, and invalid state automatically.

Use `kui-field` as the default wrapper for input-like controls whenever a visible label, hint,
error, or required marker is needed. Do not hand-wire those pieces around Kikita inputs in docs,
playground pages, or examples.

## Examples

Rendered at /components/field:

### basic-field-example

#### basic-field-example.html

```html
<div class="basic-field-example">
  <kui-field label="Email" hint="Use your work email">
    <input kuiInput type="email" placeholder="mira@company.dev" />
  </kui-field>

  <kui-field label="Project" error="Project name is required" required>
    <input kuiInput value="" />
  </kui-field>
</div>
```

#### basic-field-example.ts

```ts
import { Component } from '@angular/core';

import { KuiFieldComponent, KuiInputDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-field-example',
  imports: [KuiFieldComponent, KuiInputDirective],
  templateUrl: './basic-field-example.html',
  styleUrl: './basic-field-example.scss',
})
export class BasicFieldExample {}
```

#### basic-field-example.scss

```scss
.basic-field-example {
  display: grid;
  inline-size: min(100%, 360px);
  gap: var(--kui-space-4, 16px);
}
```

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| label | string | - | Visible label shorthand. Prefer this for simple field labels. |
| hint | string | - | Optional help text rendered below the control and wired through aria-describedby. |
| error | string | - | Explicit error text rendered below the control and wired through aria-describedby. |
| hideErrors | boolean | - | Hides automatic, explicit, and projected error messages while keeping invalid state. |
| required | boolean | - | Explicit required marker override. Omit when Signal Forms can infer it. |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' | - | Field spacing and projected control size. |

## Accessibility

Rendered documentation, interactive examples, and the playground live at the HTML route above.

## Playground

Available at /components/field/playground.
