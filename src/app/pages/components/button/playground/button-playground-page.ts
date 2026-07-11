import { Component } from '@angular/core';
import { KuiButtonAppearance, KuiButtonDirective, KuiButtonShape, KuiSize } from '@kikita-labs/ui';
import { ApiPlayground } from '../../../../shared/docs-ui/api-playground/api-playground';
import {
  PlaygroundControl,
  PlaygroundValues,
} from '../../../../shared/docs-ui/api-playground/playground-control';
import { ApiTable } from '../../../../shared/docs-ui/api-table/api-table';
import { KIKITA_UI_PACKAGE_VERSION } from '../../../../core/package/kikita-ui-package-version';
import { CodeTab } from '../../../../shared/docs-ui/code-tabs/code-tab';
import { BUTTON_API_ROWS } from '../button.api-schema';

@Component({
  selector: 'app-button-playground-page',
  imports: [ApiPlayground, ApiTable, KuiButtonDirective],
  templateUrl: './button-playground-page.html',
  styleUrl: './button-playground-page.scss',
})
export class ButtonPlaygroundPage {
  protected readonly apiDescription = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;
  protected readonly apiRows = BUTTON_API_ROWS;

  protected readonly playgroundControls: readonly PlaygroundControl[] = [
    { key: 'label', label: 'label', kind: 'string', defaultValue: 'Save changes' },
    {
      key: 'shape',
      label: 'shape',
      kind: 'enum',
      options: ['undefined', 'solid', 'soft', 'outline', 'ghost'],
      defaultValue: 'undefined',
    },
    {
      key: 'appearance',
      label: 'appearance',
      kind: 'enum',
      options: ['none', 'primary', 'danger', 'success', 'warning'],
      defaultValue: 'none',
    },
    {
      key: 'size',
      label: 'size',
      kind: 'enum',
      options: ['xs', 'sm', 'md', 'lg'],
      defaultValue: 'md',
    },
    { key: 'wrap', label: 'wrap', kind: 'boolean', defaultValue: false },
    { key: 'loading', label: 'loading', kind: 'boolean', defaultValue: false },
    { key: 'disabled', label: 'disabled', kind: 'boolean', defaultValue: false },
  ];

  protected buildPlaygroundSnippet = (values: PlaygroundValues): readonly CodeTab[] => {
    const label = values['label'] as string;
    const shape = values['shape'] as string;
    const appearance = values['appearance'] as string;
    const size = values['size'] as string;
    const wrap = values['wrap'] as boolean;
    const loading = values['loading'] as boolean;
    const disabled = values['disabled'] as boolean;

    const attrs = [
      shape !== 'undefined' && shape !== 'solid' ? `shape="${shape}"` : null,
      appearance !== 'none' ? `appearance="${appearance}"` : null,
      size !== 'md' ? `size="${size}"` : null,
      wrap ? 'wrap' : null,
      loading ? 'loading' : null,
      disabled ? 'disabled' : null,
    ].filter((attr): attr is string => attr !== null);

    const attrString = attrs.length > 0 ? ` ${attrs.join(' ')}` : '';
    const escapedLabel = this.escapeHtml(label || 'Save changes');

    return [
      {
        label: 'HTML',
        language: 'html',
        code: `<button kuiButton type="button"${attrString}>${escapedLabel}</button>`,
      },
    ];
  };

  protected labelOf(values: PlaygroundValues): string {
    const label = values['label'] as string;

    return label || 'Save changes';
  }

  private escapeHtml(value: string): string {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  protected shapeOf(values: PlaygroundValues): KuiButtonShape {
    const shape = values['shape'] as string;

    return shape === 'undefined' ? 'solid' : (shape as KuiButtonShape);
  }

  protected appearanceOf(values: PlaygroundValues): KuiButtonAppearance | null {
    const appearance = values['appearance'] as string;

    return appearance === 'none' ? null : (appearance as KuiButtonAppearance);
  }

  protected sizeOf(values: PlaygroundValues): KuiSize {
    return values['size'] as KuiSize;
  }

  protected wrapOf(values: PlaygroundValues): boolean {
    return values['wrap'] as boolean;
  }

  protected loadingOf(values: PlaygroundValues): boolean {
    return values['loading'] as boolean;
  }

  protected disabledOf(values: PlaygroundValues): boolean {
    return values['disabled'] as boolean;
  }
}
