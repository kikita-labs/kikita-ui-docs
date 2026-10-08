# Alert

> Inline notification embedded in the page content flow.

- Status: available
- Route: /components/alert
- Package: @kikita-labs/ui@2.0.0
- Import: KuiAlert from @kikita-labs/ui
- Source docs: https://github.com/kikita-labs/kikita-ui/blob/v2.0.0/docs/alert.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

```html
<kui-alert
  appearance="warning"
  title="Session expiring"
  message="Your access token expires in 3 days -- renew it in advance."
  actionLabel="Renew"
  (action)="renewSession()"
  (closed)="dismissed.set(true)"
/>
```

`kui-alert` is a controlled component: it never removes itself from the DOM. `(closed)` only
notifies the consumer when the close button is clicked, the same pattern `[kuiChip]`'s `(removed)`
uses -- conditionally render the alert (e.g. `@if (!dismissed())`) to actually hide it.

```ts
protected readonly dismissed = signal(false);
```

```html
@if (!dismissed()) {
<kui-alert message="Draft saved." (closed)="dismissed.set(true)" />
}
```

At least one of `title`/`message`/a projected `[kuiAlertMessage]` should be set.

## Examples

Rendered at /components/alert:

### basic-alert-example

#### basic-alert-example.html

```html
<div class="alert-example">
  <kui-alert appearance="neutral" title="Neutral" message="A plain notice without severity." />
  <kui-alert appearance="info" title="Info" message="We updated the terms of service." />
  <kui-alert appearance="success" title="Success" message="Your changes were saved." />
  <kui-alert appearance="warning" title="Warning" message="Your access token expires in 3 days." />
  <kui-alert
    appearance="danger"
    title="Danger"
    message="The upload failed. Check your connection."
  />
</div>
```

#### basic-alert-example.ts

```ts
import { Component } from '@angular/core';

import { KuiAlert } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-alert-example',
  imports: [KuiAlert],
  templateUrl: './basic-alert-example.html',
  styleUrl: './basic-alert-example.scss',
})
export class BasicAlertExample {}
```

#### basic-alert-example.scss

```scss
.alert-example {
  display: grid;
  gap: var(--kui-space-3);
}
```

### alert-shape-example

#### alert-shape-example.html

```html
<div class="alert-example">
  <kui-alert appearance="info" shape="soft" title="Soft" message="Tinted background and border." />
  <kui-alert appearance="info" shape="outline" title="Outline" message="Transparent background." />
  <kui-alert
    appearance="info"
    shape="solid"
    title="Solid"
    message="Saturated fill with on-fill text."
  />
  <kui-alert appearance="info" size="sm" title="Small" message="Tighter padding and gap." />
</div>
```

#### alert-shape-example.ts

```ts
import { Component } from '@angular/core';

import { KuiAlert } from '@kikita-labs/ui';

@Component({
  selector: 'app-alert-shape-example',
  imports: [KuiAlert],
  templateUrl: './alert-shape-example.html',
  styleUrl: './alert-shape-example.scss',
})
export class AlertShapeExample {}
```

#### alert-shape-example.scss

```scss
.alert-example {
  display: grid;
  gap: var(--kui-space-3);
}
```

### alert-action-example

#### alert-action-example.html

```html
<div class="alert-example">
  @if (!dismissed()) {
    <kui-alert
      appearance="warning"
      title="Session expiring"
      message="Your access token expires in 3 days. Renewed {{ renewals() }} times."
      actionLabel="Renew"
      (action)="renew()"
      (closed)="dismissed.set(true)"
    />
  } @else {
    <button kuiButton shape="outline" type="button" (click)="restore()">
      Show the alert again
    </button>
  }
</div>
```

#### alert-action-example.ts

```ts
import { Component, signal } from '@angular/core';

import { KuiAlert, KuiButton } from '@kikita-labs/ui';

@Component({
  selector: 'app-alert-action-example',
  imports: [KuiAlert, KuiButton],
  templateUrl: './alert-action-example.html',
  styleUrl: './alert-action-example.scss',
})
export class AlertActionExample {
  protected readonly dismissed = signal(false);
  protected readonly renewals = signal(0);

  protected renew(): void {
    this.renewals.update((count) => count + 1);
  }

  protected restore(): void {
    this.dismissed.set(false);
  }
}
```

#### alert-action-example.scss

```scss
.alert-example {
  display: grid;
  gap: var(--kui-space-3);
  justify-items: start;
}

.alert-example kui-alert {
  inline-size: 100%;
}
```

### alert-custom-content-example

#### alert-custom-content-example.html

```html
<kui-alert appearance="danger" [closable]="false">
  <kui-icon kuiAlertIcon name="cloud-off" />
  <span kuiAlertTitle>Upload failed <span kuiBadge appearance="danger">retrying</span></span>
  <p kuiAlertMessage>Check your connection and <a href="#retry">try again</a>.</p>
  <div kuiAlertActions>
    <button kuiButton shape="ghost" size="xs" type="button">Retry</button>
    <button kuiButton shape="ghost" size="xs" type="button">Dismiss</button>
  </div>
</kui-alert>
```

#### alert-custom-content-example.ts

```ts
import { Component } from '@angular/core';

import {
  KuiAlert,
  KuiAlertActions,
  KuiAlertIcon,
  KuiAlertMessage,
  KuiAlertTitle,
  KuiBadge,
  KuiButton,
  KuiIcon,
} from '@kikita-labs/ui';

@Component({
  selector: 'app-alert-custom-content-example',
  imports: [
    KuiAlert,
    KuiAlertActions,
    KuiAlertIcon,
    KuiAlertMessage,
    KuiAlertTitle,
    KuiBadge,
    KuiButton,
    KuiIcon,
  ],
  templateUrl: './alert-custom-content-example.html',
  styleUrl: './alert-custom-content-example.scss',
})
export class AlertCustomContentExample {}
```

#### alert-custom-content-example.scss

```scss
:host {
  display: block;
}
```

### alert-banner-example

#### alert-banner-example.html

```html
<kui-alert appearance="info" banner message="We updated the terms of service." />
```

#### alert-banner-example.ts

```ts
import { Component } from '@angular/core';

import { KuiAlert } from '@kikita-labs/ui';

@Component({
  selector: 'app-alert-banner-example',
  imports: [KuiAlert],
  templateUrl: './alert-banner-example.html',
  styleUrl: './alert-banner-example.scss',
})
export class AlertBannerExample {}
```

#### alert-banner-example.scss

```scss
:host {
  display: block;
}
```

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| appearance | 'neutral' \| 'info' \| 'success' \| 'warning' \| 'danger' | 'neutral' | Semantic type. Same five values as the toast. neutral never shows the built-in icon; danger is announced assertively, every other value politely. |
| shape | 'soft' \| 'outline' \| 'solid' \| undefined | undefined | Visual weight, using the button shape vocabulary. Falls back to defaults.alert.shape, then soft. |
| size | 'sm' \| 'md' \| undefined | undefined | Padding and gap density. Falls back to defaults.alert.size, then the root defaults.size (sm or md only), then md. |
| banner | boolean | false | Stretches the alert to the full width of its container and removes the corner radius. |
| title | string \| undefined | undefined | Optional single-line heading. Ignored when [kuiAlertTitle] is projected. Set at least one of title, message or [kuiAlertMessage]. |
| message | string \| undefined | undefined | Optional supporting text below the title. Ignored when [kuiAlertMessage] is projected. |
| showIcon | boolean \| undefined | undefined | Shows the built-in appearance icon (defaults.alert.showIcon, then true). neutral never shows one. Ignored when [kuiAlertIcon] is projected, which always renders. |
| closable | boolean \| undefined | undefined | Shows the close button and enables (closed). Falls back to defaults.alert.closable, then true. |
| closeLabel | string \| undefined | undefined | Accessible label for the close button. Falls back to the alert.close message (Close notification). |
| actionLabel | string \| undefined | undefined | Label for the inline ghost action button. Ignored when [kuiAlertActions] is projected. |
| (action) | void | - | Emits when the action button is clicked. Not emitted for a projected [kuiAlertActions]. |
| (closed) | void | - | Emits when the close button is clicked. The alert never removes itself; hide it with @if. |
| [kuiAlertTitle] | content slot | - | Replaces the plain title string with arbitrary markup. |
| [kuiAlertIcon] | content slot | - | Replaces the built-in severity icon. A projected icon always renders, even for neutral, and inherits --kui-alert-icon-color. |
| [kuiAlertMessage] | content slot | - | Replaces the plain message string with arbitrary markup (links, lists). The title still renders alongside it. |
| [kuiAlertActions] | content slot | - | Replaces the single ghost action button with custom controls. kuiButton inside it picks up the appearance-tinted ghost colour. |
| KuiAlertOptions | interface | - | Shape of defaults.alert: size, shape, showIcon, closable and closeIcon. |

## Accessibility

- `role="alert"` + `aria-live="assertive"` + `aria-atomic="true"` only for `appearance="danger"`
  (genuinely urgent). Every other appearance uses `role="status"` + `aria-live="polite"` +
  `aria-atomic="true"` -- the same split `kuiToast()` uses, so a screen reader is not interrupted
  by routine info/success/warning alerts.
- `kui-alert` itself is not in the tab order; only its real controls (action, close) are
  focusable.
- The close button is a `kuiIconButton` with a required accessible name (`closeLabel`, default
  `"Close notification"`), never an unlabeled icon.
- Severity is never color-only: `info`/`success`/`warning`/`danger` always pair an icon with text;
  `neutral` has no icon because it carries no severity meaning.
- `Escape` does not close `kui-alert` -- it is a static region, not an overlay.

## Playground

Available at /components/alert/playground.
