import { Component } from '@angular/core';

import { type KuiSize, KuiSwitchDirective } from '@kikita-labs/ui';

import { ApiPlayground } from '@shared/docs-ui/api-playground';
import {
  definePlaygroundControls,
  escapePlaygroundHtml,
  type PlaygroundValues,
  serializePlaygroundAttributes,
} from '@shared/docs-ui/api-playground';
import { ApiTable } from '@shared/docs-ui/api-table';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

import { SWITCH_API_ROWS } from '../switch.api-schema';
import { SWITCH_API_DESCRIPTION } from '../switch.docs-content';

const SWITCH_PLAYGROUND_CONTROLS = definePlaygroundControls([
  { key: 'label', label: 'label', kind: 'string', defaultValue: 'Enable notifications' },
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

type SwitchPlaygroundValues = PlaygroundValues<typeof SWITCH_PLAYGROUND_CONTROLS>;

@Component({
  selector: 'app-switch-playground-page',
  imports: [ApiPlayground, ApiTable, KuiSwitchDirective],
  templateUrl: './switch-playground-page.html',
  styleUrl: './switch-playground-page.scss',
})
export class SwitchPlaygroundPage {
  protected readonly apiDescription = SWITCH_API_DESCRIPTION;
  protected readonly apiRows = SWITCH_API_ROWS;

  protected readonly playgroundControls = SWITCH_PLAYGROUND_CONTROLS;

  protected readonly buildPlaygroundSnippet = (
    values: SwitchPlaygroundValues,
  ): readonly CodeTab[] => {
    const label = values.label;
    const attrString = serializePlaygroundAttributes([
      { name: 'size', value: values.size, defaultValue: 'md' },
      { name: 'checked', value: values.checked },
      { name: 'invalid', value: values.invalid },
      { name: 'disabled', value: values.disabled },
    ]);
    const escapedLabel = escapePlaygroundHtml(label || 'Enable notifications');

    return [
      {
        label: 'HTML',
        language: 'html',
        code: `<label>
  <input kuiSwitch type="checkbox"${attrString} />
  <span>${escapedLabel}</span>
</label>`,
      },
    ];
  };

  protected labelOf(values: SwitchPlaygroundValues): string {
    const label = values.label;

    return label || 'Enable notifications';
  }

  protected sizeOf(values: SwitchPlaygroundValues): KuiSize {
    return values.size;
  }

  protected checkedOf(values: SwitchPlaygroundValues): boolean {
    return values.checked;
  }

  protected invalidOf(values: SwitchPlaygroundValues): boolean {
    return values.invalid;
  }

  protected disabledOf(values: SwitchPlaygroundValues): boolean {
    return values.disabled;
  }
}
