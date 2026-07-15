import { Component } from '@angular/core';

import { KuiColorInputDirective, KuiFieldComponent, type KuiSize } from '@kikita-labs/ui';

import {
  ApiPlayground,
  definePlaygroundControls,
  type PlaygroundValues,
  serializePlaygroundAttributes,
} from '@shared/docs-ui/api-playground';
import { ApiTable } from '@shared/docs-ui/api-table';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

import { COLOR_INPUT_API_ROWS } from '../color-input.api-schema';
import { COLOR_INPUT_API_DESCRIPTION } from '../color-input.docs-content';

const COLOR_INPUT_PLAYGROUND_CONTROLS = definePlaygroundControls([
  { key: 'value', label: 'value', kind: 'string', defaultValue: '#5b4fe0' },
  {
    key: 'size',
    label: 'size',
    kind: 'enum',
    options: ['xs', 'sm', 'md', 'lg'],
    defaultValue: 'md',
  },
  { key: 'invalid', label: 'invalid', kind: 'boolean', defaultValue: false },
  {
    key: 'swatchLabel',
    label: 'swatch label',
    kind: 'string',
    defaultValue: 'Open primary seed color picker',
  },
] as const);

type ColorInputPlaygroundValues = PlaygroundValues<typeof COLOR_INPUT_PLAYGROUND_CONTROLS>;

@Component({
  selector: 'app-color-input-playground-page',
  imports: [ApiPlayground, ApiTable, KuiColorInputDirective, KuiFieldComponent],
  templateUrl: './color-input-playground-page.html',
  styleUrl: './color-input-playground-page.scss',
})
export class ColorInputPlaygroundPage {
  protected readonly apiDescription = COLOR_INPUT_API_DESCRIPTION;
  protected readonly apiRows = COLOR_INPUT_API_ROWS;
  protected readonly playgroundControls = COLOR_INPUT_PLAYGROUND_CONTROLS;

  protected readonly buildPlaygroundSnippet = (
    values: ColorInputPlaygroundValues,
  ): readonly CodeTab[] => {
    const attrString = serializePlaygroundAttributes([
      { name: 'value', value: values.value, defaultValue: '#5b4fe0' },
      { name: 'size', value: values.size, defaultValue: 'md' },
      { name: 'invalid', value: values.invalid },
      {
        name: 'swatchLabel',
        value: values.swatchLabel,
        defaultValue: 'Open primary seed color picker',
      },
    ]);

    return [
      {
        label: 'HTML',
        language: 'html',
        code: `<kui-field label="Primary seed" hint="Hex and OKLCH values are supported.">
  <input kuiColorInput autocomplete="off"${attrString} />
</kui-field>`,
      },
    ];
  };

  protected valueOf(values: ColorInputPlaygroundValues): string {
    return values.value;
  }

  protected sizeOf(values: ColorInputPlaygroundValues): KuiSize {
    return values.size;
  }

  protected invalidOf(values: ColorInputPlaygroundValues): boolean {
    return values.invalid;
  }

  protected swatchLabelOf(values: ColorInputPlaygroundValues): string {
    return values.swatchLabel;
  }
}
