# Link

> Inline interactive text for navigation or a JS-driven action.

- Status: available
- Route: /components/link
- Package: @kikita-labs/ui@2.0.0
- Import: KuiLink from @kikita-labs/ui
- Source docs: https://github.com/kikita-labs/kikita-ui/blob/v2.0.0/docs/link.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

```html
<a kuiLink href="/docs">Read the docs</a>
```

### Tone

```html
<a kuiLink tone="default" href="/settings">Settings</a>
<a kuiLink tone="muted" href="/archive">Archive</a>
<a kuiLink tone="primary" href="/docs">Docs (default)</a>
<a kuiLink tone="success" href="/billing">Upgrade</a>
<a kuiLink tone="warning" href="/billing/past-due">Resolve billing issue</a>
<a kuiLink tone="danger" href="/account/delete">Delete account</a>
```

Tone sets the rest color only. Hover, focus, and active never change color -- only underline
thickness and a focus ring do (see Accessibility).

### Underline

```html
<a kuiLink underline="always" href="/docs">Inline link inside a paragraph of body text</a>
<a kuiLink underline="hover" href="/docs">Standalone link (default)</a>
<a kuiLink underline="none" href="/docs">No underline</a>
```

Use `always` for a link inside a paragraph of running text -- color alone is not a sufficient
signal there. `hover` (the default) is meant for a link that already stands apart from body text
(a card title, a nav item); it still underlines on `:focus-visible`/`:active`, not only mouse
hover, so keyboard and touch users get the same cue.

### Sizes (via composed `[kuiText]`)

```html
<a kuiLink variant="body-lg" href="/docs">body-lg</a>
<a kuiLink variant="body" href="/docs">body (default)</a>
<a kuiLink variant="body-sm" href="/docs">body-sm</a>
<a kuiLink variant="caption" href="/docs">caption</a>
```

`variant` is forwarded straight into the internally-composed `[kuiText]` directive -- `[kuiLink]`
carries no typography scale of its own. Only inline text roles make sense for a link. A link
acting as a heading wraps `[kuiLink]` inside an `<h1>`-`<h6>`, not the reverse -- so heading
semantics never depend on whether the text happens to be a link.

Font size, weight, and line height use the selected `--kui-type-<variant>-*`
tokens. The component layer must not replace the role's line height with the
parent's value. This requirement is preserved from the original Link design's
Typography anatomy; the correction is included in Unreleased.

### Icons

```html
<a kuiLink iconStart="download" href="/report.csv">Download report</a>
<a kuiLink iconEnd="arrow-right" href="/updates">All updates</a>
```

`iconStart`/`iconEnd` take a Lucide icon name, rendered through `kui-icon` and decorative (the
link text already carries the meaning).

### External links

```html
<a kuiLink href="https://example.com" target="_blank">External docs</a>
```

`external` defaults to `target() === '_blank'`; set it explicitly to override. When true:

- `rel="noopener noreferrer"` is merged with any `rel` you already set.
- The library's own static external-link chrome glyph fills the `iconEnd` slot, unless you pass
  an explicit `iconEnd` (it is library chrome, not a consumer-chosen icon, so it is a structural icon: synchronous
  icon data drawn as inline SVG rather than the async, name-resolved `kui-icon`, the same treatment
  `kuiDatePicker`'s calendar affix and `kuiTimePicker`'s clock affix get). Replace it with
  `defaults.link.externalIcon` or the `externalLink` role; see [Structural Icons](structural-icons.md).
- A visually-hidden suffix is appended to the accessible name: the `link.opensInNewTab` message, `(opens in a new tab)` by default.

### Disabled

```html
<a kuiLink href="/report.csv" disabled>Download (unavailable)</a>
<button kuiLink type="button" disabled>Copy link</button>
```

`<a>` has no native `disabled` attribute, so a disabled anchor gets `aria-disabled="true"` +
`tabIndex="-1"` + a click handler that cancels navigation -- the same convention `[kuiButton]`
already applies for `as="a"`. Pointer input never reaches a disabled link (`pointer-events: none`),
so the handler only guards keyboard and programmatic activation. A host `<button>` also gets the
native `disabled` attribute.

### JS-driven action, no navigation

```html
<button kuiLink type="button" (click)="copyToClipboard()">Copy link</button>
```

Per MUI's accessibility guidance: a link with no real `href` should render as a `<button>`, not an
`<a>`.

## Examples

Rendered at /components/link:

### basic-link-example

#### basic-link-example.html

```html
<div class="link-example">
  <a kuiLink tone="default" href="#settings">Settings</a>
  <a kuiLink tone="muted" href="#archive">Archive</a>
  <a kuiLink tone="primary" href="#docs">Docs (default)</a>
  <a kuiLink tone="success" href="#billing">Upgrade</a>
  <a kuiLink tone="warning" href="#past-due">Resolve billing issue</a>
  <a kuiLink tone="danger" href="#delete">Delete account</a>
</div>
```

#### basic-link-example.ts

```ts
import { Component } from '@angular/core';

import { KuiLink } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-link-example',
  imports: [KuiLink],
  templateUrl: './basic-link-example.html',
  styleUrl: './basic-link-example.scss',
})
export class BasicLinkExample {}
```

#### basic-link-example.scss

```scss
.link-example {
  display: flex;
  flex-wrap: wrap;
  gap: var(--kui-space-4, 16px);
  align-items: center;
}
```

### link-underline-example

#### link-underline-example.html

```html
<div class="link-example">
  <a kuiLink underline="always" href="#inline">Inline link</a>
  <a kuiLink underline="hover" href="#standalone">Standalone link (default)</a>
  <a kuiLink underline="none" href="#plain">No underline</a>
  <a kuiLink variant="body-lg" href="#lg">body-lg</a>
  <a kuiLink variant="body-sm" href="#sm">body-sm</a>
  <a kuiLink variant="caption" href="#caption">caption</a>
</div>
```

#### link-underline-example.ts

```ts
import { Component } from '@angular/core';

import { KuiLink } from '@kikita-labs/ui';

@Component({
  selector: 'app-link-underline-example',
  imports: [KuiLink],
  templateUrl: './link-underline-example.html',
  styleUrl: './link-underline-example.scss',
})
export class LinkUnderlineExample {}
```

#### link-underline-example.scss

```scss
.link-example {
  display: flex;
  flex-wrap: wrap;
  gap: var(--kui-space-4, 16px);
  align-items: center;
}
```

### link-icons-example

#### link-icons-example.html

```html
<div class="link-example">
  <a kuiLink iconStart="download" href="#report">Download report</a>
  <a kuiLink iconEnd="arrow-right" href="#updates">All updates</a>
  <a kuiLink href="https://example.com" target="_blank">External docs</a>
</div>
```

#### link-icons-example.ts

```ts
import { Component } from '@angular/core';

import { KuiLink } from '@kikita-labs/ui';

@Component({
  selector: 'app-link-icons-example',
  imports: [KuiLink],
  templateUrl: './link-icons-example.html',
  styleUrl: './link-icons-example.scss',
})
export class LinkIconsExample {}
```

#### link-icons-example.scss

```scss
.link-example {
  display: flex;
  flex-wrap: wrap;
  gap: var(--kui-space-4, 16px);
  align-items: center;
}
```

### link-actions-example

#### link-actions-example.html

```html
<div class="link-example">
  <button kuiLink type="button" (click)="copy()">Copy link ({{ copied() }})</button>
  <a kuiLink href="#report" disabled>Download (unavailable)</a>
  <button kuiLink type="button" disabled>Copy link</button>
</div>
```

#### link-actions-example.ts

```ts
import { Component, signal } from '@angular/core';

import { KuiLink } from '@kikita-labs/ui';

@Component({
  selector: 'app-link-actions-example',
  imports: [KuiLink],
  templateUrl: './link-actions-example.html',
  styleUrl: './link-actions-example.scss',
})
export class LinkActionsExample {
  protected readonly copied = signal(0);

  protected copy(): void {
    this.copied.update((count) => count + 1);
  }
}
```

#### link-actions-example.scss

```scss
.link-example {
  display: flex;
  flex-wrap: wrap;
  gap: var(--kui-space-4, 16px);
  align-items: center;
}
```

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| tone | 'default' \| 'muted' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| undefined | undefined | Rest colour only; hover, focus and active never change it. Falls back to defaults.link.tone, then primary. |
| underline | 'always' \| 'hover' \| 'none' \| undefined | undefined | When the link is underlined (defaults.link.underline, then hover). Use always inside running text; hover also underlines on focus-visible and active. |
| variant | 'body-lg' \| 'body' \| 'body-sm' \| 'caption' | 'body' | Forwarded to the composed kuiText directive. The link has no typography scale of its own and ignores defaults.typography. |
| iconStart / iconEnd | string \| undefined | undefined | Decorative icon name rendered through kui-icon before or after the content. An explicit iconEnd replaces the external-link glyph. |
| target / rel | string \| undefined | undefined | Reflected onto the host as native attributes. rel is merged with noopener noreferrer for external links. |
| external | boolean \| undefined | target() === "_blank" | Marks the link as leaving the app: adds rel="noopener noreferrer", the external-link glyph (unless iconEnd is set) and a hidden "(opens in a new tab)" suffix to the name. |
| disabled | boolean | false | A disabled anchor gets aria-disabled, tabindex -1 and a blocked click; a button also gets the native disabled attribute. |
| href, type, (click) | native attributes | - | Plain bindings on the host a or button. There is no as input: use a button without a real href for a JS-driven action. |
| --kui-link-color-default / -muted / -primary / -success / -warning / -danger / -disabled | CSS custom properties | - | Rest colour per tone and the disabled colour. |
| --kui-link-focus-ring / -radius-focus | CSS custom properties | - | Focus ring shadow and its corner radius. |
| --kui-link-decoration-thickness-rest / -active | CSS custom properties | - | Underline thickness at rest and on hover, focus and active. |
| --kui-link-gap | CSS custom property | - | Gap between the icons and the text. |
| KuiLinkOptions | interface | - | Shape of defaults.link: tone, underline and externalIcon. |

## Accessibility

- Host is a native `<a href>` or `<button type="button">` -- no custom ARIA role.
- The visible link text is the accessible name; icons are decorative (`aria-hidden` via `kui-icon`
  without a `label`), never the only carrier of meaning.
- `:focus-visible` shows an explicit ring (`box-shadow` on `--kui-link-focus-ring`).
- Disabled: `aria-disabled="true"` + `tabIndex="-1"` + a blocked click handler (`<a>` has no native
  `disabled`; a host `<button>` also gets the native attribute).
- External links get `rel="noopener noreferrer"` and a visually-hidden "(opens in a new tab)" text
  appended to the accessible name, not only a visual icon.
- Color is never the only signal: default/hover/focus/active differ by underline thickness (and
  focus by the ring), not color alone. Avoid `underline="none"` for a link inside a paragraph of
  running text -- there, tone-color-only is not enough.
- No `visited` tone/state -- not found in Taiga `tuiLink`, MUI `Link`, or the kit's own `Text`; not
  a typical pattern in product SaaS/dashboard UI (see Explicitly Not Included).

| Key             | Action                                                                                 |
| --------------- | -------------------------------------------------------------------------------------- |
| Tab / Shift+Tab | Moves focus to/from the link in the page's normal order (disabled links are excluded). |
| Enter           | Activates the link/button (native `<a>`/`<button>` behavior).                          |
| Space           | Activates only when the host is a `<button>` (native `<a>` does not respond to Space). |

## Playground

Available at /components/link/playground.
