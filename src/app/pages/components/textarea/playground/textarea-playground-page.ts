import { Component } from '@angular/core';

import { type KuiSize, KuiTextareaDirective } from '@kikita-labs/ui';

import { ApiPlayground } from '@shared/docs-ui/api-playground';
import {
  definePlaygroundControls,
  escapePlaygroundHtml,
  type PlaygroundValues,
  serializePlaygroundAttributes,
} from '@shared/docs-ui/api-playground';
import { ApiTable } from '@shared/docs-ui/api-table';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

import { TEXTAREA_API_ROWS } from '../textarea.api-schema';
import { TEXTAREA_API_DESCRIPTION } from '../textarea.docs-content';

const TEXTAREA_PLAYGROUND_CONTROLS = definePlaygroundControls([
  {
    key: 'placeholder',
    label: 'placeholder',
    kind: 'string',
    defaultValue: 'Write a note',
  },
  { key: 'value', label: 'value', kind: 'string', defaultValue: '' },
  {
    key: 'size',
    label: 'size',
    kind: 'enum',
    options: ['xs', 'sm', 'md', 'lg'],
    defaultValue: 'md',
  },
  { key: 'rows', label: 'rows', kind: 'number', defaultValue: 4 },
  { key: 'invalid', label: 'invalid', kind: 'boolean', defaultValue: false },
  { key: 'disabled', label: 'disabled', kind: 'boolean', defaultValue: false },
] as const);

type TextareaPlaygroundValues = PlaygroundValues<typeof TEXTAREA_PLAYGROUND_CONTROLS>;

@Component({
  selector: 'app-textarea-playground-page',
  imports: [ApiPlayground, ApiTable, KuiTextareaDirective],
  templateUrl: './textarea-playground-page.html',
  styleUrl: './textarea-playground-page.scss',
})
export class TextareaPlaygroundPage {
  protected readonly apiDescription = TEXTAREA_API_DESCRIPTION;
  protected readonly apiRows = TEXTAREA_API_ROWS;

  protected readonly playgroundControls = TEXTAREA_PLAYGROUND_CONTROLS;

  protected readonly buildPlaygroundSnippet = (
    values: TextareaPlaygroundValues,
  ): readonly CodeTab[] => {
    const value = values.value;
    const attrString = serializePlaygroundAttributes([
      { name: 'size', value: values.size, defaultValue: 'md' },
      { name: 'rows', value: values.rows },
      { name: 'placeholder', value: values.placeholder },
      { name: 'invalid', value: values.invalid },
      { name: 'disabled', value: values.disabled },
    ]);
    const content = value ? escapePlaygroundHtml(value) : '';

    return [
      {
        label: 'HTML',
        language: 'html',
        code: `<textarea kuiTextarea${attrString}>${content}</textarea>`,
      },
    ];
  };

  protected placeholderOf(values: TextareaPlaygroundValues): string {
    return values.placeholder;
  }

  protected valueOf(values: TextareaPlaygroundValues): string {
    return values.value;
  }

  protected sizeOf(values: TextareaPlaygroundValues): KuiSize {
    return values.size;
  }

  protected rowsOf(values: TextareaPlaygroundValues): number {
    return values.rows;
  }

  protected invalidOf(values: TextareaPlaygroundValues): boolean {
    return values.invalid;
  }

  protected disabledOf(values: TextareaPlaygroundValues): boolean {
    return values.disabled;
  }
}
