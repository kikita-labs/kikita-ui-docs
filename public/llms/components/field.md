# Field

> Label, hint, error, and form-control composition.

- Status: available
- Route: /components/field
- Package: @kikita-labs/ui@2.0.0
- Import: KuiField from @kikita-labs/ui
- Source docs: https://github.com/kikita-labs/kikita-ui/blob/v2.0.0/docs/field.md

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

import { KuiField, KuiInput } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-field-example',
  imports: [KuiField, KuiInput],
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

### field-projected-example

#### field-projected-example.html

```html
<div class="field-projected-example">
  <kui-field label="Email">
    <input kuiInput type="email" placeholder="mira@company.dev" />
    <p kuiHint>Use your work email</p>
    <p kuiError>Email is required</p>
  </kui-field>

  <kui-field label="API key">
    <input kuiInput />
    <p kuiHint class="kui-field-message">
      <span>Stored encrypted. <a href="/foundations/accessibility">Learn more</a>.</span>
    </p>
  </kui-field>
</div>
```

#### field-projected-example.ts

```ts
import { Component } from '@angular/core';

import { KuiError, KuiField, KuiHint, KuiInput } from '@kikita-labs/ui';

@Component({
  selector: 'app-field-projected-example',
  imports: [KuiError, KuiField, KuiHint, KuiInput],
  templateUrl: './field-projected-example.html',
  styleUrl: './field-projected-example.scss',
})
export class FieldProjectedExample {}
```

#### field-projected-example.scss

```scss
.field-projected-example {
  display: grid;
  gap: var(--kui-space-5, 20px);
  inline-size: min(100%, 24rem);
}
```

### field-affix-example

#### field-affix-example.html

```html
<div class="field-affix-example">
  <kui-field label="Project URL" hint="The prefix and suffix are visual field chrome.">
    <span kuiFieldAffix>https://</span>
    <input kuiInput aria-label="Project slug" />
    <span kuiFieldAffix>.dev</span>
  </kui-field>

  <kui-field label="Search">
    <kui-icon kuiFieldAffix name="search" />
    <input kuiInput aria-label="Search query" />
    <button kuiFieldAffix type="button" aria-label="Clear search">
      <kui-icon name="x" />
    </button>
  </kui-field>
</div>
```

#### field-affix-example.ts

```ts
import { Component } from '@angular/core';

import { KuiField, KuiFieldAffix, KuiIcon, KuiInput } from '@kikita-labs/ui';

@Component({
  selector: 'app-field-affix-example',
  imports: [KuiFieldAffix, KuiField, KuiIcon, KuiInput],
  templateUrl: './field-affix-example.html',
  styleUrl: './field-affix-example.scss',
})
export class FieldAffixExample {}
```

#### field-affix-example.scss

```scss
.field-affix-example {
  display: grid;
  gap: var(--kui-space-5, 20px);
  inline-size: min(100%, 24rem);
}
```

### field-input-group-example

#### field-input-group-example.html

```html
<div class="field-input-group-example">
  <kui-field label="API key">
    <div class="kui-input-group">
      <input kuiInput />
      <span class="kui-affix-spinner" role="status" aria-label="Checking key"></span>
    </div>
  </kui-field>
</div>
```

#### field-input-group-example.ts

```ts
import { Component } from '@angular/core';

import { KuiField, KuiInput, KuiInputGroup } from '@kikita-labs/ui';

@Component({
  selector: 'app-field-input-group-example',
  imports: [KuiField, KuiInput, KuiInputGroup],
  templateUrl: './field-input-group-example.html',
  styleUrl: './field-input-group-example.scss',
})
export class FieldInputGroupExample {}
```

#### field-input-group-example.scss

```scss
.field-input-group-example {
  display: grid;
  gap: var(--kui-space-5, 20px);
  inline-size: min(100%, 24rem);
}
```

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| label | string | - | Visible label shorthand. Prefer this for simple field labels. |
| hint | string | - | Optional help text rendered below the control and wired through aria-describedby. |
| error | string | - | Explicit error text rendered below the control and wired through aria-describedby. |
| hideErrors | boolean | - | Hides automatic, explicit, and projected error messages while keeping invalid state. |
| required | boolean | - | Explicit required marker override. Omit when Signal Forms can infer it. Also drives aria-required on the projected control. |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' | - | Field spacing and projected control size. Falls back to defaults.field.size, then the global defaults.size. |
| [kuiLabel] / [kuiHint] / [kuiError] | marker directives | - | Projected label, hint and error with the same field wiring. kuiError is manual content: render it with @if. |
| [kuiFieldAffix] | directive | - | Prefix, suffix, icon or action chrome inside the field: button hosts get action styling, kui-icon an icon slot, anything else muted text (emphasis input for full color). kuiFieldAffixIcon and kuiFieldAction are explicit overrides. |
| .kui-input-group / KuiInputGroup | class and directive | - | Hand-built input group chrome; the directive delegates clicks on non-interactive chrome to the first enabled control. |
| KuiFieldOptions | interface | - | Shape of defaults.field: clearable, size and hideErrors. Controls inside the field take an explicit field size first, then their own defaults key, then defaults.field.size. |

## Accessibility

Rendered documentation, interactive examples, and the playground live at the HTML route above.

## Playground

Available at /components/field/playground.
