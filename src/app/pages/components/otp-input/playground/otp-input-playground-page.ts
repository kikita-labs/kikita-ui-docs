import { Component, signal } from '@angular/core';

import { KuiOtpInput, type KuiSize } from '@kikita-labs/ui';

import {
  ApiPlayground,
  createPlaygroundEventLog,
  definePlaygroundControls,
  playgroundBinding,
  playgroundEvent,
  PlaygroundEventLogView,
  type PlaygroundValues,
  serializePlaygroundAttributes,
} from '@shared/docs-ui/api-playground';
import { ApiTable } from '@shared/docs-ui/api-table';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

import { OTP_INPUT_API_ROWS } from '../otp-input.api-schema';
import { OTP_INPUT_API_DESCRIPTION } from '../otp-input.docs-content';

const OTP_INPUT_PLAYGROUND_CONTROLS = definePlaygroundControls([
  { key: 'length', label: 'length', kind: 'number', defaultValue: 6 },
  {
    key: 'size',
    label: 'size',
    kind: 'enum',
    options: ['xs', 'sm', 'md', 'lg'],
    defaultValue: 'md',
  },
  { key: 'ariaLabel', label: 'ariaLabel', kind: 'string', defaultValue: '' },
  { key: 'mask', label: 'mask', kind: 'boolean', defaultValue: false },
  { key: 'integerOnly', label: 'integerOnly', kind: 'boolean', defaultValue: true },
  { key: 'autoFocus', label: 'autoFocus', kind: 'boolean', defaultValue: false },
  { key: 'disabled', label: 'disabled', kind: 'boolean', defaultValue: false },
  { key: 'readonly', label: 'readonly', kind: 'boolean', defaultValue: false },
  { key: 'required', label: 'required', kind: 'boolean', defaultValue: false },
  { key: 'loading', label: 'loading', kind: 'boolean', defaultValue: false },
  { key: 'invalid', label: 'invalid', kind: 'boolean', defaultValue: false },
] as const);

type OtpInputPlaygroundValues = PlaygroundValues<typeof OTP_INPUT_PLAYGROUND_CONTROLS>;

@Component({
  selector: 'app-otp-input-playground-page',
  imports: [ApiPlayground, ApiTable, KuiOtpInput, PlaygroundEventLogView],
  templateUrl: './otp-input-playground-page.html',
  styleUrl: './otp-input-playground-page.scss',
})
export class OtpInputPlaygroundPage {
  protected readonly apiDescription = OTP_INPUT_API_DESCRIPTION;
  protected readonly apiRows = OTP_INPUT_API_ROWS;
  protected readonly code = signal('');
  protected readonly eventLog = createPlaygroundEventLog();
  protected readonly playgroundControls = OTP_INPUT_PLAYGROUND_CONTROLS;

  protected readonly buildPlaygroundSnippet = (
    values: OtpInputPlaygroundValues,
  ): readonly CodeTab[] => {
    const attrString = serializePlaygroundAttributes([
      playgroundBinding('length', values.length === 6 ? null : String(values.length)),
      { name: 'size', value: values.size, defaultValue: 'md' },
      { name: 'ariaLabel', value: values.ariaLabel || null },
      { name: 'mask', value: values.mask },
      playgroundBinding('integerOnly', values.integerOnly ? null : 'false'),
      { name: 'autoFocus', value: values.autoFocus },
      { name: 'disabled', value: values.disabled },
      { name: 'readonly', value: values.readonly },
      { name: 'required', value: values.required },
      { name: 'loading', value: values.loading },
      { name: 'invalid', value: values.invalid },
      playgroundEvent('complete', 'verify($event)'),
    ]);

    return [
      { label: 'HTML', language: 'html', code: `<kui-otp-input [(value)]="code"${attrString} />` },
    ];
  };

  protected lengthOf(values: OtpInputPlaygroundValues): number {
    return Math.max(1, Math.round(values.length));
  }

  protected sizeOf(values: OtpInputPlaygroundValues): KuiSize {
    return values.size;
  }

  protected ariaLabelOf(values: OtpInputPlaygroundValues): string | undefined {
    return values.ariaLabel || undefined;
  }

  protected maskOf(values: OtpInputPlaygroundValues): boolean {
    return values.mask;
  }

  protected integerOnlyOf(values: OtpInputPlaygroundValues): boolean {
    return values.integerOnly;
  }

  protected autoFocusOf(values: OtpInputPlaygroundValues): boolean {
    return values.autoFocus;
  }

  protected disabledOf(values: OtpInputPlaygroundValues): boolean {
    return values.disabled;
  }

  protected readonlyOf(values: OtpInputPlaygroundValues): boolean {
    return values.readonly;
  }

  protected requiredOf(values: OtpInputPlaygroundValues): boolean {
    return values.required;
  }

  protected loadingOf(values: OtpInputPlaygroundValues): boolean {
    return values.loading;
  }

  protected invalidOf(values: OtpInputPlaygroundValues): boolean {
    return values.invalid;
  }

  protected onValueChange(value: string): void {
    this.code.set(value);
    this.eventLog.log('valueChange', value);
  }

  protected onComplete(value: string): void {
    this.eventLog.log('complete', value);
  }

  protected onTouch(): void {
    this.eventLog.log('touch', '');
  }
}
