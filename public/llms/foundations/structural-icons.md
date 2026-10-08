# Structural icons

> The small glyphs a component draws for itself, such as the cross on a dialog or the chevron on a select, as replaceable icon data.

- Status: available
- Route: /foundations/structural-icons
- Package: @kikita-labs/ui@2.0.0

## Content

### Replace a glyph
Structural icons are not the icons you pass to kui-icon by name. They never touch the icon registry or the network, they render on the server, and you can replace them for the whole app or for one subtree without changing a template.
#### close-icon.ts

```ts
import type { KuiIconGlyph } from '@kikita-labs/ui';

export const CIRCLE_X: KuiIconGlyph = {
  node: [
    ['circle', { cx: 12, cy: 12, r: 10 }],
    ['path', { d: 'm15 9-6 6' }],
    ['path', { d: 'm9 9 6 6' }],
  ],
};
```

#### app.config.ts

```ts
provideKikitaUi({ defaults: { icons: { close: CIRCLE_X, remove: CIRCLE_X } } });
```

#### section.providers.ts

```ts
providers: [provideKuiDefaults({ icons: { close: CIRCLE_X } })];
```

### Precedence
A role changes every component without a more specific override; a component slot changes only that component.

### Roles
defaults.icons takes one glyph per role. Roles are named for what the icon does, not for its shape: one cross is close on a dialog, remove on a chip and clear in a field.
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| close | role | - | Dialog, Drawer, Media Viewer, Toast and Alert close buttons. |
| remove | role | - | Chip remove button (also the chips of a multiple Select) and File Upload remove button. |
| clear | role | - | Clear button of Select, Combobox, Date Picker and Time Picker, and the Command Palette search clear. |
| pickerChevron | role | - | Options toggle of Select, Combobox, Date Picker, Time Picker and Color Input. |
| previous, next | role | - | Previous and next page, month, slide or tab group (Pagination, Calendar, Calendar Range, Carousel, Tabs, Media Viewer). |
| first, last | role | - | First and last page buttons of Pagination. |
| disclosure | role | - | Expand control of Accordion items and Tree nodes; the rotation stays CSS. |
| separator | role | - | Breadcrumb separator. |
| check | role | - | Completed Stepper step and finished File Upload item. |
| statusInfo, statusSuccess, statusWarning, statusDanger | role | - | Status mark of Alert and Toast, and the warning mark of a non-default Confirm dialog. |
| externalLink | role | - | Mark after an external kuiLink. |

### Component slots
A component slot beats the role. Slots live in the options interface of the component, so a typo is a type error.
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| dialog, drawer | closeIcon | - | Close button. |
| alert, toast | closeIcon | - | Close button. |
| chip, fileUpload | removeIcon | - | Remove button. |
| select, combobox, datePicker, timePicker | chevronIcon, clearIcon | - | Options toggle and clear button. |
| colorInput | chevronIcon | - | Options toggle. |
| calendar, calendarRange, carousel, tabs | previousIcon, nextIcon | - | Step controls. |
| pagination | firstIcon, previousIcon, nextIcon, lastIcon | - | Step controls. |
| accordion, tree | disclosureIcon | - | Expand control. |
| breadcrumbs | separatorIcon | - | Separator. |
| link | externalIcon | - | Mark after an external link. |

### Glyph data
An icon is plain data in the icon-node layout of Lucide, so an icon from the Lucide packages can be used as is.
#### glyph.ts

```ts
interface KuiIconGlyph {
  readonly node: readonly (readonly [
    tag: string,
    attributes: Record<string, string | number | undefined>,
  ])[];
  readonly viewBox?: string; // default '0 0 24 24'
}
```
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| Elements | path, line, polyline, polygon, circle, ellipse, rect | - | Any other element invalidates the glyph. |
| Attributes | geometry and paint | - | Geometry (d, cx, cy, r, rx, ry, x, y, x1, y1, x2, y2, width, height, points) and paint (fill, fill-opacity, fill-rule, clip-rule, stroke, stroke-opacity, stroke-linecap, stroke-linejoin, stroke-miterlimit, stroke-dasharray, stroke-dashoffset, opacity, transform). Everything else is ignored. |
| Values | strings and numbers | - | Values containing url(, <, > or javascript: are ignored. |
| Line weight | stroke-width, vector-effect | - | Not accepted; the stroke tokens own them. |
| Filled shapes | fill and stroke none | - | Set fill and stroke: none on the element, as the built-in play glyph does. |
| Invalid override | ignored | - | The next level of the precedence chain is used. In development mode the first use of an invalid glyph logs a warning. |

### Stroke width
Two public CSS custom properties control the line of structural icons and of stroke-based kui-icon content. Set them on the root or on any subtree.
#### styles.css

```css
:root {
  --kui-icon-stroke-width: 1.5; /* thinner icons everywhere */
}
```

#### icon.html

```html
<kui-icon name="settings" size="96" [strokeWidth]="1.5" absoluteStrokeWidth />
```
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| --kui-icon-stroke-width | a number in glyph-grid units | - | Built-in glyphs default to the weight of their call site (between 1.5 and 2.5); content icons keep the weight of their own markup until the token is set. |
| --kui-icon-vector-effect | none \| non-scaling-stroke | - | non-scaling-stroke keeps the stroke the same number of pixels at any icon size. The default is none. |

### Accessibility, security and server rendering
Structural icons are decorative plain template output.

### Not supported
Use a subtree and provideKuiDefaults for per-instance needs.
