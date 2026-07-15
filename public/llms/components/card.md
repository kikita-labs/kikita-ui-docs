# Card

> Surface, elevated, and sunken content container.

- Status: available
- Route: /components/card
- Package: @kikita-labs/ui@0.4.3
- Import: KuiCardDirective from @kikita-labs/ui
- Source docs: ../kikita-ui/docs/card.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

```html
<article kuiCard>
  <h3>Default surface</h3>
  <p>Grouped content with Kikita border, radius, and surface tokens.</p>
</article>

<button kuiCard interactive type="button">Interactive card</button>
```

Use real semantic elements: `article`, `section`, `aside`, `button`, or `a` depending on behavior.

## Examples

Rendered at /components/card:

- `basic-card-example`
- `card-appearance-example`
- `card-interactive-example`
- `card-size-example`

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| appearance | 'surface' \| 'elevated' \| 'sunken' | 'surface' | Visual surface treatment: flat surface, elevated shadow, or sunken inset. |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' | 'md' | Card padding size, mapped to the shared Kikita size scale. |
| interactive | boolean | false | Enables hover and focus-visible affordances for clickable cards. Does not add semantics or keyboard behavior; choose an interactive host element (button, a) for that. |

## Accessibility

Rendered documentation, interactive examples, and the playground live at the HTML route above.

## Playground

Available at /components/card/playground.
