# Progress

> Progress status primitive for determinate and indeterminate work.

- Status: available
- Route: /components/progress
- Package: @kikita-labs/ui@1.0.0
- Import: KuiProgressComponent from @kikita-labs/ui
- Source docs: ../kikita-ui/docs/progress.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

Rendered documentation, interactive examples, and the playground live at the HTML route above.

## Examples

Rendered at /components/progress:

### basic-progress-example

#### basic-progress-example.html

```html
<div class="progress-example">
  <div class="progress-example__item">
    <span class="progress-example__label">Determinate (60%)</span>
    <kui-progress [value]="60" aria-label="Upload progress" />
  </div>
  <div class="progress-example__item">
    <span class="progress-example__label">Indeterminate</span>
    <kui-progress aria-label="Loading" />
  </div>
</div>
```

#### basic-progress-example.ts

```ts
import { Component } from '@angular/core';

import { KuiProgressComponent } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-progress-example',
  imports: [KuiProgressComponent],
  templateUrl: './basic-progress-example.html',
  styleUrl: './basic-progress-example.scss',
})
export class BasicProgressExample {}
```

#### basic-progress-example.scss

```scss
.progress-example {
  display: flex;
  flex-direction: column;
  gap: var(--kui-space-4, 16px);
  inline-size: 100%;
  max-inline-size: 360px;
}

.progress-example__item {
  display: flex;
  flex-direction: column;
  gap: var(--kui-space-2, 8px);
}

.progress-example__label {
  color: var(--kui-color-text-secondary);
  font-size: var(--kui-text-sm-size, 13px);
}
```

### progress-circular-example

#### progress-circular-example.html

```html
<div class="progress-circular-example">
  <kui-progress type="circular" size="lg" color="success" [value]="72" aria-label="72% complete">
    72%
  </kui-progress>
  <kui-progress type="circular" aria-label="Loading" />
</div>
```

#### progress-circular-example.ts

```ts
import { Component } from '@angular/core';

import { KuiProgressComponent } from '@kikita-labs/ui';

@Component({
  selector: 'app-progress-circular-example',
  imports: [KuiProgressComponent],
  templateUrl: './progress-circular-example.html',
  styleUrl: './progress-circular-example.scss',
})
export class ProgressCircularExample {}
```

#### progress-circular-example.scss

```scss
.progress-circular-example {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: var(--kui-space-6, 24px);
}
```

### progress-color-size-example

#### progress-color-size-example.html

```html
<div class="progress-color-size-example">
  <div class="progress-color-size-example__group">
    <kui-progress size="xs" [value]="40" aria-label="Extra small progress" />
    <kui-progress size="sm" [value]="40" aria-label="Small progress" />
    <kui-progress size="md" [value]="40" aria-label="Medium progress" />
    <kui-progress size="lg" [value]="40" aria-label="Large progress" />
    <kui-progress size="xl" [value]="40" aria-label="Extra large progress" />
  </div>
  <div class="progress-color-size-example__group">
    <kui-progress color="primary" [value]="55" aria-label="Primary progress" />
    <kui-progress color="success" [value]="55" aria-label="Success progress" />
    <kui-progress color="warning" [value]="55" aria-label="Warning progress" />
    <kui-progress color="danger" [value]="55" aria-label="Danger progress" />
    <kui-progress color="neutral" [value]="55" aria-label="Neutral progress" />
  </div>
</div>
```

#### progress-color-size-example.ts

```ts
import { Component } from '@angular/core';

import { KuiProgressComponent } from '@kikita-labs/ui';

@Component({
  selector: 'app-progress-color-size-example',
  imports: [KuiProgressComponent],
  templateUrl: './progress-color-size-example.html',
  styleUrl: './progress-color-size-example.scss',
})
export class ProgressColorSizeExample {}
```

#### progress-color-size-example.scss

```scss
.progress-color-size-example {
  display: flex;
  flex-direction: column;
  gap: var(--kui-space-5, 20px);
  inline-size: 100%;
  max-inline-size: 360px;
}

.progress-color-size-example__group {
  display: flex;
  flex-direction: column;
  gap: var(--kui-space-3, 12px);
}
```

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| type | 'linear' \| 'circular' | 'linear' | Progress shape. |
| value | number \| null | null | Progress value from 0 to 100. Values are clamped visually. null renders the indeterminate animation. |
| color | 'primary' \| 'success' \| 'warning' \| 'danger' \| 'neutral' | 'primary' | Semantic color. |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' | 'md' | Linear thickness or circular diameter. |
| content projection | text \| template | - | Projected content is rendered centered inside circular progress. |

## Accessibility

The host uses `role="progressbar"`, `aria-valuemin="0"`, and
`aria-valuemax="100"`. Determinate progress also sets `aria-valuenow`.

Always provide an accessible name with `aria-label` or `aria-labelledby`.

## Playground

Available at /components/progress/playground.
