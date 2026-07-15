# Skeleton

> Loading placeholder with reduced-motion behavior.

- Status: available
- Route: /components/skeleton
- Package: @kikita-labs/ui@0.4.2
- Import: KuiSkeletonDirective from @kikita-labs/ui
- Source docs: ../kikita-ui/docs/skeleton.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

```html
<section aria-busy="true">
  <span kuiSkeleton shape="heading" style="inline-size: 180px"></span>
  <span kuiSkeleton shape="text" style="inline-size: 80%"></span>
  <span kuiSkeleton shape="button" style="inline-size: 96px"></span>
</section>
```

Skeleton hosts are automatically `aria-hidden="true"`. Put `aria-busy="true"` on the loading
region, not on every skeleton block.

## Examples

Rendered at /components/skeleton:

- `skeleton-animation-example`
- `skeleton-composition-example`
- `skeleton-shapes-example`

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| shape | 'text' \| 'heading' \| 'rect' \| 'circle' \| 'square' \| 'button' \| 'badge' | 'rect' | Placeholder shape mapped to Kikita UI skeleton geometry tokens. |
| animation | 'shimmer' \| 'pulse' \| 'none' | 'shimmer' | Placeholder animation mode. Automatically disabled when the user prefers reduced motion, regardless of this value. |

## Accessibility

- Skeleton is decorative placeholder chrome and must not expose text to assistive technology.
- Do not make skeleton hosts focusable or interactive.
- Use Loader instead when the UI needs an announced loading status.
- Respect `prefers-reduced-motion`; Kikita disables skeleton animation under reduced motion.

## Playground

Available at /components/skeleton/playground.
