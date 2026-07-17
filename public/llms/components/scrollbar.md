# Scrollbar

> Tokenized native scroll container utility.

- Status: available
- Route: /components/scrollbar
- Package: @kikita-labs/ui@0.6.2
- Import: .kui-scroll from @kikita-labs/ui
- Source docs: ../kikita-ui/docs/scrollbar.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

For application-wide scrollbar styling, enable the provider option once:

```ts
import { provideKikitaUi } from '@kikita-labs/ui';

export const appConfig = {
  providers: [provideKikitaUi({ scrollbars: 'styled' })],
};
```

This sets `data-kui-scrollbars="styled"` on the document root and styles native scrollbars for application-owned scroll containers.

The default is `scrollbars: 'native'` for application-owned scroll containers. Kikita-owned internal scroll areas, such as dropdown, dialog body, drawer body, and command palette list, still use Kikita scrollbar tokens automatically.

Use `kui-scroll` only for local opt-in when you do not want global application scrollbar styling:

```html
<div class="kui-scroll" tabindex="0" style="max-block-size: 240px; overflow: auto">
  <p>Scrollable content...</p>
  <p>Scrollable content...</p>
  <p>Scrollable content...</p>
</div>
```

Apply the class to the element that actually scrolls. Do not apply it to a child wrapper that has no overflow.

## Examples

Rendered at /components/scrollbar:

### local-scroll-container-example

#### local-scroll-container-example.html

```html
<div class="kui-scroll local-scroll-container-example__region" tabindex="0">
  <p>First paragraph of scrollable content.</p>
  <p>Second paragraph of scrollable content.</p>
  <p>Third paragraph of scrollable content.</p>
  <p>Fourth paragraph of scrollable content.</p>
  <p>Fifth paragraph of scrollable content.</p>
</div>
```

#### local-scroll-container-example.ts

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-local-scroll-container-example',
  templateUrl: './local-scroll-container-example.html',
  styleUrl: './local-scroll-container-example.scss',
})
export class LocalScrollContainerExample {}
```

#### local-scroll-container-example.scss

```scss
.local-scroll-container-example__region {
  max-block-size: 160px;
  overflow: auto;
  padding-inline-end: var(--kui-space-2, 8px);
}
```

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| .kui-scroll | CSS class | - | Local opt-in for Kikita scrollbar token styling. Apply to the element that actually scrolls (the one with overflow: auto/scroll set), not a non-scrolling wrapper. |
| provideKikitaUi({ scrollbars }) | KuiScrollbarMode = 'native' \| 'styled' | 'native' | App-wide scrollbar mode for application-owned scroll containers. Sets data-kui-scrollbars on the document root. Kikita-owned internal scroll areas (dropdown, dialog body, drawer body, command palette list) use Kikita scrollbar tokens automatically regardless of this option. |
| --kui-scrollbar-size | CSS custom property | - | Scrollbar thickness. |
| --kui-scrollbar-radius | CSS custom property | - | Corner radius of the scrollbar thumb. |
| --kui-scrollbar-track | CSS custom property | - | Scrollbar track background color. |
| --kui-scrollbar-thumb-min | CSS custom property | - | Minimum thumb length so short thumbs stay grabbable. |
| --kui-scrollbar-thumb-inset | CSS custom property | - | Inset spacing between the thumb and the track edge. |
| --kui-color-scrollbar-thumb | CSS custom property | - | Thumb color in the resting state. |
| --kui-color-scrollbar-thumb-hover | CSS custom property | - | Thumb color on hover. |
| --kui-color-scrollbar-thumb-active | CSS custom property | - | Thumb color while being dragged. |

## Accessibility

- The utility keeps native browser scrolling behavior.
- Add `tabindex="0"` on the scrollable element itself so keyboard users can focus and scroll it (WCAG 2.1.1 / axe `scrollable-region-focusable`). CSS alone cannot make an overflow container focusable.
- Do not add ARIA roles only to style a scrollbar.
- Keyboard scrolling, touch scrolling, and assistive-technology behavior remain owned by the native scroll container.
- In forced-colors mode, scrollbar colors fall back to the system implementation.
- Browser and OS scrollbar rendering can differ, especially with overlay scrollbars.

## Playground

No playground for this component.
