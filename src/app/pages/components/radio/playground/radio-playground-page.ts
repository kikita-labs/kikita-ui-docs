import { Component } from '@angular/core';

import { KuiFieldComponent, KuiRadioDirective, type KuiSize } from '@kikita-labs/ui';

import { ApiPlayground } from '@shared/docs-ui/api-playground';
import {
  definePlaygroundControls,
  escapePlaygroundHtml,
  type PlaygroundValues,
  serializePlaygroundAttributes,
} from '@shared/docs-ui/api-playground';
import { ApiTable } from '@shared/docs-ui/api-table';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

import { RADIO_API_ROWS } from '../radio.api-schema';
import { RADIO_API_DESCRIPTION } from '../radio.docs-content';

const RADIO_PLAYGROUND_CONTROLS = definePlaygroundControls([
  { key: 'label', label: 'group label', kind: 'string', defaultValue: 'Plan' },
  { key: 'firstOption', label: 'first option', kind: 'string', defaultValue: 'Starter' },
  { key: 'secondOption', label: 'second option', kind: 'string', defaultValue: 'Pro' },
  {
    key: 'size',
    label: 'size',
    kind: 'enum',
    options: ['xs', 'sm', 'md', 'lg'],
    defaultValue: 'md',
  },
  { key: 'invalid', label: 'invalid', kind: 'boolean', defaultValue: false },
  { key: 'disabled', label: 'disabled (second option)', kind: 'boolean', defaultValue: false },
] as const);

type RadioPlaygroundValues = PlaygroundValues<typeof RADIO_PLAYGROUND_CONTROLS>;

@Component({
  selector: 'app-radio-playground-page',
  imports: [ApiPlayground, ApiTable, KuiFieldComponent, KuiRadioDirective],
  templateUrl: './radio-playground-page.html',
  styleUrl: './radio-playground-page.scss',
})
export class RadioPlaygroundPage {
  protected readonly apiDescription = RADIO_API_DESCRIPTION;
  protected readonly apiRows = RADIO_API_ROWS;

  protected readonly playgroundControls = RADIO_PLAYGROUND_CONTROLS;

  protected readonly buildPlaygroundSnippet = (
    values: RadioPlaygroundValues,
  ): readonly CodeTab[] => {
    const label = values.label || 'Plan';
    const firstOption = values.firstOption || 'Starter';
    const secondOption = values.secondOption || 'Pro';
    const sharedAttrString = serializePlaygroundAttributes([
      { name: 'size', value: values.size, defaultValue: 'md' },
      { name: 'invalid', value: values.invalid },
    ]);
    const disabledAttrString = serializePlaygroundAttributes([
      { name: 'size', value: values.size, defaultValue: 'md' },
      { name: 'invalid', value: values.invalid },
      { name: 'disabled', value: values.disabled },
    ]);

    return [
      {
        label: 'HTML',
        language: 'html',
        code: `<kui-field label="${escapePlaygroundHtml(label || 'Plan')}">
  <div role="radiogroup" aria-label="${escapePlaygroundHtml(label || 'Plan')}">
    <label>
      <input kuiRadio type="radio" name="playground-radio"${sharedAttrString} checked />
      ${escapePlaygroundHtml(firstOption || 'Starter')}
    </label>
    <label>
      <input kuiRadio type="radio" name="playground-radio"${disabledAttrString} />
      ${escapePlaygroundHtml(secondOption || 'Pro')}
    </label>
  </div>
</kui-field>`,
      },
    ];
  };

  protected labelOf(values: RadioPlaygroundValues): string {
    return values.label || 'Plan';
  }

  protected firstOptionOf(values: RadioPlaygroundValues): string {
    return values.firstOption || 'Starter';
  }

  protected secondOptionOf(values: RadioPlaygroundValues): string {
    return values.secondOption || 'Pro';
  }

  protected sizeOf(values: RadioPlaygroundValues): KuiSize {
    return values.size;
  }

  protected invalidOf(values: RadioPlaygroundValues): boolean {
    return values.invalid;
  }

  protected disabledOf(values: RadioPlaygroundValues): boolean {
    return values.disabled;
  }
}
