# Theming

> Theme provider setup and theme customization basics.

- Status: available
- Route: /foundations/theming
- Package: @kikita-labs/ui@0.6.0

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
