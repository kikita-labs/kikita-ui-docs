# Time Picker

> Time-of-day input with a scrollable hour, minute and second panel.

- Status: available
- Route: /components/time-picker
- Package: @kikita-labs/ui@2.0.0
- Import: KuiTimePicker from @kikita-labs/ui
- Source docs: https://github.com/kikita-labs/kikita-ui/blob/v2.0.0/docs/time-picker.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

```html
<kui-field label="Meeting time">
  <input kuiTimePicker [(value)]="time" />
  <kui-dropdown panelRole="dialog" panelWidth="auto" maxHeight="280px">
    <kui-time-picker-panel />
  </kui-dropdown>
</kui-field>
```

The panel needs no `[value]`/`(valueChange)` or `[format]`/`[minuteStep]`/`[secondStep]`/
`[showSeconds]` binding: when `kui-time-picker-panel` is found as a sibling of
`input[kuiTimePicker]` inside the same `kui-field`, the directive auto-discovers it and wires
`value` both ways (a column pick, an arrow-key move, or "Now" updates the input; a valid time
typed in the input updates the panel), and pushes `format`/`hourStep`/`minuteStep`/`secondStep`/
`showSeconds`/`minTime`/`maxTime`/`disabledHours`/`disabledMinutes`/`disabledSeconds` into it
one-way. Every column auto-centers on its selected cell -- both the moment the panel opens and on
every later selection (click, keyboard, "Now") -- reacting to the ancestor `kui-dropdown`'s own
`isOpen` signal rather than this component's construction, so it holds regardless of whether a
given `kui-dropdown` recreates a fresh panel per open or reuses one across opens.

### Inline (standalone)

`kui-time-picker-panel` also works on its own, the same way `kui-calendar` does — its ancestor
`kui-dropdown` is optional, and it auto-detects whether one is present:

```html
<kui-time-picker-panel [(value)]="time" [showSeconds]="true" />
```

With no `kui-dropdown` ancestor, the panel draws its own background/border (`data-kui-flat` is
only set when one is present, matching `kui-calendar`'s `flat` input — just auto-detected here
instead of an explicit prop). "Now"/"Done" still work standalone; "Done" simply has nothing to
close.

## Examples

Rendered at /components/time-picker:

### basic-time-picker-example

#### basic-time-picker-example.html

```html
<div class="time-picker-example">
  <kui-field label="Meeting time" hint="Type a time or choose from the columns.">
    <input kuiTimePicker [(value)]="time" />
    <kui-dropdown panelRole="dialog" panelWidth="auto" maxHeight="280px">
      <kui-time-picker-panel />
    </kui-dropdown>
  </kui-field>
</div>
```

#### basic-time-picker-example.ts

```ts
import { Component, signal } from '@angular/core';

import { KuiDropdown, KuiField, KuiTimePicker, KuiTimePickerPanel } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-time-picker-example',
  imports: [KuiDropdown, KuiField, KuiTimePicker, KuiTimePickerPanel],
  templateUrl: './basic-time-picker-example.html',
  styleUrl: './basic-time-picker-example.scss',
})
export class BasicTimePickerExample {
  protected readonly time = signal<Date | null>(new Date(2026, 6, 14, 9, 30));
}
```

#### basic-time-picker-example.scss

```scss
.time-picker-example {
  display: grid;
  gap: var(--kui-space-4, 16px);
  inline-size: min(100%, 320px);
}
```

### time-picker-format-example

#### time-picker-format-example.html

```html
<div class="time-picker-example">
  <kui-field label="Slot" hint="12-hour clock with seconds in 15-minute and 15-second steps.">
    <input
      kuiTimePicker
      [(value)]="time"
      format="12h"
      [showSeconds]="true"
      [minuteStep]="15"
      [secondStep]="15"
    />
    <kui-dropdown panelRole="dialog" panelWidth="auto" maxHeight="300px">
      <kui-time-picker-panel />
    </kui-dropdown>
  </kui-field>
</div>
```

#### time-picker-format-example.ts

```ts
import { Component, signal } from '@angular/core';

import { KuiDropdown, KuiField, KuiTimePicker, KuiTimePickerPanel } from '@kikita-labs/ui';

@Component({
  selector: 'app-time-picker-format-example',
  imports: [KuiDropdown, KuiField, KuiTimePicker, KuiTimePickerPanel],
  templateUrl: './time-picker-format-example.html',
  styleUrl: './time-picker-format-example.scss',
})
export class TimePickerFormatExample {
  protected readonly time = signal<Date | null>(new Date(2026, 6, 14, 14, 45, 15));
}
```

#### time-picker-format-example.scss

```scss
.time-picker-example {
  display: grid;
  gap: var(--kui-space-4, 16px);
  inline-size: min(100%, 320px);
}
```

### time-picker-limits-example

#### time-picker-limits-example.html

```html
<div class="time-picker-example">
  <kui-field
    label="Office hours"
    hint="09:00 to 18:00, lunch hours and 17:30 to 17:59 are not available."
  >
    <input
      kuiTimePicker
      [(value)]="time"
      [minTime]="minTime"
      [maxTime]="maxTime"
      [disabledHours]="disabledHours"
      [disabledMinutes]="disabledMinutes"
    />
    <kui-dropdown panelRole="dialog" panelWidth="auto" maxHeight="280px">
      <kui-time-picker-panel />
    </kui-dropdown>
  </kui-field>
</div>
```

#### time-picker-limits-example.ts

```ts
import { Component, signal } from '@angular/core';

import { KuiDropdown, KuiField, KuiTimePicker, KuiTimePickerPanel } from '@kikita-labs/ui';

@Component({
  selector: 'app-time-picker-limits-example',
  imports: [KuiDropdown, KuiField, KuiTimePicker, KuiTimePickerPanel],
  templateUrl: './time-picker-limits-example.html',
  styleUrl: './time-picker-limits-example.scss',
})
export class TimePickerLimitsExample {
  protected readonly time = signal<Date | null>(null);
  protected readonly minTime = new Date(2026, 0, 1, 9, 0);
  protected readonly maxTime = new Date(2026, 0, 1, 18, 0);
  protected readonly disabledHours = (): readonly number[] => [12, 13];
  protected readonly disabledMinutes = (hour: number): readonly number[] =>
    hour === 17 ? [30, 45] : [];
}
```

#### time-picker-limits-example.scss

```scss
.time-picker-example {
  display: grid;
  gap: var(--kui-space-4, 16px);
  inline-size: min(100%, 320px);
}
```

### time-picker-inline-example

#### time-picker-inline-example.html

```html
<div class="time-picker-example">
  <kui-time-picker-panel [(value)]="time" [showSeconds]="true" />
</div>
```

#### time-picker-inline-example.ts

```ts
import { Component, signal } from '@angular/core';

import { KuiTimePickerPanel } from '@kikita-labs/ui';

@Component({
  selector: 'app-time-picker-inline-example',
  imports: [KuiTimePickerPanel],
  templateUrl: './time-picker-inline-example.html',
  styleUrl: './time-picker-inline-example.scss',
})
export class TimePickerInlineExample {
  protected readonly time = signal<Date | null>(new Date(2026, 6, 14, 8, 5, 0));
}
```

#### time-picker-inline-example.scss

```scss
.time-picker-example {
  display: grid;
  gap: var(--kui-space-4, 16px);
  inline-size: min(100%, 320px);
}
```

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [(value)] | Date \| null | null | Selected time. Only the hours, minutes and seconds are meaningful. Auto-wired both ways into a sibling kui-time-picker-panel inside the same kui-field. |
| format | '24h' \| '12h' \| undefined | undefined | Display and parse format. Resolves as format, then defaults.timePicker.format, then the hour cycle of the locale (12h in en-US, 24h in ru-RU). Pushed into the panel. |
| hourStep / minuteStep / secondStep | number | 1 | Thins the hour, minute and second columns to every Nth value; typed values snap to the step. Static numeric values are coerced and invalid or non-positive values use 1. Fall back to defaults.timePicker. Pushed into the panel. |
| showSeconds | boolean | false | Adds a seconds column and group. Falls back to defaults.timePicker.showSeconds. |
| minTime / maxTime | Date \| undefined | undefined | Earliest and latest selectable time of day, inclusive; only hours, minutes and seconds are read. Out-of-range cells are disabled and a typed out-of-range time is only marked aria-invalid. |
| disabledHours | (() => readonly number[]) \| undefined | undefined | Returns the hours to disable. A typed value on one is marked aria-invalid, not rejected. |
| disabledMinutes | ((hour: number) => readonly number[]) \| undefined | undefined | Returns the minutes to disable for a given hour. |
| disabledSeconds | ((hour: number, minute: number) => readonly number[]) \| undefined | undefined | Returns the seconds to disable for a given hour and minute; used only with showSeconds. |
| clearable | boolean \| undefined | undefined | Shows the clear button once there is a value. Resolved as local input, defaults.timePicker.clearable, defaults.field.clearable, then true. |
| disabled / readonly | boolean | false | disabled uses the native attribute on the input and the chevron. readonly shows the value but never opens the popover. |
| placeholder | string \| undefined | locale layout | Defaults to the hour, minute and second placeholder messages joined with the locale separator, plus the day period for 12h. |
| messages | Partial<KuiTimePickerMessages> \| undefined | undefined | Per-instance text overrides: button and column names, Now, Done and the placeholder tokens. |
| id | string \| undefined | undefined | Falls back to the control id of the parent kui-field. |
| invalid, errors, touched, (touch) | FormValueControl<Date \| null> | - | The Signal Forms contract, with the same shape as the date picker. invalid is also set by an incomplete group or a value in an excluded range. |
| kui-time-picker-panel | component | - | The scrollable hour, minute and second columns with Now and Done. It works inside a kui-dropdown (auto-wired to the input) or standalone with [(value)]; standalone it draws its own background and border. |
| --kui-timepicker-col-gap / -icon-color / -cell-bg-selected / -cell-text-selected / -cell-bg-hover | CSS custom properties | - | Column gap, clock icon colour and the selected and hover cell colours. |
| --kui-timepicker-affordance-size / -suffix-gap | CSS custom properties | 20px / 2px | Chevron and clear target size and the gap between the trailing buttons. |
| KuiTimePickerOptions | interface | - | Shape of defaults.timePicker: clearable, format, hourStep, minuteStep, secondStep, showSeconds, chevronIcon and clearIcon. |

## Accessibility

- `role="combobox"` on the input, `aria-haspopup="dialog"`, `aria-expanded` + `aria-controls`
  pointing at the popover panel id — the same pattern `kuiDatePicker` uses (a combobox that
  opens a non-modal dialog, not a listbox).
- Each unit column is `role="listbox"` with its own `aria-label` ("Hours"/"Minutes"/"Seconds"),
  focusable (`tabindex="0"`); arrow keys/Home/End work inside it without moving focus to another
  column. Cells are `role="option"` + `aria-selected`; the selected cell is also visually distinct
  (fill + bold), not color alone.
- `:focus-visible` is explicitly styled on the column (a `--kui-color-primary-fill` ring), not
  left to the browser default.
- AM/PM uses `kui-segmented` (`role="radiogroup"`) — already keyboard-accessible as part of the
  kit, not reimplemented here.
- Disabled uses native `disabled` on the input and the chevron button (excluded from tab order).
- Invalid sets `aria-invalid` on the input; pair with `kui-field`'s `error` for an announced
  `role="alert"` message.

### Keyboard

- `ArrowDown` (in the input, panel closed): opens the popover and moves focus into the first
  column.
- `Enter` (in the input): opens the popover if closed, closes it if open.
- `Enter` (in a column): closes the popover, keeping the current selection.
- `Escape` (anywhere in the field or panel): closes the popover; focus stays in the field, or returns to it when it was inside the panel.
- `Tab` (in the input): closes the popover, focus moves to the next tabbable element.
- `ArrowUp` / `ArrowDown` (in a column): cyclic move to the previous/next value, applied
  immediately.
- `Home` / `End` (in a column): jump to the first/last value in that column.

Selecting a cell (by click or arrow key) does **not** close the panel — picking hours would
otherwise close the panel before minutes/seconds could be picked. Close explicitly with
`Enter`/`Escape`/an outside click, or the panel's own "Done" button. The panel's "Now" button
sets `value` to the current time without closing.

## Playground

Available at /components/time-picker/playground.
