# Tooltip

> Hover and focus hint.

- Status: available
- Route: /components/tooltip
- Package: @kikita-labs/ui@1.7.3
- Import: KuiTooltipDirective from @kikita-labs/ui
- Source docs: https://github.com/kikita-labs/kikita-ui/blob/v1.7.3/docs/tooltip.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

```html
<button kuiButton [kuiTooltip]="'Save changes'">Save</button>

<button kuiButton [kuiTooltip]="'Delete item'" placement="bottom">Delete</button>
```

The tooltip text is passed as the directive binding value. Empty or whitespace-only strings are ignored, and no tooltip is rendered. `auto` is the default trigger: it uses hover/focus for mouse input and tap for touch input while keeping the tooltip surface and `role="tooltip"`.

For short, non-interactive information triggers, keep the tooltip surface and opt into adaptive tap behavior:

```html
<button
  kuiIconButton
  type="button"
  aria-label="Billing information"
  triggerType="auto"
  [kuiTooltip]="'Your plan renews automatically on the date shown here.'"
>
  <kui-icon name="info" />
</button>
```

Configure the default at application or component scope. The local `triggerType` input takes precedence over the provider:

```ts
// app.config.ts
providers: [provideKikitaUi({ tooltip: { triggerType: KuiTooltipTriggerType.Auto } })];

// A component or route subtree
providers: [kuiProvideTooltipOptions({ triggerType: KuiTooltipTriggerType.Hover })];
```

Use `providers` when the default should apply to the component's subtree and projected content.
Use `viewProviders` when it should apply only to the component's own view. The helper merges with
the nearest parent tooltip options; a direct `KUI_TOOLTIP_OPTIONS` provider replaces the complete
options object at that injector level.

## Examples

Rendered at /components/tooltip:

### basic-tooltip-example

#### basic-tooltip-example.html

```html
<div class="basic-tooltip-example">
  <button kuiButton type="button" [kuiTooltip]="'Save the current draft'">Save</button>
  <button
    kuiButton
    type="button"
    shape="soft"
    [kuiTooltip]="'Open advanced settings'"
    placement="bottom"
  >
    Settings
  </button>
</div>
```

#### basic-tooltip-example.ts

```ts
import { Component } from '@angular/core';

import { KuiButtonDirective, KuiTooltipDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-tooltip-example',
  imports: [KuiButtonDirective, KuiTooltipDirective],
  templateUrl: './basic-tooltip-example.html',
  styleUrl: './basic-tooltip-example.scss',
})
export class BasicTooltipExample {}
```

#### basic-tooltip-example.scss

```scss
.basic-tooltip-example {
  display: flex;
  justify-content: center;
  gap: var(--kui-space-3, 12px);
  flex-wrap: wrap;
}
```

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [kuiTooltip] | string | '' | Tooltip text content. Empty or whitespace-only text does not render a tooltip. |
| placement | 'top' \| 'bottom' \| 'left' \| 'right' | 'top' | Preferred placement relative to the trigger. The CDK overlay can still adjust. |
| triggerType | 'auto' \| 'hover' \| 'click' \| 'none' | 'auto' | Local interaction override. auto uses hover/focus for mouse input and tap for touch input. |
| KuiTooltipTriggerType | enum: Auto \| Hover \| Click \| None | Auto | Enum values accepted by triggerType and tooltip provider options. |
| KUI_TOOLTIP_OPTIONS | InjectionToken<KuiTooltipOptions> | { triggerType: auto } | Injection token for app-wide and scoped tooltip trigger defaults. |
| kuiProvideTooltipOptions(options) | (options: KuiTooltipOptions) => Provider | - | Provides merged tooltip defaults for a component or route subtree; local triggerType wins. |
| provideKikitaUi({ tooltip }) | KikitaUiOptions.tooltip?: KuiTooltipOptions | { triggerType: auto } | Sets the root tooltip trigger default through the main Kikita UI provider. |
| role | 'tooltip' | 'tooltip' | The floating element is exposed as a tooltip while it exists. |
| aria-describedby | string \| null | null | Applied only while the tooltip is visible, preventing stale removed ids. |
| CSS variables | --kui-tooltip-* | - | Controls padding, radius, colors, and shadow through documented tooltip tokens. |

## Accessibility

- Use a native interactive element, normally a `<button>`, for an information trigger.
- Keep tooltip content short, supplemental, and non-interactive.
- The trigger receives `aria-describedby` only while the tooltip is rendered.
- Tap-open tooltips remain available until the user taps again, moves focus outside, taps outside, or presses Escape.

## Playground

Available at /components/tooltip/playground.
