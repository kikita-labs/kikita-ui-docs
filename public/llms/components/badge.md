# Badge

> Compact status or metadata marker.

- Status: available
- Route: /components/badge
- Package: @kikita-labs/ui@0.4.4
- Import: KuiBadgeDirective from @kikita-labs/ui
- Source docs: ../kikita-ui/docs/badge.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

```html
<span kuiBadge>Neutral</span>
<span kuiBadge appearance="success">Ready</span>
<span kuiBadge appearance="danger">Error</span>
```

`kuiBadge` is an attribute directive so it can be used on inline semantic elements such as `span`,
`strong`, `code`, or `a`.

## Examples

Rendered at /components/badge:

- `badge-appearance-example`
- `badge-size-example`
- `basic-badge-example`

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| appearance | 'neutral' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' | 'neutral' | Visual badge treatment mapped to Kikita UI status tokens. |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' | 'md' | Badge size mapped to Kikita UI text and spacing tokens. |
| --kui-badge-height | CSS length | 22px | Badge block size. Overridden per size by the size input. |
| --kui-badge-px | CSS length | 8px | Inline padding. Overridden per size by the size input. |
| --kui-badge-radius | CSS length | var(--kui-radius-full) | Corner radius of the badge surface. |
| --kui-badge-font-size | CSS length | 11px | Badge label font size. Overridden per size by the size input. |
| --kui-badge-neutral-bg | CSS color | - | Background color for the neutral appearance (default). |
| --kui-badge-primary-bg | CSS color | - | Background color for the primary appearance. |
| --kui-badge-success-bg | CSS color | - | Background color for the success appearance. |
| --kui-badge-warning-bg | CSS color | - | Background color for the warning appearance. |
| --kui-badge-danger-bg | CSS color | - | Background color for the danger appearance. |
| --kui-badge-info-bg | CSS color | - | Background color for the info appearance. |

## Accessibility

Rendered documentation, interactive examples, and the playground live at the HTML route above.

## Playground

Available at /components/badge/playground.
