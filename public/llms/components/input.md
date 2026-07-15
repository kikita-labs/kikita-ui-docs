# Input

> Native text input styling with field integration.

- Status: available
- Route: /components/input
- Package: @kikita-labs/ui@0.4.3
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

- `basic-input-example`
- `input-group-example`

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
