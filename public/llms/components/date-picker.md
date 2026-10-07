# Date Picker

> Calendar date input.

- Status: available
- Route: /components/date-picker
- Package: @kikita-labs/ui@2.0.0
- Import: KuiDatePicker from @kikita-labs/ui
- Source docs: https://github.com/kikita-labs/kikita-ui/blob/v2.0.0/docs/date-picker.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

```html
<kui-field label="Meeting date">
  <input kuiDatePicker [(value)]="date" />
  <kui-dropdown panelRole="dialog" panelWidth="auto" maxHeight="420px">
    <kui-calendar flat showFooter />
  </kui-dropdown>
</kui-field>
```

The calendar needs no `[value]`/`(valueChange)` or `[(viewDate)]` binding: when `kui-calendar`
is found as a sibling of `input[kuiDatePicker]` inside the same `kui-field`, the directive
auto-discovers it and wires `value`/`viewDate` both ways automatically — a day clicked in the
calendar updates the input, and a valid date typed in the input updates (and scrolls) the
calendar. This is the recommended usage.

Manually binding `[value]`/`(valueChange)`/`[(viewDate)]` on the calendar still works — it's no
longer required, not deprecated. If you keep the old pattern (e.g. bound to the same signal as
the input), the auto-wire effects and your binding stay in sync without fighting each other:

```html
<!-- Still supported: manual binding, same as before this feature shipped. -->
<kui-field label="Meeting date">
  <input kuiDatePicker [(value)]="date" [(viewDate)]="viewDate" />
  <kui-dropdown panelRole="dialog" panelWidth="auto" maxHeight="420px">
    <kui-calendar flat [(value)]="date" [(viewDate)]="viewDate" [showFooter]="true" />
  </kui-dropdown>
</kui-field>
```

Three things on `kui-dropdown` matter here, all different from its default (listbox) usage:

- `panelRole="dialog"` — the panel holds a calendar grid, not a list of options.
- `panelWidth="auto"` — sizes the panel to the calendar's own width (296px by default)
  instead of clipping it to the (usually narrower) field. This is why the popover is often
  wider than the input — that's intentional, not a bug: `kui-calendar` has a fixed width
  (`--kui-calendar-width`, 296px by default) because its day grid needs a minimum amount of
  room regardless of the trigger. Override `--kui-calendar-width` on `kui-calendar` if you want
  it narrower or wider — `panelWidth` only controls how the _dropdown panel_ relates to the
  trigger's width, not the calendar's own size, so switching it to `"anchor"` alone would just
  clip a still-296px-wide calendar into a narrower panel rather than shrink it.
- `maxHeight="420px"` — the calendar's natural height comfortably fits under this; it's a
  safety cap so the popover never renders unbounded when there isn't enough room in either
  direction, falling back to an internal scroll instead of visually overflowing.

And on `kui-calendar`:

- `flat` — the popover panel already draws its own background/border, so the calendar drops
  its own to avoid a double frame. See [Calendar](./calendar.md#flat-no-own-chrome).

## Examples

Rendered at /components/date-picker:

### basic-date-picker-example

#### basic-date-picker-example.html

```html
<div class="basic-date-picker-example">
  <kui-field
    label="Meeting date"
    hint="Type the date in your locale's layout or choose from the calendar."
  >
    <input kuiDatePicker [(value)]="meetingDate" [minDate]="minDate" [maxDate]="maxDate" />
    <kui-dropdown panelRole="dialog" panelWidth="auto" maxHeight="420px">
      <kui-calendar flat showFooter />
    </kui-dropdown>
  </kui-field>
</div>
```

#### basic-date-picker-example.ts

```ts
import { Component, signal } from '@angular/core';

import { KuiCalendar, KuiDatePicker, KuiDropdown, KuiField } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-date-picker-example',
  imports: [KuiCalendar, KuiDatePicker, KuiDropdown, KuiField],
  templateUrl: './basic-date-picker-example.html',
  styleUrl: './basic-date-picker-example.scss',
})
export class BasicDatePickerExample {
  protected readonly meetingDate = signal<Date | null>(new Date(2026, 6, 14));
  protected readonly minDate = new Date(2026, 6, 1);
  protected readonly maxDate = new Date(2026, 6, 31);
}
```

#### basic-date-picker-example.scss

```scss
.basic-date-picker-example {
  max-width: 22rem;
}
```

### date-picker-format-example

#### date-picker-format-example.html

```html
<div class="date-picker-format-example">
  <kui-field label="Locale layout" hint="Follows the locale of the nearest i18n level.">
    <input kuiDatePicker [(value)]="localeDate" />
    <kui-dropdown panelRole="dialog" panelWidth="auto" maxHeight="420px">
      <kui-calendar flat />
    </kui-dropdown>
  </kui-field>

  <kui-field label="Pinned layout" hint="format pins dd.MM.yyyy whatever the locale is.">
    <input kuiDatePicker format="dd.MM.yyyy" [(value)]="pinnedDate" />
    <kui-dropdown panelRole="dialog" panelWidth="auto" maxHeight="420px">
      <kui-calendar flat />
    </kui-dropdown>
  </kui-field>
</div>
```

#### date-picker-format-example.ts

```ts
import { Component, signal } from '@angular/core';

import { KuiCalendar, KuiDatePicker, KuiDropdown, KuiField } from '@kikita-labs/ui';

@Component({
  selector: 'app-date-picker-format-example',
  imports: [KuiCalendar, KuiDatePicker, KuiDropdown, KuiField],
  templateUrl: './date-picker-format-example.html',
  styleUrl: './date-picker-format-example.scss',
})
export class DatePickerFormatExample {
  protected readonly localeDate = signal<Date | null>(new Date(2026, 9, 3));
  protected readonly pinnedDate = signal<Date | null>(new Date(2026, 9, 3));
}
```

#### date-picker-format-example.scss

```scss
.date-picker-format-example {
  display: grid;
  gap: var(--kui-space-5, 20px);
  inline-size: min(100%, 22rem);
}
```

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| input[kuiDatePicker] | Directive | - | Turns a native text input into a masked date picker trigger. |
| [(value)] | Date \| null | null | Selected date. Bind the same signal to the paired calendar. |
| [(viewDate)] | Date | current month | Visible calendar month. Bind on both input and calendar for live month sync. |
| minDate / maxDate | Date \| undefined | undefined | Inclusive bounds for typed values and linked calendar cells. |
| clearable | boolean \| undefined | field option | Shows a clear action when the input has a value. |
| disabled | boolean | false | Disables the input and prevents opening the dropdown. |
| readonly | boolean | false | Keeps the value readable while preventing popover opening. |
| invalid | boolean | false | Reflects validation state from Signal Forms or direct binding. |
| errors / touched / touch | Signal Forms control contract | - | Integrates with Angular Signal Forms validation and touched state. |
| placeholder | string \| undefined | locale layout | Native input placeholder. Defaults to the day, month and year placeholder messages in the order and separators of the locale (mm/dd/yyyy, dd.mm.yyyy). |
| id | string \| undefined | field control id | Input id. Falls back to the parent kui-field control id when present. |
| kui-dropdown panelRole | 'dialog' \| 'listbox' \| 'grid' \| null | 'listbox' | Use dialog for the calendar popover because the panel is not a listbox. |
| kui-calendar flat | boolean | false | Use flat inside the dropdown so the calendar does not draw a second frame. |
| format | string \| undefined | 'locale' | Display and parse layout: d/dd, M/MM and yyyy tokens such as dd.MM.yyyy pin it. Resolves as the input, then defaults.datePicker.format, then the locale layout. |
| messages | Partial<KuiDatePickerMessages> \| undefined | undefined | Per-instance text overrides (openCalendar, closeCalendar and the day, month and year placeholder tokens). They win over scoped and root messages. |
| KuiDatePickerOptions | interface | - | Shape of defaults.datePicker: clearable, format, chevronIcon and clearIcon (they take precedence over defaults.icons.pickerChevron and defaults.icons.clear). |

## Accessibility

- `role="combobox"` on the input, `aria-haspopup="dialog"`, `aria-expanded` + `aria-controls`
  pointing at the popover panel id.
- `aria-invalid`/`data-kui-invalid` reflect parse failures and out-of-range dates.
- The linked `kui-calendar` carries its own grid accessibility (`role="grid"`, roving tabindex,
  `aria-current="date"`, `aria-selected`) — see [Calendar](./calendar.md#accessibility).

### Keyboard

- `ArrowDown`: opens the popover
- `Enter`: opens the popover if closed, closes it if open
- `Escape`: closes the popover; focus stays in the field, or returns to it when it was inside the calendar
- `Tab`: closes the popover, focus moves to the next tabbable element
- Inside the popover: calendar keyboard navigation applies (see Calendar docs)

## Playground

Available at /components/date-picker/playground.
