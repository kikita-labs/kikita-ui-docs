# Skeleton

> Loading placeholder with reduced-motion behavior.

- Status: available
- Route: /components/skeleton
- Package: @kikita-labs/ui@1.1.0
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

### skeleton-animation-example

#### skeleton-animation-example.html

```html
<div class="skeleton-animation-example">
  <div class="skeleton-animation-example__stack">
    <span kuiSkeleton shape="heading" style="inline-size: 60%"></span>
    <span kuiSkeleton shape="text" style="inline-size: 100%"></span>
    <span kuiSkeleton shape="text" style="inline-size: 80%"></span>
    <code>shimmer (default)</code>
  </div>
  <div class="skeleton-animation-example__stack">
    <span kuiSkeleton shape="heading" animation="pulse" style="inline-size: 60%"></span>
    <span kuiSkeleton shape="text" animation="pulse" style="inline-size: 100%"></span>
    <span kuiSkeleton shape="text" animation="pulse" style="inline-size: 80%"></span>
    <code>pulse</code>
  </div>
  <div class="skeleton-animation-example__stack">
    <span kuiSkeleton shape="heading" animation="none" style="inline-size: 60%"></span>
    <span kuiSkeleton shape="text" animation="none" style="inline-size: 100%"></span>
    <span kuiSkeleton shape="text" animation="none" style="inline-size: 80%"></span>
    <code>none</code>
  </div>
</div>
```

#### skeleton-animation-example.ts

```ts
import { Component } from '@angular/core';

import { KuiSkeletonDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-skeleton-animation-example',
  imports: [KuiSkeletonDirective],
  templateUrl: './skeleton-animation-example.html',
  styleUrl: './skeleton-animation-example.scss',
})
export class SkeletonAnimationExample {}
```

#### skeleton-animation-example.scss

```scss
.skeleton-animation-example {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: var(--kui-space-6, 24px);
}

.skeleton-animation-example__stack {
  display: grid;
  gap: var(--kui-space-2, 8px);
  align-content: start;
}

.skeleton-animation-example__stack code {
  color: var(--kui-color-text-secondary);
  font-size: var(--kui-text-sm-size, 13px);
}
```

### skeleton-composition-example

#### skeleton-composition-example.html

```html
<article kuiCard class="skeleton-composition-example" aria-busy="true">
  <div class="skeleton-composition-example__row">
    <span kuiSkeleton shape="circle" style="inline-size: 40px"></span>
    <div class="skeleton-composition-example__stack">
      <span kuiSkeleton shape="heading" style="inline-size: 45%"></span>
      <span kuiSkeleton shape="text" style="inline-size: 70%"></span>
    </div>
  </div>

  <div class="skeleton-composition-example__stack">
    <span kuiSkeleton shape="text" style="inline-size: 100%"></span>
    <span kuiSkeleton shape="text" style="inline-size: 88%"></span>
    <span kuiSkeleton shape="text" style="inline-size: 64%"></span>
  </div>

  <span kuiSkeleton shape="button" style="inline-size: 100%"></span>
</article>
```

#### skeleton-composition-example.ts

```ts
import { Component } from '@angular/core';

import { KuiCardDirective, KuiSkeletonDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-skeleton-composition-example',
  imports: [KuiCardDirective, KuiSkeletonDirective],
  templateUrl: './skeleton-composition-example.html',
  styleUrl: './skeleton-composition-example.scss',
})
export class SkeletonCompositionExample {}
```

#### skeleton-composition-example.scss

```scss
.skeleton-composition-example {
  display: grid;
  gap: var(--kui-space-4, 16px);
  max-inline-size: 320px;
}

.skeleton-composition-example__row {
  display: flex;
  align-items: center;
  gap: var(--kui-space-3, 12px);
}

.skeleton-composition-example__stack {
  display: grid;
  gap: var(--kui-space-2, 8px);
  inline-size: 100%;
}
```

### skeleton-shapes-example

#### skeleton-shapes-example.html

```html
<div class="skeleton-shapes-example">
  <div class="skeleton-shapes-example__item">
    <span kuiSkeleton shape="text" style="inline-size: 140px"></span>
    <code>text</code>
  </div>
  <div class="skeleton-shapes-example__item">
    <span kuiSkeleton shape="heading" style="inline-size: 180px"></span>
    <code>heading</code>
  </div>
  <div class="skeleton-shapes-example__item">
    <span kuiSkeleton shape="rect" style="inline-size: 140px; block-size: 64px"></span>
    <code>rect</code>
  </div>
  <div class="skeleton-shapes-example__item">
    <span kuiSkeleton shape="circle" style="inline-size: 40px"></span>
    <code>circle</code>
  </div>
  <div class="skeleton-shapes-example__item">
    <span kuiSkeleton shape="square" style="inline-size: 40px"></span>
    <code>square</code>
  </div>
  <div class="skeleton-shapes-example__item">
    <span kuiSkeleton shape="button" style="inline-size: 96px"></span>
    <code>button</code>
  </div>
  <div class="skeleton-shapes-example__item">
    <span kuiSkeleton shape="badge" style="inline-size: 64px"></span>
    <code>badge</code>
  </div>
</div>
```

#### skeleton-shapes-example.ts

```ts
import { Component } from '@angular/core';

import { KuiSkeletonDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-skeleton-shapes-example',
  imports: [KuiSkeletonDirective],
  templateUrl: './skeleton-shapes-example.html',
  styleUrl: './skeleton-shapes-example.scss',
})
export class SkeletonShapesExample {}
```

#### skeleton-shapes-example.scss

```scss
.skeleton-shapes-example {
  display: flex;
  flex-wrap: wrap;
  gap: var(--kui-space-6, 24px);
}

.skeleton-shapes-example__item {
  display: grid;
  gap: var(--kui-space-2, 8px);
  justify-items: start;
}

.skeleton-shapes-example__item code {
  color: var(--kui-color-text-secondary);
  font-size: var(--kui-text-sm-size, 13px);
}
```

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
