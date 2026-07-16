# Tooltip

> Hover and focus hint.

- Status: available
- Route: /components/tooltip
- Package: @kikita-labs/ui@0.4.4
- Import: KuiTooltipDirective from @kikita-labs/ui
- Source docs: ../kikita-ui/docs/tooltip.md

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

The tooltip text is passed as the directive binding value. Empty or whitespace-only strings are ignored, and no tooltip is rendered.

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
| role | 'tooltip' | 'tooltip' | The floating element is exposed as a tooltip while it exists. |
| aria-describedby | string \| null | null | Applied only while the tooltip is visible, preventing stale removed ids. |
| CSS variables | --kui-tooltip-* | - | Controls padding, radius, colors, and shadow through documented tooltip tokens. |

## Accessibility

Rendered documentation, interactive examples, and the playground live at the HTML route above.

## Playground

Available at /components/tooltip/playground.
