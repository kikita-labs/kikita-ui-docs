import { Component, signal } from '@angular/core';

import {
  KuiCalendarComponent,
  type KuiCalendarMode,
  type KuiCalendarSize,
  type KuiDateRange,
} from '@kikita-labs/ui';

import {
  ApiPlayground,
  definePlaygroundControls,
  type PlaygroundValues,
  serializePlaygroundAttributes,
} from '@shared/docs-ui/api-playground';
import { ApiTable } from '@shared/docs-ui/api-table';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

import { CALENDAR_API_ROWS } from '../calendar.api-schema';
import { CALENDAR_API_DESCRIPTION } from '../calendar.docs-content';

const CALENDAR_PLAYGROUND_CONTROLS = definePlaygroundControls([
  { key: 'mode', label: 'mode', kind: 'enum', options: ['single', 'range'], defaultValue: 'single' },
  { key: 'size', label: 'size', kind: 'enum', options: ['md', 'sm'], defaultValue: 'md' },
  { key: 'showFooter', label: 'show footer', kind: 'boolean', defaultValue: false },
  { key: 'flat', label: 'flat', kind: 'boolean', defaultValue: false },
  { key: 'showWeekend', label: 'show weekend', kind: 'boolean', defaultValue: true },
  { key: 'locale', label: 'locale', kind: 'enum', options: ['en-US', 'en-GB'], defaultValue: 'en-US' },
  { key: 'minDate', label: 'min date', kind: 'boolean', defaultValue: false },
] as const);

type CalendarPlaygroundValues = PlaygroundValues<typeof CALENDAR_PLAYGROUND_CONTROLS>;

@Component({
  selector: 'app-calendar-playground-page',
  imports: [ApiPlayground, ApiTable, KuiCalendarComponent],
  templateUrl: './calendar-playground-page.html',
  styleUrl: './calendar-playground-page.scss',
})
export class CalendarPlaygroundPage {
  protected readonly apiDescription = CALENDAR_API_DESCRIPTION;
  protected readonly apiRows = CALENDAR_API_ROWS;
  protected readonly selectedDate = signal<Date | null>(new Date(2026, 6, 14));
  protected readonly selectedRange = signal<KuiDateRange>({
    start: new Date(2026, 6, 13),
    end: new Date(2026, 6, 17),
  });
  protected readonly minDate = new Date(2026, 6, 1);
  protected readonly playgroundControls = CALENDAR_PLAYGROUND_CONTROLS;

  protected readonly buildPlaygroundSnippet = (
    values: CalendarPlaygroundValues,
  ): readonly CodeTab[] => {
    const attrString = serializePlaygroundAttributes([
      { name: 'mode', value: values.mode, defaultValue: 'single' },
      { name: 'size', value: values.size, defaultValue: 'md' },
      { name: 'showFooter', value: values.showFooter },
      { name: 'flat', value: values.flat },
      { name: '[showWeekend]', value: values.showWeekend ? null : 'false' },
      { name: 'locale', value: values.locale, defaultValue: 'en-US' },
      { name: '[minDate]', value: values.minDate ? 'minDate' : null },
    ]);
    const modelName = values.mode === 'range' ? 'selectedRange' : 'selectedDate';

    return [
      {
        label: 'HTML',
        language: 'html',
        code: `<kui-calendar [(value)]="${modelName}"${attrString} />`,
      },
    ];
  };

  protected modeOf(values: CalendarPlaygroundValues): KuiCalendarMode {
    return values.mode;
  }

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

  protected localeOf(values: CalendarPlaygroundValues): string {
    return values.locale;
  }

  protected minDateOf(values: CalendarPlaygroundValues): Date | undefined {
    return values.minDate ? this.minDate : undefined;
  }
}
