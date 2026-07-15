# Button

> Primary command primitive for buttons and links.

- Status: available
- Route: /components/button
- Package: @kikita-labs/ui@0.4.2
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

- `basic-button-example`
- `button-appearance-example`
- `button-size-example`

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
