# Drawer

> Side and edge overlay surface for focused workflows.

- Status: available
- Route: /components/drawer
- Package: @kikita-labs/ui@0.6.1
- Import: kuiDrawer from @kikita-labs/ui
- Source docs: ../kikita-ui/docs/drawer.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

```ts
interface EditData {
  id: string;
}

type EditResult = 'saved' | 'cancelled';

@Component({
  selector: 'app-edit-drawer',
  template: `
    <div class="kui-drawer-header">
      <div class="kui-drawer-header-text">
        <h2 class="kui-drawer-title">Edit item</h2>
        <div class="kui-drawer-subtitle">{{ drawerContext.data.id }}</div>
      </div>
      <button
        class="kui-drawer-close"
        type="button"
        aria-label="Close"
        (click)="drawerContext.close('cancelled')"
      >
        ...
      </button>
    </div>
    <div class="kui-drawer-body">...</div>
    <div class="kui-drawer-footer">
      <button
        kuiButton
        appearance="outline"
        type="button"
        (click)="drawerContext.close('cancelled')"
      >
        Cancel
      </button>
      <button kuiButton type="button" (click)="drawerContext.close('saved')">Save</button>
    </div>
  `,
  imports: [KuiButtonDirective],
})
export class EditDrawer implements KuiDrawerHost<EditResult, EditData> {
  public readonly drawerContext =
    inject<KuiDrawerContext<EditResult, EditData>>(KUI_DRAWER_CONTEXT);
}

function injectEditDrawer() {
  return kuiDrawer(EditDrawer, { side: 'right', size: 'md' });
}
```

## Examples

Rendered at /components/drawer:

### basic-drawer-example

#### basic-drawer-example.html

```html
<div class="basic-drawer-example">
  <button kuiButton type="button" (click)="edit()">Edit item</button>
  @if (lastResult()) {
    <p class="basic-drawer-example__result">Last result: {{ lastResult() }}</p>
  }
</div>
```

#### edit-item-drawer.html

```html
<div class="kui-drawer-header">
  <div class="kui-drawer-header-text">
    <h2 class="kui-drawer-title">Edit item</h2>
    <div class="kui-drawer-subtitle">{{ drawerContext.data.id }}</div>
  </div>
  <button
    class="kui-drawer-close"
    type="button"
    aria-label="Close"
    (click)="drawerContext.close('cancelled')"
  >
    &times;
  </button>
</div>
<div class="kui-drawer-body">
  <p>Edit fields for item {{ drawerContext.data.id }} here.</p>
</div>
<div class="kui-drawer-footer">
  <button kuiButton type="button" shape="outline" (click)="drawerContext.close('cancelled')">
    Cancel
  </button>
  <button kuiButton type="button" (click)="drawerContext.close('saved')">Save</button>
</div>
```

#### basic-drawer-example.ts

```ts
import { Component, DestroyRef, inject, signal } from '@angular/core';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { KuiButtonDirective, kuiDrawer } from '@kikita-labs/ui';

import { EditItemDrawer } from './edit-item-drawer';

@Component({
  selector: 'app-basic-drawer-example',
  imports: [KuiButtonDirective],
  templateUrl: './basic-drawer-example.html',
  styleUrl: './basic-drawer-example.scss',
})
export class BasicDrawerExample {
  private readonly destroyRef = inject(DestroyRef);
  private readonly openEditItem = kuiDrawer(EditItemDrawer, { side: 'right', size: 'md' });

  protected readonly lastResult = signal<string | null>(null);

  protected edit(): void {
    this.openEditItem({ id: 'item-42' })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => this.lastResult.set(result ?? 'dismissed'));
  }
}
```

#### edit-item-drawer.ts

```ts
import { Component, inject } from '@angular/core';

import {
  KUI_DRAWER_CONTEXT,
  KuiButtonDirective,
  type KuiDrawerContext,
  type KuiDrawerHost,
} from '@kikita-labs/ui';

export interface EditItemData {
  readonly id: string;
}

export type EditItemResult = 'saved' | 'cancelled';

@Component({
  selector: 'app-edit-item-drawer',
  imports: [KuiButtonDirective],
  templateUrl: './edit-item-drawer.html',
})
export class EditItemDrawer implements KuiDrawerHost<EditItemResult, EditItemData> {
  public readonly drawerContext =
    inject<KuiDrawerContext<EditItemResult, EditItemData>>(KUI_DRAWER_CONTEXT);
}
```

#### basic-drawer-example.scss

```scss
.basic-drawer-example {
  display: grid;
  gap: var(--kui-space-3, 12px);
  justify-items: center;
}

.basic-drawer-example__result {
  margin: 0;
  color: var(--kui-color-text-secondary);
  font-size: var(--kui-text-sm-size, 13px);
}
```

### drawer-sides-example

#### drawer-sides-example.html

```html
<div class="drawer-sides-example">
  @for (side of sides; track side) {
    <button kuiButton type="button" shape="outline" (click)="open(side)">{{ side }}</button>
  }
</div>
```

#### side-preview-drawer.html

```html
<div class="kui-drawer-header">
  <div class="kui-drawer-header-text">
    <h2 class="kui-drawer-title">side="{{ drawerContext.side }}"</h2>
  </div>
  <button class="kui-drawer-close" type="button" aria-label="Close" (click)="drawerContext.close()">
    &times;
  </button>
</div>
<div class="kui-drawer-body">
  <p>
    This panel was opened with <code>side: '{{ drawerContext.side }}'</code>.
  </p>
</div>
<div class="kui-drawer-footer">
  <button kuiButton type="button" (click)="drawerContext.close()">Close</button>
</div>
```

#### drawer-sides-example.ts

```ts
import { Component } from '@angular/core';

import { KuiButtonDirective, kuiDrawer, type KuiDrawerSide } from '@kikita-labs/ui';

import { SidePreviewDrawer } from './side-preview-drawer';

@Component({
  selector: 'app-drawer-sides-example',
  imports: [KuiButtonDirective],
  templateUrl: './drawer-sides-example.html',
  styleUrl: './drawer-sides-example.scss',
})
export class DrawerSidesExample {
  protected readonly sides: readonly KuiDrawerSide[] = ['top', 'right', 'bottom', 'left'];

  private readonly openers = new Map(
    this.sides.map((side) => [side, kuiDrawer(SidePreviewDrawer, { side, size: 'sm' })]),
  );

  protected open(side: KuiDrawerSide): void {
    this.openers.get(side)?.(undefined);
  }
}
```

#### side-preview-drawer.ts

```ts
import { Component, inject } from '@angular/core';

import {
  KUI_DRAWER_CONTEXT,
  KuiButtonDirective,
  type KuiDrawerContext,
  type KuiDrawerHost,
} from '@kikita-labs/ui';

@Component({
  selector: 'app-side-preview-drawer',
  imports: [KuiButtonDirective],
  templateUrl: './side-preview-drawer.html',
})
export class SidePreviewDrawer implements KuiDrawerHost<void, void> {
  public readonly drawerContext = inject<KuiDrawerContext<void, void>>(KUI_DRAWER_CONTEXT);
}
```

#### drawer-sides-example.scss

```scss
.drawer-sides-example {
  display: flex;
  flex-wrap: wrap;
  gap: var(--kui-space-3, 12px);
  justify-content: center;
}
```

### drawer-sizes-example

#### drawer-sizes-example.html

```html
<div class="drawer-sizes-example">
  @for (size of sizes; track size) {
    <button kuiButton type="button" shape="outline" (click)="open(size)">{{ size }}</button>
  }
</div>
```

#### size-preview-drawer.html

```html
<div class="kui-drawer-header">
  <div class="kui-drawer-header-text">
    <h2 class="kui-drawer-title">size="{{ drawerContext.size }}"</h2>
  </div>
  <button class="kui-drawer-close" type="button" aria-label="Close" (click)="drawerContext.close()">
    &times;
  </button>
</div>
<div class="kui-drawer-body">
  <p>
    This panel was opened with <code>size: '{{ drawerContext.size }}'</code>.
  </p>
</div>
<div class="kui-drawer-footer">
  <button kuiButton type="button" (click)="drawerContext.close()">Close</button>
</div>
```

#### drawer-sizes-example.ts

```ts
import { Component } from '@angular/core';

import { KuiButtonDirective, kuiDrawer, type KuiDrawerSize } from '@kikita-labs/ui';

import { SizePreviewDrawer } from './size-preview-drawer';

@Component({
  selector: 'app-drawer-sizes-example',
  imports: [KuiButtonDirective],
  templateUrl: './drawer-sizes-example.html',
  styleUrl: './drawer-sizes-example.scss',
})
export class DrawerSizesExample {
  protected readonly sizes: readonly KuiDrawerSize[] = ['sm', 'md', 'lg', 'full'];

  private readonly openers = new Map(
    this.sizes.map((size) => [size, kuiDrawer(SizePreviewDrawer, { side: 'right', size })]),
  );

  protected open(size: KuiDrawerSize): void {
    this.openers.get(size)?.(undefined);
  }
}
```

#### size-preview-drawer.ts

```ts
import { Component, inject } from '@angular/core';

import {
  KUI_DRAWER_CONTEXT,
  KuiButtonDirective,
  type KuiDrawerContext,
  type KuiDrawerHost,
} from '@kikita-labs/ui';

@Component({
  selector: 'app-size-preview-drawer',
  imports: [KuiButtonDirective],
  templateUrl: './size-preview-drawer.html',
})
export class SizePreviewDrawer implements KuiDrawerHost<void, void> {
  public readonly drawerContext = inject<KuiDrawerContext<void, void>>(KUI_DRAWER_CONTEXT);
}
```

#### drawer-sizes-example.scss

```scss
.drawer-sizes-example {
  display: flex;
  flex-wrap: wrap;
  gap: var(--kui-space-3, 12px);
  justify-content: center;
}
```

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| kuiDrawer(component, config?) | (component: Type<TComponent>, config?: Omit<KuiDrawerConfig, "data">) => (data: TData) => Observable<TResult \| undefined> | - | Inject-function factory. Call once per injection context to get a typed opener bound to that component. |
| KuiDrawerHost<TResult, TData> | interface | - | Contract your drawer component implements. Requires a drawerContext property injected from KUI_DRAWER_CONTEXT. |
| KUI_DRAWER_CONTEXT | InjectionToken<KuiDrawerContext<TResult, TData>> | - | Injected inside the drawer component to read data and close the drawer. |
| drawerContext.data | TData | - | Data passed via the opener call, e.g. openDrawer(data). |
| drawerContext.side | KuiDrawerSide | - | Drawer side resolved from KuiDrawerConfig.side, read-only. |
| drawerContext.size | KuiDrawerSize | - | Drawer size preset resolved from KuiDrawerConfig.size, read-only. |
| drawerContext.closable | boolean | - | Mirrors KuiDrawerConfig.closable, for conditionally rendering a close button. |
| drawerContext.close(result?) | (result?: TResult) => void | - | Closes the drawer, optionally emitting a typed result to the opener subscription. |
| KuiDrawerConfig.data | TData | undefined | Available on the low-level config type; kuiDrawer() passes feature data through the returned opener function instead. |
| KuiDrawerConfig.side | 'right' \| 'left' \| 'bottom' \| 'top' | 'right' | Edge from which the drawer enters and docks. |
| KuiDrawerConfig.size | 'sm' \| 'md' \| 'lg' \| 'full' | 'md' | Width for left/right drawers, height for top/bottom drawers. |
| KuiDrawerConfig.closeOnBackdropClick | boolean | true | Closes the drawer on backdrop click. Disable for required actions. |
| KuiDrawerConfig.closeOnEscape | boolean | true | Closes the drawer on Escape. Disable for required actions. |
| KuiDrawerConfig.closable | boolean | true | Passed to the content context for close-button rendering; your component decides whether to render it. |
| KuiDrawerRef<TResult> | class | - | Return type of kuiDrawer(component, config). Calling it with data opens the drawer and returns Observable<TResult \| undefined>. |
| .kui-drawer-header / .kui-drawer-title / .kui-drawer-subtitle | CSS classes | - | Header structure classes. .kui-drawer-title is wired as aria-labelledby automatically when present. |
| .kui-drawer-body / .kui-drawer-footer | CSS classes | - | Scrollable content region and action row classes. |
| .kui-drawer-close | CSS class | - | Close-button class for the header, shown conditionally on drawerContext.closable. |
| --kui-drawer-bg | CSS custom property | - | Panel background color. |
| --kui-drawer-border | CSS custom property | - | Panel border color. |
| --kui-drawer-radius | CSS custom property | - | Panel corner radius. |
| --kui-drawer-backdrop-bg | CSS custom property | - | Backdrop fill color. |
| --kui-drawer-width-sm / -md / -lg | CSS custom properties | - | Width presets used by left/right drawers. |
| --kui-drawer-height-sm / -md / -lg | CSS custom properties | - | Height presets used by top/bottom drawers. |
| --kui-drawer-duration-open / -close | CSS custom properties | - | Enter/exit animation durations. |

## Accessibility

- Drawer renders `role="dialog"` and `aria-modal="true"`.
- Focus is trapped inside the drawer while open.
- Focus returns to the previously focused element after close.
- If `.kui-drawer-title` exists, it is wired as `aria-labelledby`.
- Escape closes by default unless `closeOnEscape` is `false`.
- Backdrop click closes by default unless `closeOnBackdropClick` is `false`.

## Playground

Available at /components/drawer/playground.
