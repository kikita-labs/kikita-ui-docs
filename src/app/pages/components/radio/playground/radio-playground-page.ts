import { Component } from '@angular/core';
import { KuiFieldComponent, KuiRadioDirective, KuiSize } from '@kikita-labs/ui';
import { ApiPlayground } from '../../../../shared/docs-ui/api-playground/api-playground';
import {
  PlaygroundControl,
  PlaygroundValues,
} from '../../../../shared/docs-ui/api-playground/playground-control';
import { ApiTable } from '../../../../shared/docs-ui/api-table/api-table';
import { KIKITA_UI_PACKAGE_VERSION } from '../../../../core/package/kikita-ui-package-version';
import { CodeTab } from '../../../../shared/docs-ui/code-tabs/code-tab';
import { RADIO_API_ROWS } from '../radio.api-schema';

@Component({
  selector: 'app-radio-playground-page',
  imports: [ApiPlayground, ApiTable, KuiFieldComponent, KuiRadioDirective],
  templateUrl: './radio-playground-page.html',
  styleUrl: './radio-playground-page.scss',
})
export class RadioPlaygroundPage {
  protected readonly apiDescription = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;
  protected readonly apiRows = RADIO_API_ROWS;

  protected readonly playgroundControls: readonly PlaygroundControl[] = [
    { key: 'label', label: 'group label', kind: 'string', defaultValue: 'Plan' },
    { key: 'firstOption', label: 'first option', kind: 'string', defaultValue: 'Starter' },
    { key: 'secondOption', label: 'second option', kind: 'string', defaultValue: 'Pro' },
    {
      key: 'size',
      label: 'size',
      kind: 'enum',
      options: ['xs', 'sm', 'md', 'lg'],
      defaultValue: 'md',
    },
    { key: 'invalid', label: 'invalid', kind: 'boolean', defaultValue: false },
    { key: 'disabled', label: 'disabled (second option)', kind: 'boolean', defaultValue: false },
  ];

  protected buildPlaygroundSnippet = (values: PlaygroundValues): readonly CodeTab[] => {
    const label = this.labelOf(values);
    const firstOption = this.firstOptionOf(values);
    const secondOption = this.secondOptionOf(values);
    const size = this.sizeOf(values);
    const invalid = this.invalidOf(values);
    const disabled = this.disabledOf(values);

    const sizeAttr = size !== 'md' ? ` size="${size}"` : '';
    const invalidAttr = invalid ? ' invalid' : '';
    const disabledAttr = disabled ? ' disabled' : '';

    return [
      {
        label: 'HTML',
        language: 'html',
        code: `<kui-field label="${this.escapeHtml(label || 'Plan')}">
  <div role="radiogroup" aria-label="${this.escapeHtml(label || 'Plan')}">
    <label>
      <input kuiRadio type="radio" name="playground-radio"${sizeAttr}${invalidAttr} checked />
      ${this.escapeHtml(firstOption || 'Starter')}
    </label>
    <label>
      <input kuiRadio type="radio" name="playground-radio"${sizeAttr}${invalidAttr}${disabledAttr} />
      ${this.escapeHtml(secondOption || 'Pro')}
    </label>
  </div>
</kui-field>`,
      },
    ];
  };

  protected labelOf(values: PlaygroundValues): string {
    return (values['label'] as string) || 'Plan';
  }

  protected firstOptionOf(values: PlaygroundValues): string {
    return (values['firstOption'] as string) || 'Starter';
  }

  protected secondOptionOf(values: PlaygroundValues): string {
    return (values['secondOption'] as string) || 'Pro';
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

  private escapeHtml(value: string): string {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
}
