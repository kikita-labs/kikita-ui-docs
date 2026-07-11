import { Component } from '@angular/core';
import { KuiFieldComponent, KuiInputDirective, KuiSize } from '@kikita-labs/ui';
import { ApiPlayground } from '../../../../shared/docs-ui/api-playground/api-playground';
import {
  PlaygroundControl,
  PlaygroundValues,
} from '../../../../shared/docs-ui/api-playground/playground-control';
import { ApiTable } from '../../../../shared/docs-ui/api-table/api-table';
import { KIKITA_UI_PACKAGE_VERSION } from '../../../../core/package/kikita-ui-package-version';
import { CodeTab } from '../../../../shared/docs-ui/code-tabs/code-tab';
import { FIELD_API_ROWS } from '../field.api-schema';

@Component({
  selector: 'app-field-playground-page',
  imports: [ApiPlayground, ApiTable, KuiFieldComponent, KuiInputDirective],
  templateUrl: './field-playground-page.html',
  styleUrl: './field-playground-page.scss',
})
export class FieldPlaygroundPage {
  protected readonly apiDescription = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;
  protected readonly apiRows = FIELD_API_ROWS;

  protected readonly playgroundControls: readonly PlaygroundControl[] = [
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
  ];

  protected buildPlaygroundSnippet = (values: PlaygroundValues): readonly CodeTab[] => {
    const label = values['label'] as string;
    const hint = values['hint'] as string;
    const error = values['error'] as string;
    const size = values['size'] as string;
    const required = values['required'] as boolean;
    const hideErrors = values['hideErrors'] as boolean;

    const attrs = [
      label ? `label="${this.escapeHtml(label)}"` : null,
      hint ? `hint="${this.escapeHtml(hint)}"` : null,
      error ? `error="${this.escapeHtml(error)}"` : null,
      size !== 'md' ? `size="${size}"` : null,
      required ? 'required' : null,
      hideErrors ? 'hideErrors' : null,
    ].filter((attr): attr is string => attr !== null);

    const attrString = attrs.length > 0 ? ` ${attrs.join(' ')}` : '';

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

  private escapeHtml(value: string): string {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  protected labelOf(values: PlaygroundValues): string {
    return values['label'] as string;
  }

  protected hintOf(values: PlaygroundValues): string | undefined {
    const hint = values['hint'] as string;

    return hint || undefined;
  }

  protected errorOf(values: PlaygroundValues): string | undefined {
    const error = values['error'] as string;

    return error || undefined;
  }

  protected sizeOf(values: PlaygroundValues): KuiSize {
    return values['size'] as KuiSize;
  }

  protected requiredOf(values: PlaygroundValues): boolean {
    return values['required'] as boolean;
  }

  protected hideErrorsOf(values: PlaygroundValues): boolean {
    return values['hideErrors'] as boolean;
  }
}
