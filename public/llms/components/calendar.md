# Calendar

> Date grid.

- Status: available
- Route: /components/calendar
- Package: @kikita-labs/ui@0.7.0
- Import: KuiCalendarComponent from @kikita-labs/ui
- Source docs: ../kikita-ui/docs/calendar.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

```html
<kui-calendar [(value)]="selectedDate" />
```

### Range Mode

```html
<kui-calendar mode="range" [(value)]="selectedRange" />
```

`value` holds a `Date` in `single` mode, and a `{ start: Date; end: Date | null }` object (`KuiDateRange`) in `range` mode. `end` is `null` while the range is still open (only the start date has been picked); the first click after a committed range starts a new one.

### Disabled Dates

```html
<kui-calendar [minDate]="today" [(value)]="selectedDate" />
<kui-calendar [disabledDates]="[holiday1, holiday2]" [(value)]="selectedDate" />
<kui-calendar [disabledDates]="isWeekend" [(value)]="selectedDate" />
```

### Footer

```html
<kui-calendar showFooter [(value)]="selectedDate" />
```

Off by default. When enabled, adds a footer with the current value and a "Today" shortcut button — useful when the calendar is the whole surface (e.g. inside a popover), but usually skipped for bare inline placements (sidebars, filter panels).

### Custom Header / Footer

The header (month/year title + nav arrows) and footer are both replaceable through content projection. Project an element with `kuiCalendarHeader` or `kuiCalendarFooter` to fully replace the corresponding default block; the built-in one (including the `showFooter` toggle) only renders when nothing is projected.

```html
<kui-calendar [(value)]="selectedDate">
  <div kuiCalendarFooter class="my-footer">
    <button type="button" (click)="clearSelection()">Clear</button>
  </div>
</kui-calendar>
```

Projected content is compiled against the host template, not `kui-calendar`'s internal state — it replaces the block rather than augmenting it.

### Compact Size

```html
<kui-calendar size="sm" [(value)]="selectedDate" />
```

`sm` drops the border and padding, for embedding directly inside a sidebar or panel.

### Width

The calendar has a fixed width (`296px`) so its day grid always has enough room, regardless of
how wide whatever's anchoring it (a field, a dropdown trigger) happens to be. Override it with
the `--kui-calendar-width` custom property:

```html
<kui-calendar style="--kui-calendar-width: 340px" [(value)]="selectedDate" />
```

### Flat (No Own Chrome)

```html
<kui-calendar flat [(value)]="selectedDate" />
```

Strips the calendar's own background/border/padding. Use this when nesting it inside chrome
that already draws those — a `kui-dropdown`/`kui-popover` panel in a date picker — so the two
don't stack into a double frame. See [Date Picker](./date-picker.md).

### Controlling The Displayed Month

```html
<kui-calendar [(value)]="selectedDate" [(viewDate)]="viewDate" />
```

`viewDate` (a first-of-month `Date`, two-way) drives which month the grid shows. Bind it when
an external control (e.g. a paired `input[kuiDatePicker]`) needs to move the calendar to a
specific month — for example, jumping to the typed date's month in real time. Left unbound, it
defaults to today's month, or the bound `value`'s month at construction time.

`showPrevNav`/`showNextNav` (`boolean`, default `true`) hide the previous/next nav button. This
is for pairing two linked calendars a month apart (one showing month N with only a "previous"
button, the other month N+1 with only "next") — not yet wired up as a built-in range popover,
but available for custom layouts.

### Locale

`kui-calendar` resolves month names, weekday names, and the first day of the week purely from `Intl` — there is no bundled locale data to keep in sync. By default it uses the app-wide `KUI_LOCALE` token (which itself defaults to `navigator.language`, falling back to `en-US`).

Override the locale for the whole app:

```ts
// app.config.ts
import { kuiProvideLocale } from '@kikita-labs/ui';

providers: [kuiProvideLocale('ru-RU')];
```

Or override it for a single instance with the `locale` input, which takes precedence over the token:

```html
<kui-calendar locale="ru-RU" [(value)]="selectedDate" />
```

## Examples

Rendered at /components/calendar:

### basic-calendar-example

#### basic-calendar-example.html

```html
<div class="basic-calendar-example">
  <kui-calendar [(value)]="selectedDate" [minDate]="minDate" showFooter />

  <kui-calendar mode="range" size="sm" [(value)]="sprintRange" locale="en-US" />
</div>
```

#### basic-calendar-example.ts

```ts
import { Component, signal } from '@angular/core';

import { KuiCalendarComponent, type KuiDateRange } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-calendar-example',
  imports: [KuiCalendarComponent],
  templateUrl: './basic-calendar-example.html',
  styleUrl: './basic-calendar-example.scss',
})
export class BasicCalendarExample {
  protected readonly selectedDate = signal<Date | null>(new Date(2026, 6, 14));
  protected readonly sprintRange = signal<KuiDateRange>({
    start: new Date(2026, 6, 13),
    end: new Date(2026, 6, 17),
  });
  protected readonly minDate = new Date(2026, 6, 1);
}
```

#### basic-calendar-example.scss

```scss
.basic-calendar-example {
  display: flex;
  flex-wrap: wrap;
  gap: var(--kui-space-5, 20px);
  align-items: flex-start;
}
```

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| mode | 'single' \| 'range' | 'single' | Selection mode. Range mode stores a start date and a nullable end date. |
| [(value)] | Date \| KuiDateRange \| null | null | Selected date in single mode or selected range in range mode. |
| [(viewDate)] | Date | current month | First-of-month date that controls the visible month. |
| size | 'md' \| 'sm' | 'md' | Calendar density. Use sm when embedding in tighter sidebars or panels. |
| flat | boolean | false | Removes the calendar frame for dropdown or popover panel composition. |
| showWeekend | boolean | true | Mutes Saturday and Sunday labels when enabled. |
| showFooter | boolean | false | Shows the built-in value summary and Today shortcut. |
| minDate / maxDate | Date \| undefined | undefined | Inclusive lower and upper bounds for selectable days. |
| disabledDates | Date[] \| ((date: Date) => boolean) \| undefined | undefined | Individual disabled dates or a predicate evaluated for each rendered date. |
| locale | string \| undefined | KUI_LOCALE | BCP 47 locale override for month names, weekday names, and week start. |
| showPrevNav / showNextNav | boolean | true | Hide one header navigation control for linked multi-calendar layouts. |
| [kuiCalendarHeader] / [kuiCalendarFooter] | projected content | - | Replace the default header or footer with consumer-owned content. |
| kuiProvideLocale(locale) | Provider | - | Provides the default app or subtree locale used by date-aware components. |
| --kui-calendar-width | CSS custom property | 296px | Overrides the fixed calendar width while keeping the day grid predictable. |

## Accessibility

- `role="grid"` on the day grid, `role="row"` on the weekday header row.
- `aria-selected` on selected/range-endpoint cells, `aria-current="date"` on today, `aria-disabled` on disabled dates.
- Roving tabindex: one day cell is in the tab order at a time (the focused date); arrow keys, `Home`/`End`, `PageUp`/`PageDown` move focus without leaving the grid.
- Month/year changes are announced through an `aria-live="polite"` region.

### Keyboard

- `ArrowLeft` / `ArrowRight`: previous/next day
- `ArrowUp` / `ArrowDown`: previous/next week
- `Home` / `End`: start/end of the focused week
- `PageUp` / `PageDown`: previous/next month
- `Shift+PageUp` / `Shift+PageDown`: previous/next year
- `Enter` / `Space`: select the focused date

## Playground

Available at /components/calendar/playground.
