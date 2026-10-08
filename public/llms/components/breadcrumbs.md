# Breadcrumbs

> Hierarchy trail.

- Status: available
- Route: /components/breadcrumbs
- Package: @kikita-labs/ui@2.0.0
- Import: KuiBreadcrumbs from @kikita-labs/ui
- Source docs: https://github.com/kikita-labs/kikita-ui/blob/v2.0.0/docs/breadcrumbs.md

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

import { KuiBreadcrumbItem, KuiBreadcrumbs, KuiBreadcrumbSeparator } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-breadcrumbs-example',
  imports: [KuiBreadcrumbItem, KuiBreadcrumbSeparator, KuiBreadcrumbs],
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

### breadcrumbs-size-example

#### breadcrumbs-size-example.html

```html
<div class="breadcrumbs-size-example">
  <nav aria-label="Small breadcrumb">
    <ol kuiBreadcrumbs size="sm">
      <li><a kuiBreadcrumbItem href="/components">Components</a></li>
      <li kuiBreadcrumbSeparator></li>
      <li><span kuiBreadcrumbItem current>Small</span></li>
    </ol>
  </nav>

  <nav aria-label="Medium breadcrumb">
    <ol kuiBreadcrumbs>
      <li><a kuiBreadcrumbItem href="/components">Components</a></li>
      <li kuiBreadcrumbSeparator></li>
      <li><span kuiBreadcrumbItem current>Medium</span></li>
    </ol>
  </nav>

  <nav aria-label="Large breadcrumb">
    <ol kuiBreadcrumbs size="lg">
      <li><a kuiBreadcrumbItem href="/components">Components</a></li>
      <li kuiBreadcrumbSeparator></li>
      <li><span kuiBreadcrumbItem current>Large</span></li>
    </ol>
  </nav>
</div>
```

#### breadcrumbs-size-example.ts

```ts
import { Component } from '@angular/core';

import { KuiBreadcrumbItem, KuiBreadcrumbs, KuiBreadcrumbSeparator } from '@kikita-labs/ui';

@Component({
  selector: 'app-breadcrumbs-size-example',
  imports: [KuiBreadcrumbItem, KuiBreadcrumbSeparator, KuiBreadcrumbs],
  templateUrl: './breadcrumbs-size-example.html',
  styleUrl: './breadcrumbs-size-example.scss',
})
export class BreadcrumbsSizeExample {}
```

#### breadcrumbs-size-example.scss

```scss
.breadcrumbs-size-example {
  display: grid;
  gap: var(--kui-space-3, 12px);
  min-inline-size: 0;
}
```

### breadcrumbs-collapse-example

#### breadcrumbs-collapse-example.html

```html
<div class="breadcrumbs-collapse-example">
  <nav aria-label="Truncated breadcrumb">
    <ol kuiBreadcrumbs class="breadcrumbs-collapse-example__trail">
      <li><a kuiBreadcrumbItem href="#catalog">Catalog</a></li>
      <li kuiBreadcrumbSeparator></li>
      <li>
        <a kuiBreadcrumbItem class="kui-breadcrumb-truncate" href="#audio">
          Audio equipment and accessories
        </a>
      </li>
      <li kuiBreadcrumbSeparator></li>
      <li><span kuiBreadcrumbItem current>Headphones</span></li>
    </ol>
  </nav>

  <nav aria-label="Collapsed breadcrumb">
    <ol kuiBreadcrumbs>
      <li><a kuiBreadcrumbItem href="#catalog">Catalog</a></li>
      <li kuiBreadcrumbSeparator></li>
      <li>
        <button
          class="kui-breadcrumb-ellipsis"
          type="button"
          aria-label="Show hidden levels"
          [kuiMenuFor]="hiddenLevels"
        >
          &hellip;
        </button>
      </li>
      <li kuiBreadcrumbSeparator></li>
      <li><span kuiBreadcrumbItem current>Headphones</span></li>
    </ol>
  </nav>

  <kui-menu #hiddenLevels ariaLabel="Hidden levels">
    <a kuiMenuItem href="#electronics">Electronics</a>
    <a kuiMenuItem href="#audio">Audio</a>
  </kui-menu>
</div>
```

#### breadcrumbs-collapse-example.ts

```ts
import { Component } from '@angular/core';

import {
  KuiBreadcrumbItem,
  KuiBreadcrumbs,
  KuiBreadcrumbSeparator,
  KuiMenu,
  KuiMenuFor,
  KuiMenuItem,
} from '@kikita-labs/ui';

@Component({
  selector: 'app-breadcrumbs-collapse-example',
  imports: [
    KuiBreadcrumbItem,
    KuiBreadcrumbSeparator,
    KuiBreadcrumbs,
    KuiMenu,
    KuiMenuFor,
    KuiMenuItem,
  ],
  templateUrl: './breadcrumbs-collapse-example.html',
  styleUrl: './breadcrumbs-collapse-example.scss',
})
export class BreadcrumbsCollapseExample {}
```

#### breadcrumbs-collapse-example.scss

```scss
.breadcrumbs-collapse-example {
  display: grid;
  gap: var(--kui-space-4, 16px);
  min-inline-size: 0;
}

.breadcrumbs-collapse-example__trail {
  flex-wrap: nowrap;
  max-inline-size: 20rem;
}
```

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| ol[kuiBreadcrumbs].size | 'sm' \| 'md' \| 'lg' | 'md' | Font size, separator scale, and spacing for the full trail. Falls back to defaults.breadcrumbs.size, then the global defaults.size. |
| a[kuiBreadcrumbItem] | directive | - | Native link crumb for navigable hierarchy levels. |
| span[kuiBreadcrumbItem] | directive | - | Plain-text crumb for grouping labels or the current page. |
| span[kuiBreadcrumbItem].current | boolean | false | Marks the final crumb as the current page and sets aria-current. |
| li[kuiBreadcrumbSeparator] | component | - | Decorative separator list item hidden from assistive technology. |
| .kui-breadcrumb-truncate | CSS class | - | Added to the crumb that should shrink with an ellipsis; keep the trail non-wrapping. The maximum width is --kui-breadcrumb-truncate-max-width. |
| button.kui-breadcrumb-ellipsis | CSS class | - | Styles a button that stands in for hidden crumbs. Breadcrumbs does not manage the menu; wire it to kui-menu or kui-dropdown yourself. |
| span.kui-breadcrumb-icon | CSS class | - | Optional leading icon wrapper, on the first crumb only. |
| KuiBreadcrumbsOptions | interface | - | Shape of defaults.breadcrumbs: size and separatorIcon (takes precedence over defaults.icons.separator). |

## Accessibility

- Wrap the trail in `<nav aria-label="Breadcrumb">` (or a localized label).
- `[kuiBreadcrumbs]` sets `role="list"` on the `<ol>` to restore list semantics after `list-style: none`.
- Link crumbs are native `<a>`, focusable with a visible `:focus-visible` ring.
- The current crumb is a `<span aria-current="page">`, not a link, and is not in tab order.
- `[kuiBreadcrumbSeparator]` renders a decorative chevron `<li aria-hidden="true">`, never read by assistive technology.

Breadcrumb links intentionally do not compose `[kuiLink]`. Breadcrumbs owns its
navigation-specific spacing, responsive size scale, color tokens, separator
relationship, and current-page treatment; applying generic Link styling would
create competing visual contracts. Keep navigable crumbs as native anchors with
`[kuiBreadcrumbItem]`.

## Playground

Available at /components/breadcrumbs/playground.
