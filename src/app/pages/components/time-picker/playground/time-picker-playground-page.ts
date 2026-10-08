import { Component, signal } from '@angular/core';

import {
  KuiDropdown,
  KuiField,
  KuiTimePicker,
  type KuiTimePickerFormat,
  type KuiTimePickerMessages,
  KuiTimePickerPanel,
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

import { TIME_PICKER_API_ROWS } from '../time-picker.api-schema';
import { TIME_PICKER_API_DESCRIPTION } from '../time-picker.docs-content';
import { TIME_PICKER_PLAYGROUND_MESSAGES } from './constants';

const TIME_PICKER_PLAYGROUND_CONTROLS = definePlaygroundControls([
  { key: 'label', label: 'label', kind: 'string', defaultValue: 'Meeting time' },
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
    options: ['locale', '24h', '12h'],
    defaultValue: 'locale',
  },
  { key: 'hourStep', label: 'hourStep', kind: 'number', defaultValue: 1 },
  { key: 'minuteStep', label: 'minuteStep', kind: 'number', defaultValue: 1 },
  { key: 'secondStep', label: 'secondStep', kind: 'number', defaultValue: 1 },
  PLAYGROUND_MESSAGES_CONTROL,
  { key: 'showSeconds', label: 'showSeconds', kind: 'boolean', defaultValue: false },
  { key: 'clearable', label: 'clearable', kind: 'boolean', defaultValue: true },
  { key: 'disabled', label: 'disabled', kind: 'boolean', defaultValue: false },
  { key: 'readonly', label: 'readonly', kind: 'boolean', defaultValue: false },
  { key: 'invalid', label: 'invalid', kind: 'boolean', defaultValue: false },
  { key: 'limits', label: 'minTime and maxTime', kind: 'boolean', defaultValue: false },
  { key: 'lunch', label: 'disabledHours (lunch)', kind: 'boolean', defaultValue: false },
] as const);

type TimePickerPlaygroundValues = PlaygroundValues<typeof TIME_PICKER_PLAYGROUND_CONTROLS>;

@Component({
  selector: 'app-time-picker-playground-page',
  imports: [
    ApiPlayground,
    ApiTable,
    KuiDropdown,
    KuiField,
    KuiTimePicker,
    KuiTimePickerPanel,
    PlaygroundEventLogView,
  ],
  templateUrl: './time-picker-playground-page.html',
  styleUrl: './time-picker-playground-page.scss',
})
export class TimePickerPlaygroundPage {
  protected readonly apiDescription = TIME_PICKER_API_DESCRIPTION;
  protected readonly apiRows = TIME_PICKER_API_ROWS;
  protected readonly time = signal<Date | null>(new Date(2026, 6, 14, 9, 30));
  protected readonly eventLog = createPlaygroundEventLog();
  protected readonly minTime = new Date(2026, 0, 1, 9, 0);
  protected readonly maxTime = new Date(2026, 0, 1, 18, 0);
  protected readonly lunchHours = (): readonly number[] => [12, 13];
  protected readonly playgroundControls = TIME_PICKER_PLAYGROUND_CONTROLS;

  protected readonly buildPlaygroundSnippet = (
    values: TimePickerPlaygroundValues,
  ): readonly CodeTab[] => {
    const attrString = serializePlaygroundAttributes([
      { name: 'placeholder', value: values.placeholder || null },
      { name: 'format', value: values.format === 'locale' ? null : values.format },
      playgroundBinding('hourStep', values.hourStep === 1 ? null : String(values.hourStep)),
      playgroundBinding('minuteStep', values.minuteStep === 1 ? null : String(values.minuteStep)),
      playgroundBinding('secondStep', values.secondStep === 1 ? null : String(values.secondStep)),
      playgroundBinding('showSeconds', values.showSeconds ? 'true' : null),
      playgroundBinding('messages', values.messages === 'custom' ? 'messages' : null),
      playgroundBinding('clearable', values.clearable ? null : 'false'),
      { name: 'disabled', value: values.disabled },
      { name: 'readonly', value: values.readonly },
      { name: 'invalid', value: values.invalid },
      playgroundBinding('minTime', values.limits ? 'minTime' : null),
      playgroundBinding('maxTime', values.limits ? 'maxTime' : null),
      playgroundBinding('disabledHours', values.lunch ? 'lunchHours' : null),
    ]);

    return [
      {
        label: 'HTML',
        language: 'html',
        code: `<kui-field label="${values.label.replaceAll('"', '&quot;')}">
  <input kuiTimePicker [(value)]="time"${attrString} />
  <kui-dropdown panelRole="dialog" panelWidth="auto" maxHeight="280px">
    <kui-time-picker-panel />
  </kui-dropdown>
</kui-field>`,
      },
    ];
  };

  protected labelOf(values: TimePickerPlaygroundValues): string {
    return values.label;
  }

  protected placeholderOf(values: TimePickerPlaygroundValues): string | undefined {
    return values.placeholder || undefined;
  }

  protected formatOf(values: TimePickerPlaygroundValues): KuiTimePickerFormat | undefined {
    return values.format === 'locale' ? undefined : values.format;
  }

  protected hourStepOf(values: TimePickerPlaygroundValues): number {
    return values.hourStep;
  }

  protected minuteStepOf(values: TimePickerPlaygroundValues): number {
    return values.minuteStep;
  }

  protected secondStepOf(values: TimePickerPlaygroundValues): number {
    return values.secondStep;
  }

  protected showSecondsOf(values: TimePickerPlaygroundValues): boolean {
    return values.showSeconds;
  }

  protected messagesOf(
    values: TimePickerPlaygroundValues,
  ): Partial<KuiTimePickerMessages> | undefined {
    return values.messages === 'custom' ? TIME_PICKER_PLAYGROUND_MESSAGES : undefined;
  }

  protected clearableOf(values: TimePickerPlaygroundValues): boolean {
    return values.clearable;
  }

  protected disabledOf(values: TimePickerPlaygroundValues): boolean {
    return values.disabled;
  }

  protected readonlyOf(values: TimePickerPlaygroundValues): boolean {
    return values.readonly;
  }

  protected invalidOf(values: TimePickerPlaygroundValues): boolean {
    return values.invalid;
  }

  protected minTimeOf(values: TimePickerPlaygroundValues): Date | undefined {
    return values.limits ? this.minTime : undefined;
  }

  protected maxTimeOf(values: TimePickerPlaygroundValues): Date | undefined {
    return values.limits ? this.maxTime : undefined;
  }

  protected disabledHoursOf(
    values: TimePickerPlaygroundValues,
  ): (() => readonly number[]) | undefined {
    return values.lunch ? this.lunchHours : undefined;
  }

  protected onValueChange(value: Date | null): void {
    this.time.set(value);
    this.eventLog.log('valueChange', value ? value.toLocaleTimeString('en-GB') : 'null');
  }
}
