# Input

> Native text input styling with field integration.

- Status: available
- Route: /components/input
- Package: @kikita-labs/ui@2.0.0
- Import: KuiInput from @kikita-labs/ui
- Source docs: https://github.com/kikita-labs/kikita-ui/blob/v2.0.0/docs/input.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

Import the directive where it is used:

```ts
import { KuiInput } from '@kikita-labs/ui';
```

Import the Kikita UI runtime styles once in the application entry point:

```ts
import '@kikita-labs/ui/styles';
```

Use the directive on a native input. Add a native label or `aria-label` when the input is not
inside a labelled Field:

```html
<label for="email">Email</label> <input id="email" kuiInput type="email" autocomplete="email" />
```

Inside `kui-field`, the Field supplies the visible label and wires its generated control id,
hint, error, and invalid state:

```html
<kui-field label="Email" hint="Use your work email">
  <input kuiInput type="email" autocomplete="email" />
</kui-field>
```

Use `textarea[kuiTextarea]` for multiline controls. Use the dedicated Kikita UI controls for
specialized number, color, date, selection, and other input behaviors.

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

import { KuiInput } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-input-example',
  imports: [KuiInput],
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
<kui-field label="Project URL" hint="Affixes are visual field chrome." class="input-group-example">
  <span kuiFieldAffix>https://</span>
  <input kuiInput aria-label="Project slug" value="kikita-ui" />
  <span kuiFieldAffix>.dev</span>
</kui-field>
```

#### input-group-example.ts

```ts
import { Component } from '@angular/core';

import { KuiField, KuiFieldAffix, KuiInput } from '@kikita-labs/ui';

@Component({
  selector: 'app-input-group-example',
  imports: [KuiFieldAffix, KuiField, KuiInput],
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
| size | 'xs' \| 'sm' \| 'md' \| 'lg' \| undefined | undefined | Resolved in order: local size, parent Field effective size, defaults.input.size, root defaults.size, then md. The resolved value is written to data-kui-size. |
| invalid | boolean | false | Marks a standalone input (or one outside a Field error state) invalid: sets data-kui-invalid and aria-invalid="true". With [formField] the Field state wins and this binding is not a manual override. |
| id | string \| undefined | undefined | Inside a Field, omitted uses the Field generated control id; outside, no id is added. An explicit id can leave the Field label for attribute pointing elsewhere. |
| KuiInputOptions | interface | - | Shape of defaults.input: size. |

## Accessibility

- Keep the native `<input>` semantics; do not add an ARIA role to it.
- Give every input an accessible name through a `kui-field` label, an associated native `<label>`,
  or `aria-label`. Placeholder text alone is not a label.
- The directive uses the containing Field's control id and references only its currently rendered
  hint and error with `aria-describedby`. The Field exposes a visible error as `role="alert"`.
- `aria-invalid` is omitted when the input is valid. When invalid, the directive sets
  `aria-invalid="true"` and the `data-kui-invalid` styling hook.
- Keep native `disabled` and `readonly` distinct. A disabled input is not available for normal
  interaction; a read-only input remains a native focusable control whose value cannot be edited.
  Required semantics come from native HTML or Signal Forms, not from the Field's visual required
  marker.

## Playground

Available at /components/input/playground.
