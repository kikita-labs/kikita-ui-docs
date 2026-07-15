# Drawer

> Side and edge overlay surface for focused workflows.

- Status: available
- Route: /components/drawer
- Package: @kikita-labs/ui@0.4.2
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

- `basic-drawer-example`
- `drawer-sides-example`
- `drawer-sizes-example`

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
