import { Component } from '@angular/core';

import { KuiCheckboxDirective, type KuiSize } from '@kikita-labs/ui';

import { ApiPlayground } from '@shared/docs-ui/api-playground';
import {
  definePlaygroundControls,
  escapePlaygroundHtml,
  type PlaygroundValues,
  serializePlaygroundAttributes,
} from '@shared/docs-ui/api-playground';
import { ApiTable } from '@shared/docs-ui/api-table';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

import { CHECKBOX_API_ROWS } from '../checkbox.api-schema';
import { CHECKBOX_API_DESCRIPTION } from '../checkbox.docs-content';

const CHECKBOX_PLAYGROUND_CONTROLS = definePlaygroundControls([
  { key: 'label', label: 'label', kind: 'string', defaultValue: 'Receive updates' },
  {
    key: 'size',
    label: 'size',
    kind: 'enum',
    options: ['xs', 'sm', 'md', 'lg'],
    defaultValue: 'md',
  },
  { key: 'checked', label: 'checked', kind: 'boolean', defaultValue: true },
  { key: 'invalid', label: 'invalid', kind: 'boolean', defaultValue: false },
  { key: 'disabled', label: 'disabled', kind: 'boolean', defaultValue: false },
] as const);

type CheckboxPlaygroundValues = PlaygroundValues<typeof CHECKBOX_PLAYGROUND_CONTROLS>;

@Component({
  selector: 'app-checkbox-playground-page',
  imports: [ApiPlayground, ApiTable, KuiCheckboxDirective],
  templateUrl: './checkbox-playground-page.html',
  styleUrl: './checkbox-playground-page.scss',
})
export class CheckboxPlaygroundPage {
  protected readonly apiDescription = CHECKBOX_API_DESCRIPTION;
  protected readonly apiRows = CHECKBOX_API_ROWS;

  protected readonly playgroundControls = CHECKBOX_PLAYGROUND_CONTROLS;

  protected readonly buildPlaygroundSnippet = (
    values: CheckboxPlaygroundValues,
  ): readonly CodeTab[] => {
    const label = values.label;
    const attrString = serializePlaygroundAttributes([
      { name: 'size', value: values.size, defaultValue: 'md' },
      { name: 'checked', value: values.checked },
      { name: 'invalid', value: values.invalid },
      { name: 'disabled', value: values.disabled },
    ]);
    const escapedLabel = escapePlaygroundHtml(label || 'Receive updates');

    return [
      {
        label: 'HTML',
        language: 'html',
        code: `<label class="checkbox-option">
  <input kuiCheckbox type="checkbox"${attrString} />
  <span>${escapedLabel}</span>
</label>`,
      },
    ];
  };

  protected labelOf(values: CheckboxPlaygroundValues): string {
    const label = values.label;

    return label || 'Receive updates';
  }

  protected sizeOf(values: CheckboxPlaygroundValues): KuiSize {
    return values.size;
  }

  protected checkedOf(values: CheckboxPlaygroundValues): boolean {
    return values.checked;
  }

  protected invalidOf(values: CheckboxPlaygroundValues): boolean {
    return values.invalid;
  }

  protected disabledOf(values: CheckboxPlaygroundValues): boolean {
    return values.disabled;
  }
}
