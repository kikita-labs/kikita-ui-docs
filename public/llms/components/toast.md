# Toast

> Global notifications with actions and live-region semantics.

- Status: available
- Route: /components/toast
- Package: @kikita-labs/ui@0.4.3
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

- `basic-toast-example`
- `toast-action-example`
- `toast-position-example`

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
