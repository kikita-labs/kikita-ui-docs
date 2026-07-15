# Loader

> Inline loading indicator for buttons and status areas.

- Status: available
- Route: /components/loader
- Package: @kikita-labs/ui@0.4.3
- Import: KuiLoaderDirective from @kikita-labs/ui
- Source docs: ../kikita-ui/docs/loader.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

```html
<span kuiLoader label="Loading"></span>

<button kuiButton disabled>
  <span kuiLoader size="sm" label="Saving"></span>
  Saving
</button>
```

The directive sets `role="status"` and `aria-live="polite"`.

## Examples

Rendered at /components/loader:

- `basic-loader-example`
- `loader-button-example`
- `loader-size-example`

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' | 'md' | Loader size mapped to Kikita UI loader tokens. |
| label | string | 'Loading' | Accessible label rendered as aria-label. Also announced through the host role="status" and aria-live="polite". |
| --kui-loader-size | CSS custom property | - | Overrides the rendered loader diameter for the current size step. |
| --kui-loader-track | CSS custom property | - | Overrides the loader track (background ring) color. |
| --kui-loader-fill | CSS custom property | - | Overrides the loader spinning fill color. |
| --kui-loader-border-width | CSS custom property | - | Overrides the loader ring stroke width. |
| --kui-loader-duration | CSS custom property | - | Overrides the spin animation duration. |

## Accessibility

Rendered documentation, interactive examples, and the playground live at the HTML route above.

## Playground

Available at /components/loader/playground.
