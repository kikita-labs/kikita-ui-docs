import { Component, effect, signal, untracked, viewChild } from '@angular/core';
import {
  KuiDropdownComponent,
  KuiFieldComponent,
  KuiOptionDirective,
  KuiSelectDirective,
} from '@kikita-labs/ui';
import { ApiPlayground } from '../../../../shared/docs-ui/api-playground/api-playground';
import {
  PlaygroundControl,
  PlaygroundValues,
} from '../../../../shared/docs-ui/api-playground/playground-control';
import { ApiTable } from '../../../../shared/docs-ui/api-table/api-table';
import { KIKITA_UI_PACKAGE_VERSION } from '../../../../core/package/kikita-ui-package-version';
import { CodeTab } from '../../../../shared/docs-ui/code-tabs/code-tab';
import { SELECT_API_ROWS } from '../select.api-schema';

interface RoleOption {
  readonly value: string;
  readonly label: string;
}

const ROLE_OPTIONS: readonly RoleOption[] = [
  { value: 'engineer', label: 'Software Engineer' },
  { value: 'designer', label: 'Designer' },
  { value: 'manager', label: 'Product Manager' },
];

@Component({
  selector: 'app-select-playground-page',
  imports: [
    ApiPlayground,
    ApiTable,
    KuiDropdownComponent,
    KuiFieldComponent,
    KuiOptionDirective,
    KuiSelectDirective,
  ],
  templateUrl: './select-playground-page.html',
  styleUrl: './select-playground-page.scss',
})
export class SelectPlaygroundPage {
  private readonly playgroundRef = viewChild<ApiPlayground>('playground');
  private previousMultiple: boolean | null = null;

  protected readonly apiDescription = `Inputs and outputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;
  protected readonly apiRows = SELECT_API_ROWS;
  protected readonly roleOptions = ROLE_OPTIONS;
  protected readonly value = signal<string | readonly string[] | null>(null);

  protected readonly playgroundControls: readonly PlaygroundControl[] = [
    { key: 'placeholder', label: 'placeholder', kind: 'string', defaultValue: 'Select a role...' },
    { key: 'multiple', label: 'multiple', kind: 'boolean', defaultValue: false },
    { key: 'disabled', label: 'disabled', kind: 'boolean', defaultValue: false },
    { key: 'readonly', label: 'readonly', kind: 'boolean', defaultValue: false },
    { key: 'clearable', label: 'clearable', kind: 'boolean', defaultValue: false },
    { key: 'maxVisibleChips', label: 'maxVisibleChips', kind: 'number', defaultValue: 3 },
    {
      key: 'multipleDisplay',
      label: 'multipleDisplay',
      kind: 'enum',
      options: ['chips', 'text'],
      defaultValue: 'chips',
    },
  ];

  constructor() {
    effect(() => {
      const playground = this.playgroundRef();

      if (!playground) {
        return;
      }

      const multiple = Boolean(playground.values()['multiple']);

      untracked(() => {
        if (this.previousMultiple !== multiple) {
          this.previousMultiple = multiple;
          this.value.set(multiple ? [] : null);
        }
      });
    });
  }

  protected buildPlaygroundSnippet = (values: PlaygroundValues): readonly CodeTab[] => {
    const placeholder = values['placeholder'] as string;
    const multiple = values['multiple'] as boolean;
    const disabled = values['disabled'] as boolean;
    const readonlyInput = values['readonly'] as boolean;
    const clearable = values['clearable'] as boolean;
    const maxVisibleChips = values['maxVisibleChips'] as number;
    const multipleDisplay = values['multipleDisplay'] as string;

    const attrs = [
      multiple ? 'multiple' : null,
      multiple && multipleDisplay !== 'chips' ? `multipleDisplay="${multipleDisplay}"` : null,
      multiple && maxVisibleChips !== 3 ? `[maxVisibleChips]="${maxVisibleChips}"` : null,
      placeholder ? `placeholder="${this.escapeHtml(placeholder)}"` : null,
      clearable ? '[clearable]="true"' : null,
      disabled ? 'disabled' : null,
      readonlyInput ? 'readonly' : null,
    ].filter((attr): attr is string => attr !== null);

    const attrString = attrs.length > 0 ? `\n    ${attrs.join('\n    ')}` : '';

    return [
      {
        label: 'HTML',
        language: 'html',
        code: `<kui-field label="Role">
  <input
    kuiSelect
    [(value)]="role"${attrString}
  />
  <kui-dropdown>
    <div kuiOption value="engineer">Software Engineer</div>
    <div kuiOption value="designer">Designer</div>
    <div kuiOption value="manager">Product Manager</div>
  </kui-dropdown>
</kui-field>`,
      },
    ];
  };

  private escapeHtml(value: string): string {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  protected placeholderOf(values: PlaygroundValues): string {
    return values['placeholder'] as string;
  }

  protected multipleOf(values: PlaygroundValues): boolean {
    return values['multiple'] as boolean;
  }

  protected disabledOf(values: PlaygroundValues): boolean {
    return values['disabled'] as boolean;
  }

  protected readonlyOf(values: PlaygroundValues): boolean {
    return values['readonly'] as boolean;
  }

  protected clearableOf(values: PlaygroundValues): boolean {
    return values['clearable'] as boolean;
  }

  protected maxVisibleChipsOf(values: PlaygroundValues): number {
    return values['maxVisibleChips'] as number;
  }

  protected multipleDisplayOf(values: PlaygroundValues): 'chips' | 'text' {
    return values['multipleDisplay'] as 'chips' | 'text';
  }
}
