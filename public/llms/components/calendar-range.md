# Calendar Range

> Inline month grid for selecting a start and end date.

- Status: available
- Route: /components/calendar-range
- Package: @kikita-labs/ui@2.0.0
- Import: KuiCalendarRange from @kikita-labs/ui
- Source docs: https://github.com/kikita-labs/kikita-ui/blob/v2.0.0/docs/calendar-range.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

```html
<kui-calendar-range [(value)]="selectedRange" />
```

`value` is a two-way model holding a `KuiDateRange | null`:

```ts
interface KuiDateRange {
  start: Date;
  end: Date | null;
}
```

`end` is `null` while the range is still open (only the start date has been picked).

### Disabled Dates

```html
<kui-calendar-range [minDate]="today" [(value)]="selectedRange" />
<kui-calendar-range [disabledDates]="[holiday1, holiday2]" [(value)]="selectedRange" />
<kui-calendar-range [disabledDates]="isWeekend" [(value)]="selectedRange" />
```

### Footer

```html
<kui-calendar-range showFooter [(value)]="selectedRange" />
```

Off by default. When enabled, adds a footer with the current value and a "Today" shortcut button.

### Custom Header / Footer

Project an element with `kuiCalendarHeader` or `kuiCalendarFooter` to fully replace the corresponding default block; the built-in one (including the `showFooter` toggle) only renders when nothing is projected.

```html
<kui-calendar-range [(value)]="selectedRange">
  <div kuiCalendarFooter class="my-footer">
    <button type="button" (click)="clearSelection()">Clear</button>
  </div>
</kui-calendar-range>
```

### Compact Size

```html
<kui-calendar-range size="sm" [(value)]="selectedRange" />
```

`sm` drops the border and padding, for embedding directly inside a sidebar or panel.

### Width

Fixed width (`296px` by default), overridable with `--kui-calendar-width`, same as `kui-calendar`. See [Calendar > Width](./calendar.md#width).

### Flat (No Own Chrome)

```html
<kui-calendar-range flat [(value)]="selectedRange" />
```

Strips the calendar's own background/border/padding. Use this when nesting it inside chrome that already draws those (a `kui-dropdown`/`kui-popover` panel) so the two don't stack into a double frame.

### Controlling The Displayed Month

```html
<kui-calendar-range [(value)]="selectedRange" [(viewDate)]="viewDate" />
```

`viewDate` (a first-of-month `Date`, two-way) drives which month the grid shows. Left unbound, it defaults to today's month, or the bound `value.start`'s month at construction time.

`showPrevNav`/`showNextNav` (`boolean`, default `true`) hide the previous/next nav button — for pairing two linked calendars a month apart (one showing month N with only "previous", the other month N+1 with only "next"); not yet wired up as a built-in range popover, but available for custom layouts.

### Locale

Same `Intl`-driven locale resolution as `kui-calendar` — see [Calendar > Locale](./calendar.md#locale).

## Examples

Rendered at /components/calendar-range:

### basic-calendar-range-example

#### basic-calendar-range-example.html

```html
<div class="calendar-range-example">
  <kui-calendar-range [(value)]="range" [(viewDate)]="viewDate" showFooter />

  <kui-calendar-range size="sm" flat [(value)]="range" [(viewDate)]="viewDate" />
</div>
```

#### basic-calendar-range-example.ts

```ts
import { Component, signal } from '@angular/core';

import { KuiCalendarRange, type KuiDateRange } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-calendar-range-example',
  imports: [KuiCalendarRange],
  templateUrl: './basic-calendar-range-example.html',
  styleUrl: './basic-calendar-range-example.scss',
})
export class BasicCalendarRangeExample {
  protected readonly viewDate = signal(new Date(2026, 6, 1));
  protected readonly range = signal<KuiDateRange | null>({
    start: new Date(2026, 6, 6),
    end: new Date(2026, 6, 14),
  });
}
```

#### basic-calendar-range-example.scss

```scss
.calendar-range-example {
  display: flex;
  flex-wrap: wrap;
  gap: var(--kui-space-4);
  align-items: flex-start;
}
```

### calendar-range-states-example

#### calendar-range-states-example.html

```html
<div class="calendar-range-example">
  <kui-calendar-range
    [(value)]="range"
    [(viewDate)]="viewDate"
    [minDate]="minDate"
    [maxDate]="maxDate"
    [disabledDates]="holidays"
  />

  <kui-calendar-range
    [(value)]="range"
    [(viewDate)]="viewDate"
    [disabledDates]="isWeekend"
    [showWeekend]="false"
  />
</div>
```

#### calendar-range-states-example.ts

```ts
import { Component, signal } from '@angular/core';

import { KuiCalendarRange, type KuiDateRange } from '@kikita-labs/ui';

@Component({
  selector: 'app-calendar-range-states-example',
  imports: [KuiCalendarRange],
  templateUrl: './calendar-range-states-example.html',
  styleUrl: './calendar-range-states-example.scss',
})
export class CalendarRangeStatesExample {
  protected readonly viewDate = signal(new Date(2026, 6, 1));
  protected readonly range = signal<KuiDateRange | null>(null);
  protected readonly minDate = new Date(2026, 6, 6);
  protected readonly maxDate = new Date(2026, 6, 24);
  protected readonly holidays = [new Date(2026, 6, 15), new Date(2026, 6, 20)];

  protected readonly isWeekend = (date: Date): boolean =>
    date.getDay() === 0 || date.getDay() === 6;
}
```

#### calendar-range-states-example.scss

```scss
.calendar-range-example {
  display: flex;
  flex-wrap: wrap;
  gap: var(--kui-space-4);
  align-items: flex-start;
}
```

### calendar-range-linked-example

#### calendar-range-linked-example.html

```html
<div class="calendar-range-example">
  <kui-calendar-range [(value)]="range" [(viewDate)]="leftView" [showNextNav]="false" />

  <kui-calendar-range
    [(value)]="range"
    [viewDate]="rightView()"
    (viewDateChange)="showFromRight($event)"
    [showPrevNav]="false"
  />
</div>
```

#### calendar-range-linked-example.ts

```ts
import { Component, computed, signal } from '@angular/core';

import { KuiCalendarRange, type KuiDateRange } from '@kikita-labs/ui';

@Component({
  selector: 'app-calendar-range-linked-example',
  imports: [KuiCalendarRange],
  templateUrl: './calendar-range-linked-example.html',
  styleUrl: './calendar-range-linked-example.scss',
})
export class CalendarRangeLinkedExample {
  protected readonly range = signal<KuiDateRange | null>(null);
  protected readonly leftView = signal(new Date(2026, 6, 1));
  protected readonly rightView = computed(
    () => new Date(this.leftView().getFullYear(), this.leftView().getMonth() + 1, 1),
  );

  protected showFromRight(view: Date): void {
    this.leftView.set(new Date(view.getFullYear(), view.getMonth() - 1, 1));
  }
}
```

#### calendar-range-linked-example.scss

```scss
.calendar-range-example {
  display: flex;
  flex-wrap: wrap;
  gap: var(--kui-space-4);
  align-items: flex-start;
}
```

### calendar-range-locale-example

#### calendar-range-locale-example.html

```html
<div class="calendar-range-example">
  <kui-calendar-range locale="ja-JP" size="sm" [(value)]="range" [(viewDate)]="viewDate" />

  <kui-calendar-range
    locale="de-DE"
    size="sm"
    showFooter
    [messages]="messages"
    [(value)]="range"
    [(viewDate)]="viewDate"
  />
</div>
```

#### calendar-range-locale-example.ts

```ts
import { Component, signal } from '@angular/core';

import { type KuiCalendarMessages, KuiCalendarRange, type KuiDateRange } from '@kikita-labs/ui';

@Component({
  selector: 'app-calendar-range-locale-example',
  imports: [KuiCalendarRange],
  templateUrl: './calendar-range-locale-example.html',
  styleUrl: './calendar-range-locale-example.scss',
})
export class CalendarRangeLocaleExample {
  protected readonly viewDate = signal(new Date(2026, 9, 1));
  protected readonly range = signal<KuiDateRange | null>({
    start: new Date(2026, 9, 5),
    end: new Date(2026, 9, 9),
  });
  protected readonly messages: Partial<KuiCalendarMessages> = {
    label: 'Booking range',
    today: 'Jump to today',
  };
}
```

#### calendar-range-locale-example.scss

```scss
.calendar-range-example {
  display: flex;
  flex-wrap: wrap;
  gap: var(--kui-space-4);
  align-items: flex-start;
}
```

### calendar-range-footer-example

#### calendar-range-footer-example.html

```html
<kui-calendar-range [(value)]="range" [(viewDate)]="viewDate">
  <div kuiCalendarFooter class="calendar-range-footer">
    <button kuiButton shape="ghost" size="sm" type="button" (click)="clear()">Clear</button>
  </div>
</kui-calendar-range>
```

#### calendar-range-footer-example.ts

```ts
import { Component, signal } from '@angular/core';

import { KuiButton, KuiCalendarRange, type KuiDateRange } from '@kikita-labs/ui';

@Component({
  selector: 'app-calendar-range-footer-example',
  imports: [KuiButton, KuiCalendarRange],
  templateUrl: './calendar-range-footer-example.html',
  styleUrl: './calendar-range-footer-example.scss',
})
export class CalendarRangeFooterExample {
  protected readonly viewDate = signal(new Date(2026, 6, 1));
  protected readonly range = signal<KuiDateRange | null>({
    start: new Date(2026, 6, 6),
    end: new Date(2026, 6, 10),
  });

  protected clear(): void {
    this.range.set(null);
  }
}
```

#### calendar-range-footer-example.scss

```scss
.calendar-range-footer {
  display: flex;
  justify-content: flex-end;
}
```

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [(value)] | KuiDateRange \| null | null | Selected range, { start: Date; end: Date \| null }. end is null while only the start has been picked; the first click after a committed range starts a new one. |
| [(viewDate)] | Date | current month | First-of-month date that controls the visible month. Left unbound it defaults to today, or to the month of the bound value.start at construction. |
| size | 'md' \| 'sm' \| undefined | undefined | Calendar density. sm drops the border and padding for sidebars. Falls back to defaults.calendarRange.size, then the global defaults.size, then md. |
| flat | boolean \| undefined | undefined | Strips the calendar background, border and padding, for dropdown or popover panels. Falls back to defaults.calendarRange.flat, then false. |
| showWeekend | boolean \| undefined | undefined | Mutes the weekend days of the locale. Falls back to defaults.calendarRange.showWeekend, then true. |
| showFooter | boolean \| undefined | undefined | Shows the built-in footer with the current value and the Today shortcut. Falls back to defaults.calendarRange.showFooter, then false. |
| showPrevNav / showNextNav | boolean \| undefined | undefined | Hide the previous or next header navigation control, for two linked calendars a month apart. Fall back to defaults.calendarRange, then true. |
| minDate / maxDate | Date \| undefined | undefined | Inclusive lower and upper bounds. Dates outside them are disabled. |
| disabledDates | Date[] \| ((date: Date) => boolean) \| undefined | undefined | Individual disabled dates or a predicate evaluated for each rendered date. |
| locale | string \| undefined | undefined | BCP 47 locale for month and weekday names, heading order, week start and weekend. It overrides the locale of the nearest KuiI18n level for this instance. |
| messages | Partial<KuiCalendarMessages> \| undefined | undefined | Per-instance text overrides, the same group as the calendar. They win over scoped and root messages. |
| [kuiCalendarHeader] / [kuiCalendarFooter] | projected content | - | Replace the default header or footer entirely; the built-in block (and the showFooter toggle) renders only when nothing is projected. |
| --kui-calendar-width | CSS custom property | 296px | Overrides the fixed calendar width, as for kui-calendar. |
| KuiDateRange | interface | - | The value shape: { start: Date; end: Date \| null }. |
| KuiCalendarOptions / KuiCalendarViewOptions | interfaces | - | Shape of defaults.calendarRange (size, flat, showWeekend, showFooter, showPrevNav, showNextNav, previousIcon, nextIcon), shared with kui-calendar. |

## Accessibility

- The day grid is a complete ARIA grid, structured as in `kui-calendar`: `role="grid"`, a weekday header row of `role="columnheader"` cells, and a `role="rowgroup"` of six week `role="row"`s holding seven `role="gridcell"`s, each wrapping one day `<button>`.
- `aria-selected` on the gridcells of the range endpoints (and any single committed day), `aria-current="date"` on today, `aria-disabled` on disabled dates.
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

Available at /components/calendar-range/playground.
