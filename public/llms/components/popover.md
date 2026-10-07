# Popover

> Anchored content surface for contextual UI.

- Status: available
- Route: /components/popover
- Package: @kikita-labs/ui@2.0.0
- Import: KuiPopover from @kikita-labs/ui
- Source docs: https://github.com/kikita-labs/kikita-ui/blob/v2.0.0/docs/popover.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

```html
<button [kuiPopoverFor]="myPop" kuiButton>Open</button>

<kui-popover #myPop placement="bottom" [arrow]="true" ariaLabel="Details">
  <div class="kui-popover-title">Title</div>
  <div class="kui-popover-desc">Supporting text.</div>
</kui-popover>
```

## Examples

Rendered at /components/popover:

### action-popover-example

#### action-popover-example.html

```html
<div class="action-popover-example">
  <button [kuiPopoverFor]="confirmPop" kuiButton type="button" appearance="danger">Delete</button>

  <kui-popover
    #confirmPop
    placement="bottom"
    align="start"
    [arrow]="true"
    ariaLabel="Delete record"
  >
    <div class="kui-popover-title">Delete record?</div>
    <div class="kui-popover-desc" style="margin-bottom: 12px">This cannot be undone.</div>
    <div style="display: flex; gap: 8px; justify-content: flex-end">
      <button kuiButton type="button" shape="outline" size="sm" (click)="confirmPop.close()">
        Cancel
      </button>
      <button
        kuiButton
        type="button"
        appearance="danger"
        size="sm"
        (click)="delete(); confirmPop.close()"
      >
        Delete
      </button>
    </div>
  </kui-popover>

  @if (deleted()) {
    <span class="action-popover-example__status">Record deleted.</span>
  }
</div>
```

#### action-popover-example.ts

```ts
import { Component, signal } from '@angular/core';

import { KuiButton, KuiPopover, KuiPopoverFor } from '@kikita-labs/ui';

@Component({
  selector: 'app-action-popover-example',
  imports: [KuiButton, KuiPopover, KuiPopoverFor],
  templateUrl: './action-popover-example.html',
})
export class ActionPopoverExample {
  protected readonly deleted = signal(false);

  protected delete(): void {
    this.deleted.set(true);
  }
}
```

### basic-popover-example

#### basic-popover-example.html

```html
<div class="basic-popover-example">
  <button [kuiPopoverFor]="myPop" kuiButton type="button">Open</button>

  <kui-popover #myPop placement="bottom" [arrow]="true" ariaLabel="Details">
    <div class="kui-popover-title">Title</div>
    <div class="kui-popover-desc">Supporting text.</div>
  </kui-popover>
</div>
```

#### basic-popover-example.ts

```ts
import { Component } from '@angular/core';

import { KuiButton, KuiPopover, KuiPopoverFor } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-popover-example',
  imports: [KuiButton, KuiPopover, KuiPopoverFor],
  templateUrl: './basic-popover-example.html',
})
export class BasicPopoverExample {}
```

### hover-popover-example

#### hover-popover-example.html

```html
<div class="hover-popover-example">
  <button [kuiPopoverFor]="hoverPop" kuiButton type="button">Hover me</button>

  <kui-popover
    #hoverPop
    placement="top"
    triggerType="hover"
    [arrow]="true"
    ariaLabel="Hover details"
  >
    <div class="kui-popover-desc">Opens on hover. Mouse can travel to the panel.</div>
  </kui-popover>
</div>
```

#### hover-popover-example.ts

```ts
import { Component } from '@angular/core';

import { KuiButton, KuiPopover, KuiPopoverFor } from '@kikita-labs/ui';

@Component({
  selector: 'app-hover-popover-example',
  imports: [KuiButton, KuiPopover, KuiPopoverFor],
  templateUrl: './hover-popover-example.html',
})
export class HoverPopoverExample {}
```

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| placement | 'top' \| 'bottom' \| 'left' \| 'right' \| undefined | undefined | Preferred side of the anchor (defaults.popover.placement, then bottom). Auto-flips to the opposite side to fit the viewport. |
| align | 'start' \| 'center' \| 'end' \| undefined | undefined | Alignment of the panel along the anchor edge (defaults.popover.align, then center). Preserved after a placement flip. |
| arrow | boolean \| undefined | undefined | Shows the arrow caret pointing to the anchor. Falls back to defaults.popover.arrow, then false. |
| triggerType | 'click' \| 'hover' \| undefined | undefined | Falls back to defaults.popover.triggerType, then click. click toggles the panel on click and closes on outside click or ESC. hover opens on mouseenter and closes on mouseleave. |
| ariaLabel | string \| undefined | undefined | Accessible name for the role="dialog" panel. Falls back to the popover.label message (Popover); prefer content-specific text. |
| hoverDelay | number \| undefined | undefined | Delay in ms before closing on mouseleave in hover mode (defaults.popover.hoverDelay, then 100). Lets the mouse travel from trigger to panel. |
| offset | number \| undefined | undefined | Gap in px between the anchor and the panel (defaults.popover.offset, then 8). The arrow adds 6px automatically. A static numeric string is coerced. |
| trapFocus | boolean | false | Traps focus inside the panel and auto-focuses the first focusable element on open. |
| open | boolean (model) | false | Current open state exposed for trigger integrations via openChange. Not intended as a standalone controlled API. |
| [kuiPopoverFor] | KuiPopover \| undefined | - | Wires any element as a trigger for a kui-popover. Sets aria-expanded and aria-haspopup="dialog" automatically. |
| .kui-popover-title | - | - | Optional CSS class for a semi-bold sm title inside the projected content. |
| .kui-popover-desc | - | - | Optional CSS class for secondary sm supporting text inside the projected content. |
| --kui-popover-bg | CSS custom property | var(--kui-color-surface-elevated) | Panel background. |
| --kui-popover-border | CSS custom property | var(--kui-color-border) | Panel border color. |
| --kui-popover-radius | CSS custom property | var(--kui-radius-lg) | Panel corner radius. |
| --kui-popover-shadow | CSS custom property | var(--kui-shadow-lg) | Panel drop shadow. |
| --kui-popover-padding-x | CSS custom property | var(--kui-space-4) | Panel horizontal padding. |
| --kui-popover-padding-y | CSS custom property | var(--kui-space-4) | Panel vertical padding. |
| --kui-popover-min-width | CSS custom property | 160px | Minimum panel width. |
| --kui-popover-max-width | CSS custom property | 320px | Maximum panel width. |
| --kui-popover-arrow-size | CSS custom property | 10px | Arrow caret size. |
| --kui-z-popover | CSS custom property | 400 | Panel z-index in browsers without the Popover API. |
| openFor(anchor) | (anchor: Element) => void | - | Opens the popover anchored to the given element. |
| toggleFor(anchor) | (anchor: Element) => void | - | Toggles the popover for a trigger and reopens immediately when an exit animation is running. |
| close() | () => void | - | Closes the popover with the exit animation. |
| scheduleClose(delay) | (delay: number) => void | - | Schedules a close after delay ms (hover mode). |
| cancelClose() | () => void | - | Cancels a pending scheduled close. |
| KuiPopoverOptions | interface | - | Shape of defaults.popover: placement, offset, align, arrow, triggerType and hoverDelay. |

## Accessibility

Rendered documentation, interactive examples, and the playground live at the HTML route above.

## Playground

Available at /components/popover/playground.
