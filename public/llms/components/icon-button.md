# Icon Button

> Compact icon-only action control.

- Status: available
- Route: /components/icon-button
- Package: @kikita-labs/ui@1.0.0
- Import: KuiIconButtonDirective from @kikita-labs/ui
- Source docs: ../kikita-ui/docs/icon-button.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

Use `icon` for a registered icon by name, instead of hand-projecting `kui-icon`:

```html
<button kuiIconButton icon="x" aria-label="Close"></button>

<button kuiIconButton shape="soft" appearance="success" icon="check" aria-label="Approve"></button>

<a
  kuiIconButton
  shape="outline"
  appearance="primary"
  href="/settings"
  icon="settings"
  aria-label="Settings"
></a>
```

Project `kui-icon` directly when the icon needs `source` or `src` instead of a registered `name`:

```html
<button kuiIconButton aria-label="Close">
  <kui-icon [source]="closeIcon" />
</button>
```

## Examples

Rendered at /components/icon-button:

### icon-button-appearance-example

#### icon-button-appearance-example.html

```html
<div class="icon-button-appearance-example">
  <button kuiIconButton type="button" aria-label="Add item">
    <kui-icon [source]="plusIcon" />
  </button>
  <button kuiIconButton type="button" shape="soft" aria-label="Add item softly">
    <kui-icon [source]="plusIcon" />
  </button>
  <button kuiIconButton type="button" shape="outline" aria-label="Add item with outline">
    <kui-icon [source]="plusIcon" />
  </button>
  <button kuiIconButton type="button" shape="ghost" aria-label="Add item quietly">
    <kui-icon [source]="plusIcon" />
  </button>
  <button kuiIconButton type="button" appearance="danger" aria-label="Delete item">
    <kui-icon [source]="trashIcon" />
  </button>
  <button
    kuiIconButton
    type="button"
    shape="outline"
    appearance="danger"
    aria-label="Delete item with outline"
  >
    <kui-icon [source]="trashIcon" />
  </button>
</div>
```

#### icon-button-appearance-example.ts

```ts
import { Component } from '@angular/core';

import { KuiIconButtonDirective, KuiIconComponent } from '@kikita-labs/ui';

const PLUS_ICON =
  '<svg viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
const TRASH_ICON =
  '<svg viewBox="0 0 24 24" fill="none"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 14h10l1-14M9 7V4h6v3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

@Component({
  selector: 'app-icon-button-appearance-example',
  imports: [KuiIconButtonDirective, KuiIconComponent],
  templateUrl: './icon-button-appearance-example.html',
  styleUrl: './icon-button-appearance-example.scss',
})
export class IconButtonAppearanceExample {
  protected readonly plusIcon = PLUS_ICON;
  protected readonly trashIcon = TRASH_ICON;
}
```

#### icon-button-appearance-example.scss

```scss
.icon-button-appearance-example {
  display: flex;
  flex-wrap: wrap;
  gap: var(--kui-space-3, 12px);
  align-items: center;
  justify-content: center;
}
```

### icon-button-size-example

#### icon-button-size-example.html

```html
<div class="icon-button-size-example">
  <button kuiIconButton type="button" size="xs" aria-label="Extra small settings">
    <kui-icon [source]="settingsIcon" />
  </button>
  <button kuiIconButton type="button" size="sm" aria-label="Small settings">
    <kui-icon [source]="settingsIcon" />
  </button>
  <button kuiIconButton type="button" size="md" aria-label="Medium settings">
    <kui-icon [source]="settingsIcon" />
  </button>
  <button kuiIconButton type="button" size="lg" aria-label="Large settings">
    <kui-icon [source]="settingsIcon" />
  </button>
  <button kuiIconButton type="button" disabled aria-label="Disabled settings">
    <kui-icon [source]="settingsIcon" />
  </button>
</div>
```

#### icon-button-size-example.ts

```ts
import { Component } from '@angular/core';

import { KuiIconButtonDirective, KuiIconComponent } from '@kikita-labs/ui';

const SETTINGS_ICON =
  '<svg viewBox="0 0 24 24" fill="none"><path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" stroke="currentColor" stroke-width="2"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.04.04a2 2 0 0 1-2.83 2.83l-.04-.04a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V21a2 2 0 0 1-4 0v-.06A1.7 1.7 0 0 0 8.96 19.4a1.7 1.7 0 0 0-1.88.34l-.04.04a2 2 0 0 1-2.83-2.83l.04-.04A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.56-1.03H3a2 2 0 0 1 0-4h.06A1.7 1.7 0 0 0 4.6 8.96a1.7 1.7 0 0 0-.34-1.88l-.04-.04a2 2 0 1 1 2.83-2.83l.04.04A1.7 1.7 0 0 0 8.96 4.6 1.7 1.7 0 0 0 10 3.06V3a2 2 0 0 1 4 0v.06A1.7 1.7 0 0 0 15.04 4.6a1.7 1.7 0 0 0 1.88-.34l.04-.04a2 2 0 0 1 2.83 2.83l-.04.04a1.7 1.7 0 0 0-.34 1.88A1.7 1.7 0 0 0 20.94 10H21a2 2 0 0 1 0 4h-.06A1.7 1.7 0 0 0 19.4 15Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>';

@Component({
  selector: 'app-icon-button-size-example',
  imports: [KuiIconButtonDirective, KuiIconComponent],
  templateUrl: './icon-button-size-example.html',
  styleUrl: './icon-button-size-example.scss',
})
export class IconButtonSizeExample {
  protected readonly settingsIcon = SETTINGS_ICON;
}
```

#### icon-button-size-example.scss

```scss
.icon-button-size-example {
  display: flex;
  flex-wrap: wrap;
  gap: var(--kui-space-3, 12px);
  align-items: center;
  justify-content: center;
}
```

### icon-button-icon-example

#### icon-button-icon-example.html

```html
<div class="icon-button-icon-example">
  <button kuiIconButton icon="plus" aria-label="Add item" type="button"></button>
  <button
    kuiIconButton
    shape="outline"
    appearance="danger"
    icon="trash-2"
    aria-label="Delete item"
    type="button"
  ></button>
  <button kuiIconButton shape="soft" icon="settings" aria-label="Settings" type="button"></button>
</div>
```

#### icon-button-icon-example.ts

```ts
import { Component } from '@angular/core';

import { KuiIconButtonDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-icon-button-icon-example',
  imports: [KuiIconButtonDirective],
  templateUrl: './icon-button-icon-example.html',
  styleUrl: './icon-button-icon-example.scss',
})
export class IconButtonIconExample {}
```

#### icon-button-icon-example.scss

```scss
.icon-button-icon-example {
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
| shape | 'solid' \| 'soft' \| 'outline' \| 'ghost' | 'ghost' | Surface treatment. Defaults to ghost. Combines freely with appearance. |
| appearance | 'primary' \| 'danger' \| 'success' \| 'warning' \| null | null | Semantic color intent. Without an explicit value, solid/soft use primary colors and outline/ghost use neutral defaults. |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' | 'md' | Square control size mapped to Kikita control height tokens (matches kui-input height at md). |
| disabled | boolean | false | Disables native button behavior. Anchor icon buttons receive aria-disabled and leave tab order. |
| icon | KuiIconName \| undefined | undefined | Renders a kui-icon resolved by name as the button content, prepended before any other projected content, without hand-projecting kui-icon. |

## Accessibility

Icon-only controls must have an accessible label, normally through `aria-label`. Use native
`button` for actions and `a` for navigation.

Native button and anchor keyboard behavior is preserved. The directive adds no custom key
bindings.

## Playground

Available at /components/icon-button/playground.
