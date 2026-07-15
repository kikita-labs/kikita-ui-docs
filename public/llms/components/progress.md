# Progress

> Progress status primitive for determinate and indeterminate work.

- Status: available
- Route: /components/progress
- Package: @kikita-labs/ui@0.4.4
- Import: KuiProgressComponent from @kikita-labs/ui
- Source docs: ../kikita-ui/docs/progress.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

Rendered documentation, interactive examples, and the playground live at the HTML route above.

## Examples

Rendered at /components/progress:

- `basic-progress-example`
- `progress-circular-example`
- `progress-color-size-example`

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| type | 'linear' \| 'circular' | 'linear' | Progress shape. |
| value | number \| null | null | Progress value from 0 to 100. Values are clamped visually. null renders the indeterminate animation. |
| color | 'primary' \| 'success' \| 'warning' \| 'danger' \| 'neutral' | 'primary' | Semantic color. |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' | 'md' | Linear thickness or circular diameter. |
| content projection | text \| template | - | Projected content is rendered centered inside circular progress. |

## Accessibility

The host uses `role="progressbar"`, `aria-valuemin="0"`, and
`aria-valuemax="100"`. Determinate progress also sets `aria-valuenow`.

Always provide an accessible name with `aria-label` or `aria-labelledby`.

## Playground

Available at /components/progress/playground.
