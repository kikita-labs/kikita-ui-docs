# Textarea

> Native multiline input styling with field integration.

- Status: available
- Route: /components/textarea
- Package: @kikita-labs/ui@0.4.3
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

- `basic-textarea-example`
- `textarea-invalid-example`
- `textarea-size-example`

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
