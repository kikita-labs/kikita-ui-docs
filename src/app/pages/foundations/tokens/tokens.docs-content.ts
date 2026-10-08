import type { ApiTableRow } from '@shared/docs-ui/api-table';
import type { CodeTab } from '@shared/docs-ui/code-tabs';

export const TOKENS_LAYER_TABS = [
  {
    label: 'Layers',
    filename: 'token-layers.txt',
    language: 'text',
    code: `seed -> palette -> semantic -> component`,
  },
  {
    label: 'Palette',
    filename: 'palette.css',
    language: 'css',
    code: `--kui-primary-1 ... --kui-primary-12
--kui-neutral-1 ... --kui-neutral-12
--kui-success-1 ... --kui-success-12
--kui-warning-1 ... --kui-warning-12
--kui-danger-1 ... --kui-danger-12
--kui-info-1 ... --kui-info-12`,
  },
  {
    label: 'Semantic',
    filename: 'semantic.css',
    language: 'css',
    code: `--kui-color-bg
--kui-color-surface
--kui-color-border
--kui-color-text
--kui-color-primary-fill
--kui-color-focus`,
  },
] as const satisfies readonly CodeTab[];

export const TOKENS_SEED_ROWS = [
  {
    name: '--kui-seed-primary',
    type: 'oklch(0.52 0.25 285)',
    description: 'Brand and action color.',
  },
  {
    name: '--kui-seed-neutral',
    type: 'oklch(0.5 0.01 80)',
    description: 'Surface, border, and text base.',
  },
  {
    name: '--kui-seed-success',
    type: 'oklch(0.54 0.16 145)',
    description: 'Positive state.',
  },
  {
    name: '--kui-seed-warning',
    type: 'oklch(0.56 0.15 65)',
    description: 'Caution state.',
  },
  {
    name: '--kui-seed-danger',
    type: 'oklch(0.54 0.22 25)',
    description: 'Error or destructive state.',
  },
  {
    name: '--kui-seed-info',
    type: 'oklch(0.53 0.14 215)',
    description: 'Informational state.',
  },
] as const satisfies readonly ApiTableRow[];

export const TOKENS_SCALE_TABS = [
  {
    label: 'Radius',
    filename: 'radius.css',
    language: 'css',
    code: `--kui-radius-none: 0;
--kui-radius-xs: 4px;
--kui-radius-sm: 6px;
--kui-radius-md: 8px;
--kui-radius-lg: 10px;
--kui-radius-xl: 14px;
--kui-radius-full: 9999px;`,
  },
  {
    label: 'Spacing',
    filename: 'spacing.css',
    language: 'css',
    code: `--kui-space-1: 4px;
--kui-space-2: 8px;
--kui-space-3: 12px;
--kui-space-4: 16px;
--kui-space-5: 20px;
--kui-space-6: 24px;
--kui-space-8: 32px;
--kui-space-12: 48px;
--kui-space-16: 64px;`,
  },
] as const satisfies readonly CodeTab[];

export const TOKENS_ROLE_ROWS = [
  {
    name: '--kui-color-<role>-fill',
    type: 'solid background',
    description:
      'The seed in both modes, slightly corrected when no text colour reaches 4.5:1 on it.',
  },
  {
    name: '--kui-color-<role>-on-fill',
    type: 'text and icons on the fill',
    description: 'White or near-black, whichever reads better (at least 4.5:1). Generated.',
  },
  {
    name: '--kui-color-<role>-fill-away',
    type: 'away colour',
    description: 'Black when the on-fill is light, white when it is dark. Generated.',
  },
  {
    name: '--kui-color-<role>-fill-hover, -fill-active',
    type: 'hover and pressed fill',
    description:
      'The fill mixed with the away colour (light 18% and 36%, dark 28% and 8% toward black), so contrast never drops.',
  },
  {
    name: '--kui-color-<role>-indicator',
    type: 'border, outline, mark',
    description:
      'The fill when it reaches 3:1 on every surface of the mode, otherwise step 7 (light) or step 5 (dark). Generated.',
  },
  {
    name: '--kui-color-<role>-text',
    type: 'text and icon on a surface',
    description: 'At least 4.5:1: step 8 in light mode and step 4 in dark mode.',
  },
  {
    name: '--kui-color-<role>-soft-bg, -soft-text, -soft-border',
    type: 'tinted surface',
    description: 'Tinted background with its text and border.',
  },
  {
    name: '--kui-color-border-control, -hover',
    type: 'control boundary',
    description:
      'The boundary of a control that the border alone identifies, such as an input or a checkbox: at least 3:1 in the strict profile, quieter in soft. --kui-color-border and --kui-color-border-strong stay for dividers and cards.',
  },
  {
    name: '--kui-color-text-placeholder',
    type: 'placeholder text',
    description: '4.5:1 on every surface. --kui-color-text-disabled is only for disabled controls.',
  },
  {
    name: '--kui-color-state-hover, -state-active',
    type: 'translucent text layers',
    description:
      '8% and 14% of the text colour for the hover and pressed fill of list items, menu items, calendar days, tabs and ghost buttons, so a hover never disappears on any surface.',
  },
  {
    name: '--kui-color-focus',
    type: '2px focus outline colour',
    description: 'Defaults to the primary indicator.',
  },
  {
    name: '--kui-color-scrim, -scrim-strong, -on-scrim',
    type: 'overlay layers',
    description:
      'Black at 50% behind Dialog, Drawer and Command Palette, black at 92% behind the fullscreen Media Viewer, and white text over a scrim.',
  },
] as const satisfies readonly ApiTableRow[];

export const TOKENS_SHARED_ROWS = [
  {
    name: '--kui-duration-fast',
    type: '100ms',
    description: 'Hover and colour changes.',
  },
  {
    name: '--kui-duration-quick',
    type: '120ms',
    description: 'Exit animations.',
  },
  {
    name: '--kui-duration-base',
    type: '160ms',
    description: 'Enter animations and control state changes.',
  },
  {
    name: '--kui-duration-normal',
    type: '200ms',
    description: 'Moving indicators, backdrops and progress.',
  },
  {
    name: '--kui-ease, --kui-ease-exit',
    type: 'cubic-bezier(0.16, 1, 0.3, 1) and cubic-bezier(0.4, 0, 1, 1)',
    description: 'Entering and moving, and leaving (shorter and accelerating, never lingering).',
  },
  {
    name: '--kui-focus-ring-width',
    type: '3px',
    description:
      'Standalone controls: Button, Icon Button, Checkbox, Radio, Switch, Tab, Segmented, Card, Chip, Avatar, Table sort and selection.',
  },
  {
    name: '--kui-focus-ring-width-sm',
    type: '2px',
    description:
      'Parts inside a composite: links, calendar and picker cells, rows, options, field actions, chip remove.',
  },
  {
    name: '--kui-focus-ring-offset, --kui-focus-ring-offset-inset',
    type: '2px and -2px',
    description:
      'Gap between the element and an outer ring, and the ring drawn inside rows, cells and options in a scroll container.',
  },
  {
    name: '--kui-opacity-disabled',
    type: '0.5',
    description:
      'Dims every disabled control, row, cell and option. The hooks --kui-btn-disabled-opacity, --kui-chip-disabled-opacity and --kui-field-action-disabled-opacity override it for one component.',
  },
  {
    name: '--kui-border-width-hairline, -thick, -heavy',
    type: '1px, 1.5px, 2px',
    description:
      'Borders and dividers, the today marker and thick separators, and indicator bars, step circles, dashed dropzone borders and spinner strokes.',
  },
] as const satisfies readonly ApiTableRow[];

export const TOKENS_SHARED_TABS = [
  {
    label: 'Override once',
    filename: 'styles.css',
    language: 'css',
    code: `:root {
  --kui-opacity-disabled: 0.4;
  --kui-focus-ring-width: 2px;
  --kui-duration-base: 120ms;
}`,
  },
] as const satisfies readonly CodeTab[];

export const TOKENS_ICON_ROWS = [
  {
    name: '--kui-icon-stroke-width',
    type: 'a number in glyph-grid units',
    description:
      'Structural icons default to the weight of their call site (1.5 to 2.5); kui-icon keeps the weight of the icon itself.',
  },
  {
    name: '--kui-icon-vector-effect',
    type: 'none | non-scaling-stroke',
    description:
      'none lets the stroke scale with the icon; non-scaling-stroke keeps it the same number of pixels.',
  },
] as const satisfies readonly ApiTableRow[];

export const TOKENS_MOVED_ROWS = [
  {
    name: '--kui-btn-focus-ring-w, --kui-checkbox-focus-ring-w, --kui-radio-focus-ring-w, --kui-switch-focus-ring-w, --kui-avatar-focus-ring-w, --kui-chip-focus-ring-width',
    type: '--kui-focus-ring-width',
    description: 'Focus ring width hooks.',
  },
  {
    name: '--kui-chip-remove-focus-ring-width, --kui-field-action-focus-ring-width',
    type: '--kui-focus-ring-width-sm',
    description: 'Focus ring width hooks of parts inside a composite.',
  },
  {
    name: '--kui-btn-focus-ring-off, --kui-checkbox-focus-ring-off, --kui-radio-focus-ring-off, --kui-switch-focus-ring-off, --kui-avatar-focus-ring-off',
    type: '--kui-focus-ring-offset',
    description: 'Focus ring offset hooks.',
  },
  {
    name: '--kui-btn-disabled-opacity, --kui-chip-disabled-opacity, --kui-field-action-disabled-opacity',
    type: '--kui-opacity-disabled',
    description: 'Disabled opacity hooks; the chip one was 0.4.',
  },
  {
    name: '--kui-dialog-backdrop, --kui-drawer-backdrop-bg, --kui-command-backdrop-bg',
    type: '--kui-color-scrim',
    description: 'Backdrop colour hooks.',
  },
  {
    name: '--kui-btn-font-weight, --kui-tab-font-weight, --kui-seg-font-weight, --kui-menu-item-font-weight',
    type: '--kui-font-weight-medium',
    description: 'Medium weight hooks.',
  },
  {
    name: '--kui-tab-font-weight-active, --kui-seg-font-weight-active, --kui-badge-font-weight, --kui-avatar-font-weight, --kui-chip-font-weight, --kui-field-label-weight, --kui-menu-group-header-font-weight, --kui-drawer-title-weight, --kui-breadcrumb-font-weight-current, --kui-empty-title-weight',
    type: '--kui-font-weight-semibold',
    description: 'Semibold weight hooks; the empty state title was 650.',
  },
  {
    name: '--kui-chip-avatar-font-weight',
    type: '--kui-font-weight-bold',
    description: 'Bold weight hook.',
  },
] as const satisfies readonly ApiTableRow[];

export const TOKENS_REMOVED_ROWS = [
  { name: '--kui-btn-bg', type: '--kui-btn-solid-bg', description: 'Button background.' },
  {
    name: '--kui-btn-bg-hover',
    type: '--kui-btn-solid-bg-hov',
    description: 'Button hover background.',
  },
  {
    name: '--kui-btn-bg-active',
    type: '--kui-btn-solid-bg-act',
    description: 'Button pressed background.',
  },
  { name: '--kui-btn-color', type: '--kui-btn-solid-fg', description: 'Button text colour.' },
  {
    name: '--kui-btn-secondary-bg',
    type: '--kui-btn-soft-bg',
    description: 'Soft button background.',
  },
  {
    name: '--kui-btn-secondary-bg-hover',
    type: '--kui-btn-soft-bg-hov',
    description: 'Soft button hover background.',
  },
  {
    name: '--kui-btn-secondary-color',
    type: '--kui-btn-soft-fg',
    description: 'Soft button text colour.',
  },
  {
    name: '--kui-btn-outline-bg-hover',
    type: '--kui-btn-outline-bg-hov',
    description: 'Outline button hover background.',
  },
  {
    name: '--kui-btn-ghost-bg-hover',
    type: '--kui-btn-ghost-bg-hov',
    description: 'Ghost button hover background.',
  },
  {
    name: '--kui-btn-focus-ring-width',
    type: '--kui-btn-focus-ring-w',
    description: 'Button focus ring width.',
  },
  {
    name: '--kui-btn-focus-ring-offset',
    type: '--kui-btn-focus-ring-off',
    description: 'Button focus ring offset.',
  },
  {
    name: '--kui-btn-focus-ring',
    type: 'outline from --kui-btn-focus-ring-w and -color',
    description: 'Button focus ring shadow.',
  },
  { name: '--kui-select-bg', type: '--kui-input-bg', description: 'Select background.' },
  { name: '--kui-select-border', type: '--kui-input-border', description: 'Select border.' },
  {
    name: '--kui-select-border-hover',
    type: '--kui-input-border-hover',
    description: 'Select hover border.',
  },
  {
    name: '--kui-select-border-focus',
    type: '--kui-input-border-focus',
    description: 'Select focus border.',
  },
  {
    name: '--kui-select-border-error',
    type: '--kui-input-border-error',
    description: 'Select error border.',
  },
  { name: '--kui-select-radius', type: '--kui-input-radius', description: 'Select corner radius.' },
] as const satisfies readonly ApiTableRow[];
