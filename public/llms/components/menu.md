# Menu

> Anchored command menu with keyboard focus behavior.

- Status: available
- Route: /components/menu
- Package: @kikita-labs/ui@1.0.0
- Import: KuiMenuComponent from @kikita-labs/ui
- Source docs: ../kikita-ui/docs/menu.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

```html
<button kuiButton type="button" [kuiMenuFor]="actionsMenu">Actions</button>

<kui-menu #actionsMenu ariaLabel="Project actions">
  <button type="button" kuiMenuItem>
    <span class="kui-menu-item__label">Edit</span>
  </button>
  <button type="button" kuiMenuItem>
    <span class="kui-menu-item__label">Copy</span>
  </button>
  <hr kuiSeparator spacing="xs" />
  <button type="button" kuiMenuItem appearance="destructive">
    <span class="kui-menu-item__label">Delete</span>
  </button>
</kui-menu>
```

## Examples

Rendered at /components/menu:

### basic-menu-example

#### basic-menu-example.html

```html
<div class="basic-menu-example">
  <button kuiButton type="button" [kuiMenuFor]="actionsMenu">Actions</button>

  <kui-menu #actionsMenu ariaLabel="Project actions">
    <button type="button" kuiMenuItem>
      <span class="kui-menu-item__label">Edit</span>
    </button>
    <button type="button" kuiMenuItem>
      <span class="kui-menu-item__label">Copy</span>
    </button>
    <hr kuiSeparator spacing="xs" />
    <button type="button" kuiMenuItem appearance="destructive">
      <span class="kui-menu-item__label">Delete</span>
    </button>
  </kui-menu>
</div>
```

#### basic-menu-example.ts

```ts
import { Component } from '@angular/core';

import {
  KuiButtonDirective,
  KuiMenuComponent,
  KuiMenuForDirective,
  KuiMenuItemDirective,
  KuiSeparatorDirective,
} from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-menu-example',
  imports: [
    KuiButtonDirective,
    KuiMenuComponent,
    KuiMenuForDirective,
    KuiMenuItemDirective,
    KuiSeparatorDirective,
  ],
  templateUrl: './basic-menu-example.html',
  styleUrl: './basic-menu-example.scss',
})
export class BasicMenuExample {}
```

#### basic-menu-example.scss

```scss
.basic-menu-example {
  display: flex;
  justify-content: center;
}
```

### menu-content-example

#### menu-content-example.html

```html
<div class="menu-content-example">
  <button kuiButton type="button" shape="outline" [kuiMenuFor]="rowMenu">Row actions</button>

  <kui-menu #rowMenu ariaLabel="Row actions" menuAlign="end" minWidth="220px">
    <div kuiMenuHeader>Project</div>
    <button type="button" kuiMenuItem>
      <span class="kui-menu-item__icon" aria-hidden="true">E</span>
      <span class="kui-menu-item__label">Rename</span>
      <span class="kui-menu-item__shortcut">F2</span>
    </button>
    <button type="button" kuiMenuItem>
      <span class="kui-menu-item__icon" aria-hidden="true">C</span>
      <span class="kui-menu-item__label">Copy link</span>
      <span class="kui-menu-item__shortcut">Ctrl C</span>
    </button>
    <hr kuiSeparator spacing="xs" />
    <button type="button" kuiMenuItem disabled>
      <span class="kui-menu-item__label">Archive</span>
    </button>
  </kui-menu>
</div>
```

#### menu-content-example.ts

```ts
import { Component } from '@angular/core';

import {
  KuiButtonDirective,
  KuiMenuComponent,
  KuiMenuForDirective,
  KuiMenuHeaderDirective,
  KuiMenuItemDirective,
  KuiSeparatorDirective,
} from '@kikita-labs/ui';

@Component({
  selector: 'app-menu-content-example',
  imports: [
    KuiButtonDirective,
    KuiMenuComponent,
    KuiMenuForDirective,
    KuiMenuHeaderDirective,
    KuiMenuItemDirective,
    KuiSeparatorDirective,
  ],
  templateUrl: './menu-content-example.html',
  styleUrl: './menu-content-example.scss',
})
export class MenuContentExample {}
```

#### menu-content-example.scss

```scss
.menu-content-example {
  display: flex;
  justify-content: center;
}
```

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| ariaLabel | string | 'Actions' | Accessible name for the menu panel. |
| placement | 'top' \| 'bottom' \| 'left' \| 'right' | 'bottom' | Preferred side of the trigger the menu opens on. Auto-flips to the opposite side to fit the viewport. |
| menuAlign | 'start' \| 'end' | 'start' | Alignment along the trigger edge. For top/bottom placement, start is left-aligned and end is right-aligned. For left/right placement, start is top-aligned and end is bottom-aligned. |
| offset | number | 4 | Pixel gap between the trigger and the menu panel. |
| minWidth | string \| null | null | Optional overlay minimum width. |
| [kuiMenuFor] | KuiMenuComponent \| undefined | - | Wires a native trigger to a menu instance and manages trigger ARIA state. |
| kuiMenuHeader | - | - | Marks a non-interactive group heading inside the menu panel. Renders with role="presentation". |
| kuiSeparator | - | - | Native hr[kuiSeparator] divider between menu item groups. See the Separator page for spacing and appearance inputs. |
| kuiMenuItem.appearance | 'neutral' \| 'destructive' | 'neutral' | Visual treatment for an action item. Use destructive for dangerous actions. |
| kuiMenuItem.disabled | boolean | false | Prevents activation and applies disabled/aria-disabled semantics. Disabled items are skipped by keyboard navigation. |

## Accessibility

- The panel uses `role="menu"`.
- Items use `role="menuitem"`.
- Separators use native `hr[kuiSeparator]`.
- Group headers use `role="presentation"`.
- Disabled items expose `aria-disabled="true"`.
- `ArrowDown` / `ArrowUp` opens from the trigger and focuses first/last item.
- Inside the menu, `ArrowDown`, `ArrowUp`, `Home`, and `End` move focus.
- `Escape` closes the menu and returns focus to the trigger.
- `Tab` closes the menu and lets focus continue normally.

## Playground

Available at /components/menu/playground.
