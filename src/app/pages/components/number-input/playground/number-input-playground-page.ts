import { Component } from '@angular/core';
import { KuiNumberInputDirective, KuiNumberInputVariant, KuiSize } from '@kikita-labs/ui';
import { ApiPlayground } from '../../../../shared/docs-ui/api-playground/api-playground';
import {
  PlaygroundControl,
  PlaygroundValues,
} from '../../../../shared/docs-ui/api-playground/playground-control';
import { ApiTable } from '../../../../shared/docs-ui/api-table/api-table';
import { KIKITA_UI_PACKAGE_VERSION } from '../../../../core/package/kikita-ui-package-version';
import { CodeTab } from '../../../../shared/docs-ui/code-tabs/code-tab';
import { NUMBER_INPUT_API_ROWS } from '../number-input.api-schema';

@Component({
  selector: 'app-number-input-playground-page',
  imports: [ApiPlayground, ApiTable, KuiNumberInputDirective],
  templateUrl: './number-input-playground-page.html',
  styleUrl: './number-input-playground-page.scss',
})
export class NumberInputPlaygroundPage {
  protected readonly apiDescription = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;
  protected readonly apiRows = NUMBER_INPUT_API_ROWS;

  protected readonly playgroundControls: readonly PlaygroundControl[] = [
    {
      key: 'size',
      label: 'size',
      kind: 'enum',
      options: ['xs', 'sm', 'md', 'lg'],
      defaultValue: 'md',
    },
    {
      key: 'variant',
      label: 'variant',
      kind: 'enum',
      options: ['a', 'b'],
      defaultValue: 'b',
    },
    { key: 'min', label: 'min', kind: 'number', defaultValue: 0 },
    { key: 'max', label: 'max', kind: 'number', defaultValue: 100 },
    { key: 'step', label: 'step', kind: 'number', defaultValue: 1 },
    { key: 'value', label: 'value', kind: 'number', defaultValue: 10 },
    { key: 'invalid', label: 'invalid', kind: 'boolean', defaultValue: false },
    { key: 'disabled', label: 'disabled', kind: 'boolean', defaultValue: false },
    { key: 'readonly', label: 'readonly', kind: 'boolean', defaultValue: false },
  ];

  protected buildPlaygroundSnippet = (values: PlaygroundValues): readonly CodeTab[] => {
    const size = values['size'] as string;
    const variant = values['variant'] as string;
    const min = values['min'] as number;
    const max = values['max'] as number;
    const step = values['step'] as number;
    const value = values['value'] as number;
    const invalid = values['invalid'] as boolean;
    const disabled = values['disabled'] as boolean;
    const readonly = values['readonly'] as boolean;

    const attrs = [
      size !== 'md' ? `size="${size}"` : null,
      variant !== 'b' ? `variant="${variant}"` : null,
      `min="${min}"`,
      `max="${max}"`,
      step !== 1 ? `step="${step}"` : null,
      `value="${value}"`,
      invalid ? 'invalid' : null,
      disabled ? 'disabled' : null,
      readonly ? 'readonly' : null,
    ].filter((attr): attr is string => attr !== null);

    const attrString = attrs.length > 0 ? ` ${attrs.join(' ')}` : '';

    return [
      {
        label: 'HTML',
        language: 'html',
        code: `<input type="number" kuiNumberInput${attrString} aria-label="Quantity" />`,
      },
    ];
  };

  protected sizeOf(values: PlaygroundValues): KuiSize {
    return values['size'] as KuiSize;
  }

  protected variantOf(values: PlaygroundValues): KuiNumberInputVariant {
    return values['variant'] as KuiNumberInputVariant;
  }

  protected minOf(values: PlaygroundValues): number {
    return values['min'] as number;
  }

  protected maxOf(values: PlaygroundValues): number {
    return values['max'] as number;
  }

  protected stepOf(values: PlaygroundValues): number {
    return values['step'] as number;
  }

  protected valueOf(values: PlaygroundValues): number {
    return values['value'] as number;
  }

  protected invalidOf(values: PlaygroundValues): boolean {
    return values['invalid'] as boolean;
  }

  protected disabledOf(values: PlaygroundValues): boolean {
    return values['disabled'] as boolean;
  }

  protected readonlyOf(values: PlaygroundValues): boolean {
    return values['readonly'] as boolean;
  }
}
