# Icon

> SVG icon renderer.

- Status: available
- Route: /components/icon
- Package: @kikita-labs/ui@0.4.6
- Import: KuiIconComponent from @kikita-labs/ui
- Source docs: ../kikita-ui/docs/icon.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

```html
<kui-icon name="check" label="Success" />
<kui-icon src="/assets/logo.svg" label="Logo" />
<kui-icon name="check" />
```

Omit `label` for decorative icons. Decorative icons render with `aria-hidden="true"`.

## Examples

Rendered at /components/icon:

### basic-icon-example

#### basic-icon-example.html

```html
<div class="basic-icon-example">
  <span class="basic-icon-example__status">
    <kui-icon [source]="checkIcon" label="Success" size="18px" />
    Package verified
  </span>

  <button kuiIconButton type="button" shape="soft" aria-label="Run magic action">
    <kui-icon [source]="sparkIcon" />
  </button>
</div>
```

#### basic-icon-example.ts

```ts
import { Component } from '@angular/core';

import { KuiIconButtonDirective, KuiIconComponent } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-icon-example',
  imports: [KuiIconButtonDirective, KuiIconComponent],
  templateUrl: './basic-icon-example.html',
  styleUrl: './basic-icon-example.scss',
})
export class BasicIconExample {
  protected readonly checkIcon =
    '<svg viewBox="0 0 16 16" fill="none"><path d="M3 8l3 3 7-7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  protected readonly sparkIcon =
    '<svg viewBox="0 0 16 16" fill="none"><path d="M8 1.5l1.4 4 4.1 1.5-4.1 1.5-1.4 4-1.4-4L2.5 7l4.1-1.5L8 1.5z" stroke="currentColor" stroke-linejoin="round"/></svg>';
}
```

#### basic-icon-example.scss

```scss
.basic-icon-example {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--kui-space-3, 12px);
  flex-wrap: wrap;
}

.basic-icon-example__status {
  display: inline-flex;
  align-items: center;
  gap: var(--kui-space-2, 8px);
  color: var(--kui-color-text);
}
```

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| kui-icon | Component | - | Renders an icon from a registered name, trusted inline SVG source, or image URL. |
| name | KuiIconName \| undefined | undefined | Icon name resolved from icons registered with provideKuiIcons(). |
| source | KuiIconSource \| undefined | undefined | Trusted static inline SVG markup. It takes precedence over name. |
| src | string \| undefined | undefined | External image URL used when no source or registered name is provided. |
| label | string \| undefined | undefined | Accessible name for meaningful icons. Omit it for decorative icons. |
| size | string | '1em' | CSS size applied to the square icon box, for example 16px, 1.25rem, or 2em. |
| provideKuiIcons(icons) | EnvironmentProviders | - | Registers trusted static SVG strings for name-based icon lookup. |

## Accessibility

Rendered documentation, interactive examples, and the playground live at the HTML route above.

## Playground

Available at /components/icon/playground.
