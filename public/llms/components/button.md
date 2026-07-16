# Button

> Primary command primitive for buttons and links.

- Status: available
- Route: /components/button
- Package: @kikita-labs/ui@0.4.6
- Import: KuiButtonDirective from @kikita-labs/ui
- Source docs: ../kikita-ui/docs/button.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

```html
<button kuiButton>Save</button>
<button kuiButton shape="soft">Cancel</button>
<button kuiButton shape="outline" appearance="danger">Delete</button>
<button kuiButton shape="ghost" appearance="success">Approve</button>
<button kuiButton appearance="warning">Review</button>
<button kuiButton wrap>Long responsive label</button>
<button kuiButton [loading]="isSaving()">Save changes</button>

<a kuiButton shape="outline" href="/settings">Settings</a>
```

`shape` controls the surface treatment and `appearance` controls its semantic color intent. The
axes can be combined freely.

Without an explicit `appearance`, `solid` and `soft` use primary colors while `outline` and
`ghost` use their neutral defaults.

Use `kui-icon` explicitly for icon content:

```html
<button kuiButton appearance="success">
  <kui-icon name="check" />
  Save
</button>
```

## Examples

Rendered at /components/button:

### basic-button-example

#### basic-button-example.html

```html
<div class="button-example">
  <button kuiButton type="button">Save changes</button>
  <button kuiButton type="button" shape="soft">Cancel</button>
  <a kuiButton routerLink="/components/button">Button docs</a>
</div>
```

#### basic-button-example.ts

```ts
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { KuiButtonDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-button-example',
  imports: [KuiButtonDirective, RouterLink],
  templateUrl: './basic-button-example.html',
  styleUrl: './basic-button-example.scss',
})
export class BasicButtonExample {}
```

#### basic-button-example.scss

```scss
.button-example {
  display: flex;
  flex-wrap: wrap;
  gap: var(--kui-space-3, 12px);
  align-items: center;
  justify-content: center;
}
```

### button-appearance-example

#### button-appearance-example.html

```html
<div class="button-appearance-example">
  <button kuiButton type="button">Solid</button>
  <button kuiButton type="button" shape="soft">Soft</button>
  <button kuiButton type="button" shape="outline">Outline</button>
  <button kuiButton type="button" shape="ghost">Ghost</button>
  <button kuiButton type="button" appearance="danger">Danger</button>
  <button kuiButton type="button" shape="outline" appearance="danger">Outline danger</button>
</div>
```

#### button-appearance-example.ts

```ts
import { Component } from '@angular/core';

import { KuiButtonDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-button-appearance-example',
  imports: [KuiButtonDirective],
  templateUrl: './button-appearance-example.html',
  styleUrl: './button-appearance-example.scss',
})
export class ButtonAppearanceExample {}
```

#### button-appearance-example.scss

```scss
.button-appearance-example {
  display: flex;
  flex-wrap: wrap;
  gap: var(--kui-space-3, 12px);
  align-items: center;
  justify-content: center;
}
```

### button-size-example

#### button-size-example.html

```html
<div class="button-size-example">
  <button kuiButton type="button" size="xs">Extra small</button>
  <button kuiButton type="button" size="sm">Small</button>
  <button kuiButton type="button" size="md">Medium</button>
  <button kuiButton type="button" size="lg">Large</button>
  <button kuiButton type="button" disabled>Disabled</button>
  <button kuiButton type="button" loading>Loading</button>
</div>
```

#### button-size-example.ts

```ts
import { Component } from '@angular/core';

import { KuiButtonDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-button-size-example',
  imports: [KuiButtonDirective],
  templateUrl: './button-size-example.html',
  styleUrl: './button-size-example.scss',
})
export class ButtonSizeExample {}
```

#### button-size-example.scss

```scss
.button-size-example {
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
| shape | 'solid' \| 'soft' \| 'outline' \| 'ghost' | 'solid' | Surface treatment. Defaults to solid. Combines freely with appearance. |
| appearance | 'primary' \| 'danger' \| 'success' \| 'warning' \| null | null | Semantic color intent. Without an explicit value, solid/soft use primary colors and outline/ghost use neutral defaults. |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' | 'md' | Control height and spacing size. |
| wrap | boolean | false | Allows long button text to wrap instead of truncating in narrow containers. |
| disabled | boolean | false | Disables native button behavior. Anchor buttons receive aria-disabled and leave tab order. |
| loading | boolean | false | Centers a kui-loader spinner over the button content, preserves layout size, sets aria-busy, and behaves like disabled. |

## Accessibility

Use native `button` whenever the action does not navigate. Use an `a` host only for navigation.
Every button needs an accessible name. Disabled native buttons use `disabled`; disabled anchors
use `aria-disabled="true"`, leave the tab order, and suppress navigation.

Native button keyboard behavior is preserved: `Enter` and `Space` activate a `button`; links use
native anchor keyboard behavior. The directive does not introduce a custom keyboard model.

## Playground

Available at /components/button/playground.
