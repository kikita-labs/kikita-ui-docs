# Tokens

> Design token categories exposed through Kikita CSS variables.

- Status: available
- Route: /foundations/tokens
- Package: @kikita-labs/ui@2.0.0

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
--kui-color-focus
```

### Color seeds
Required color seeds generate the palette and semantic token layers.
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| --kui-seed-primary | oklch(0.52 0.25 285) | - | Brand and action color. |
| --kui-seed-neutral | oklch(0.5 0.01 80) | - | Surface, border, and text base. |
| --kui-seed-success | oklch(0.54 0.16 145) | - | Positive state. |
| --kui-seed-warning | oklch(0.56 0.15 65) | - | Caution state. |
| --kui-seed-danger | oklch(0.54 0.22 25) | - | Error or destructive state. |
| --kui-seed-info | oklch(0.53 0.14 215) | - | Informational state. |

### Fill, indicator and text roles
Every accent (primary, success, warning, danger, info) has these roles. A fill is a background only: text and icons read -text, and borders and marks read -indicator.
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| --kui-color-<role>-fill | solid background | - | The seed in both modes, slightly corrected when no text colour reaches 4.5:1 on it. |
| --kui-color-<role>-on-fill | text and icons on the fill | - | White or near-black, whichever reads better (at least 4.5:1). Generated. |
| --kui-color-<role>-fill-away | away colour | - | Black when the on-fill is light, white when it is dark. Generated. |
| --kui-color-<role>-fill-hover, -fill-active | hover and pressed fill | - | The fill mixed with the away colour (light 18% and 36%, dark 28% and 8% toward black), so contrast never drops. |
| --kui-color-<role>-indicator | border, outline, mark | - | The fill when it reaches 3:1 on every surface of the mode, otherwise step 7 (light) or step 5 (dark). Generated. |
| --kui-color-<role>-text | text and icon on a surface | - | At least 4.5:1: step 8 in light mode and step 4 in dark mode. |
| --kui-color-<role>-soft-bg, -soft-text, -soft-border | tinted surface | - | Tinted background with its text and border. |
| --kui-color-border-control, -hover | control boundary | - | The boundary of a control that the border alone identifies, such as an input or a checkbox: at least 3:1 in the strict profile, quieter in soft. --kui-color-border and --kui-color-border-strong stay for dividers and cards. |
| --kui-color-text-placeholder | placeholder text | - | 4.5:1 on every surface. --kui-color-text-disabled is only for disabled controls. |
| --kui-color-state-hover, -state-active | translucent text layers | - | 8% and 14% of the text colour for the hover and pressed fill of list items, menu items, calendar days, tabs and ghost buttons, so a hover never disappears on any surface. |
| --kui-color-focus | 2px focus outline colour | - | Defaults to the primary indicator. |
| --kui-color-scrim, -scrim-strong, -on-scrim | overlay layers | - | Black at 50% behind Dialog, Drawer and Command Palette, black at 92% behind the fullscreen Media Viewer, and white text over a scrim. |

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

### Shared tokens
A few global tokens are the single knob for a behaviour the whole library shares. A component hook is read first and defaults to the global token in the CSS of the component, so a value set on any ancestor wins.
#### styles.css

```css
:root {
  --kui-opacity-disabled: 0.4;
  --kui-focus-ring-width: 2px;
  --kui-duration-base: 120ms;
}
```
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| --kui-duration-fast | 100ms | - | Hover and colour changes. |
| --kui-duration-quick | 120ms | - | Exit animations. |
| --kui-duration-base | 160ms | - | Enter animations and control state changes. |
| --kui-duration-normal | 200ms | - | Moving indicators, backdrops and progress. |
| --kui-ease, --kui-ease-exit | cubic-bezier(0.16, 1, 0.3, 1) and cubic-bezier(0.4, 0, 1, 1) | - | Entering and moving, and leaving (shorter and accelerating, never lingering). |
| --kui-focus-ring-width | 3px | - | Standalone controls: Button, Icon Button, Checkbox, Radio, Switch, Tab, Segmented, Card, Chip, Avatar, Table sort and selection. |
| --kui-focus-ring-width-sm | 2px | - | Parts inside a composite: links, calendar and picker cells, rows, options, field actions, chip remove. |
| --kui-focus-ring-offset, --kui-focus-ring-offset-inset | 2px and -2px | - | Gap between the element and an outer ring, and the ring drawn inside rows, cells and options in a scroll container. |
| --kui-opacity-disabled | 0.5 | - | Dims every disabled control, row, cell and option. The hooks --kui-btn-disabled-opacity, --kui-chip-disabled-opacity and --kui-field-action-disabled-opacity override it for one component. |
| --kui-border-width-hairline, -thick, -heavy | 1px, 1.5px, 2px | - | Borders and dividers, the today marker and thick separators, and indicator bars, step circles, dashed dropzone borders and spinner strokes. |

### Icon tokens
Two public tokens control the line of structural icons and of stroke-based kui-icon content. Set them on the root or on any subtree.
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| --kui-icon-stroke-width | a number in glyph-grid units | - | Structural icons default to the weight of their call site (1.5 to 2.5); kui-icon keeps the weight of the icon itself. |
| --kui-icon-vector-effect | none \| non-scaling-stroke | - | none lets the stroke scale with the icon; non-scaling-stroke keeps it the same number of pixels. |

### Defaults that moved into CSS
These tokens are still valid hooks: set one on an element or an ancestor to override a single component. They are no longer defined on the root, because a literal copy of a global value there would shadow a change to the global token.
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| --kui-btn-focus-ring-w, --kui-checkbox-focus-ring-w, --kui-radio-focus-ring-w, --kui-switch-focus-ring-w, --kui-avatar-focus-ring-w, --kui-chip-focus-ring-width | --kui-focus-ring-width | - | Focus ring width hooks. |
| --kui-chip-remove-focus-ring-width, --kui-field-action-focus-ring-width | --kui-focus-ring-width-sm | - | Focus ring width hooks of parts inside a composite. |
| --kui-btn-focus-ring-off, --kui-checkbox-focus-ring-off, --kui-radio-focus-ring-off, --kui-switch-focus-ring-off, --kui-avatar-focus-ring-off | --kui-focus-ring-offset | - | Focus ring offset hooks. |
| --kui-btn-disabled-opacity, --kui-chip-disabled-opacity, --kui-field-action-disabled-opacity | --kui-opacity-disabled | - | Disabled opacity hooks; the chip one was 0.4. |
| --kui-dialog-backdrop, --kui-drawer-backdrop-bg, --kui-command-backdrop-bg | --kui-color-scrim | - | Backdrop colour hooks. |
| --kui-btn-font-weight, --kui-tab-font-weight, --kui-seg-font-weight, --kui-menu-item-font-weight | --kui-font-weight-medium | - | Medium weight hooks. |
| --kui-tab-font-weight-active, --kui-seg-font-weight-active, --kui-badge-font-weight, --kui-avatar-font-weight, --kui-chip-font-weight, --kui-field-label-weight, --kui-menu-group-header-font-weight, --kui-drawer-title-weight, --kui-breadcrumb-font-weight-current, --kui-empty-title-weight | --kui-font-weight-semibold | - | Semibold weight hooks; the empty state title was 650. |
| --kui-chip-avatar-font-weight | --kui-font-weight-bold | - | Bold weight hook. |

### Removed in 2.0
These generated tokens are gone and nothing in Kikita UI reads them any more. Set the replacement. 322 component tokens that only mapped a role onto another token are no longer generated either; each component states its default in its own CSS.
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| --kui-btn-bg | --kui-btn-solid-bg | - | Button background. |
| --kui-btn-bg-hover | --kui-btn-solid-bg-hov | - | Button hover background. |
| --kui-btn-bg-active | --kui-btn-solid-bg-act | - | Button pressed background. |
| --kui-btn-color | --kui-btn-solid-fg | - | Button text colour. |
| --kui-btn-secondary-bg | --kui-btn-soft-bg | - | Soft button background. |
| --kui-btn-secondary-bg-hover | --kui-btn-soft-bg-hov | - | Soft button hover background. |
| --kui-btn-secondary-color | --kui-btn-soft-fg | - | Soft button text colour. |
| --kui-btn-outline-bg-hover | --kui-btn-outline-bg-hov | - | Outline button hover background. |
| --kui-btn-ghost-bg-hover | --kui-btn-ghost-bg-hov | - | Ghost button hover background. |
| --kui-btn-focus-ring-width | --kui-btn-focus-ring-w | - | Button focus ring width. |
| --kui-btn-focus-ring-offset | --kui-btn-focus-ring-off | - | Button focus ring offset. |
| --kui-btn-focus-ring | outline from --kui-btn-focus-ring-w and -color | - | Button focus ring shadow. |
| --kui-select-bg | --kui-input-bg | - | Select background. |
| --kui-select-border | --kui-input-border | - | Select border. |
| --kui-select-border-hover | --kui-input-border-hover | - | Select hover border. |
| --kui-select-border-focus | --kui-input-border-focus | - | Select focus border. |
| --kui-select-border-error | --kui-input-border-error | - | Select error border. |
| --kui-select-radius | --kui-input-radius | - | Select corner radius. |
