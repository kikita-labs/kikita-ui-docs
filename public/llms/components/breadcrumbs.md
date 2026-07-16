# Breadcrumbs

> Hierarchy trail.

- Status: available
- Route: /components/breadcrumbs
- Package: @kikita-labs/ui@0.4.4
- Import: KuiBreadcrumbsDirective from @kikita-labs/ui
- Source docs: ../kikita-ui/docs/breadcrumbs.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

```html
<nav aria-label="Breadcrumb">
  <ol kuiBreadcrumbs>
    <li><a kuiBreadcrumbItem href="/components">Components</a></li>
    <li kuiBreadcrumbSeparator></li>
    <li><a kuiBreadcrumbItem href="/components/actions">Actions</a></li>
    <li kuiBreadcrumbSeparator></li>
    <li><span kuiBreadcrumbItem current>Icon Button</span></li>
  </ol>
</nav>
```

### Plain-text (non-link) crumb

Use a `<span kuiBreadcrumbItem>` without `current` for a grouping crumb that has no page of its own:

```html
<li><a kuiBreadcrumbItem href="/catalog">Catalog</a></li>
<li kuiBreadcrumbSeparator></li>
<li><span kuiBreadcrumbItem>Electronics</span></li>
<li kuiBreadcrumbSeparator></li>
<li><span kuiBreadcrumbItem current>Headphones</span></li>
```

### Leading icon

At most one optional leading icon, on the first crumb only:

```html
<li>
  <a kuiBreadcrumbItem href="/">
    <span class="kui-breadcrumb-icon"><svg>...</svg></span>
  </a>
</li>
```

### Sizes

```html
<ol kuiBreadcrumbs size="sm">
  ...
</ol>
<ol kuiBreadcrumbs size="lg">
  ...
</ol>
```

### Responsive / narrow screens

The library does not enforce a single collapse strategy; pick the one that fits the consumer app and hierarchy depth:

- **Truncate a middle crumb** — add `.kui-breadcrumb-truncate` to the `<a>`/`<span>` that should shrink with an ellipsis; keep the trail's `<ol>` non-wrapping (`style="flex-wrap: nowrap"`).
- **Collapse behind an ellipsis menu** — render a `<button class="kui-breadcrumb-ellipsis">` in place of the hidden crumbs and wire it to an existing `kui-menu`/`kui-dropdown` listing the hidden levels. Breadcrumbs does not manage this menu itself.
- **First + last only** — drop the middle crumbs and separators entirely at the narrowest breakpoint.

## Examples

Rendered at /components/breadcrumbs:

### basic-breadcrumbs-example

#### basic-breadcrumbs-example.html

```html
<nav class="basic-breadcrumbs-example" aria-label="Breadcrumb">
  <ol kuiBreadcrumbs>
    <li><a kuiBreadcrumbItem href="/components">Components</a></li>
    <li kuiBreadcrumbSeparator></li>
    <li><span kuiBreadcrumbItem>Surfaces</span></li>
    <li kuiBreadcrumbSeparator></li>
    <li><span kuiBreadcrumbItem current>Breadcrumbs</span></li>
  </ol>
</nav>
```

#### basic-breadcrumbs-example.ts

```ts
import { Component } from '@angular/core';

import {
  KuiBreadcrumbItemDirective,
  KuiBreadcrumbsDirective,
  KuiBreadcrumbSeparatorComponent,
} from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-breadcrumbs-example',
  imports: [KuiBreadcrumbItemDirective, KuiBreadcrumbSeparatorComponent, KuiBreadcrumbsDirective],
  templateUrl: './basic-breadcrumbs-example.html',
  styleUrl: './basic-breadcrumbs-example.scss',
})
export class BasicBreadcrumbsExample {}
```

#### basic-breadcrumbs-example.scss

```scss
.basic-breadcrumbs-example {
  min-width: 0;
}
```

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| ol[kuiBreadcrumbs].size | 'sm' \| 'md' \| 'lg' | 'md' | Font size, separator scale, and spacing for the full trail. |
| a[kuiBreadcrumbItem] | directive | - | Native link crumb for navigable hierarchy levels. |
| span[kuiBreadcrumbItem] | directive | - | Plain-text crumb for grouping labels or the current page. |
| span[kuiBreadcrumbItem].current | boolean | false | Marks the final crumb as the current page and sets aria-current. |
| li[kuiBreadcrumbSeparator] | component | - | Decorative separator list item hidden from assistive technology. |

## Accessibility

- Wrap the trail in `<nav aria-label="Breadcrumb">` (or a localized label).
- `[kuiBreadcrumbs]` sets `role="list"` on the `<ol>` to restore list semantics after `list-style: none`.
- Link crumbs are native `<a>`, focusable with a visible `:focus-visible` ring.
- The current crumb is a `<span aria-current="page">`, not a link, and is not in tab order.
- `[kuiBreadcrumbSeparator]` renders a decorative chevron `<li aria-hidden="true">`, never read by assistive technology.

## Playground

Available at /components/breadcrumbs/playground.
