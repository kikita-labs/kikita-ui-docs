# Dialog

> Typed modal overlay service and host contract.

- Status: available
- Route: /components/dialog
- Package: @kikita-labs/ui@0.5.0
- Import: kuiDialog from @kikita-labs/ui
- Source docs: ../kikita-ui/docs/dialog.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

```ts
// 1. Define the dialog component
@Component({ ... })
export class EditUserDialog implements KuiDialogHost<'saved' | null, UserData> {
  public readonly dialogContext =
    inject<KuiDialogContext<'saved' | null, UserData>>(KUI_DIALOG_CONTEXT);
}

// 2. Create a typed opener in an injection context
export function injectEditUserDialog() {
  return kuiDialog(EditUserDialog, { size: 'md' });
}

// 3. Use in a component
class MyPage {
  private readonly openEditUser = injectEditUserDialog();

  edit(user: User) {
    this.openEditUser({ userId: user.id })
      .pipe(takeUntilDestroyed())
      .subscribe((result) => {
        if (result === 'saved') this.reload();
      });
  }
}
```

## Examples

Rendered at /components/dialog:

### basic-dialog-example

#### basic-dialog-example.html

```html
<div class="basic-dialog-example">
  <button kuiButton type="button" (click)="invite()">Invite teammate</button>
  @if (lastResult()) {
    <p class="basic-dialog-example__result">Last result: {{ lastResult() }}</p>
  }
</div>
```

#### invite-teammate-dialog.html

```html
<div class="kui-dialog-header">
  <h2 class="kui-dialog-title">Invite to {{ dialogContext.data.teamName }}</h2>
  @if (dialogContext.closable) {
    <button class="kui-dialog-close" type="button" aria-label="Close" (click)="cancel()">
      &times;
    </button>
  }
</div>
<div class="kui-dialog-body">
  <label for="invite-teammate-email">Email address</label>
  <input
    id="invite-teammate-email"
    kuiInput
    type="email"
    placeholder="teammate@company.com"
    [value]="email()"
    (input)="email.set($any($event.target).value)"
  />
</div>
<div class="kui-dialog-footer">
  <button kuiButton type="button" shape="outline" (click)="cancel()">Cancel</button>
  <button kuiButton type="button" [disabled]="!email()" (click)="send()">Send invite</button>
</div>
```

#### basic-dialog-example.ts

```ts
import { Component, DestroyRef, inject, signal } from '@angular/core';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { KuiButtonDirective, kuiDialog } from '@kikita-labs/ui';

import { InviteTeammateDialog } from './invite-teammate-dialog';

@Component({
  selector: 'app-basic-dialog-example',
  imports: [KuiButtonDirective],
  templateUrl: './basic-dialog-example.html',
  styleUrl: './basic-dialog-example.scss',
})
export class BasicDialogExample {
  private readonly destroyRef = inject(DestroyRef);
  private readonly openInvite = kuiDialog(InviteTeammateDialog, { size: 'sm' });

  protected readonly lastResult = signal<string | null>(null);

  protected invite(): void {
    this.openInvite({ teamName: 'Docs' })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => this.lastResult.set(result ?? 'dismissed'));
  }
}
```

#### invite-teammate-dialog.ts

```ts
import { Component, inject, signal } from '@angular/core';

import {
  KUI_DIALOG_CONTEXT,
  KuiButtonDirective,
  type KuiDialogContext,
  type KuiDialogHost,
  KuiInputDirective,
} from '@kikita-labs/ui';

export interface InviteTeammateData {
  readonly teamName: string;
}

export type InviteTeammateResult = 'sent' | null;

@Component({
  selector: 'app-invite-teammate-dialog',
  imports: [KuiButtonDirective, KuiInputDirective],
  templateUrl: './invite-teammate-dialog.html',
})
export class InviteTeammateDialog implements KuiDialogHost<
  InviteTeammateResult,
  InviteTeammateData
> {
  public readonly dialogContext =
    inject<KuiDialogContext<InviteTeammateResult, InviteTeammateData>>(KUI_DIALOG_CONTEXT);

  protected readonly email = signal('');

  protected send(): void {
    this.dialogContext.close('sent');
  }

  protected cancel(): void {
    this.dialogContext.close(null);
  }
}
```

#### basic-dialog-example.scss

```scss
.basic-dialog-example {
  display: grid;
  gap: var(--kui-space-3, 12px);
  justify-items: center;
}

.basic-dialog-example__result {
  margin: 0;
  color: var(--kui-color-text-secondary);
  font-size: var(--kui-text-sm-size, 13px);
}
```

### dialog-confirm-example

#### dialog-confirm-example.html

```html
<div class="dialog-confirm-example">
  <button kuiButton type="button" appearance="danger" (click)="deleteRecord()">
    Delete record
  </button>
  @if (lastResult()) {
    <p class="dialog-confirm-example__result">Last result: {{ lastResult() }}</p>
  }
</div>
```

#### dialog-confirm-example.ts

```ts
import { Component, DestroyRef, inject, signal } from '@angular/core';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { KuiButtonDirective, kuiConfirm } from '@kikita-labs/ui';

@Component({
  selector: 'app-dialog-confirm-example',
  imports: [KuiButtonDirective],
  templateUrl: './dialog-confirm-example.html',
  styleUrl: './dialog-confirm-example.scss',
})
export class DialogConfirmExample {
  private readonly destroyRef = inject(DestroyRef);
  private readonly confirm = kuiConfirm();

  protected readonly lastResult = signal<string | null>(null);

  protected deleteRecord(): void {
    this.confirm({
      title: 'Delete record?',
      message: 'This action cannot be undone.',
      appearance: 'danger',
      confirmLabel: 'Delete',
    })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((ok) => this.lastResult.set(ok ? 'confirmed' : 'cancelled'));
  }
}
```

#### dialog-confirm-example.scss

```scss
.dialog-confirm-example {
  display: grid;
  gap: var(--kui-space-3, 12px);
  justify-items: center;
}

.dialog-confirm-example__result {
  margin: 0;
  color: var(--kui-color-text-secondary);
  font-size: var(--kui-text-sm-size, 13px);
}
```

### dialog-sizes-example

#### dialog-sizes-example.html

```html
<div class="dialog-sizes-example">
  @for (size of sizes; track size) {
    <button kuiButton type="button" shape="outline" (click)="open(size)">{{ size }}</button>
  }
</div>
```

#### size-preview-dialog.html

```html
<div class="kui-dialog-header">
  <h2 class="kui-dialog-title">size="{{ dialogContext.data.size }}"</h2>
  <button class="kui-dialog-close" type="button" aria-label="Close" (click)="dialogContext.close()">
    &times;
  </button>
</div>
<div class="kui-dialog-body">
  <p>
    This panel was opened with <code>size: '{{ dialogContext.data.size }}'</code>.
  </p>
</div>
<div class="kui-dialog-footer">
  <button kuiButton type="button" (click)="dialogContext.close()">Close</button>
</div>
```

#### dialog-sizes-example.ts

```ts
import { Component } from '@angular/core';

import { KuiButtonDirective, kuiDialog, type KuiDialogSize } from '@kikita-labs/ui';

import { SizePreviewDialog } from './size-preview-dialog';

@Component({
  selector: 'app-dialog-sizes-example',
  imports: [KuiButtonDirective],
  templateUrl: './dialog-sizes-example.html',
  styleUrl: './dialog-sizes-example.scss',
})
export class DialogSizesExample {
  protected readonly sizes: readonly KuiDialogSize[] = ['auto', 'sm', 'md', 'lg'];

  private readonly openers = new Map(
    this.sizes.map((size) => [size, kuiDialog(SizePreviewDialog, { size })]),
  );

  protected open(size: KuiDialogSize): void {
    this.openers.get(size)?.({ size });
  }
}
```

#### size-preview-dialog.ts

```ts
import { Component, inject } from '@angular/core';

import {
  KUI_DIALOG_CONTEXT,
  KuiButtonDirective,
  type KuiDialogContext,
  type KuiDialogHost,
} from '@kikita-labs/ui';

export interface SizePreviewData {
  readonly size: string;
}

@Component({
  selector: 'app-size-preview-dialog',
  imports: [KuiButtonDirective],
  templateUrl: './size-preview-dialog.html',
})
export class SizePreviewDialog implements KuiDialogHost<void, SizePreviewData> {
  public readonly dialogContext =
    inject<KuiDialogContext<void, SizePreviewData>>(KUI_DIALOG_CONTEXT);
}
```

#### dialog-sizes-example.scss

```scss
.dialog-sizes-example {
  display: flex;
  flex-wrap: wrap;
  gap: var(--kui-space-3, 12px);
  justify-content: center;
}
```

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| kuiDialog(component, config?) | (component: Type<TComponent>, config?: Omit<KuiDialogConfig, "data">) => (data: TData) => Observable<TResult \| undefined> | - | Inject-function factory. Call once per injection context to get a typed opener bound to that component. |
| KuiDialogHost<TResult, TData> | interface | - | Contract your dialog component implements. Requires a dialogContext property injected from KUI_DIALOG_CONTEXT. |
| KUI_DIALOG_CONTEXT | InjectionToken<KuiDialogContext<TResult, TData>> | - | Injected inside the dialog component to read data and close the dialog. |
| dialogContext.data | TData | - | Data passed via the opener call, e.g. openDialog(data). |
| dialogContext.closable | boolean | - | Mirrors KuiDialogConfig.closable, for conditionally rendering a close button. |
| dialogContext.appearance | KuiDialogAppearance | - | Mirrors KuiDialogConfig.appearance, for coloring a custom icon if needed. |
| dialogContext.close(result?) | (result?: TResult) => void | - | Closes the dialog, optionally emitting a typed result to the opener subscription. |
| KuiDialogConfig.data | TData | undefined | Available on the low-level config type; kuiDialog() passes feature data through the returned opener function instead. |
| KuiDialogConfig.size | 'auto' \| 'sm' \| 'md' \| 'lg' | 'md' | Panel width preset: auto (min 320px), sm (400px), md (560px), lg (720px). |
| KuiDialogConfig.appearance | 'default' \| 'danger' \| 'warning' | 'default' | Colors .kui-dialog-icon via a CSS variable. Has no other visual effect. |
| KuiDialogConfig.dismissable | boolean | true | Allows Escape and backdrop click to close the dialog. |
| KuiDialogConfig.closable | boolean | true | Exposed on dialogContext.closable for the component to render a close button. |
| KuiDialogRef<TResult> | class | - | Return type of kuiDialog(component, config). Calling it with data opens the dialog and returns Observable<TResult \| undefined>. |
| kuiConfirm() | () => (config: KuiConfirmConfig) => Observable<boolean> | - | Inject-function for a pre-built confirmation dialog. No custom component required. |
| KuiConfirmConfig.title | string | required | Header text. |
| KuiConfirmConfig.message | string \| undefined | - | Body text. |
| KuiConfirmConfig.appearance | KuiDialogAppearance | 'default' | Icon color and button tone. |
| KuiConfirmConfig.confirmLabel | string | 'OK' | Confirm button label. |
| KuiConfirmConfig.cancelLabel | string | 'Cancel' | Cancel button label. |
| .kui-dialog-icon | CSS class | - | Add to an SVG placed before .kui-dialog-title inside .kui-dialog-header. Fixed 20x20px, colored via appearance. |
| --kui-dialog-bg | CSS custom property | var(--kui-color-surface-elevated) | Panel background color. |
| --kui-dialog-border | CSS custom property | var(--kui-color-border) | Panel border color. |
| --kui-dialog-radius | CSS custom property | var(--kui-radius-lg) | Panel corner radius. |
| --kui-dialog-shadow | CSS custom property | var(--kui-shadow-lg) | Panel elevation shadow. |
| --kui-dialog-backdrop | CSS custom property | oklch(0 0 0 / 0.5) | Backdrop fill color. |

## Accessibility

- `role="dialog"` and `aria-modal="true"` are set on the panel.
- The panel uses `aria-labelledby` when `.kui-dialog-title` exists.
- The panel falls back to `aria-label="Dialog"` when no title is present.
- Focus is trapped inside the dialog via CDK `cdkTrapFocus`.
- Focus returns to the opener after the dialog closes.
- Escape closes when `dismissable: true`.
- Page scroll is blocked via CDK block scroll strategy while open.

## Playground

Available at /components/dialog/playground.
