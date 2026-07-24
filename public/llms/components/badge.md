# Badge

> Compact status or metadata marker.

- Status: available
- Route: /components/badge
- Package: @kikita-labs/ui@1.1.0
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

### badge-appearance-example

#### badge-appearance-example.html

```html
<div class="badge-appearance-example">
  <span kuiBadge appearance="neutral">Neutral</span>
  <span kuiBadge appearance="primary">Primary</span>
  <span kuiBadge appearance="success">Success</span>
  <span kuiBadge appearance="warning">Warning</span>
  <span kuiBadge appearance="danger">Danger</span>
  <span kuiBadge appearance="info">Info</span>
</div>
```

#### badge-appearance-example.ts

```ts
import { Component } from '@angular/core';

import { KuiBadgeDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-badge-appearance-example',
  imports: [KuiBadgeDirective],
  templateUrl: './badge-appearance-example.html',
  styleUrl: './badge-appearance-example.scss',
})
export class BadgeAppearanceExample {}
```

#### badge-appearance-example.scss

```scss
.badge-appearance-example {
  display: flex;
  flex-wrap: wrap;
  gap: var(--kui-space-3, 12px);
  align-items: center;
  justify-content: center;
}
```

### badge-size-example

#### badge-size-example.html

```html
<div class="badge-size-example">
  <span kuiBadge size="xs" appearance="primary">Extra small</span>
  <span kuiBadge size="sm" appearance="primary">Small</span>
  <span kuiBadge size="md" appearance="primary">Medium</span>
  <span kuiBadge size="lg" appearance="primary">Large</span>
</div>
```

#### badge-size-example.ts

```ts
import { Component } from '@angular/core';

import { KuiBadgeDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-badge-size-example',
  imports: [KuiBadgeDirective],
  templateUrl: './badge-size-example.html',
  styleUrl: './badge-size-example.scss',
})
export class BadgeSizeExample {}
```

#### badge-size-example.scss

```scss
.badge-size-example {
  display: flex;
  flex-wrap: wrap;
  gap: var(--kui-space-3, 12px);
  align-items: center;
  justify-content: center;
}
```

### basic-badge-example

#### basic-badge-example.html

```html
<div class="badge-example">
  <span kuiBadge>Neutral</span>
  <strong kuiBadge appearance="success">Ready</strong>
  <code kuiBadge appearance="warning">Review</code>
  <a kuiBadge appearance="info" href="#api">API reference</a>
</div>
```

#### basic-badge-example.ts

```ts
import { Component } from '@angular/core';

import { KuiBadgeDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-badge-example',
  imports: [KuiBadgeDirective],
  templateUrl: './basic-badge-example.html',
  styleUrl: './basic-badge-example.scss',
})
export class BasicBadgeExample {}
```

#### basic-badge-example.scss

```scss
.badge-example {
  display: flex;
  flex-wrap: wrap;
  gap: var(--kui-space-3, 12px);
  align-items: center;
  justify-content: center;
}
```

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
