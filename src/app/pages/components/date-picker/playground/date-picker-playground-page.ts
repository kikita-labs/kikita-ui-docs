import { Component, signal } from '@angular/core';

import {
  KuiCalendarComponent,
  KuiDatePickerDirective,
  KuiDropdownComponent,
  KuiFieldComponent,
} from '@kikita-labs/ui';

import {
  ApiPlayground,
  definePlaygroundControls,
  type PlaygroundValues,
  serializePlaygroundAttributes,
} from '@shared/docs-ui/api-playground';
import { ApiTable } from '@shared/docs-ui/api-table';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

import { DATE_PICKER_API_ROWS } from '../date-picker.api-schema';
import { DATE_PICKER_API_DESCRIPTION } from '../date-picker.docs-content';

const DATE_PICKER_PLAYGROUND_CONTROLS = definePlaygroundControls([
  { key: 'label', label: 'label', kind: 'string', defaultValue: 'Meeting date' },
  { key: 'placeholder', label: 'placeholder', kind: 'string', defaultValue: 'dd.mm.yyyy' },
  { key: 'clearable', label: 'clearable', kind: 'boolean', defaultValue: true },
  { key: 'disabled', label: 'disabled', kind: 'boolean', defaultValue: false },
  { key: 'readonly', label: 'readonly', kind: 'boolean', defaultValue: false },
  { key: 'invalid', label: 'invalid', kind: 'boolean', defaultValue: false },
  { key: 'minDate', label: 'min date', kind: 'boolean', defaultValue: false },
  { key: 'showFooter', label: 'calendar footer', kind: 'boolean', defaultValue: true },
] as const);

type DatePickerPlaygroundValues = PlaygroundValues<typeof DATE_PICKER_PLAYGROUND_CONTROLS>;

@Component({
  selector: 'app-date-picker-playground-page',
  imports: [
    ApiPlayground,
    ApiTable,
    KuiCalendarComponent,
    KuiDatePickerDirective,
    KuiDropdownComponent,
    KuiFieldComponent,
  ],
  templateUrl: './date-picker-playground-page.html',
  styleUrl: './date-picker-playground-page.scss',
})
export class DatePickerPlaygroundPage {
  protected readonly apiDescription = DATE_PICKER_API_DESCRIPTION;
  protected readonly apiRows = DATE_PICKER_API_ROWS;
  protected readonly date = signal<Date | null>(new Date(2026, 6, 14));
  protected readonly viewDate = signal(new Date(2026, 6, 1));
  protected readonly minDate = new Date(2026, 6, 1);
  protected readonly playgroundControls = DATE_PICKER_PLAYGROUND_CONTROLS;

  protected readonly buildPlaygroundSnippet = (
    values: DatePickerPlaygroundValues,
  ): readonly CodeTab[] => {
    const inputAttrs = serializePlaygroundAttributes([
      { name: 'placeholder', value: values.placeholder, defaultValue: 'dd.mm.yyyy' },
      { name: '[clearable]', value: values.clearable ? null : 'false' },
      { name: 'disabled', value: values.disabled },
      { name: 'readonly', value: values.readonly },
      { name: 'invalid', value: values.invalid },
      { name: '[minDate]', value: values.minDate ? 'minDate' : null },
    ]);
    const calendarAttrs = serializePlaygroundAttributes([
      { name: 'showFooter', value: values.showFooter },
      { name: '[minDate]', value: values.minDate ? 'minDate' : null },
    ]);

    return [
      {
        label: 'HTML',
        language: 'html',
        code: `<kui-field label="${values.label}">
  <input kuiDatePicker [(value)]="date" [(viewDate)]="viewDate"${inputAttrs} />
  <kui-dropdown panelRole="dialog" panelWidth="content" maxHeight="420px">
    <kui-calendar flat [(value)]="date" [(viewDate)]="viewDate"${calendarAttrs} />
  </kui-dropdown>
</kui-field>`,
      },
    ];
  };

  protected labelOf(values: DatePickerPlaygroundValues): string {
    return values.label;
  }

  protected placeholderOf(values: DatePickerPlaygroundValues): string {
    return values.placeholder;
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
