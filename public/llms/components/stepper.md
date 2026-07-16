# Stepper

> Multi-step progress and navigation indicator.

- Status: available
- Route: /components/stepper
- Package: @kikita-labs/ui@0.4.4
- Import: KuiStepperComponent from @kikita-labs/ui
- Source docs: ../kikita-ui/docs/stepper.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

```html
<kui-stepper [(currentIndex)]="step" aria-label="Progress">
  <kui-step label="Account" />
  <kui-step label="Workspace" />
  <kui-step label="Invite team" />
</kui-stepper>
```

### Vertical Orientation

```html
<kui-stepper orientation="vertical" [(currentIndex)]="step" aria-label="Progress">
  <kui-step label="Account details" description="Name, email, password" />
  <kui-step label="Workspace setup" description="Team name and logo" />
</kui-stepper>
```

### Error State

```html
<kui-stepper [currentIndex]="1" aria-label="Progress">
  <kui-step label="Account" />
  <kui-step label="Payment" description="Card declined" [hasError]="true" />
  <kui-step label="Confirm" />
</kui-stepper>
```

Steps after an errored step automatically render as `disabled`.

### Compact

```html
<kui-stepper compact [(currentIndex)]="step" aria-label="Progress">
  <kui-step label="Account" />
  <kui-step label="Workspace" />
  <kui-step label="Invite team" />
</kui-stepper>
```

## Examples

Rendered at /components/stepper:

### basic-stepper-example

#### basic-stepper-example.html

```html
<div class="basic-stepper-example">
  <kui-stepper [(currentIndex)]="currentIndex">
    <kui-step label="Details" description="Project basics" />
    <kui-step label="Team" description="Invite collaborators" />
    <kui-step label="Review" description="Confirm settings" />
  </kui-stepper>
</div>
```

#### basic-stepper-example.ts

```ts
import { Component, signal } from '@angular/core';

import { KuiStepComponent, KuiStepperComponent } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-stepper-example',
  imports: [KuiStepComponent, KuiStepperComponent],
  templateUrl: './basic-stepper-example.html',
  styleUrl: './basic-stepper-example.scss',
})
export class BasicStepperExample {
  protected readonly currentIndex = signal(1);
}
```

#### basic-stepper-example.scss

```scss
.basic-stepper-example {
  display: grid;
  min-width: 0;
}
```

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [(currentIndex)] | number | 0 | Zero-based active step index. |
| orientation | 'horizontal' \| 'vertical' | 'horizontal' | Step list layout direction. |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Circle size and label scale. |
| linear | boolean | true | Prevents jumping forward to upcoming steps when true. |
| compact | boolean | false | Shows step circles without labels or descriptions. |
| kui-step.label | string | '' | Primary step label. |
| kui-step.description | string | '' | Optional secondary line below the label. |
| kui-step.hasError | boolean | false | Marks the step as errored and disables later steps. |
| kui-step.disabled | boolean | false | Forces a step to render disabled. |

## Accessibility

- `kui-stepper` renders `role="list"`; each `kui-step` renders `role="listitem"`.
- The current step has `aria-current="step"`.
- Completed steps (and, when `linear` is `false`, upcoming steps) render their circle as a native `<button>` with an accessible name (`Back to step X` / `Go to step X`).
- Disabled and non-interactive steps render a plain `<span>`, out of tab order.
- Connector lines are decorative (`aria-hidden="true"`).
- Pass `aria-label` on the host, for example `aria-label="Progress"`.

## Playground

Available at /components/stepper/playground.
