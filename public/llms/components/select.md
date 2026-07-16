# Select

> Dropdown-backed selection control for single and multiple values.

- Status: available
- Route: /components/select
- Package: @kikita-labs/ui@0.4.6
- Import: KuiSelectDirective from @kikita-labs/ui
- Source docs: ../kikita-ui/docs/select.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

```html
<kui-field label="Role">
  <input kuiSelect [(value)]="role" placeholder="Select a role..." />
  <kui-dropdown>
    <div kuiOption value="engineer">Software Engineer</div>
    <div kuiOption value="designer">Designer</div>
  </kui-dropdown>
</kui-field>
```

```ts
role = signal<string | null>(null);
```

## Examples

Rendered at /components/select:

### basic-select-example

#### basic-select-example.html

```html
<kui-field label="Role" hint="Pick one role for the user">
  <input kuiSelect [(value)]="role" placeholder="Select a role..." [clearable]="true" />
  <kui-dropdown>
    <div kuiOption value="engineer">Software Engineer</div>
    <div kuiOption value="designer">Designer</div>
    <div kuiOption value="manager">Product Manager</div>
  </kui-dropdown>
</kui-field>
```

#### basic-select-example.ts

```ts
import { Component, signal } from '@angular/core';

import {
  KuiDropdownComponent,
  KuiFieldComponent,
  KuiOptionDirective,
  KuiSelectDirective,
} from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-select-example',
  imports: [KuiDropdownComponent, KuiFieldComponent, KuiOptionDirective, KuiSelectDirective],
  templateUrl: './basic-select-example.html',
  styleUrl: './basic-select-example.scss',
})
export class BasicSelectExample {
  protected readonly role = signal<string | null>(null);
}
```

#### basic-select-example.scss

```scss
:host {
  display: block;
  inline-size: min(100%, 360px);
}
```

### multiple-select-example

#### multiple-select-example.html

```html
<kui-field label="Roles" hint="Multiple mode renders selected values as chips">
  <input
    kuiSelect
    multiple
    [(value)]="roles"
    [kuiLabelFn]="roleLabel"
    [maxVisibleChips]="3"
    placeholder="Select roles..."
    [clearable]="true"
  />
  <kui-dropdown>
    @for (role of roleOptions; track role.value) {
      <div kuiOption [value]="role.value">{{ role.label }}</div>
    }
  </kui-dropdown>
</kui-field>
```

#### multiple-select-example.ts

```ts
import { Component, signal } from '@angular/core';

import {
  KuiDropdownComponent,
  KuiFieldComponent,
  KuiOptionDirective,
  KuiSelectDirective,
} from '@kikita-labs/ui';

interface RoleOption {
  readonly label: string;
  readonly value: string;
}

@Component({
  selector: 'app-multiple-select-example',
  imports: [KuiDropdownComponent, KuiFieldComponent, KuiOptionDirective, KuiSelectDirective],
  templateUrl: './multiple-select-example.html',
  styleUrl: './multiple-select-example.scss',
})
export class MultipleSelectExample {
  protected readonly roles = signal<readonly string[]>(['engineer']);

  protected readonly roleOptions: readonly RoleOption[] = [
    { label: 'Software Engineer', value: 'engineer' },
    { label: 'Designer', value: 'designer' },
    { label: 'Product Manager', value: 'manager' },
    { label: 'Support Lead', value: 'support' },
  ];

  protected readonly roleLabel = (value: string): string =>
    this.roleOptions.find((role) => role.value === value)?.label ?? value;
}
```

#### multiple-select-example.scss

```scss
:host {
  display: block;
  inline-size: min(100%, 420px);
}
```

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| value | T \| readonly T[] \| null | - | Selected value. In multiple mode this is an array. |
| disabled | boolean | - | Disables the native input and prevents opening the dropdown. |
| readonly | boolean | - | Prevents opening the dropdown while keeping the field visually enabled. |
| invalid | boolean | - | Validation state set by Signal Forms or direct input binding. |
| errors | ValidationError[] | - | Validation errors consumed by kui-field for automatic error text. |
| touched | boolean | - | Touched state set by Signal Forms. |
| id | string | - | Explicit id override. Inside kui-field, the field id is used when omitted. |
| multiple | boolean | - | Enables array values and keeps the dropdown open on option selection. |
| maxVisibleChips | number \| undefined | - | Maximum selected chips shown before collapsed +N overflow. |
| multipleDisplay | 'chips' \| 'text' | - | Renders multiple selections as field chips or plain joined text. |
| multipleTextFn | (items: readonly T[]) => string | - | Formats native input text when multipleDisplay is text. |
| kuiLabelFn | (item: T) => string | - | Maps selected object values to display text. |
| placeholder | string | - | Placeholder on the readonly input. |
| clearable | boolean \| undefined | - | Shows a clear button when a value is selected; falls back to provider options. |
| touch | output | - | Emitted after an opened dropdown closes for Signal Forms support. |

## Accessibility

- The input uses `role="combobox"`, `aria-haspopup="listbox"`, and `aria-expanded`.
- The dropdown panel uses `role="listbox"`.
- Each `kuiOption` uses `role="option"`, `aria-selected`, and `aria-disabled`.
- The clear button is a native button with `aria-label="Clear"`.
- Multiple selected values render removable chip buttons inside the field.
- Custom selected value templates receive `item`, `label`, and `remove` context values.
- `maxVisibleChips` is count-based. It does not currently auto-measure field width.
- Use `kui-field` for label, hint, error, `aria-describedby`, and `aria-invalid` wiring.

## Playground

Available at /components/select/playground.
