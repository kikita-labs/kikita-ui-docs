# Switch

> Native switch control styling for binary settings.

- Status: available
- Route: /components/switch
- Package: @kikita-labs/ui@0.4.4
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

- `basic-switch-example`
- `switch-size-example`

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
