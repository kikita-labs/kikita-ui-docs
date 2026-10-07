import { Component, signal } from '@angular/core';

import {
  KuiCalendar,
  KuiDatePicker,
  type KuiDatePickerMessages,
  KuiDropdown,
  KuiField,
} from '@kikita-labs/ui';

import {
  ApiPlayground,
  createPlaygroundEventLog,
  definePlaygroundControls,
  PLAYGROUND_MESSAGES_CONTROL,
  playgroundBinding,
  PlaygroundEventLogView,
  type PlaygroundValues,
  serializePlaygroundAttributes,
} from '@shared/docs-ui/api-playground';
import { ApiTable } from '@shared/docs-ui/api-table';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

import { DATE_PICKER_API_ROWS } from '../date-picker.api-schema';
import { DATE_PICKER_API_DESCRIPTION } from '../date-picker.docs-content';
import { DATE_PICKER_PLAYGROUND_MESSAGES } from './constants';

const DATE_PICKER_PLAYGROUND_CONTROLS = definePlaygroundControls([
  { key: 'label', label: 'label', kind: 'string', defaultValue: 'Meeting date' },
  {
    key: 'placeholder',
    label: 'placeholder (empty = locale layout)',
    kind: 'string',
    defaultValue: '',
  },
  {
    key: 'format',
    label: 'format',
    kind: 'enum',
    options: ['locale', 'dd.MM.yyyy', 'yyyy/MM/dd', 'd.M.yyyy'],
    defaultValue: 'locale',
  },
  PLAYGROUND_MESSAGES_CONTROL,
  { key: 'clearable', label: 'clearable', kind: 'boolean', defaultValue: true },
  { key: 'disabled', label: 'disabled', kind: 'boolean', defaultValue: false },
  { key: 'readonly', label: 'readonly', kind: 'boolean', defaultValue: false },
  { key: 'invalid', label: 'invalid', kind: 'boolean', defaultValue: false },
  { key: 'minDate', label: 'min date', kind: 'boolean', defaultValue: false },
  { key: 'maxDate', label: 'max date', kind: 'boolean', defaultValue: false },
  { key: 'showFooter', label: 'calendar footer', kind: 'boolean', defaultValue: true },
] as const);

type DatePickerPlaygroundValues = PlaygroundValues<typeof DATE_PICKER_PLAYGROUND_CONTROLS>;

@Component({
  selector: 'app-date-picker-playground-page',
  imports: [
    ApiPlayground,
    ApiTable,
    KuiCalendar,
    KuiDatePicker,
    KuiDropdown,
    KuiField,
    PlaygroundEventLogView,
  ],
  templateUrl: './date-picker-playground-page.html',
  styleUrl: './date-picker-playground-page.scss',
})
export class DatePickerPlaygroundPage {
  protected readonly apiDescription = DATE_PICKER_API_DESCRIPTION;
  protected readonly apiRows = DATE_PICKER_API_ROWS;
  protected readonly date = signal<Date | null>(new Date(2026, 6, 14));
  protected readonly eventLog = createPlaygroundEventLog();
  protected readonly minDate = new Date(2026, 6, 6);
  protected readonly maxDate = new Date(2026, 6, 24);
  protected readonly playgroundControls = DATE_PICKER_PLAYGROUND_CONTROLS;

  protected readonly buildPlaygroundSnippet = (
    values: DatePickerPlaygroundValues,
  ): readonly CodeTab[] => {
    const inputAttrs = serializePlaygroundAttributes([
      { name: 'placeholder', value: values.placeholder || null },
      { name: 'format', value: values.format, defaultValue: 'locale' },
      playgroundBinding('messages', values.messages === 'custom' ? 'messages' : null),
      { name: '[clearable]', value: values.clearable ? null : 'false' },
      { name: 'disabled', value: values.disabled },
      { name: 'readonly', value: values.readonly },
      { name: 'invalid', value: values.invalid },
      playgroundBinding('minDate', values.minDate ? 'minDate' : null),
      playgroundBinding('maxDate', values.maxDate ? 'maxDate' : null),
    ]);
    const calendarAttrs = serializePlaygroundAttributes([
      { name: 'showFooter', value: values.showFooter },
    ]);

    return [
      {
        label: 'HTML',
        language: 'html',
        code: `<kui-field label="${values.label}">
  <input kuiDatePicker [(value)]="date"${inputAttrs} />
  <kui-dropdown panelRole="dialog" panelWidth="auto" maxHeight="420px">
    <kui-calendar flat${calendarAttrs} />
  </kui-dropdown>
</kui-field>`,
      },
    ];
  };

  protected labelOf(values: DatePickerPlaygroundValues): string {
    return values.label;
  }

  protected placeholderOf(values: DatePickerPlaygroundValues): string | undefined {
    return values.placeholder || undefined;
  }

  protected formatOf(values: DatePickerPlaygroundValues): string | undefined {
    return values.format === 'locale' ? undefined : values.format;
  }

  protected messagesOf(
    values: DatePickerPlaygroundValues,
  ): Partial<KuiDatePickerMessages> | undefined {
    return values.messages === 'custom' ? DATE_PICKER_PLAYGROUND_MESSAGES : undefined;
  }

  protected maxDateOf(values: DatePickerPlaygroundValues): Date | undefined {
    return values.maxDate ? this.maxDate : undefined;
  }

  protected onValueChange(value: Date | null): void {
    this.date.set(value);
    this.eventLog.log('valueChange', value);
  }

  protected clearableOf(values: DatePickerPlaygroundValues): boolean {
    return values.clearable;
  }

  protected disabledOf(values: DatePickerPlaygroundValues): boolean {
    return values.disabled;
  }

  protected readonlyOf(values: DatePickerPlaygroundValues): boolean {
    return values.readonly;
  }

  protected invalidOf(values: DatePickerPlaygroundValues): boolean {
    return values.invalid;
  }

  protected minDateOf(values: DatePickerPlaygroundValues): Date | undefined {
    return values.minDate ? this.minDate : undefined;
  }

  protected showFooterOf(values: DatePickerPlaygroundValues): boolean {
    return values.showFooter;
  }
}
