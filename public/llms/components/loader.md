# Loader

> Inline loading indicator for buttons and status areas.

- Status: available
- Route: /components/loader
- Package: @kikita-labs/ui@0.6.2
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

### basic-loader-example

#### basic-loader-example.html

```html
<div class="loader-example">
  <span kuiLoader label="Loading"></span>
</div>
```

#### basic-loader-example.ts

```ts
import { Component } from '@angular/core';

import { KuiLoaderDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-loader-example',
  imports: [KuiLoaderDirective],
  templateUrl: './basic-loader-example.html',
  styleUrl: './basic-loader-example.scss',
})
export class BasicLoaderExample {}
```

#### basic-loader-example.scss

```scss
.loader-example {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### loader-button-example

#### loader-button-example.html

```html
<div class="loader-button-example">
  <button kuiButton type="button" disabled>
    <span kuiLoader size="sm" label="Saving"></span>
    Saving
  </button>

  <button kuiButton type="button" loading>Saving</button>
</div>
```

#### loader-button-example.ts

```ts
import { Component } from '@angular/core';

import { KuiButtonDirective, KuiLoaderDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-loader-button-example',
  imports: [KuiButtonDirective, KuiLoaderDirective],
  templateUrl: './loader-button-example.html',
  styleUrl: './loader-button-example.scss',
})
export class LoaderButtonExample {}
```

#### loader-button-example.scss

```scss
.loader-button-example {
  display: flex;
  flex-wrap: wrap;
  gap: var(--kui-space-3, 12px);
  align-items: center;
  justify-content: center;
}
```

### loader-size-example

#### loader-size-example.html

```html
<div class="loader-size-example">
  <span kuiLoader size="xs" label="Loading extra small"></span>
  <span kuiLoader size="sm" label="Loading small"></span>
  <span kuiLoader size="md" label="Loading medium"></span>
  <span kuiLoader size="lg" label="Loading large"></span>
</div>
```

#### loader-size-example.ts

```ts
import { Component } from '@angular/core';

import { KuiLoaderDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-loader-size-example',
  imports: [KuiLoaderDirective],
  templateUrl: './loader-size-example.html',
  styleUrl: './loader-size-example.scss',
})
export class LoaderSizeExample {}
```

#### loader-size-example.scss

```scss
.loader-size-example {
  display: flex;
  flex-wrap: wrap;
  gap: var(--kui-space-4, 16px);
  align-items: center;
  justify-content: center;
}
```

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
