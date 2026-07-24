# Separator

> Tokenized horizontal or vertical separator primitive.

- Status: available
- Route: /components/separator
- Package: @kikita-labs/ui@1.1.0
- Import: KuiSeparatorDirective from @kikita-labs/ui
- Source docs: ../kikita-ui/docs/separator.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

```html
<section>
  <p>Account details</p>
  <hr kuiSeparator />
  <p>Billing details</p>
</section>
```

Use the native `<hr>` host. Do not use a `div` for purely visual separators
unless a future primitive explicitly supports it.

## Examples

Rendered at /components/separator:

### basic-separator-example

#### basic-separator-example.html

```html
<section>
  <p>Account details</p>
  <hr kuiSeparator />
  <p>Billing details</p>
</section>
```

#### basic-separator-example.ts

```ts
import { Component } from '@angular/core';

import { KuiSeparatorDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-separator-example',
  imports: [KuiSeparatorDirective],
  templateUrl: './basic-separator-example.html',
  styleUrl: './basic-separator-example.scss',
})
export class BasicSeparatorExample {}
```

#### basic-separator-example.scss

```scss
:host {
  display: block;
  max-inline-size: 320px;
}
```

### separator-appearance-example

#### separator-appearance-example.html

```html
<p>Subtle</p>
<hr kuiSeparator appearance="subtle" />
<p>Default</p>
<hr kuiSeparator appearance="default" />
<p>Strong</p>
<hr kuiSeparator appearance="strong" />
```

#### separator-appearance-example.ts

```ts
import { Component } from '@angular/core';

import { KuiSeparatorDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-separator-appearance-example',
  imports: [KuiSeparatorDirective],
  templateUrl: './separator-appearance-example.html',
  styleUrl: './separator-appearance-example.scss',
})
export class SeparatorAppearanceExample {}
```

#### separator-appearance-example.scss

```scss
:host {
  display: block;
  max-inline-size: 320px;
}

p {
  margin: 0;
  color: var(--kui-color-text-secondary);
  font-size: var(--kui-text-sm-size, 13px);
}
```

### separator-spacing-example

#### separator-spacing-example.html

```html
<p>none</p>
<hr kuiSeparator spacing="none" />
<p>xs</p>
<hr kuiSeparator spacing="xs" />
<p>sm</p>
<hr kuiSeparator spacing="sm" />
<p>md</p>
<hr kuiSeparator spacing="md" />
<p>lg</p>
<hr kuiSeparator spacing="lg" />
```

#### separator-spacing-example.ts

```ts
import { Component } from '@angular/core';

import { KuiSeparatorDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-separator-spacing-example',
  imports: [KuiSeparatorDirective],
  templateUrl: './separator-spacing-example.html',
  styleUrl: './separator-spacing-example.scss',
})
export class SeparatorSpacingExample {}
```

#### separator-spacing-example.scss

```scss
:host {
  display: block;
  max-inline-size: 320px;
}

p {
  margin: 0;
  color: var(--kui-color-text-secondary);
  font-size: var(--kui-text-sm-size, 13px);
}
```

### separator-vertical-example

#### separator-vertical-example.html

```html
<div class="separator-vertical-example__toolbar">
  <button kuiButton type="button" shape="ghost">Bold</button>
  <button kuiButton type="button" shape="ghost">Italic</button>
  <hr kuiSeparator orientation="vertical" spacing="xs" />
  <button kuiButton type="button" shape="ghost">Link</button>
</div>
```

#### separator-vertical-example.ts

```ts
import { Component } from '@angular/core';

import { KuiButtonDirective, KuiSeparatorDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-separator-vertical-example',
  imports: [KuiButtonDirective, KuiSeparatorDirective],
  templateUrl: './separator-vertical-example.html',
  styleUrl: './separator-vertical-example.scss',
})
export class SeparatorVerticalExample {}
```

#### separator-vertical-example.scss

```scss
.separator-vertical-example__toolbar {
  display: flex;
  align-items: center;
  gap: var(--kui-space-2, 8px);
}
```

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| appearance | 'subtle' \| 'default' \| 'strong' | 'default' | Visual divider emphasis. |
| orientation | 'horizontal' \| 'vertical' | 'horizontal' | Divider direction. Vertical separators set aria-orientation="vertical" and stretch to the parent block size. |
| spacing | 'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' | 'sm' | Outer spacing around the divider line. |

## Accessibility

- Prefer native `<hr kuiSeparator>`.
- The separator is not focusable and has no hover, focus, active, or disabled
  states.
- Vertical separators expose `aria-orientation="vertical"`.
- Do not add labels by default; named separators should be rare structural
  boundaries.

## Playground

Available at /components/separator/playground.
