import { Component } from '@angular/core';
import { KuiInputDirective, KuiSize } from '@kikita-labs/ui';
import { ApiPlayground } from '../../../../shared/docs-ui/api-playground/api-playground';
import {
  PlaygroundControl,
  PlaygroundValues,
} from '../../../../shared/docs-ui/api-playground/playground-control';
import { ApiTable } from '../../../../shared/docs-ui/api-table/api-table';
import { KIKITA_UI_PACKAGE_VERSION } from '../../../../core/package/kikita-ui-package-version';
import { CodeTab } from '../../../../shared/docs-ui/code-tabs/code-tab';
import { INPUT_API_ROWS } from '../input.api-schema';

@Component({
  selector: 'app-input-playground-page',
  imports: [ApiPlayground, ApiTable, KuiInputDirective],
  templateUrl: './input-playground-page.html',
  styleUrl: './input-playground-page.scss',
})
export class InputPlaygroundPage {
  protected readonly apiDescription = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;
  protected readonly apiRows = INPUT_API_ROWS;

  protected readonly playgroundControls: readonly PlaygroundControl[] = [
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
  ];

  protected buildPlaygroundSnippet = (values: PlaygroundValues): readonly CodeTab[] => {
    const value = values['value'] as string;
    const placeholder = values['placeholder'] as string;
    const size = values['size'] as string;
    const invalid = values['invalid'] as boolean;
    const disabled = values['disabled'] as boolean;

    const attrs = [
      size !== 'md' ? `size="${size}"` : null,
      placeholder ? `placeholder="${this.escapeHtml(placeholder)}"` : null,
      value ? `value="${this.escapeHtml(value)}"` : null,
      invalid ? 'invalid' : null,
      disabled ? 'disabled' : null,
    ].filter((attr): attr is string => attr !== null);

    const attrString = attrs.length > 0 ? ` ${attrs.join(' ')}` : '';

    return [
      {
        label: 'HTML',
        language: 'html',
        code: `<input kuiInput${attrString} />`,
      },
    ];
  };

  private escapeHtml(value: string): string {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  protected valueOf(values: PlaygroundValues): string {
    return values['value'] as string;
  }

  protected placeholderOf(values: PlaygroundValues): string {
    return values['placeholder'] as string;
  }

  protected sizeOf(values: PlaygroundValues): KuiSize {
    return values['size'] as KuiSize;
  }

  protected invalidOf(values: PlaygroundValues): boolean {
    return values['invalid'] as boolean;
  }

  protected disabledOf(values: PlaygroundValues): boolean {
    return values['disabled'] as boolean;
  }
}
