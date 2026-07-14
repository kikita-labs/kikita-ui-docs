import { Component } from '@angular/core';

import { KuiFieldComponent, KuiInputDirective, type KuiSize } from '@kikita-labs/ui';

import { ApiPlayground } from '@shared/docs-ui/api-playground';
import {
  definePlaygroundControls,
  type PlaygroundValues,
  serializePlaygroundAttributes,
} from '@shared/docs-ui/api-playground';
import { ApiTable } from '@shared/docs-ui/api-table';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

import { FIELD_API_ROWS } from '../field.api-schema';
import { FIELD_API_DESCRIPTION } from '../field.docs-content';

const FIELD_PLAYGROUND_CONTROLS = definePlaygroundControls([
  { key: 'label', label: 'label', kind: 'string', defaultValue: 'Email' },
  { key: 'hint', label: 'hint', kind: 'string', defaultValue: 'Use your work email' },
  { key: 'error', label: 'error', kind: 'string', defaultValue: '' },
  {
    key: 'size',
    label: 'size',
    kind: 'enum',
    options: ['xs', 'sm', 'md', 'lg'],
    defaultValue: 'md',
  },
  { key: 'required', label: 'required', kind: 'boolean', defaultValue: false },
  { key: 'hideErrors', label: 'hideErrors', kind: 'boolean', defaultValue: false },
] as const);

type FieldPlaygroundValues = PlaygroundValues<typeof FIELD_PLAYGROUND_CONTROLS>;

@Component({
  selector: 'app-field-playground-page',
  imports: [ApiPlayground, ApiTable, KuiFieldComponent, KuiInputDirective],
  templateUrl: './field-playground-page.html',
  styleUrl: './field-playground-page.scss',
})
export class FieldPlaygroundPage {
  protected readonly apiDescription = FIELD_API_DESCRIPTION;
  protected readonly apiRows = FIELD_API_ROWS;

  protected readonly playgroundControls = FIELD_PLAYGROUND_CONTROLS;

  protected readonly buildPlaygroundSnippet = (
    values: FieldPlaygroundValues,
  ): readonly CodeTab[] => {
    const attrString = serializePlaygroundAttributes([
      { name: 'label', value: values.label },
      { name: 'hint', value: values.hint },
      { name: 'error', value: values.error },
      { name: 'size', value: values.size, defaultValue: 'md' },
      { name: 'required', value: values.required },
      { name: 'hideErrors', value: values.hideErrors },
    ]);

    return [
      {
        label: 'HTML',
        language: 'html',
        code: `<kui-field${attrString}>
  <input kuiInput placeholder="mira@company.dev" />
</kui-field>`,
      },
    ];
  };

  protected labelOf(values: FieldPlaygroundValues): string {
    return values.label;
  }

  protected hintOf(values: FieldPlaygroundValues): string | undefined {
    const hint = values.hint;

    return hint || undefined;
  }

  protected errorOf(values: FieldPlaygroundValues): string | undefined {
    const error = values.error;

    return error || undefined;
  }

  protected sizeOf(values: FieldPlaygroundValues): KuiSize {
    return values.size;
  }

  protected requiredOf(values: FieldPlaygroundValues): boolean {
    return values.required;
  }

  protected hideErrorsOf(values: FieldPlaygroundValues): boolean {
    return values.hideErrors;
  }
}
