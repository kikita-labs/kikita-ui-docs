# Select

> Dropdown-backed selection control for single and multiple values.

- Status: available
- Route: /components/select
- Package: @kikita-labs/ui@0.4.3
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

- `basic-select-example`
- `multiple-select-example`

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
