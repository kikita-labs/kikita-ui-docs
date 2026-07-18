# Card

> Surface, elevated, and sunken content container.

- Status: available
- Route: /components/card
- Package: @kikita-labs/ui@0.7.0
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

### basic-card-example

#### basic-card-example.html

```html
<article kuiCard>
  <h3>Default surface</h3>
  <p>Grouped content with Kikita border, radius, and surface tokens.</p>
</article>
```

#### basic-card-example.ts

```ts
import { Component } from '@angular/core';

import { KuiCardDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-card-example',
  imports: [KuiCardDirective],
  templateUrl: './basic-card-example.html',
  styleUrl: './basic-card-example.scss',
})
export class BasicCardExample {}
```

#### basic-card-example.scss

```scss
:host {
  display: block;
  max-inline-size: 320px;
}
```

### card-appearance-example

#### card-appearance-example.html

```html
<article kuiCard appearance="surface">
  <h3>Surface</h3>
  <p>Default flat card surface.</p>
</article>
<article kuiCard appearance="elevated">
  <h3>Elevated</h3>
  <p>Raised shadow for content that floats above the page.</p>
</article>
<article kuiCard appearance="sunken">
  <h3>Sunken</h3>
  <p>Inset surface for nested or secondary content.</p>
</article>
```

#### card-appearance-example.ts

```ts
import { Component } from '@angular/core';

import { KuiCardDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-card-appearance-example',
  imports: [KuiCardDirective],
  templateUrl: './card-appearance-example.html',
  styleUrl: './card-appearance-example.scss',
})
export class CardAppearanceExample {}
```

#### card-appearance-example.scss

```scss
:host {
  display: grid;
  gap: var(--kui-space-4, 16px);
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  inline-size: 100%;
}
```

### card-interactive-example

#### card-interactive-example.html

```html
<button kuiCard interactive type="button" class="card-interactive-example__button">
  <h3>Interactive card</h3>
  <p>Hover and focus-visible affordances for a clickable card surface.</p>
</button>
<a kuiCard interactive href="https://kikita.dev" class="card-interactive-example__button">
  <h3>Linked card</h3>
  <p>Anchor host keeps native link semantics and keyboard behavior.</p>
</a>
```

#### card-interactive-example.ts

```ts
import { Component } from '@angular/core';

import { KuiCardDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-card-interactive-example',
  imports: [KuiCardDirective],
  templateUrl: './card-interactive-example.html',
  styleUrl: './card-interactive-example.scss',
})
export class CardInteractiveExample {}
```

#### card-interactive-example.scss

```scss
:host {
  display: grid;
  gap: var(--kui-space-4, 16px);
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  inline-size: 100%;
}

.card-interactive-example__button {
  display: block;
  border: none;
  background: none;
  font: inherit;
  text-align: start;
  text-decoration: none;
  cursor: pointer;
}
```

### card-size-example

#### card-size-example.html

```html
<article kuiCard size="xs">
  <h3>Extra small</h3>
</article>
<article kuiCard size="sm">
  <h3>Small</h3>
</article>
<article kuiCard size="md">
  <h3>Medium</h3>
</article>
<article kuiCard size="lg">
  <h3>Large</h3>
</article>
```

#### card-size-example.ts

```ts
import { Component } from '@angular/core';

import { KuiCardDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-card-size-example',
  imports: [KuiCardDirective],
  templateUrl: './card-size-example.html',
  styleUrl: './card-size-example.scss',
})
export class CardSizeExample {}
```

#### card-size-example.scss

```scss
:host {
  display: grid;
  gap: var(--kui-space-4, 16px);
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  inline-size: 100%;
}
```

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
