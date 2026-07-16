# Icon

> SVG icon renderer.

- Status: available
- Route: /components/icon
- Package: @kikita-labs/ui@0.6.0
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

`source` (direct inline SVG markup) always takes precedence over `name` and resolves
synchronously -- no registry lookup, no network request.

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

### swap-icon-set-example

#### swap-icon-set-example.html

```html
<div class="swap-icon-set-example">
  <div class="swap-icon-set-example__item">
    <kui-icon name="star" label="Lucide star" size="28px" />
    <span>Lucide (default)</span>
  </div>

  <div class="swap-icon-set-example__item">
    <app-material-icon-scope />
    <span>Material Symbols</span>
  </div>

  <div class="swap-icon-set-example__item">
    <app-custom-icon-scope />
    <span>Custom set</span>
  </div>
</div>
```

#### swap-icon-set-example.ts

```ts
import { Component } from '@angular/core';

import { KUI_ICONS, KuiIconComponent, type KuiIconRegistry } from '@kikita-labs/ui';

const MATERIAL_SYMBOLS_ICON_SET: KuiIconRegistry = {
  star: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="m323-245 157-94 157 95-42-178 138-120-182-16-71-168-71 167-182 16 138 120-42 178Zm-90 125 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-355Z"/></svg>',
};

const CUSTOM_ICON_SET: KuiIconRegistry = {
  'brand-mark':
    '<svg viewBox="0 0 16 16" fill="none"><path d="M3 2v12M3 8l7-6M3 8l7 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
};

@Component({
  selector: 'app-material-icon-scope',
  imports: [KuiIconComponent],
  template: `<kui-icon name="star" label="Material Symbols star" size="28px" />`,
  providers: [{ provide: KUI_ICONS, multi: true, useValue: MATERIAL_SYMBOLS_ICON_SET }],
})
export class MaterialIconScope {}

@Component({
  selector: 'app-custom-icon-scope',
  imports: [KuiIconComponent],
  template: `<kui-icon name="brand-mark" label="Custom brand mark" size="28px" />`,
  providers: [{ provide: KUI_ICONS, multi: true, useValue: CUSTOM_ICON_SET }],
})
export class CustomIconScope {}

@Component({
  selector: 'app-swap-icon-set-example',
  imports: [KuiIconComponent, MaterialIconScope, CustomIconScope],
  templateUrl: './swap-icon-set-example.html',
  styleUrl: './swap-icon-set-example.scss',
})
export class SwapIconSetExample {}
```

#### swap-icon-set-example.scss

```scss
.swap-icon-set-example {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--kui-space-6, 24px);
  flex-wrap: wrap;
}

.swap-icon-set-example__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--kui-space-2, 8px);
  color: var(--kui-color-text-secondary);
  font-size: var(--kui-text-sm-size, 13px);
}
```

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| kui-icon | Component | - | Renders an icon from a registered name, trusted inline SVG source, or image URL. |
| name | KuiIconName \| undefined | undefined | Icon name resolved from icons registered with provideKuiIcons(), falling back to the default Lucide resolver unless disabled. |
| source | KuiIconSource \| undefined | undefined | Trusted static inline SVG markup. It takes precedence over name. |
| src | string \| undefined | undefined | External image URL used when no source or registered name is provided. |
| label | string \| undefined | undefined | Accessible name for meaningful icons. Omit it for decorative icons. |
| size | string | '1em' | CSS size applied to the square icon box, for example 16px, 1.25rem, or 2em. |
| provideKuiIcons(icons) | EnvironmentProviders | - | Registers a static map of trusted SVG strings, or an async KuiIconResolver function, for name-based icon lookup. Later registrations take precedence for names both define. Route-level only; component providers cannot accept EnvironmentProviders. |
| KUI_ICONS | InjectionToken<readonly KuiIconRegistry[]> | - | The multi-provider token behind provideKuiIcons(). Provide it directly in a component's own providers ({ provide: KUI_ICONS, multi: true, useValue }) to scope an icon-set override to that subtree. |
| provideKikitaUi({ icons }) | 'lucide' \| false | 'lucide' | Default icon set kui-icon resolves against when a name is not matched locally. Lazily fetches Lucide SVG markup from the jsDelivr CDN; set to false to opt out. |

## Accessibility

Rendered documentation, interactive examples, and the playground live at the HTML route above.

## Playground

Available at /components/icon/playground.
