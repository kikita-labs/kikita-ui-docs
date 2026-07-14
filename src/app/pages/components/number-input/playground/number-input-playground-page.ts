import { Component } from '@angular/core';

import { KuiNumberInputDirective, type KuiNumberInputVariant, type KuiSize } from '@kikita-labs/ui';

import { ApiPlayground } from '@shared/docs-ui/api-playground';
import {
  definePlaygroundControls,
  type PlaygroundValues,
  serializePlaygroundAttributes,
} from '@shared/docs-ui/api-playground';
import { ApiTable } from '@shared/docs-ui/api-table';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

import { NUMBER_INPUT_API_ROWS } from '../number-input.api-schema';
import { NUMBER_INPUT_API_DESCRIPTION } from '../number-input.docs-content';

const NUMBER_INPUT_PLAYGROUND_CONTROLS = definePlaygroundControls([
  {
    key: 'size',
    label: 'size',
    kind: 'enum',
    options: ['xs', 'sm', 'md', 'lg'],
    defaultValue: 'md',
  },
  {
    key: 'variant',
    label: 'variant',
    kind: 'enum',
    options: ['a', 'b'],
    defaultValue: 'b',
  },
  { key: 'min', label: 'min', kind: 'number', defaultValue: 0 },
  { key: 'max', label: 'max', kind: 'number', defaultValue: 100 },
  { key: 'step', label: 'step', kind: 'number', defaultValue: 1 },
  { key: 'value', label: 'value', kind: 'number', defaultValue: 10 },
  { key: 'invalid', label: 'invalid', kind: 'boolean', defaultValue: false },
  { key: 'disabled', label: 'disabled', kind: 'boolean', defaultValue: false },
  { key: 'readonly', label: 'readonly', kind: 'boolean', defaultValue: false },
] as const);

type NumberInputPlaygroundValues = PlaygroundValues<typeof NUMBER_INPUT_PLAYGROUND_CONTROLS>;

@Component({
  selector: 'app-number-input-playground-page',
  imports: [ApiPlayground, ApiTable, KuiNumberInputDirective],
  templateUrl: './number-input-playground-page.html',
  styleUrl: './number-input-playground-page.scss',
})
export class NumberInputPlaygroundPage {
  protected readonly apiDescription = NUMBER_INPUT_API_DESCRIPTION;
  protected readonly apiRows = NUMBER_INPUT_API_ROWS;

  protected readonly playgroundControls = NUMBER_INPUT_PLAYGROUND_CONTROLS;

  protected readonly buildPlaygroundSnippet = (
    values: NumberInputPlaygroundValues,
  ): readonly CodeTab[] => {
    const attrString = serializePlaygroundAttributes([
      { name: 'size', value: values.size, defaultValue: 'md' },
      { name: 'variant', value: values.variant, defaultValue: 'b' },
      { name: 'min', value: values.min, defaultValue: 0 },
      { name: 'max', value: values.max, defaultValue: 100 },
      { name: 'step', value: values.step, defaultValue: 1 },
      { name: 'value', value: values.value, defaultValue: 10 },
      { name: 'invalid', value: values.invalid },
      { name: 'disabled', value: values.disabled },
      { name: 'readonly', value: values.readonly },
    ]);

    return [
      {
        label: 'HTML',
        language: 'html',
        code: `<input type="number" kuiNumberInput${attrString} aria-label="Quantity" />`,
      },
    ];
  };

  protected sizeOf(values: NumberInputPlaygroundValues): KuiSize {
    return values.size;
  }

  protected variantOf(values: NumberInputPlaygroundValues): KuiNumberInputVariant {
    return values.variant;
  }

  protected minOf(values: NumberInputPlaygroundValues): number {
    return values.min;
  }

  protected maxOf(values: NumberInputPlaygroundValues): number {
    return values.max;
  }

  protected stepOf(values: NumberInputPlaygroundValues): number {
    return values.step;
  }

  protected valueOf(values: NumberInputPlaygroundValues): number {
    return values.value;
  }

  protected invalidOf(values: NumberInputPlaygroundValues): boolean {
    return values.invalid;
  }

  protected disabledOf(values: NumberInputPlaygroundValues): boolean {
    return values.disabled;
  }

  protected readonlyOf(values: NumberInputPlaygroundValues): boolean {
    return values.readonly;
  }
}
