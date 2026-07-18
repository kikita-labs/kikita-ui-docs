# Density

> Spacing and control density expectations for product UIs.

- Status: available
- Route: /foundations/density
- Package: @kikita-labs/ui@0.7.0

## Content

### Density values
The published package exposes a typed KuiDensity union for compact, regular, and comfortable experiences.
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| compact | KuiDensity | - | Dense operational surfaces such as toolbars, tables, and high-frequency controls. |
| regular | KuiDensity | - | Default application density and the safest choice for documentation examples. |
| comfortable | KuiDensity | - | Touch-heavy or spacious contexts where larger hit areas matter more than density. |

### Global defaults
Set app-wide density through the Kikita provider. Keep docs examples on regular density unless the example is explicitly about density.
#### app.config.ts

```ts
import { provideKikitaUi } from '@kikita-labs/ui';

export const appConfig = {
  providers: [
    provideKikitaUi({
      defaults: {
        density: 'regular',
      },
    }),
  ],
};
```

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

### Control recommendations
Height is controlled only by data-kui-size. data-kui-density rebinds horizontal padding only.
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| Control height (xs / sm / md / lg) | 28px / 32px / 40px / 44px | - | Set only by data-kui-size on Input, Button, Icon-Button, Segmented, Tabs, and Group. Density does not affect height. |
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
```
