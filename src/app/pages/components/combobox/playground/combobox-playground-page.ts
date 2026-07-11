import { Component, computed, signal } from '@angular/core';
import {
  KuiComboboxDirective,
  KuiDropdownComponent,
  KuiFieldComponent,
  KuiOptionDirective,
} from '@kikita-labs/ui';
import { ApiPlayground } from '../../../../shared/docs-ui/api-playground/api-playground';
import {
  PlaygroundControl,
  PlaygroundValues,
} from '../../../../shared/docs-ui/api-playground/playground-control';
import { ApiTable } from '../../../../shared/docs-ui/api-table/api-table';
import { KIKITA_UI_PACKAGE_VERSION } from '../../../../core/package/kikita-ui-package-version';
import { CodeTab } from '../../../../shared/docs-ui/code-tabs/code-tab';
import { COMBOBOX_API_ROWS } from '../combobox.api-schema';

interface Person {
  readonly id: string;
  readonly name: string;
}

const PEOPLE: readonly Person[] = [
  { id: 'amelia', name: 'Amelia Novak' },
  { id: 'daniel', name: 'Daniel Kowalski' },
  { id: 'harper', name: 'Harper Singh' },
  { id: 'ines', name: 'Ines Delacroix' },
  { id: 'ravi', name: 'Ravi Patel' },
];

@Component({
  selector: 'app-combobox-playground-page',
  imports: [
    ApiPlayground,
    ApiTable,
    KuiComboboxDirective,
    KuiDropdownComponent,
    KuiFieldComponent,
    KuiOptionDirective,
  ],
  templateUrl: './combobox-playground-page.html',
  styleUrl: './combobox-playground-page.scss',
})
export class ComboboxPlaygroundPage {
  protected readonly apiDescription = `Inputs and outputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;
  protected readonly apiRows = COMBOBOX_API_ROWS;
  protected readonly people = PEOPLE;

  protected readonly value = signal<Person | string | null>(null);
  protected readonly query = signal('');

  protected readonly personLabel = (person: Person) => person.name;

  protected readonly filteredPeople = computed(() => {
    const q = this.query().toLocaleLowerCase();

    return q ? PEOPLE.filter((person) => person.name.toLocaleLowerCase().includes(q)) : PEOPLE;
  });

  protected readonly playgroundControls: readonly PlaygroundControl[] = [
    { key: 'placeholder', label: 'placeholder', kind: 'string', defaultValue: 'Search people...' },
    {
      key: 'mode',
      label: 'mode',
      kind: 'enum',
      options: ['filter', 'free', 'async'],
      defaultValue: 'filter',
    },
    { key: 'clearable', label: 'clearable', kind: 'boolean', defaultValue: true },
    { key: 'loading', label: 'loading', kind: 'boolean', defaultValue: false },
    { key: 'disabled', label: 'disabled', kind: 'boolean', defaultValue: false },
    { key: 'readonly', label: 'readonly', kind: 'boolean', defaultValue: false },
    { key: 'invalid', label: 'invalid', kind: 'boolean', defaultValue: false },
  ];

  protected buildPlaygroundSnippet = (values: PlaygroundValues): readonly CodeTab[] => {
    const placeholder = values['placeholder'] as string;
    const mode = values['mode'] as string;
    const clearable = values['clearable'] as boolean;
    const loading = values['loading'] as boolean;
    const disabled = values['disabled'] as boolean;
    const readonlyInput = values['readonly'] as boolean;
    const invalid = values['invalid'] as boolean;

    const attrs = [
      mode !== 'filter' ? `mode="${mode}"` : null,
      placeholder ? `placeholder="${this.escapeHtml(placeholder)}"` : null,
      clearable ? '[clearable]="true"' : '[clearable]="false"',
      loading ? '[loading]="true"' : null,
      disabled ? 'disabled' : null,
      readonlyInput ? 'readonly' : null,
      invalid ? 'invalid' : null,
    ].filter((attr): attr is string => attr !== null);

    const attrString = attrs.length > 0 ? `\n    ${attrs.join('\n    ')}` : '';

    return [
      {
        label: 'HTML',
        language: 'html',
        code: `<kui-field label="Assignee">
  <input
    kuiCombobox
    [(value)]="assignee"
    [(query)]="query"
    [kuiLabelFn]="personLabel"${attrString}
  />
  <kui-dropdown>
    @for (person of filteredPeople(); track person.id) {
      <button kuiOption [value]="person">{{ person.name }}</button>
    }
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

  protected modeOf(values: PlaygroundValues): 'filter' | 'free' | 'async' {
    return values['mode'] as 'filter' | 'free' | 'async';
  }

  protected clearableOf(values: PlaygroundValues): boolean {
    return values['clearable'] as boolean;
  }

  protected loadingOf(values: PlaygroundValues): boolean {
    return values['loading'] as boolean;
  }

  protected disabledOf(values: PlaygroundValues): boolean {
    return values['disabled'] as boolean;
  }

  protected readonlyOf(values: PlaygroundValues): boolean {
    return values['readonly'] as boolean;
  }

  protected invalidOf(values: PlaygroundValues): boolean {
    return values['invalid'] as boolean;
  }
}
