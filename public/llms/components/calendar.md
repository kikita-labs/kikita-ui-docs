# Calendar

> Date grid.

- Status: available
- Route: /components/calendar
- Package: @kikita-labs/ui@2.0.0
- Import: KuiCalendar from @kikita-labs/ui
- Source docs: https://github.com/kikita-labs/kikita-ui/blob/v2.0.0/docs/calendar.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

```html
<kui-calendar [(value)]="selectedDate" />
```

`value` is a two-way model holding a `Date | null`.

Placed as a sibling of `input[kuiDatePicker]` inside the same `kui-field`, the directive
auto-wires this calendar's `value`/`viewDate` for you — see [Date Picker](./date-picker.md),
which is the recommended way to pair the two.

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
an external control needs to move the calendar to a specific month manually. Left unbound, it
defaults to today's month, or the bound `value`'s month at construction time. When paired with
`input[kuiDatePicker]` inside the same `kui-field`, this is wired automatically — see
[Date Picker](./date-picker.md).

`showPrevNav`/`showNextNav` (`boolean`, default `true`) hide the previous/next nav button. This
is for pairing two linked calendars a month apart (one showing month N with only a "previous"
button, the other month N+1 with only "next") — not yet wired up as a built-in range popover,
but available for custom layouts.

### Locale

`kui-calendar` resolves month names, weekday names, the heading, the first day of the week and the weekend purely from `Intl` — there is no bundled locale data to keep in sync. The heading is one `Intl` month-and-year format, so its order follows the locale (`October 2026`, `2026年10月`). The first day and the weekend come from `Intl.Locale#getWeekInfo()` (`he-IL` has a Friday and Saturday weekend), with a static table for engines that lack it. Names use the Gregorian calendar and Latin digits whatever the locale's default is.

By default it uses the locale of the nearest `KuiI18n` level, which starts from the app-wide `KUI_LOCALE` (in the browser `navigator.language`, on the server the request's `Accept-Language`, both falling back to `en-US`; see `KUI_LOCALE` for the server-to-browser hand-off). See [Internationalization](./i18n.md).

Set the locale for the whole app or a subtree:

```ts
// app.config.ts
import { provideKikitaUi } from '@kikita-labs/ui';

provideKikitaUi({ locale: 'ru-RU' });

// a subtree: provideKuiLocale('ru-RU') in the component's providers
```

Or override it for a single instance with the `locale` input, which takes precedence over the level:

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

  <kui-calendar-range size="sm" [(value)]="sprintRange" locale="en-US" />
</div>
```

#### basic-calendar-example.ts

```ts
import { Component, signal } from '@angular/core';

import { KuiCalendar, KuiCalendarRange, type KuiDateRange } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-calendar-example',
  imports: [KuiCalendar, KuiCalendarRange],
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
| [(value)] | Date \| null | null | Selected date. For a start and end pair use kui-calendar-range, whose value is a KuiDateRange \| null. |
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
| provideKuiLocale(locale) | Provider | - | Provides the default app or subtree locale used by date-aware components. |
| --kui-calendar-width | CSS custom property | 296px | Overrides the fixed calendar width while keeping the day grid predictable. |

## Accessibility

- The day grid is a complete ARIA grid: `role="grid"` containing the weekday header `role="row"` (with `role="columnheader"` cells that carry the full weekday name as `abbr`) and a `role="rowgroup"` of six `role="row"` week rows, each holding seven `role="gridcell"` elements. Each gridcell wraps one day `<button>`.
- `aria-selected` on the selected gridcell (not on the button), `aria-current="date"` on today, `aria-disabled` on disabled dates.
- Roving tabindex: one day cell is in the tab order at a time (the focused date). On initial render, the selected date receives focus when it is in the displayed month; otherwise today is used when visible, then the first day of the displayed month. Arrow keys, `Home`/`End`, and `PageUp`/`PageDown` move DOM focus to the new roving cell without leaving the grid.
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
