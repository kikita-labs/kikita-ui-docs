# Defaults

> Set shared preferences such as size, shape, clearable or toast placement once for the application or for a subtree, instead of repeating them in every template.

- Status: available
- Route: /foundations/defaults
- Package: @kikita-labs/ui@2.0.0

## Content

### When to use defaults
Defaults cover preferences shared by many instances. Data, instance state and form state are never defaults.
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| Colour, radius, spacing, type | Theme seeds and CSS variables | - | Visual identity of the whole application. |
| Variant or behaviour shared across the app | Defaults | - | Size, shape, clearable, toast placement and similar preferences (this page). |
| Density | Theme seeds | - | Set seeds.density in the theme. |
| Texts and accessible names | Messages | - | See the Internationalization page. |

### Setting defaults
defaults is a flat map with one key per primitive plus the global control size. Every key points to a named options interface such as KuiButtonOptions or KuiSelectOptions.
#### app.config.ts

```ts
provideKikitaUi({
  defaults: {
    size: 'sm',
    button: { shape: 'ghost', size: 'md' },
    select: { clearable: true, maxVisibleChips: 2 },
    toast: { position: 'top-end', duration: 4000 },
  },
});
```

#### section.providers.ts

```ts
// A component, route or environment injector: applies to that subtree only
providers: [provideKuiDefaults({ button: { size: 'lg' } })];
```

### Layers and merging
The nearest value wins, and each level is merged over the defaults it inherits per component key and per property.

### Reactive values
Every property accepts a plain value or a Signal, and the whole defaults value may be a function that runs in an injection context.
#### app.config.ts

```ts
@Service()
class ThemeState {
  readonly shape = signal<KuiButtonShape>('solid');
}

provideKikitaUi({
  defaults: () => ({ button: { shape: inject(ThemeState).shape } }),
});
```

#### defaults.ts

```ts
const defaults = inject(KuiDefaults);

defaults.set('button', { shape: 'outline' }); // merges into this level's own layer
defaults.update('select', (current) => ({ clearable: !current?.clearable }));
defaults.get('button'); // Signal of the effective button options
```

### Global control size
defaults.size applies to every primitive with a size input when neither the local input nor the component key sets one.

### Clearable controls and tooltips
A few keys resolve through a chain with a shared field key.

### Overlays
Anchored overlays share the placement and offset options and add their own.
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| popover | placement, offset, align, arrow, triggerType, hoverDelay | - | Built-in: bottom, 8, center, false, click, 100. |
| menu | placement, offset, menuAlign, minWidth | - | Built-in: bottom, 4, start, none. |
| dropdown | maxHeight, offset, closeOnSelect, panelWidth | - | Built-in: 240px, 4, true, anchor. |
| tooltip | triggerType, placement | - | Built-in: auto, top. |
| dialog | size, appearance, dismissable, closable | - | Per kuiDialog call. Built-in: md, default, true, true. |
| drawer | side, size, closeOnBackdropClick, closeOnEscape, closable | - | Built-in: right, md, true, true, true. |

### Calendars, time, carousel and pagination
These keys follow local input, then defaults, then the built-in default.
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| calendar, calendarRange | size, flat, showWeekend, showFooter, showPrevNav, showNextNav | - | Built-in: global size, false, true, false, true, true. The two keys are separate and share KuiCalendarViewOptions. |
| timePicker | clearable, format, hourStep, minuteStep, secondStep, showSeconds | - | Built-in: true, the hour cycle of the locale, 1, 1, 1, false. The directive pushes them into its panel. |
| carousel | itemsPerView, loop, autoplay, autoplayInterval, showArrows, showDots, draggable | - | Built-in: 1, false, false, 4000, true, true, true. |
| pagination | variant, siblingCount, boundaryCount, pageSizeOptions | - | Built-in: compact, 1, 1, [10, 25, 50, 100]. |

### Other primitives
Every remaining primitive has a key. Each option resolves as local input, then defaults, then the built-in default; size follows the size chain above.
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| badge, breadcrumbs, chip, emptyState, loader, segmented, table | size | - |  |
| input, textarea, checkbox, radio, switch, colorInput | size | - |  |
| numberInput | size, variant | - |  |
| slider, progress | size, color | - |  |
| accordion | size, mode, appearance | - |  |
| alert | size, shape, showIcon, closable | - |  |
| card | size, appearance | - |  |
| tabs | size, variant, orientation | - |  |
| stepper | size, orientation, linear, compact | - |  |
| tree | size, mode | - |  |
| group | size, orientation, collapsed, rounded | - |  |
| avatar, avatarGroup | size, shape (avatarGroup also max) | - |  |
| link | tone, underline | - |  |
| separator | appearance, orientation, spacing | - |  |
| skeleton | shape, animation | - |  |
| fileUpload | size, variant, mode | - |  |
| otpInput | size, mask, integerOnly | - |  |
| barChart, lineChart, donutChart, scatterChart | size, legend | - |  |

### Structural icons
The icons key replaces the glyphs components draw for themselves, one glyph per role or per component slot.
#### app.config.ts

```ts
provideKikitaUi({ defaults: { icons: { close: MY_CLOSE }, select: { chevronIcon: MY_CHEVRON } } });
```

### Migrating from the token API
The injection tokens are removed and the provider functions remain as deprecated wrappers until 3.0.
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| kuiProvideButtonOptions({ button, iconButton }) | provideKuiDefaults({ button, iconButton }) | - | Deprecated wrapper, removed in 3.0. |
| kuiProvideFieldOptions(options) | provideKuiDefaults({ field: options }) | - | Deprecated wrapper, removed in 3.0. |
| kuiProvideSelectOptions(options) | provideKuiDefaults({ select: options }) | - | Deprecated wrapper, removed in 3.0. |
| kuiProvideComboboxOptions(options) | provideKuiDefaults({ combobox: options }) | - | Deprecated wrapper, removed in 3.0. |
| kuiProvideTooltipOptions(options) | provideKuiDefaults({ tooltip: options }) | - | Deprecated wrapper, removed in 3.0. |
| provideKuiToastOptions(options) | provideKuiDefaults({ toast: options }) | - | Deprecated wrapper, removed in 3.0. |
| provideKikitaUi({ tooltip }) | provideKikitaUi({ defaults: { tooltip } }) | - | Deprecated. |
| KuiButtonOptions { button, iconButton } | KuiButtonProviderOptions | - | Deprecated; KuiButtonOptions now describes one button (shape, appearance, size). |
| KuiButtonPrimitiveOptions | KuiButtonBaseOptions | - | Renamed. |
| KikitaUiDefaults | KuiComponentDefaults | - | Deprecated alias. |
