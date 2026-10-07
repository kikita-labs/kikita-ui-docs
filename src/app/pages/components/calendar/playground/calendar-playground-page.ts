import { Component, signal } from '@angular/core';

import { KuiCalendar, type KuiCalendarMessages, type KuiCalendarSize } from '@kikita-labs/ui';

import {
  ApiPlayground,
  createPlaygroundEventLog,
  definePlaygroundControls,
  PLAYGROUND_LOCALE_CONTROL,
  PLAYGROUND_MESSAGES_CONTROL,
  playgroundBinding,
  PlaygroundEventLogView,
  type PlaygroundValues,
  serializePlaygroundAttributes,
} from '@shared/docs-ui/api-playground';
import { ApiTable } from '@shared/docs-ui/api-table';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

import { CALENDAR_API_ROWS } from '../calendar.api-schema';
import { CALENDAR_API_DESCRIPTION } from '../calendar.docs-content';
import { CALENDAR_PLAYGROUND_MESSAGES } from './constants';

const CALENDAR_PLAYGROUND_CONTROLS = definePlaygroundControls([
  { key: 'size', label: 'size', kind: 'enum', options: ['md', 'sm'], defaultValue: 'md' },
  PLAYGROUND_LOCALE_CONTROL,
  PLAYGROUND_MESSAGES_CONTROL,
  {
    key: 'disabledDates',
    label: 'disabled dates',
    kind: 'enum',
    options: ['none', 'weekends', 'holidays'],
    defaultValue: 'none',
  },
  { key: 'showFooter', label: 'show footer', kind: 'boolean', defaultValue: false },
  { key: 'flat', label: 'flat', kind: 'boolean', defaultValue: false },
  { key: 'showWeekend', label: 'show weekend', kind: 'boolean', defaultValue: true },
  { key: 'showPrevNav', label: 'show previous', kind: 'boolean', defaultValue: true },
  { key: 'showNextNav', label: 'show next', kind: 'boolean', defaultValue: true },
  { key: 'minDate', label: 'min date', kind: 'boolean', defaultValue: false },
  { key: 'maxDate', label: 'max date', kind: 'boolean', defaultValue: false },
] as const);

type CalendarPlaygroundValues = PlaygroundValues<typeof CALENDAR_PLAYGROUND_CONTROLS>;

@Component({
  selector: 'app-calendar-playground-page',
  imports: [ApiPlayground, ApiTable, KuiCalendar, PlaygroundEventLogView],
  templateUrl: './calendar-playground-page.html',
  styleUrl: './calendar-playground-page.scss',
})
export class CalendarPlaygroundPage {
  protected readonly apiDescription = CALENDAR_API_DESCRIPTION;
  protected readonly apiRows = CALENDAR_API_ROWS;
  protected readonly selectedDate = signal<Date | null>(new Date(2026, 6, 14));
  protected readonly eventLog = createPlaygroundEventLog();
  protected readonly minDate = new Date(2026, 6, 6);
  protected readonly maxDate = new Date(2026, 6, 24);
  protected readonly holidays = [new Date(2026, 6, 15), new Date(2026, 6, 20)];
  protected readonly playgroundControls = CALENDAR_PLAYGROUND_CONTROLS;

  protected readonly isWeekend = (date: Date): boolean =>
    date.getDay() === 0 || date.getDay() === 6;

  protected readonly buildPlaygroundSnippet = (
    values: CalendarPlaygroundValues,
  ): readonly CodeTab[] => {
    const attrString = serializePlaygroundAttributes([
      { name: 'size', value: values.size, defaultValue: 'md' },
      { name: 'showFooter', value: values.showFooter },
      { name: 'flat', value: values.flat },
      playgroundBinding('showWeekend', values.showWeekend ? null : 'false'),
      playgroundBinding('showPrevNav', values.showPrevNav ? null : 'false'),
      playgroundBinding('showNextNav', values.showNextNav ? null : 'false'),
      { name: 'locale', value: values.locale, defaultValue: 'en-US' },
      playgroundBinding('messages', values.messages === 'custom' ? 'messages' : null),
      playgroundBinding('minDate', values.minDate ? 'minDate' : null),
      playgroundBinding('maxDate', values.maxDate ? 'maxDate' : null),
      playgroundBinding(
        'disabledDates',
        values.disabledDates === 'weekends'
          ? 'isWeekend'
          : values.disabledDates === 'holidays'
            ? 'holidays'
            : null,
      ),
    ]);

    return [
      {
        label: 'HTML',
        language: 'html',
        code: `<kui-calendar [(value)]="selectedDate"${attrString} />`,
      },
    ];
  };

  protected sizeOf(values: CalendarPlaygroundValues): KuiCalendarSize {
    return values.size;
  }

  protected showFooterOf(values: CalendarPlaygroundValues): boolean {
    return values.showFooter;
  }

  protected flatOf(values: CalendarPlaygroundValues): boolean {
    return values.flat;
  }

  protected showWeekendOf(values: CalendarPlaygroundValues): boolean {
    return values.showWeekend;
  }

  protected showPrevNavOf(values: CalendarPlaygroundValues): boolean {
    return values.showPrevNav;
  }

  protected showNextNavOf(values: CalendarPlaygroundValues): boolean {
    return values.showNextNav;
  }

  protected localeOf(values: CalendarPlaygroundValues): string {
    return values.locale;
  }

  protected messagesOf(values: CalendarPlaygroundValues): Partial<KuiCalendarMessages> | undefined {
    return values.messages === 'custom' ? CALENDAR_PLAYGROUND_MESSAGES : undefined;
  }

  protected minDateOf(values: CalendarPlaygroundValues): Date | undefined {
    return values.minDate ? this.minDate : undefined;
  }

  protected maxDateOf(values: CalendarPlaygroundValues): Date | undefined {
    return values.maxDate ? this.maxDate : undefined;
  }

  protected disabledDatesOf(
    values: CalendarPlaygroundValues,
  ): Date[] | ((date: Date) => boolean) | undefined {
    switch (values.disabledDates) {
      case 'weekends':
        return this.isWeekend;
      case 'holidays':
        return this.holidays;
      default:
        return undefined;
    }
  }

  protected onValueChange(value: Date | null): void {
    this.selectedDate.set(value);
    this.eventLog.log('valueChange', value);
  }

  protected onViewDateChange(viewDate: Date): void {
    this.eventLog.log('viewDateChange', viewDate);
  }
}
