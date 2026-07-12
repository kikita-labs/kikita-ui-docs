import { Component } from '@angular/core';
import {
  KuiChipAppearance,
  KuiChipDirective,
  KuiChipRemoveDirective,
  KuiSize,
} from '@kikita-labs/ui';
import { ApiPlayground } from '../../../../shared/docs-ui/api-playground/api-playground';
import {
  PlaygroundControl,
  PlaygroundValues,
} from '../../../../shared/docs-ui/api-playground/playground-control';
import { ApiTable } from '../../../../shared/docs-ui/api-table/api-table';
import { KIKITA_UI_PACKAGE_VERSION } from '../../../../core/package/kikita-ui-package-version';
import { CodeTab } from '../../../../shared/docs-ui/code-tabs/code-tab';
import { CHIP_API_ROWS } from '../chip.api-schema';

@Component({
  selector: 'app-chip-playground-page',
  imports: [ApiPlayground, ApiTable, KuiChipDirective, KuiChipRemoveDirective],
  templateUrl: './chip-playground-page.html',
  styleUrl: './chip-playground-page.scss',
})
export class ChipPlaygroundPage {
  protected readonly apiDescription = `Inputs and outputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;
  protected readonly apiRows = CHIP_API_ROWS;

  protected readonly playgroundControls: readonly PlaygroundControl[] = [
    { key: 'label', label: 'label', kind: 'string', defaultValue: 'Design' },
    {
      key: 'appearance',
      label: 'appearance',
      kind: 'enum',
      options: ['neutral', 'primary', 'success', 'warning', 'danger', 'info'],
      defaultValue: 'neutral',
    },
    {
      key: 'size',
      label: 'size',
      kind: 'enum',
      options: ['xs', 'sm', 'md', 'lg'],
      defaultValue: 'md',
    },
    { key: 'disabled', label: 'disabled', kind: 'boolean', defaultValue: false },
    { key: 'invalid', label: 'invalid', kind: 'boolean', defaultValue: false },
    { key: 'removable', label: 'removable', kind: 'boolean', defaultValue: true },
  ];

  protected buildPlaygroundSnippet = (values: PlaygroundValues): readonly CodeTab[] => {
    const label = values['label'] as string;
    const appearance = values['appearance'] as string;
    const size = values['size'] as string;
    const disabled = values['disabled'] as boolean;
    const invalid = values['invalid'] as boolean;
    const removable = values['removable'] as boolean;

    const attrs = [
      appearance !== 'neutral' ? `appearance="${appearance}"` : null,
      size !== 'md' ? `size="${size}"` : null,
      disabled ? 'disabled' : null,
      invalid ? 'invalid' : null,
    ].filter((attr): attr is string => attr !== null);

    const attrString = attrs.length > 0 ? ` ${attrs.join(' ')}` : '';
    const escapedLabel = this.escapeHtml(label || 'Design');

    const code = removable
      ? `<span kuiChip${attrString} (removed)="removeTag()">
  <span class="kui-chip-label">${escapedLabel}</span>
  <button kuiChipRemove type="button" aria-label="Remove ${escapedLabel}"></button>
</span>`
      : `<span kuiChip${attrString}>${escapedLabel}</span>`;

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

  protected labelOf(values: PlaygroundValues): string {
    const label = values['label'] as string;

    return label || 'Design';
  }

  protected appearanceOf(values: PlaygroundValues): KuiChipAppearance {
    return values['appearance'] as KuiChipAppearance;
  }

  protected sizeOf(values: PlaygroundValues): KuiSize {
    return values['size'] as KuiSize;
  }

  protected disabledOf(values: PlaygroundValues): boolean {
    return values['disabled'] as boolean;
  }

  protected invalidOf(values: PlaygroundValues): boolean {
    return values['invalid'] as boolean;
  }

  protected removableOf(values: PlaygroundValues): boolean {
    return values['removable'] as boolean;
  }
}
