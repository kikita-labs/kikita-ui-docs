# Textarea

> Native multiline input styling with field integration.

- Status: available
- Route: /components/textarea
- Package: @kikita-labs/ui@0.7.0
- Import: KuiTextareaDirective from @kikita-labs/ui
- Source docs: ../kikita-ui/docs/textarea.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

```html
<kui-field label="Notes" hint="Internal project note">
  <textarea kuiTextarea rows="4" placeholder="Write a note"></textarea>
</kui-field>
```

## Examples

Rendered at /components/textarea:

### basic-textarea-example

#### basic-textarea-example.html

```html
<div class="basic-textarea-example">
  <kui-field label="Notes" hint="Internal project note">
    <textarea kuiTextarea rows="4" placeholder="Write a note"></textarea>
  </kui-field>
</div>
```

#### basic-textarea-example.ts

```ts
import { Component } from '@angular/core';

import { KuiFieldComponent, KuiTextareaDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-textarea-example',
  imports: [KuiFieldComponent, KuiTextareaDirective],
  templateUrl: './basic-textarea-example.html',
  styleUrl: './basic-textarea-example.scss',
})
export class BasicTextareaExample {}
```

#### basic-textarea-example.scss

```scss
.basic-textarea-example {
  display: grid;
  inline-size: min(100%, 360px);
  gap: var(--kui-space-4, 16px);
}
```

### textarea-invalid-example

#### textarea-invalid-example.html

```html
<div class="textarea-invalid-example">
  <kui-field label="Summary" error="Summary must be at least 20 characters" required>
    <textarea kuiTextarea rows="3" placeholder="Describe the change"></textarea>
  </kui-field>

  <kui-field label="Notes" hint="Standalone invalid state outside field error wiring">
    <textarea kuiTextarea invalid rows="3" placeholder="Write a note"></textarea>
  </kui-field>
</div>
```

#### textarea-invalid-example.ts

```ts
import { Component } from '@angular/core';

import { KuiFieldComponent, KuiTextareaDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-textarea-invalid-example',
  imports: [KuiFieldComponent, KuiTextareaDirective],
  templateUrl: './textarea-invalid-example.html',
  styleUrl: './textarea-invalid-example.scss',
})
export class TextareaInvalidExample {}
```

#### textarea-invalid-example.scss

```scss
.textarea-invalid-example {
  display: grid;
  inline-size: min(100%, 360px);
  gap: var(--kui-space-4, 16px);
}
```

### textarea-size-example

#### textarea-size-example.html

```html
<div class="textarea-size-example">
  <label class="textarea-size-example__option">
    <span>Extra small</span>
    <textarea kuiTextarea size="xs" rows="2" placeholder="Extra small"></textarea>
  </label>
  <label class="textarea-size-example__option">
    <span>Small</span>
    <textarea kuiTextarea size="sm" rows="2" placeholder="Small"></textarea>
  </label>
  <label class="textarea-size-example__option">
    <span>Medium</span>
    <textarea kuiTextarea size="md" rows="2" placeholder="Medium (default)"></textarea>
  </label>
  <label class="textarea-size-example__option">
    <span>Large</span>
    <textarea kuiTextarea size="lg" rows="2" placeholder="Large"></textarea>
  </label>
</div>
```

#### textarea-size-example.ts

```ts
import { Component } from '@angular/core';

import { KuiTextareaDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-textarea-size-example',
  imports: [KuiTextareaDirective],
  templateUrl: './textarea-size-example.html',
  styleUrl: './textarea-size-example.scss',
})
export class TextareaSizeExample {}
```

#### textarea-size-example.scss

```scss
.textarea-size-example {
  display: grid;
  inline-size: min(100%, 360px);
  gap: var(--kui-space-4, 16px);
}

.textarea-size-example__option {
  display: grid;
  gap: var(--kui-space-2, 8px);
  color: var(--kui-color-text-secondary);
  font-size: var(--kui-text-sm-size, 13px);
}
```

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' | 'md' | Textarea height and spacing size, mapped to Kikita UI control tokens. |
| invalid | boolean | false | Marks the textarea invalid outside a kui-field error state. |
| id | string | - | Explicit id override. Inside kui-field, the field id is used when omitted. |

## Accessibility

Rendered documentation, interactive examples, and the playground live at the HTML route above.

## Playground

Available at /components/textarea/playground.
