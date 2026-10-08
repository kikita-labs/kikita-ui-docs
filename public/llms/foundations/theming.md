# Theming

> Theme provider setup and theme customization basics.

- Status: available
- Route: /foundations/theming
- Package: @kikita-labs/ui@2.0.0

## Content

### Runtime contract
The public theming contract is CSS variables. The theme pipeline starts with seed tokens and ends in component-level tokens.
#### theme-pipeline.txt

```text
seed tokens -> OKLCH palettes -> semantic tokens -> component tokens
```

#### index.html

```html
<html data-kui-theme="dark"></html>
```

### Angular provider
Use provideKikitaUi() for the default theme and optional root configuration.
#### app.config.ts

```ts
import { type ApplicationConfig } from '@angular/core';
import { provideKikitaUi } from '@kikita-labs/ui';

export const appConfig: ApplicationConfig = {
  providers: [provideKikitaUi()],
};
```

#### app.config.ts

```ts
provideKikitaUi({
  scrollbars: 'styled',
});
```

### Overriding tokens
Where you set a token decides how far it reaches. Components read semantic or component tokens, never palette or seed variables.
#### billing.css

```css
.billing-panel {
  --kui-btn-danger-bg: oklch(0.5 0.2 25);
  --kui-btn-danger-bg-hov: oklch(0.44 0.2 25);
}
```
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| A seed in provideKikitaUi({ theme }) | whole theme | - | Palette, semantic roles and literal component tokens are regenerated for every element. |
| A semantic token on any element | element and below | - | --kui-color-danger-fill on an element restyles that element and everything below it; on the root it changes the whole page. |
| A component token on any element | element and below | - | --kui-btn-danger-bg restyles that one component part for the element and everything below it. |
| A palette step or a type role alias | set globally | - | Not reliable on an element: semantic tokens and --kui-type-* are resolved from them on the root, so set them there. |

### Defaults, layers and density
The default theme works from CSS alone, and your own variables always win over the generated ones.

### Contrast profiles
WCAG 1.4.11 asks for 3:1 on the boundary of a control only where that boundary identifies it. A contrast profile re-points the neutral roles that draw it.
#### app.config.ts

```ts
import { DEFAULT_KUI_THEME, provideKuiTheme } from '@kikita-labs/ui';

provideKuiTheme({ ...DEFAULT_KUI_THEME, contrast: 'soft' });
```

#### contrast.ts

```ts
document.documentElement.setAttribute('data-kui-contrast', 'strict');
```
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| KuiThemeContrast | 'strict' \| 'soft' | - | Contrast profile name and the value of the data-kui-contrast attribute. |
| DEFAULT_KUI_THEME_CONTRAST | KuiThemeContrast | - | Profile a theme uses when the contrast option is not set. |
| KuiGeneratedContrast | { name; media?; light; dark } | - | Variables one profile changes relative to the default, emitted as [data-kui-contrast] rules and an optional media query. |

### Shared behaviour tokens
A few tokens change one behaviour for the whole library. Set them on the root or on any subtree.
#### styles.css

```css
:root {
  --kui-opacity-disabled: 0.4; /* every disabled control, option and cell */
  --kui-focus-ring-width: 2px; /* standalone controls; parts use --kui-focus-ring-width-sm */
  --kui-duration-base: 120ms; /* enter animations and control state changes */
  --kui-color-scrim: oklch(0 0 0 / 0.65); /* behind Dialog, Drawer and Command Palette */
}
```

### Migrating to the colour roles
The 2.x colour system keeps every public token name, so an existing theme keeps working. Move to the new roles when you next touch a custom component.
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| --kui-color-on-fill on a solid fill | --kui-color-<role>-on-fill | - | White or near-black, whichever reaches 4.5:1 on that fill. |
| --kui-color-<role>-fill as text or an icon colour | --kui-color-<role>-text | - | 4.5:1 on every surface. |
| --kui-color-<role>-fill as a border, outline, bar or mark | --kui-color-<role>-indicator | - | 3:1 on every light surface. |
| --kui-color-border on an interactive control | --kui-color-border-control | - | A 3:1 boundary at rest; the hover value is --kui-color-border-control-hover. |
| --kui-color-primary-focus-ring or a box-shadow ring | a 2px outline in --kui-color-focus | - | Visible in forced-colors mode and 3:1. |
| --kui-color-text-disabled on placeholders | --kui-color-text-placeholder | - | 4.5:1; disabled text stays for disabled controls. |

### Custom seeds
Seed values are the stable way to customize generated palettes and shared scales.
#### app.config.ts

```ts
provideKikitaUi({
  theme: {
    seeds: {
      color: {
        primary: 'oklch(0.52 0.25 285)',
        neutral: 'oklch(0.5 0.01 80)',
        success: 'oklch(0.54 0.16 145)',
        warning: 'oklch(0.74 0.16 75)',
        danger: 'oklch(0.54 0.22 25)',
        info: 'oklch(0.58 0.16 215)',
      },
      radius: 8,
      density: 'regular',
    },
  },
});
```

### Theme utilities
These public functions can generate CSS variables for docs, visual tests, or non-Angular tooling.
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| createKuiTheme | (options?: KuiThemeOptions) => KuiGeneratedTheme | - | Generates a theme object from seed options. |
| createKuiThemeVariableMap | (theme, mode?) => KuiCssVariableMap | - | Flattens a generated theme into CSS variable names and values. |
| createKuiThemeCssText | (theme, selector, mode?) => string | - | Serializes variables for a selector. |
| createKuiThemeStyleSheet | (theme) => string | - | Serializes light and dark theme CSS for tooling or docs output. |
