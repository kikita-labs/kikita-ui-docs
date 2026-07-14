import { Component } from '@angular/core';

import {
  type KuiChipAppearance,
  KuiChipDirective,
  KuiChipRemoveDirective,
  type KuiSize,
} from '@kikita-labs/ui';

import { ApiPlayground } from '@shared/docs-ui/api-playground';
import {
  definePlaygroundControls,
  escapePlaygroundHtml,
  type PlaygroundValues,
} from '@shared/docs-ui/api-playground';
import { ApiTable } from '@shared/docs-ui/api-table';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

import { CHIP_API_ROWS } from '../chip.api-schema';
import { CHIP_API_DESCRIPTION } from '../chip.docs-content';

const CHIP_PLAYGROUND_CONTROLS = definePlaygroundControls([
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
] as const);

type ChipPlaygroundValues = PlaygroundValues<typeof CHIP_PLAYGROUND_CONTROLS>;

@Component({
  selector: 'app-chip-playground-page',
  imports: [ApiPlayground, ApiTable, KuiChipDirective, KuiChipRemoveDirective],
  templateUrl: './chip-playground-page.html',
  styleUrl: './chip-playground-page.scss',
})
export class ChipPlaygroundPage {
  protected readonly apiDescription = CHIP_API_DESCRIPTION;
  protected readonly apiRows = CHIP_API_ROWS;

  protected readonly playgroundControls = CHIP_PLAYGROUND_CONTROLS;

  protected readonly buildPlaygroundSnippet = (
    values: ChipPlaygroundValues,
  ): readonly CodeTab[] => {
    const label = values.label;
    const appearance = values.appearance;
    const size = values.size;
    const disabled = values.disabled;
    const invalid = values.invalid;
    const removable = values.removable;

    const attrs = [
      appearance !== 'neutral' ? `appearance="${appearance}"` : null,
      size !== 'md' ? `size="${size}"` : null,
      disabled ? 'disabled' : null,
      invalid ? 'invalid' : null,
    ].filter((attr): attr is string => attr !== null);

    const attrString = attrs.length > 0 ? ` ${attrs.join(' ')}` : '';
    const escapedLabel = escapePlaygroundHtml(label || 'Design');

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

  protected labelOf(values: ChipPlaygroundValues): string {
    const label = values.label;

    return label || 'Design';
  }

  protected appearanceOf(values: ChipPlaygroundValues): KuiChipAppearance {
    return values.appearance;
  }

  protected sizeOf(values: ChipPlaygroundValues): KuiSize {
    return values.size;
  }

  protected disabledOf(values: ChipPlaygroundValues): boolean {
    return values.disabled;
  }

  protected invalidOf(values: ChipPlaygroundValues): boolean {
    return values.invalid;
  }

  protected removableOf(values: ChipPlaygroundValues): boolean {
    return values.removable;
  }
}
