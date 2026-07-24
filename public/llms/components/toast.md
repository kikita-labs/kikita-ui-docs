# Toast

> Global notifications with actions and live-region semantics.

- Status: available
- Route: /components/toast
- Package: @kikita-labs/ui@1.1.0
- Import: KuiToastService from @kikita-labs/ui
- Source docs: ../kikita-ui/docs/toast.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

```ts
@Component({ ... })
export class MyComponent {
  private toast = kuiToast();

  save() {
    this.api.save().subscribe({
      next: () =>
        this.toast.open({ title: 'Saved', appearance: 'success' }),
      error: () =>
        this.toast.open({ title: 'Failed', appearance: 'danger', persistent: true }),
    });
  }
}
```

## Examples

Rendered at /components/toast:

### basic-toast-example

#### basic-toast-example.html

```html
<div class="basic-toast-example">
  @for (trigger of triggers; track trigger.appearance) {
    <button kuiButton type="button" shape="soft" (click)="show(trigger.appearance)">
      {{ trigger.label }}
    </button>
  }
</div>
```

#### basic-toast-example.ts

```ts
import { Component } from '@angular/core';

import { KuiButtonDirective, kuiToast, type KuiToastAppearance } from '@kikita-labs/ui';

interface ToastTrigger {
  readonly label: string;
  readonly appearance: KuiToastAppearance;
}

@Component({
  selector: 'app-basic-toast-example',
  imports: [KuiButtonDirective],
  templateUrl: './basic-toast-example.html',
  styleUrl: './basic-toast-example.scss',
})
export class BasicToastExample {
  private readonly toast = kuiToast();

  protected readonly triggers: readonly ToastTrigger[] = [
    { label: 'Neutral', appearance: 'neutral' },
    { label: 'Success', appearance: 'success' },
    { label: 'Warning', appearance: 'warning' },
    { label: 'Danger', appearance: 'danger' },
    { label: 'Info', appearance: 'info' },
  ];

  protected show(appearance: KuiToastAppearance): void {
    this.toast.open({
      title: this.titleFor(appearance),
      message: this.messageFor(appearance),
      appearance,
      persistent: appearance === 'danger',
    });
  }

  private titleFor(appearance: KuiToastAppearance): string {
    switch (appearance) {
      case 'success':
        return 'Saved';
      case 'danger':
        return 'Failed to save';
      case 'warning':
        return 'Check your input';
      case 'info':
        return 'Heads up';
      default:
        return 'Notification';
    }
  }

  private messageFor(appearance: KuiToastAppearance): string {
    switch (appearance) {
      case 'success':
        return 'Your changes have been saved.';
      case 'danger':
        return 'Check your connection and try again.';
      case 'warning':
        return 'Some fields still need your attention.';
      case 'info':
        return 'A new version is available.';
      default:
        return 'Something happened.';
    }
  }
}
```

#### basic-toast-example.scss

```scss
.basic-toast-example {
  display: flex;
  flex-wrap: wrap;
  gap: var(--kui-space-3, 12px);
}
```

### toast-action-example

#### toast-action-example.html

```html
<button kuiButton type="button" shape="outline" appearance="danger" (click)="deleteMessage()">
  Delete message
</button>
```

#### toast-action-example.ts

```ts
import { Component, DestroyRef, inject } from '@angular/core';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { KuiButtonDirective, kuiToast } from '@kikita-labs/ui';

@Component({
  selector: 'app-toast-action-example',
  imports: [KuiButtonDirective],
  templateUrl: './toast-action-example.html',
  styleUrl: './toast-action-example.scss',
})
export class ToastActionExample {
  private readonly toast = kuiToast();
  private readonly destroyRef = inject(DestroyRef);

  protected deleteMessage(): void {
    const ref = this.toast.open({
      title: 'Message deleted',
      actionLabel: 'Undo',
      duration: 6000,
    });

    ref.action$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.undoDelete());
  }

  private undoDelete(): void {
    this.toast.open({ title: 'Delete undone', appearance: 'success' });
  }
}
```

#### toast-action-example.scss

```scss
:host {
  display: block;
}
```

### toast-position-example

#### toast-position-example.html

```html
<div class="toast-position-example">
  @for (position of positions; track position) {
    <button kuiButton type="button" shape="soft" size="sm" (click)="show(position)">
      {{ position }}
    </button>
  }
</div>
```

#### toast-position-example.ts

```ts
import { Component } from '@angular/core';

import { KuiButtonDirective, kuiToast, type KuiToastPosition } from '@kikita-labs/ui';

@Component({
  selector: 'app-toast-position-example',
  imports: [KuiButtonDirective],
  templateUrl: './toast-position-example.html',
  styleUrl: './toast-position-example.scss',
})
export class ToastPositionExample {
  private readonly toast = kuiToast();

  protected readonly positions: readonly KuiToastPosition[] = [
    'top-start',
    'top-center',
    'top-end',
    'bottom-start',
    'bottom-center',
    'bottom-end',
  ];

  protected show(position: KuiToastPosition): void {
    this.toast.setPosition(position);
    this.toast.open({
      title: position,
      message: 'This toast opened at the selected position.',
    });
  }
}
```

#### toast-position-example.scss

```scss
.toast-position-example {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--kui-space-2, 8px);
  max-inline-size: 420px;
}
```

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| title | string | - | Required headline text passed to open(). |
| message | string \| undefined | - | Optional supporting text below the title. |
| appearance | 'neutral' \| 'success' \| 'warning' \| 'danger' \| 'info' | 'neutral' | Visual intent. Controls the accent bar and icon color; neutral renders no icon. |
| actionLabel | string \| undefined | - | Label for the inline action button. Clicking it emits once on KuiToastRef.action$. |
| duration | number | 5000 | Auto-dismiss delay in ms. Ignored when persistent is true. App-wide default overridable via provideKuiToastOptions. |
| persistent | boolean | false | Keeps the toast open until the user closes it explicitly. |
| closable | boolean | true | Shows the close button. App-wide default overridable via provideKuiToastOptions. |
| showIcon | boolean | true | Shows the appearance icon. App-wide default overridable via provideKuiToastOptions. |
| showProgress | boolean | false | Shows a progress bar tracking time until auto-dismiss. App-wide default overridable via provideKuiToastOptions. |
| kuiToast() | () => KuiToastService | - | Inject-function returning a reusable opener bound to the current injector scope. Call once per component; prefer over injecting KuiToastService directly. |
| KuiToastService.open(config) | (config: KuiToastConfig) => KuiToastRef | - | Shows a toast notification and returns a ref for programmatic control. |
| KuiToastService.setPosition(position) | (position: KuiToastPosition) => void | - | Changes the shared toast region position at runtime. Intended for interactive demos; prefer provideKuiToastOptions for app-level configuration. |
| KuiToastRef.close() | () => void | - | Closes this toast programmatically and plays the exit animation. |
| KuiToastRef.closed$ | Observable<void> | - | Emits once after the close animation finishes, then completes. |
| KuiToastRef.action$ | Observable<void> | - | Emits once when the action button is clicked, then completes. |
| provideKuiToastOptions(options) | (options: KuiToastOptions) => Provider | - | App or route-level provider for global toast defaults: position, duration, maxVisible, showProgress, closable, showIcon. |
| position | 'top-start' \| 'top-center' \| 'top-end' \| 'bottom-start' \| 'bottom-center' \| 'bottom-end' | 'bottom-center' | Global region position. Set app-wide via provideKuiToastOptions, or at runtime via KuiToastService.setPosition for demos. |
| maxVisible | number | 3 | Max simultaneous toasts, set via provideKuiToastOptions. The oldest visible toast is evicted when exceeded. Not changeable at runtime. |

## Accessibility

Rendered documentation, interactive examples, and the playground live at the HTML route above.

## Playground

Available at /components/toast/playground.
