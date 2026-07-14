import { Component } from '@angular/core';

import { KuiInputDirective, type KuiSize } from '@kikita-labs/ui';

import { ApiPlayground } from '@shared/docs-ui/api-playground';
import {
  definePlaygroundControls,
  type PlaygroundValues,
  serializePlaygroundAttributes,
} from '@shared/docs-ui/api-playground';
import { ApiTable } from '@shared/docs-ui/api-table';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

import { INPUT_API_ROWS } from '../input.api-schema';
import { INPUT_API_DESCRIPTION } from '../input.docs-content';

const INPUT_PLAYGROUND_CONTROLS = definePlaygroundControls([
  { key: 'value', label: 'value', kind: 'string', defaultValue: 'kikita-ui' },
  { key: 'placeholder', label: 'placeholder', kind: 'string', defaultValue: 'mira@company.dev' },
  {
    key: 'size',
    label: 'size',
    kind: 'enum',
    options: ['xs', 'sm', 'md', 'lg'],
    defaultValue: 'md',
  },
  { key: 'invalid', label: 'invalid', kind: 'boolean', defaultValue: false },
  { key: 'disabled', label: 'disabled', kind: 'boolean', defaultValue: false },
] as const);

type InputPlaygroundValues = PlaygroundValues<typeof INPUT_PLAYGROUND_CONTROLS>;

@Component({
  selector: 'app-input-playground-page',
  imports: [ApiPlayground, ApiTable, KuiInputDirective],
  templateUrl: './input-playground-page.html',
  styleUrl: './input-playground-page.scss',
})
export class InputPlaygroundPage {
  protected readonly apiDescription = INPUT_API_DESCRIPTION;
  protected readonly apiRows = INPUT_API_ROWS;

  protected readonly playgroundControls = INPUT_PLAYGROUND_CONTROLS;

  protected readonly buildPlaygroundSnippet = (
    values: InputPlaygroundValues,
  ): readonly CodeTab[] => {
    const attrString = serializePlaygroundAttributes([
      { name: 'size', value: values.size, defaultValue: 'md' },
      { name: 'placeholder', value: values.placeholder },
      { name: 'value', value: values.value },
      { name: 'invalid', value: values.invalid },
      { name: 'disabled', value: values.disabled },
    ]);

    return [
      {
        label: 'HTML',
        language: 'html',
        code: `<input kuiInput${attrString} />`,
      },
    ];
  };

  protected valueOf(values: InputPlaygroundValues): string {
    return values.value;
  }

  protected placeholderOf(values: InputPlaygroundValues): string {
    return values.placeholder;
  }

  protected sizeOf(values: InputPlaygroundValues): KuiSize {
    return values.size;
  }

  protected invalidOf(values: InputPlaygroundValues): boolean {
    return values.invalid;
  }

  protected disabledOf(values: InputPlaygroundValues): boolean {
    return values.disabled;
  }
}
