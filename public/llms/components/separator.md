# Separator

> Tokenized horizontal or vertical separator primitive.

- Status: available
- Route: /components/separator
- Package: @kikita-labs/ui@0.4.3
- Import: KuiSeparatorDirective from @kikita-labs/ui
- Source docs: ../kikita-ui/docs/separator.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

```html
<section>
  <p>Account details</p>
  <hr kuiSeparator />
  <p>Billing details</p>
</section>
```

Use the native `<hr>` host. Do not use a `div` for purely visual separators
unless a future primitive explicitly supports it.

## Examples

Rendered at /components/separator:

- `basic-separator-example`
- `separator-appearance-example`
- `separator-spacing-example`
- `separator-vertical-example`

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| appearance | 'subtle' \| 'default' \| 'strong' | 'default' | Visual divider emphasis. |
| orientation | 'horizontal' \| 'vertical' | 'horizontal' | Divider direction. Vertical separators set aria-orientation="vertical" and stretch to the parent block size. |
| spacing | 'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' | 'sm' | Outer spacing around the divider line. |

## Accessibility

- Prefer native `<hr kuiSeparator>`.
- The separator is not focusable and has no hover, focus, active, or disabled
  states.
- Vertical separators expose `aria-orientation="vertical"`.
- Do not add labels by default; named separators should be rare structural
  boundaries.

## Playground

Available at /components/separator/playground.
