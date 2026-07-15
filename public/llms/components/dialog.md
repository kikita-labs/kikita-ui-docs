# Dialog

> Typed modal overlay service and host contract.

- Status: available
- Route: /components/dialog
- Package: @kikita-labs/ui@0.4.3
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

- `basic-dialog-example`
- `dialog-confirm-example`
- `dialog-sizes-example`

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
