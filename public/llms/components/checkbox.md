# Checkbox

> Native checkbox styling with field state integration.

- Status: available
- Route: /components/checkbox
- Package: @kikita-labs/ui@0.4.4
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

- `basic-checkbox-example`
- `checkbox-size-example`

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
