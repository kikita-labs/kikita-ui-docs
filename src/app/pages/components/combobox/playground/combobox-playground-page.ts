import { Component, computed, signal } from '@angular/core';

import {
  KuiComboboxDirective,
  KuiDropdownComponent,
  KuiFieldComponent,
  KuiOptionDirective,
} from '@kikita-labs/ui';

import { ApiPlayground } from '@shared/docs-ui/api-playground';
import {
  definePlaygroundControls,
  type PlaygroundValues,
  serializePlaygroundAttributes,
} from '@shared/docs-ui/api-playground';
import { ApiTable } from '@shared/docs-ui/api-table';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

import { COMBOBOX_API_ROWS } from '../combobox.api-schema';
import { COMBOBOX_API_DESCRIPTION } from '../combobox.docs-content';

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

const COMBOBOX_PLAYGROUND_CONTROLS = definePlaygroundControls([
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
] as const);

type ComboboxPlaygroundValues = PlaygroundValues<typeof COMBOBOX_PLAYGROUND_CONTROLS>;

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
  protected readonly apiDescription = COMBOBOX_API_DESCRIPTION;
  protected readonly apiRows = COMBOBOX_API_ROWS;
  protected readonly people = PEOPLE;

  protected readonly value = signal<Person | string | null>(null);
  protected readonly query = signal('');

  protected readonly personLabel = (person: Person) => person.name;

  protected readonly filteredPeople = computed(() => {
    const q = this.query().toLocaleLowerCase();

    return q ? PEOPLE.filter((person) => person.name.toLocaleLowerCase().includes(q)) : PEOPLE;
  });

  protected readonly playgroundControls = COMBOBOX_PLAYGROUND_CONTROLS;

  protected readonly buildPlaygroundSnippet = (
    values: ComboboxPlaygroundValues,
  ): readonly CodeTab[] => {
    const attrString = serializePlaygroundAttributes([
      { name: 'mode', value: values.mode, defaultValue: 'filter' },
      { name: 'placeholder', value: values.placeholder },
      { name: '[clearable]', value: values.clearable ? 'true' : 'false' },
      { name: '[loading]', value: values.loading ? 'true' : null },
      { name: 'disabled', value: values.disabled },
      { name: 'readonly', value: values.readonly },
      { name: 'invalid', value: values.invalid },
    ]);

    return [
      {
        label: 'HTML',
        language: 'html',
        code: `<kui-field label="Assignee">
  <input kuiCombobox [(value)]="assignee" [(query)]="query" [kuiLabelFn]="personLabel"${attrString} />
  <kui-dropdown>
    @for (person of filteredPeople(); track person.id) {
      <button kuiOption [value]="person">{{ person.name }}</button>
    }
  </kui-dropdown>
</kui-field>`,
      },
    ];
  };

  protected placeholderOf(values: ComboboxPlaygroundValues): string {
    return values.placeholder;
  }

  protected modeOf(values: ComboboxPlaygroundValues): 'filter' | 'free' | 'async' {
    return values.mode;
  }

  protected clearableOf(values: ComboboxPlaygroundValues): boolean {
    return values.clearable;
  }

  protected loadingOf(values: ComboboxPlaygroundValues): boolean {
    return values.loading;
  }

  protected disabledOf(values: ComboboxPlaygroundValues): boolean {
    return values.disabled;
  }

  protected readonlyOf(values: ComboboxPlaygroundValues): boolean {
    return values.readonly;
  }

  protected invalidOf(values: ComboboxPlaygroundValues): boolean {
    return values.invalid;
  }
}
