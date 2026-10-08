import type { ApiTableRow } from '@shared/docs-ui/api-table';
import type { CodeTab } from '@shared/docs-ui/code-tabs';

export const STRUCTURAL_ICONS_REPLACE_TABS = [
  {
    label: 'Glyph data',
    filename: 'close-icon.ts',
    language: 'ts',
    code: `import type { KuiIconGlyph } from '@kikita-labs/ui';

export const CIRCLE_X: KuiIconGlyph = {
  node: [
    ['circle', { cx: 12, cy: 12, r: 10 }],
    ['path', { d: 'm15 9-6 6' }],
    ['path', { d: 'm9 9 6 6' }],
  ],
};`,
  },
  {
    label: 'Whole app',
    filename: 'app.config.ts',
    language: 'ts',
    code: `provideKikitaUi({ defaults: { icons: { close: CIRCLE_X, remove: CIRCLE_X } } });`,
  },
  {
    label: 'One subtree',
    filename: 'section.providers.ts',
    language: 'ts',
    code: `providers: [provideKuiDefaults({ icons: { close: CIRCLE_X } })];`,
  },
] as const satisfies readonly CodeTab[];

export const STRUCTURAL_ICONS_ROLES_ROWS = [
  {
    name: 'close',
    type: 'role',
    description: 'Dialog, Drawer, Media Viewer, Toast and Alert close buttons.',
  },
  {
    name: 'remove',
    type: 'role',
    description:
      'Chip remove button (also the chips of a multiple Select) and File Upload remove button.',
  },
  {
    name: 'clear',
    type: 'role',
    description:
      'Clear button of Select, Combobox, Date Picker and Time Picker, and the Command Palette search clear.',
  },
  {
    name: 'pickerChevron',
    type: 'role',
    description: 'Options toggle of Select, Combobox, Date Picker, Time Picker and Color Input.',
  },
  {
    name: 'previous, next',
    type: 'role',
    description:
      'Previous and next page, month, slide or tab group (Pagination, Calendar, Calendar Range, Carousel, Tabs, Media Viewer).',
  },
  {
    name: 'first, last',
    type: 'role',
    description: 'First and last page buttons of Pagination.',
  },
  {
    name: 'disclosure',
    type: 'role',
    description: 'Expand control of Accordion items and Tree nodes; the rotation stays CSS.',
  },
  {
    name: 'separator',
    type: 'role',
    description: 'Breadcrumb separator.',
  },
  {
    name: 'check',
    type: 'role',
    description: 'Completed Stepper step and finished File Upload item.',
  },
  {
    name: 'statusInfo, statusSuccess, statusWarning, statusDanger',
    type: 'role',
    description:
      'Status mark of Alert and Toast, and the warning mark of a non-default Confirm dialog.',
  },
  {
    name: 'externalLink',
    type: 'role',
    description: 'Mark after an external kuiLink.',
  },
] as const satisfies readonly ApiTableRow[];

export const STRUCTURAL_ICONS_SLOTS_ROWS = [
  {
    name: 'dialog, drawer',
    type: 'closeIcon',
    description: 'Close button.',
  },
  {
    name: 'alert, toast',
    type: 'closeIcon',
    description: 'Close button.',
  },
  {
    name: 'chip, fileUpload',
    type: 'removeIcon',
    description: 'Remove button.',
  },
  {
    name: 'select, combobox, datePicker, timePicker',
    type: 'chevronIcon, clearIcon',
    description: 'Options toggle and clear button.',
  },
  {
    name: 'colorInput',
    type: 'chevronIcon',
    description: 'Options toggle.',
  },
  {
    name: 'calendar, calendarRange, carousel, tabs',
    type: 'previousIcon, nextIcon',
    description: 'Step controls.',
  },
  {
    name: 'pagination',
    type: 'firstIcon, previousIcon, nextIcon, lastIcon',
    description: 'Step controls.',
  },
  {
    name: 'accordion, tree',
    type: 'disclosureIcon',
    description: 'Expand control.',
  },
  {
    name: 'breadcrumbs',
    type: 'separatorIcon',
    description: 'Separator.',
  },
  {
    name: 'link',
    type: 'externalIcon',
    description: 'Mark after an external link.',
  },
] as const satisfies readonly ApiTableRow[];

export const STRUCTURAL_ICONS_GLYPH_TABS = [
  {
    label: 'KuiIconGlyph',
    filename: 'glyph.ts',
    language: 'ts',
    code: `interface KuiIconGlyph {
  readonly node: readonly (readonly [
    tag: string,
    attributes: Record<string, string | number | undefined>,
  ])[];
  readonly viewBox?: string; // default '0 0 24 24'
}`,
  },
] as const satisfies readonly CodeTab[];

export const STRUCTURAL_ICONS_GLYPH_RULES_ROWS = [
  {
    name: 'Elements',
    type: 'path, line, polyline, polygon, circle, ellipse, rect',
    description: 'Any other element invalidates the glyph.',
  },
  {
    name: 'Attributes',
    type: 'geometry and paint',
    description:
      'Geometry (d, cx, cy, r, rx, ry, x, y, x1, y1, x2, y2, width, height, points) and paint (fill, fill-opacity, fill-rule, clip-rule, stroke, stroke-opacity, stroke-linecap, stroke-linejoin, stroke-miterlimit, stroke-dasharray, stroke-dashoffset, opacity, transform). Everything else is ignored.',
  },
  {
    name: 'Values',
    type: 'strings and numbers',
    description: 'Values containing url(, <, > or javascript: are ignored.',
  },
  {
    name: 'Line weight',
    type: 'stroke-width, vector-effect',
    description: 'Not accepted; the stroke tokens own them.',
  },
  {
    name: 'Filled shapes',
    type: 'fill and stroke none',
    description: 'Set fill and stroke: none on the element, as the built-in play glyph does.',
  },
  {
    name: 'Invalid override',
    type: 'ignored',
    description:
      'The next level of the precedence chain is used. In development mode the first use of an invalid glyph logs a warning.',
  },
] as const satisfies readonly ApiTableRow[];

export const STRUCTURAL_ICONS_STROKE_ROWS = [
  {
    name: '--kui-icon-stroke-width',
    type: 'a number in glyph-grid units',
    description:
      'Built-in glyphs default to the weight of their call site (between 1.5 and 2.5); content icons keep the weight of their own markup until the token is set.',
  },
  {
    name: '--kui-icon-vector-effect',
    type: 'none | non-scaling-stroke',
    description:
      'non-scaling-stroke keeps the stroke the same number of pixels at any icon size. The default is none.',
  },
] as const satisfies readonly ApiTableRow[];

export const STRUCTURAL_ICONS_STROKE_CODE_TABS = [
  {
    label: 'CSS',
    filename: 'styles.css',
    language: 'css',
    code: `:root {
  --kui-icon-stroke-width: 1.5; /* thinner icons everywhere */
}`,
  },
  {
    label: 'kui-icon',
    filename: 'icon.html',
    language: 'html',
    code: `<kui-icon name="settings" size="96" [strokeWidth]="1.5" absoluteStrokeWidth />`,
  },
] as const satisfies readonly CodeTab[];
