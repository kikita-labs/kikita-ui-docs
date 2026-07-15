# Radio

> Native radio control styling for exclusive choices.

- Status: available
- Route: /components/radio
- Package: @kikita-labs/ui@0.4.4
- Import: KuiRadioDirective from @kikita-labs/ui
- Source docs: ../kikita-ui/docs/radio.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

```html
<kui-field label="Plan" hint="Choose a billing plan">
  <div role="radiogroup">
    <label>
      <input kuiRadio type="radio" name="plan" value="starter" />
      Starter
    </label>
    <label>
      <input kuiRadio type="radio" name="plan" value="pro" />
      Pro
    </label>
  </div>
</kui-field>
```

Use a shared native `name` for mutually exclusive radio choices. Use `kui-field` for the
field-level label, hint, error, and description wiring; keep native labels for each option.

## Examples

Rendered at /components/radio:

- `basic-radio-example`
- `radio-disabled-example`
- `radio-invalid-example`
- `radio-size-example`

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' | - | Radio size mapped to Kikita radio tokens. |
| invalid | boolean | - | Marks the radio invalid outside a kui-field error state. |
| id | string \| undefined | - | Explicit id override. Inside kui-field, the field id is used when omitted. |

## Accessibility

Rendered documentation, interactive examples, and the playground live at the HTML route above.

## Playground

Available at /components/radio/playground.
