# Field

> Label, hint, error, and form-control composition.

- Status: available
- Route: /components/field
- Package: @kikita-labs/ui@0.4.2
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

- `basic-field-example`

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
