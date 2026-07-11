import { Component } from '@angular/core';
import {
  KuiProgressColor,
  KuiProgressComponent,
  KuiProgressSize,
  KuiProgressType,
} from '@kikita-labs/ui';
import { ApiPlayground } from '../../../../shared/docs-ui/api-playground/api-playground';
import {
  PlaygroundControl,
  PlaygroundValues,
} from '../../../../shared/docs-ui/api-playground/playground-control';
import { ApiTable } from '../../../../shared/docs-ui/api-table/api-table';
import { KIKITA_UI_PACKAGE_VERSION } from '../../../../core/package/kikita-ui-package-version';
import { CodeTab } from '../../../../shared/docs-ui/code-tabs/code-tab';
import { PROGRESS_API_ROWS } from '../progress.api-schema';

@Component({
  selector: 'app-progress-playground-page',
  imports: [ApiPlayground, ApiTable, KuiProgressComponent],
  templateUrl: './progress-playground-page.html',
  styleUrl: './progress-playground-page.scss',
})
export class ProgressPlaygroundPage {
  protected readonly apiDescription = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;
  protected readonly apiRows = PROGRESS_API_ROWS;

  protected readonly playgroundControls: readonly PlaygroundControl[] = [
    {
      key: 'type',
      label: 'type',
      kind: 'enum',
      options: ['linear', 'circular'],
      defaultValue: 'linear',
    },
    { key: 'indeterminate', label: 'indeterminate', kind: 'boolean', defaultValue: false },
    { key: 'value', label: 'value', kind: 'number', defaultValue: 60 },
    {
      key: 'color',
      label: 'color',
      kind: 'enum',
      options: ['primary', 'success', 'warning', 'danger', 'neutral'],
      defaultValue: 'primary',
    },
    {
      key: 'size',
      label: 'size',
      kind: 'enum',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      defaultValue: 'md',
    },
    { key: 'label', label: 'aria-label', kind: 'string', defaultValue: 'Upload progress' },
    {
      key: 'content',
      label: 'content (circular only)',
      kind: 'string',
      defaultValue: '',
    },
  ];

  protected buildPlaygroundSnippet = (values: PlaygroundValues): readonly CodeTab[] => {
    const type = values['type'] as string;
    const indeterminate = values['indeterminate'] as boolean;
    const value = values['value'] as number;
    const color = values['color'] as string;
    const size = values['size'] as string;
    const label = values['label'] as string;
    const content = values['content'] as string;

    const attrs = [
      type !== 'linear' ? `type="${type}"` : null,
      indeterminate ? null : `[value]="${value}"`,
      color !== 'primary' ? `color="${color}"` : null,
      size !== 'md' ? `size="${size}"` : null,
      `aria-label="${this.escapeHtml(label || 'Upload progress')}"`,
    ].filter((attr): attr is string => attr !== null);

    const attrString = ` ${attrs.join(' ')}`;
    const trimmedContent = content.trim();

    const code = trimmedContent
      ? `<kui-progress${attrString}>${this.escapeHtml(trimmedContent)}</kui-progress>`
      : `<kui-progress${attrString} />`;

    return [
      {
        label: 'HTML',
        language: 'html',
        code,
      },
    ];
  };

  private escapeHtml(value: string): string {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  protected typeOf(values: PlaygroundValues): KuiProgressType {
    return values['type'] as KuiProgressType;
  }

  protected valueOf(values: PlaygroundValues): number | null {
    const indeterminate = values['indeterminate'] as boolean;

    return indeterminate ? null : (values['value'] as number);
  }

  protected colorOf(values: PlaygroundValues): KuiProgressColor {
    return values['color'] as KuiProgressColor;
  }

  protected sizeOf(values: PlaygroundValues): KuiProgressSize {
    return values['size'] as KuiProgressSize;
  }

  protected labelOf(values: PlaygroundValues): string {
    const label = values['label'] as string;

    return label || 'Upload progress';
  }

  protected contentOf(values: PlaygroundValues): string {
    return values['content'] as string;
  }
}
