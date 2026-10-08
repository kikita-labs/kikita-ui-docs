import { Component, signal } from '@angular/core';

import {
  type KuiCalendarMessages,
  KuiCalendarRange,
  type KuiCalendarSize,
  type KuiDateRange,
} from '@kikita-labs/ui';

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

import { CALENDAR_RANGE_API_ROWS } from '../calendar-range.api-schema';
import { CALENDAR_RANGE_API_DESCRIPTION } from '../calendar-range.docs-content';
import { CALENDAR_RANGE_PLAYGROUND_MESSAGES } from './constants';

const CALENDAR_RANGE_PLAYGROUND_CONTROLS = definePlaygroundControls([
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

type CalendarRangePlaygroundValues = PlaygroundValues<typeof CALENDAR_RANGE_PLAYGROUND_CONTROLS>;

@Component({
  selector: 'app-calendar-range-playground-page',
  imports: [ApiPlayground, ApiTable, KuiCalendarRange, PlaygroundEventLogView],
  templateUrl: './calendar-range-playground-page.html',
  styleUrl: './calendar-range-playground-page.scss',
})
export class CalendarRangePlaygroundPage {
  protected readonly apiDescription = CALENDAR_RANGE_API_DESCRIPTION;
  protected readonly apiRows = CALENDAR_RANGE_API_ROWS;
  protected readonly range = signal<KuiDateRange | null>({
    start: new Date(2026, 6, 8),
    end: new Date(2026, 6, 14),
  });
  protected readonly viewDate = signal(new Date(2026, 6, 1));
  protected readonly eventLog = createPlaygroundEventLog();
  protected readonly minDate = new Date(2026, 6, 6);
  protected readonly maxDate = new Date(2026, 6, 24);
  protected readonly holidays = [new Date(2026, 6, 15), new Date(2026, 6, 20)];
  protected readonly playgroundControls = CALENDAR_RANGE_PLAYGROUND_CONTROLS;

  protected readonly isWeekend = (date: Date): boolean =>
    date.getDay() === 0 || date.getDay() === 6;

  protected readonly buildPlaygroundSnippet = (
    values: CalendarRangePlaygroundValues,
  ): readonly CodeTab[] => {
    const attrString = serializePlaygroundAttributes([
      { name: 'size', value: values.size, defaultValue: 'md' },
      { name: 'showFooter', value: values.showFooter },
      { name: 'flat', value: values.flat },
      playgroundBinding('viewDate', 'viewDate'),
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
        code: `<kui-calendar-range [(value)]="range"${attrString} />`,
      },
    ];
  };

  protected sizeOf(values: CalendarRangePlaygroundValues): KuiCalendarSize {
    return values.size;
  }

  protected showFooterOf(values: CalendarRangePlaygroundValues): boolean {
    return values.showFooter;
  }

  protected flatOf(values: CalendarRangePlaygroundValues): boolean {
    return values.flat;
  }

  protected showWeekendOf(values: CalendarRangePlaygroundValues): boolean {
    return values.showWeekend;
  }

  protected showPrevNavOf(values: CalendarRangePlaygroundValues): boolean {
    return values.showPrevNav;
  }

  protected showNextNavOf(values: CalendarRangePlaygroundValues): boolean {
    return values.showNextNav;
  }

  protected localeOf(values: CalendarRangePlaygroundValues): string {
    return values.locale;
  }

  protected messagesOf(
    values: CalendarRangePlaygroundValues,
  ): Partial<KuiCalendarMessages> | undefined {
    return values.messages === 'custom' ? CALENDAR_RANGE_PLAYGROUND_MESSAGES : undefined;
  }

  protected minDateOf(values: CalendarRangePlaygroundValues): Date | undefined {
    return values.minDate ? this.minDate : undefined;
  }

  protected maxDateOf(values: CalendarRangePlaygroundValues): Date | undefined {
    return values.maxDate ? this.maxDate : undefined;
  }

  protected disabledDatesOf(
    values: CalendarRangePlaygroundValues,
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

  protected onValueChange(value: KuiDateRange | null): void {
    this.range.set(value);
    this.eventLog.log(
      'valueChange',
      value ? `${value.start.toDateString()} - ${value.end?.toDateString() ?? 'open'}` : 'null',
    );
  }

  protected onViewDateChange(viewDate: Date): void {
    this.viewDate.set(viewDate);
    this.eventLog.log('viewDateChange', viewDate);
  }
}
