# Density

> Spacing and control density expectations for product UIs.

- Status: available
- Route: /foundations/density
- Package: @kikita-labs/ui@1.1.0

## Content

### Density values
The published package exposes a typed KuiDensity union for compact, regular, and comfortable experiences.
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| compact | KuiDensity | - | Dense operational surfaces such as toolbars, tables, and high-frequency controls. |
| regular | KuiDensity | - | Default application density and the safest choice for documentation examples. |
| comfortable | KuiDensity | - | Touch-heavy or spacious contexts where larger hit areas matter more than density. |

### Global defaults
Set density through theme seeds. Use provideKikitaUi defaults.size for app-wide control size, not for density.
#### app.config.ts

```ts
import { DEFAULT_KUI_THEME, provideKikitaUi } from '@kikita-labs/ui';

provideKikitaUi({
  theme: {
    seeds: {
      ...DEFAULT_KUI_THEME.seeds,
      density: 'regular',
    },
  },
});
```

#### app.config.ts

```ts
import { provideKikitaUi } from '@kikita-labs/ui';

provideKikitaUi({
  defaults: {
    size: 'sm',
  },
});
```

### Control recommendations
Height follows the size cascade. Density rebinds horizontal padding and spacing rhythm only.
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| Control height (xs / sm / md / lg) | 28px / 32px / 40px / 44px | - | Set by local size inputs, component providers, or provideKikitaUi defaults.size. Density does not affect height. |
| Button x padding | 8px / 12px / 16px | - | Horizontal control padding across compact, regular, and comfortable density. |

### Component tokens
Density rebinds the padding tokens below; height tokens resolve from data-kui-size instead.
#### density.css

```css
--kui-btn-px-compact
--kui-btn-px-regular
--kui-btn-px-comfortable
```

#### resolved.css

```css
--kui-control-height-xs
--kui-control-height-sm
--kui-control-height-md
--kui-control-height-lg
--kui-btn-height
--kui-btn-px
--kui-input-px
--kui-default-size
```
