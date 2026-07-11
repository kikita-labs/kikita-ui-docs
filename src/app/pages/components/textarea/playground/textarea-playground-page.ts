import { Component } from '@angular/core';
import { KuiSize, KuiTextareaDirective } from '@kikita-labs/ui';
import { ApiPlayground } from '../../../../shared/docs-ui/api-playground/api-playground';
import {
  PlaygroundControl,
  PlaygroundValues,
} from '../../../../shared/docs-ui/api-playground/playground-control';
import { ApiTable } from '../../../../shared/docs-ui/api-table/api-table';
import { KIKITA_UI_PACKAGE_VERSION } from '../../../../core/package/kikita-ui-package-version';
import { CodeTab } from '../../../../shared/docs-ui/code-tabs/code-tab';
import { TEXTAREA_API_ROWS } from '../textarea.api-schema';

@Component({
  selector: 'app-textarea-playground-page',
  imports: [ApiPlayground, ApiTable, KuiTextareaDirective],
  templateUrl: './textarea-playground-page.html',
  styleUrl: './textarea-playground-page.scss',
})
export class TextareaPlaygroundPage {
  protected readonly apiDescription = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;
  protected readonly apiRows = TEXTAREA_API_ROWS;

  protected readonly playgroundControls: readonly PlaygroundControl[] = [
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
  ];

  protected buildPlaygroundSnippet = (values: PlaygroundValues): readonly CodeTab[] => {
    const placeholder = values['placeholder'] as string;
    const value = values['value'] as string;
    const size = values['size'] as string;
    const rows = values['rows'] as number;
    const invalid = values['invalid'] as boolean;
    const disabled = values['disabled'] as boolean;

    const attrs = [
      size !== 'md' ? `size="${size}"` : null,
      rows ? `rows="${rows}"` : null,
      placeholder ? `placeholder="${this.escapeHtml(placeholder)}"` : null,
      invalid ? 'invalid' : null,
      disabled ? 'disabled' : null,
    ].filter((attr): attr is string => attr !== null);

    const attrString = attrs.length > 0 ? ` ${attrs.join(' ')}` : '';
    const content = value ? this.escapeHtml(value) : '';

    return [
      {
        label: 'HTML',
        language: 'html',
        code: `<textarea kuiTextarea${attrString}>${content}</textarea>`,
      },
    ];
  };

  private escapeHtml(value: string): string {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  protected placeholderOf(values: PlaygroundValues): string {
    return values['placeholder'] as string;
  }

  protected valueOf(values: PlaygroundValues): string {
    return values['value'] as string;
  }

  protected sizeOf(values: PlaygroundValues): KuiSize {
    return values['size'] as KuiSize;
  }

  protected rowsOf(values: PlaygroundValues): number {
    return values['rows'] as number;
  }

  protected invalidOf(values: PlaygroundValues): boolean {
    return values['invalid'] as boolean;
  }

  protected disabledOf(values: PlaygroundValues): boolean {
    return values['disabled'] as boolean;
  }
}
