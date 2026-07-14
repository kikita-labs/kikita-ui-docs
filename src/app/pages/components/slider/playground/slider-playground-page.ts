import { Component } from '@angular/core';

import { type KuiSliderColor, KuiSliderDirective, type KuiSliderSize } from '@kikita-labs/ui';

import { ApiPlayground } from '@shared/docs-ui/api-playground';
import {
  definePlaygroundControls,
  type PlaygroundValues,
  serializePlaygroundAttributes,
} from '@shared/docs-ui/api-playground';
import { ApiTable } from '@shared/docs-ui/api-table';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

import { SLIDER_API_ROWS } from '../slider.api-schema';
import { SLIDER_API_DESCRIPTION } from '../slider.docs-content';

const SLIDER_PLAYGROUND_CONTROLS = definePlaygroundControls([
  {
    key: 'color',
    label: 'color',
    kind: 'enum',
    options: ['primary', 'success', 'danger', 'neutral'],
    defaultValue: 'primary',
  },
  {
    key: 'size',
    label: 'size',
    kind: 'enum',
    options: ['sm', 'md', 'lg'],
    defaultValue: 'md',
  },
  { key: 'minLabel', label: 'minLabel', kind: 'string', defaultValue: '' },
  { key: 'maxLabel', label: 'maxLabel', kind: 'string', defaultValue: '' },
  { key: 'min', label: 'min', kind: 'number', defaultValue: 0 },
  { key: 'max', label: 'max', kind: 'number', defaultValue: 100 },
  { key: 'step', label: 'step', kind: 'number', defaultValue: 1 },
  { key: 'value', label: 'value', kind: 'number', defaultValue: 60 },
  { key: 'disabled', label: 'disabled', kind: 'boolean', defaultValue: false },
  { key: 'invalid', label: 'invalid', kind: 'boolean', defaultValue: false },
] as const);

type SliderPlaygroundValues = PlaygroundValues<typeof SLIDER_PLAYGROUND_CONTROLS>;

@Component({
  selector: 'app-slider-playground-page',
  imports: [ApiPlayground, ApiTable, KuiSliderDirective],
  templateUrl: './slider-playground-page.html',
  styleUrl: './slider-playground-page.scss',
})
export class SliderPlaygroundPage {
  protected readonly apiDescription = SLIDER_API_DESCRIPTION;
  protected readonly apiRows = SLIDER_API_ROWS;

  protected readonly playgroundControls = SLIDER_PLAYGROUND_CONTROLS;

  protected readonly buildPlaygroundSnippet = (
    values: SliderPlaygroundValues,
  ): readonly CodeTab[] => {
    const attrString = serializePlaygroundAttributes([
      { name: 'min', value: values.min, defaultValue: 0 },
      { name: 'max', value: values.max, defaultValue: 100 },
      { name: 'step', value: values.step, defaultValue: 1 },
      { name: 'value', value: values.value, defaultValue: 60 },
      { name: 'color', value: values.color, defaultValue: 'primary' },
      { name: 'size', value: values.size, defaultValue: 'md' },
      { name: 'minLabel', value: values.minLabel },
      { name: 'maxLabel', value: values.maxLabel },
      { name: 'disabled', value: values.disabled },
      { name: 'invalid', value: values.invalid },
    ]);

    return [
      {
        label: 'HTML',
        language: 'html',
        code: `<input type="range" kuiSlider${attrString} />`,
      },
    ];
  };

  protected colorOf(values: SliderPlaygroundValues): KuiSliderColor {
    return values.color;
  }

  protected sizeOf(values: SliderPlaygroundValues): KuiSliderSize {
    return values.size;
  }

  protected minLabelOf(values: SliderPlaygroundValues): string {
    return values.minLabel;
  }

  protected maxLabelOf(values: SliderPlaygroundValues): string {
    return values.maxLabel;
  }

  protected minOf(values: SliderPlaygroundValues): number {
    return values.min;
  }

  protected maxOf(values: SliderPlaygroundValues): number {
    return values.max;
  }

  protected stepOf(values: SliderPlaygroundValues): number {
    return values.step;
  }

  protected valueOf(values: SliderPlaygroundValues): string {
    return String(values.value);
  }

  protected disabledOf(values: SliderPlaygroundValues): boolean {
    return values.disabled;
  }

  protected invalidOf(values: SliderPlaygroundValues): boolean {
    return values.invalid;
  }
}
