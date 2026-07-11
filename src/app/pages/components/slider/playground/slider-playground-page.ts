import { Component } from '@angular/core';
import { KuiSliderColor, KuiSliderDirective, KuiSliderSize } from '@kikita-labs/ui';
import { ApiPlayground } from '../../../../shared/docs-ui/api-playground/api-playground';
import {
  PlaygroundControl,
  PlaygroundValues,
} from '../../../../shared/docs-ui/api-playground/playground-control';
import { ApiTable } from '../../../../shared/docs-ui/api-table/api-table';
import { KIKITA_UI_PACKAGE_VERSION } from '../../../../core/package/kikita-ui-package-version';
import { CodeTab } from '../../../../shared/docs-ui/code-tabs/code-tab';
import { SLIDER_API_ROWS } from '../slider.api-schema';

@Component({
  selector: 'app-slider-playground-page',
  imports: [ApiPlayground, ApiTable, KuiSliderDirective],
  templateUrl: './slider-playground-page.html',
  styleUrl: './slider-playground-page.scss',
})
export class SliderPlaygroundPage {
  protected readonly apiDescription = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;
  protected readonly apiRows = SLIDER_API_ROWS;

  protected readonly playgroundControls: readonly PlaygroundControl[] = [
    {
      key: 'color',
      label: 'color',
      kind: 'enum',
      options: ['primary', 'success', 'danger', 'neutral'],
      defaultValue: 'primary',
    },
    {
      key: 'size',
      label: 'size',
      kind: 'enum',
      options: ['sm', 'md', 'lg'],
      defaultValue: 'md',
    },
    { key: 'minLabel', label: 'minLabel', kind: 'string', defaultValue: '' },
    { key: 'maxLabel', label: 'maxLabel', kind: 'string', defaultValue: '' },
    { key: 'min', label: 'min', kind: 'number', defaultValue: 0 },
    { key: 'max', label: 'max', kind: 'number', defaultValue: 100 },
    { key: 'step', label: 'step', kind: 'number', defaultValue: 1 },
    { key: 'value', label: 'value', kind: 'number', defaultValue: 60 },
    { key: 'disabled', label: 'disabled', kind: 'boolean', defaultValue: false },
    { key: 'invalid', label: 'invalid', kind: 'boolean', defaultValue: false },
  ];

  protected buildPlaygroundSnippet = (values: PlaygroundValues): readonly CodeTab[] => {
    const color = values['color'] as string;
    const size = values['size'] as string;
    const minLabel = values['minLabel'] as string;
    const maxLabel = values['maxLabel'] as string;
    const min = values['min'] as number;
    const max = values['max'] as number;
    const step = values['step'] as number;
    const value = values['value'] as number;
    const disabled = values['disabled'] as boolean;
    const invalid = values['invalid'] as boolean;

    const attrs = [
      `min="${min}"`,
      `max="${max}"`,
      `step="${step}"`,
      `value="${value}"`,
      color !== 'primary' ? `color="${color}"` : null,
      size !== 'md' ? `size="${size}"` : null,
      minLabel ? `minLabel="${this.escapeHtml(minLabel)}"` : null,
      maxLabel ? `maxLabel="${this.escapeHtml(maxLabel)}"` : null,
      disabled ? 'disabled' : null,
      invalid ? 'invalid' : null,
    ].filter((attr): attr is string => attr !== null);

    return [
      {
        label: 'HTML',
        language: 'html',
        code: `<input type="range" kuiSlider ${attrs.join(' ')} />`,
      },
    ];
  };

  private escapeHtml(value: string): string {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  protected colorOf(values: PlaygroundValues): KuiSliderColor {
    return values['color'] as KuiSliderColor;
  }

  protected sizeOf(values: PlaygroundValues): KuiSliderSize {
    return values['size'] as KuiSliderSize;
  }

  protected minLabelOf(values: PlaygroundValues): string {
    return values['minLabel'] as string;
  }

  protected maxLabelOf(values: PlaygroundValues): string {
    return values['maxLabel'] as string;
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

  protected valueOf(values: PlaygroundValues): string {
    return String(values['value'] as number);
  }

  protected disabledOf(values: PlaygroundValues): boolean {
    return values['disabled'] as boolean;
  }

  protected invalidOf(values: PlaygroundValues): boolean {
    return values['invalid'] as boolean;
  }
}
