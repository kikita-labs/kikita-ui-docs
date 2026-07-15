# Icon Button

> Compact icon-only action control.

- Status: available
- Route: /components/icon-button
- Package: @kikita-labs/ui@0.4.2
- Import: KuiIconButtonDirective from @kikita-labs/ui
- Source docs: ../kikita-ui/docs/icon-button.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

```html
<button kuiIconButton aria-label="Close">
  <kui-icon name="x" />
</button>

<button kuiIconButton shape="soft" appearance="success" aria-label="Approve">
  <kui-icon name="check" />
</button>

<a kuiIconButton shape="outline" appearance="primary" href="/settings" aria-label="Settings">
  <kui-icon name="settings" />
</a>
```

## Examples

Rendered at /components/icon-button:

- `icon-button-appearance-example`
- `icon-button-size-example`

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| shape | 'solid' \| 'soft' \| 'outline' \| 'ghost' | 'ghost' | Surface treatment. Defaults to ghost. Combines freely with appearance. |
| appearance | 'primary' \| 'danger' \| 'success' \| 'warning' \| null | null | Semantic color intent. Without an explicit value, solid/soft use primary colors and outline/ghost use neutral defaults. |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' | 'md' | Square control size mapped to Kikita control height tokens (matches kui-input height at md). |
| disabled | boolean | false | Disables native button behavior. Anchor icon buttons receive aria-disabled and leave tab order. |

## Accessibility

Icon-only controls must have an accessible label, normally through `aria-label`. Use native
`button` for actions and `a` for navigation.

Native button and anchor keyboard behavior is preserved. The directive adds no custom key
bindings.

## Playground

Available at /components/icon-button/playground.
