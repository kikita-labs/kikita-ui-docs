# Tokens

> Design token categories exposed through Kikita CSS variables.

- Status: available
- Route: /foundations/tokens
- Package: @kikita-labs/ui@0.6.3

## Content

### Token layers
Public CSS variables use the --kui-* prefix and flow through predictable layers.
#### token-layers.txt

```text
seed -> palette -> semantic -> component
```

#### palette.css

```css
--kui-primary-1 ... --kui-primary-12
--kui-neutral-1 ... --kui-neutral-12
--kui-success-1 ... --kui-success-12
--kui-warning-1 ... --kui-warning-12
--kui-danger-1 ... --kui-danger-12
--kui-info-1 ... --kui-info-12
```

#### semantic.css

```css
--kui-color-bg
--kui-color-surface
--kui-color-border
--kui-color-text
--kui-color-primary-fill
--kui-color-primary-focus-ring
```

### Color seeds
Required color seeds generate the palette and semantic token layers.
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| --kui-seed-primary | oklch(0.52 0.25 285) | - | Brand and action color. |
| --kui-seed-neutral | oklch(0.5 0.01 80) | - | Surface, border, and text base. |
| --kui-seed-success | oklch(0.54 0.16 145) | - | Positive state. |
| --kui-seed-warning | oklch(0.74 0.16 75) | - | Caution state. |
| --kui-seed-danger | oklch(0.54 0.22 25) | - | Error or destructive state. |
| --kui-seed-info | oklch(0.58 0.16 215) | - | Informational state. |

### Common scales
Radius and spacing scales are shared by component tokens and docs layout primitives.
#### radius.css

```css
--kui-radius-none: 0;
--kui-radius-xs: 4px;
--kui-radius-sm: 6px;
--kui-radius-md: 8px;
--kui-radius-lg: 10px;
--kui-radius-xl: 14px;
--kui-radius-full: 9999px;
```

#### spacing.css

```css
--kui-space-1: 4px;
--kui-space-2: 8px;
--kui-space-3: 12px;
--kui-space-4: 16px;
--kui-space-5: 20px;
--kui-space-6: 24px;
--kui-space-8: 32px;
--kui-space-12: 48px;
--kui-space-16: 64px;
```
