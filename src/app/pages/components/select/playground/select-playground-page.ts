import { Component, signal } from '@angular/core';

import {
  KuiDropdownComponent,
  KuiFieldComponent,
  KuiOptionDirective,
  KuiSelectDirective,
} from '@kikita-labs/ui';

import { ApiPlayground } from '@shared/docs-ui/api-playground';
import {
  definePlaygroundControls,
  type PlaygroundValues,
  serializePlaygroundAttributes,
} from '@shared/docs-ui/api-playground';
import { ApiTable } from '@shared/docs-ui/api-table';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

import { SELECT_API_ROWS } from '../select.api-schema';
import { SELECT_API_DESCRIPTION } from '../select.docs-content';

interface RoleOption {
  readonly value: string;
  readonly label: string;
}

const ROLE_OPTIONS: readonly RoleOption[] = [
  { value: 'engineer', label: 'Software Engineer' },
  { value: 'designer', label: 'Designer' },
  { value: 'manager', label: 'Product Manager' },
];

const SELECT_PLAYGROUND_CONTROLS = definePlaygroundControls([
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
] as const);

type SelectPlaygroundValues = PlaygroundValues<typeof SELECT_PLAYGROUND_CONTROLS>;

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
  protected readonly apiDescription = SELECT_API_DESCRIPTION;
  protected readonly apiRows = SELECT_API_ROWS;
  protected readonly roleOptions = ROLE_OPTIONS;
  protected readonly value = signal<string | readonly string[] | null>(null);

  protected readonly playgroundControls = SELECT_PLAYGROUND_CONTROLS;

  protected readonly buildPlaygroundSnippet = (
    values: SelectPlaygroundValues,
  ): readonly CodeTab[] => {
    const attrString = serializePlaygroundAttributes([
      { name: 'multiple', value: values.multiple },
      {
        name: 'multipleDisplay',
        value: values.multiple ? values.multipleDisplay : null,
        defaultValue: 'chips',
      },
      {
        name: '[maxVisibleChips]',
        value: values.multiple ? values.maxVisibleChips : null,
        defaultValue: 3,
      },
      { name: 'placeholder', value: values.placeholder },
      { name: '[clearable]', value: values.clearable ? 'true' : null },
      { name: 'disabled', value: values.disabled },
      { name: 'readonly', value: values.readonly },
    ]);
    return [
      {
        label: 'HTML',
        language: 'html',
        code: `<kui-field label="Role">
  <input kuiSelect [(value)]="role"${attrString} />
  <kui-dropdown>
    <div kuiOption value="engineer">Software Engineer</div>
    <div kuiOption value="designer">Designer</div>
    <div kuiOption value="manager">Product Manager</div>
  </kui-dropdown>
</kui-field>`,
      },
    ];
  };

  protected placeholderOf(values: SelectPlaygroundValues): string {
    return values.placeholder;
  }

  protected multipleOf(values: SelectPlaygroundValues): boolean {
    return values.multiple;
  }

  protected disabledOf(values: SelectPlaygroundValues): boolean {
    return values.disabled;
  }

  protected readonlyOf(values: SelectPlaygroundValues): boolean {
    return values.readonly;
  }

  protected clearableOf(values: SelectPlaygroundValues): boolean {
    return values.clearable;
  }

  protected maxVisibleChipsOf(values: SelectPlaygroundValues): number {
    return values.maxVisibleChips;
  }

  protected multipleDisplayOf(values: SelectPlaygroundValues): 'chips' | 'text' {
    return values.multipleDisplay;
  }
}
