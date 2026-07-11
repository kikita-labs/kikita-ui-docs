import { Component } from '@angular/core';
import { KuiCheckboxDirective, KuiSize } from '@kikita-labs/ui';
import { ApiPlayground } from '../../../../shared/docs-ui/api-playground/api-playground';
import {
  PlaygroundControl,
  PlaygroundValues,
} from '../../../../shared/docs-ui/api-playground/playground-control';
import { ApiTable } from '../../../../shared/docs-ui/api-table/api-table';
import { KIKITA_UI_PACKAGE_VERSION } from '../../../../core/package/kikita-ui-package-version';
import { CodeTab } from '../../../../shared/docs-ui/code-tabs/code-tab';
import { CHECKBOX_API_ROWS } from '../checkbox.api-schema';

@Component({
  selector: 'app-checkbox-playground-page',
  imports: [ApiPlayground, ApiTable, KuiCheckboxDirective],
  templateUrl: './checkbox-playground-page.html',
  styleUrl: './checkbox-playground-page.scss',
})
export class CheckboxPlaygroundPage {
  protected readonly apiDescription = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;
  protected readonly apiRows = CHECKBOX_API_ROWS;

  protected readonly playgroundControls: readonly PlaygroundControl[] = [
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
  ];

  protected buildPlaygroundSnippet = (values: PlaygroundValues): readonly CodeTab[] => {
    const label = values['label'] as string;
    const size = values['size'] as string;
    const checked = values['checked'] as boolean;
    const invalid = values['invalid'] as boolean;
    const disabled = values['disabled'] as boolean;

    const attrs = [
      size !== 'md' ? `size="${size}"` : null,
      checked ? 'checked' : null,
      invalid ? 'invalid' : null,
      disabled ? 'disabled' : null,
    ].filter((attr): attr is string => attr !== null);

    const attrString = attrs.length > 0 ? ` ${attrs.join(' ')}` : '';
    const escapedLabel = this.escapeHtml(label || 'Receive updates');

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

  protected labelOf(values: PlaygroundValues): string {
    const label = values['label'] as string;

    return label || 'Receive updates';
  }

  private escapeHtml(value: string): string {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  protected sizeOf(values: PlaygroundValues): KuiSize {
    return values['size'] as KuiSize;
  }

  protected checkedOf(values: PlaygroundValues): boolean {
    return values['checked'] as boolean;
  }

  protected invalidOf(values: PlaygroundValues): boolean {
    return values['invalid'] as boolean;
  }

  protected disabledOf(values: PlaygroundValues): boolean {
    return values['disabled'] as boolean;
  }
}
