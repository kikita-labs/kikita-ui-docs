# OTP Input

> Row of single-character cells for a one-time code or PIN.

- Status: available
- Route: /components/otp-input
- Package: @kikita-labs/ui@2.0.0
- Import: KuiOtpInput from @kikita-labs/ui
- Source docs: https://github.com/kikita-labs/kikita-ui/blob/v2.0.0/docs/otp-input.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

```html
<kui-otp-input [(value)]="code" (complete)="verify($event)" autoFocus />
```

```ts
protected readonly code = signal('');

protected verify(code: string): void {
  // ...
}
```

`value` is the joined string of every cell's character, in cell order. `(complete)` fires exactly
once, with the completed value, the moment every cell becomes filled -- it does not re-fire while
the code stays complete, and fires again only after the code becomes incomplete and is refilled.

## Examples

Rendered at /components/otp-input:

### basic-otp-input-example

#### basic-otp-input-example.html

```html
<div class="otp-example">
  <kui-otp-input [(value)]="code" (complete)="verify($event)" />
  <span>Entered: {{ code() || 'nothing' }}. Completed: {{ verified() || 'not yet' }}</span>
</div>
```

#### basic-otp-input-example.ts

```ts
import { Component, signal } from '@angular/core';

import { KuiOtpInput } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-otp-input-example',
  imports: [KuiOtpInput],
  templateUrl: './basic-otp-input-example.html',
  styleUrl: './basic-otp-input-example.scss',
})
export class BasicOtpInputExample {
  protected readonly code = signal('');
  protected readonly verified = signal('');

  protected verify(code: string): void {
    this.verified.set(code);
  }
}
```

#### basic-otp-input-example.scss

```scss
.otp-example {
  display: grid;
  gap: var(--kui-space-4, 16px);
  justify-items: start;
}
```

### otp-input-variants-example

#### otp-input-variants-example.html

```html
<div class="otp-example">
  <kui-otp-input mask [length]="4" [(value)]="pin" ariaLabel="PIN code" />
  <kui-otp-input
    [integerOnly]="false"
    [length]="8"
    size="sm"
    [(value)]="backupCode"
    ariaLabel="Backup code"
  />
</div>
```

#### otp-input-variants-example.ts

```ts
import { Component, signal } from '@angular/core';

import { KuiOtpInput } from '@kikita-labs/ui';

@Component({
  selector: 'app-otp-input-variants-example',
  imports: [KuiOtpInput],
  templateUrl: './otp-input-variants-example.html',
  styleUrl: './otp-input-variants-example.scss',
})
export class OtpInputVariantsExample {
  protected readonly pin = signal('');
  protected readonly backupCode = signal('');
}
```

#### otp-input-variants-example.scss

```scss
.otp-example {
  display: grid;
  gap: var(--kui-space-4, 16px);
  justify-items: start;
}
```

### otp-input-field-example

#### otp-input-field-example.html

```html
<div class="otp-example">
  <kui-field
    label="Code from email"
    hint="We sent a 6-digit code to your email. Try 123456."
    [error]="wrong() ? 'Code is wrong or expired' : ''"
  >
    <kui-otp-input [(value)]="code" [loading]="verifying()" [invalid]="wrong()" />
  </kui-field>
  <button kuiButton shape="outline" size="sm" type="button" (click)="toggleVerifying()">
    Toggle loading
  </button>
</div>
```

#### otp-input-field-example.ts

```ts
import { Component, computed, signal } from '@angular/core';

import { KuiButton, KuiField, KuiOtpInput } from '@kikita-labs/ui';

@Component({
  selector: 'app-otp-input-field-example',
  imports: [KuiButton, KuiField, KuiOtpInput],
  templateUrl: './otp-input-field-example.html',
  styleUrl: './otp-input-field-example.scss',
})
export class OtpInputFieldExample {
  protected readonly code = signal('');
  protected readonly verifying = signal(false);
  protected readonly wrong = computed(() => this.code().length === 6 && this.code() !== '123456');

  protected toggleVerifying(): void {
    this.verifying.update((value) => !value);
  }
}
```

#### otp-input-field-example.scss

```scss
.otp-example {
  display: grid;
  gap: var(--kui-space-4, 16px);
  justify-items: start;
}
```

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| length | number | 6 | Number of cells. Static numeric values are coerced; an invalid or non-positive value uses 1. |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' \| undefined | undefined | Cell size, the same scale as Input. Falls back to defaults.otpInput.size, then the root size, then md. |
| mask | boolean \| undefined | undefined | Renders every cell as type="password" (defaults.otpInput.mask, then false). |
| integerOnly | boolean \| undefined | undefined | Restricts input to digits with a numeric mobile keyboard (defaults.otpInput.integerOnly, then true). false accepts letters and digits, uppercased. |
| autoFocus | boolean | false | Focuses the first cell that can take focus after the first render, and again on every false to true change. |
| ariaLabel | string \| undefined | undefined | Accessible name of the role="group" cell group. Falls back to the otpInput.label message (Verification code). |
| [(value)] | string | '' | Joined characters of every cell, in order. Set by [formField] or [(value)]. |
| disabled | boolean | false | Disables every cell with the native attribute. Set by [formField] or directly. |
| readonly | boolean | false | Makes every cell read-only and also blocks pasting a new code and the cross-cell Backspace clear. |
| required | boolean | false | Marks the code required: the first cell, which the field label points at, gets the native required state. Also follows a required ancestor kui-field. |
| loading | boolean | false | Disables every cell, blurs the code in place and shows a centered Loader without changing the group size. |
| invalid | boolean | false | Marks every cell invalid. Through [formField] the raw state is gated by touched before it shows. |
| errors | readonly ValidationError[] | [] | Current validation errors. Set by [formField]. |
| touched | boolean | false | Whether the control has been touched. Set by [formField]. |
| (touch) | void | - | Emitted after any cell edit; marks the control touched in the form system. |
| (complete) | string | - | Emitted once with the completed value when every cell becomes filled. It fires again only after the code became incomplete and was refilled. |
| focus(options?) | (options?: FocusOptions) => void | - | Moves focus to the first cell that can take focus, so focusBoundControl() works. Does nothing while every cell is disabled. |
| --kui-otp-gap / -cell-size / -cell-font-size / -loading-blur | CSS custom properties | - | Gap between cells, the square cell size, the digit font size and the loading blur (2px). |
| KuiOtpInputOptions | interface | - | Shape of defaults.otpInput: size, mask and integerOnly. |

## Accessibility

- The group is `role="group"` with an `aria-label` (default `"Verification code"`).
- Each cell is a plain `<input>` with its own `aria-label="Digit N of M"`.
- Keyboard:
  - Typing a valid character fills the cell and advances focus to the next empty cell.
  - `Backspace` on an already-empty cell clears and refocuses the previous cell (a non-empty cell
    just clears itself, native browser behavior).
  - `ArrowLeft`/`ArrowRight` move focus between cells without changing any value.
  - `Home`/`End` jump to the first/last cell.
  - `Tab`/`Shift+Tab` leave the whole group (arrow keys, not Tab, move between cells).
  - `Ctrl`/`Cmd+V` distributes a pasted code across cells starting at the first cell, regardless of
    which cell had focus.
- The first cell carries `autocomplete="one-time-code"` for WebOTP-based SMS autofill on iOS/
  Android.
- `invalid` is a plain manual input for standalone use; whether a code is wrong is normally a
  server response, which no client-side validator can know ahead of time. When bound through
  `[formField]`, Signal Forms writes its raw, untouched-gated validity into `invalid` (the same
  interop `input[kuiInput]` documents); `kui-otp-input` gates that specific case by `touched()`
  itself before showing it on the cells, so a required-but-empty code does not paint every cell red
  before the user has interacted with the group -- matching `kui-field`'s own gated error text.
- `readonly` blocks pasting a new code and blocks the cross-cell Backspace clear (the native
  `readonly` attribute alone only blocks a cell's own direct keystroke, not those two component-
  level behaviors, so both are guarded explicitly).
- Disabled/loading use the native `disabled` attribute on every cell, so they are excluded from the
  tab order, not merely dimmed.

## Playground

Available at /components/otp-input/playground.
