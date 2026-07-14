import { Component, computed, signal } from '@angular/core';

import {
  KuiComboboxDirective,
  KuiComboboxHighlightPipe,
  KuiDropdownComponent,
  KuiFieldComponent,
  KuiOptionDirective,
} from '@kikita-labs/ui';

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
  selector: 'app-basic-combobox-example',
  imports: [
    KuiComboboxDirective,
    KuiComboboxHighlightPipe,
    KuiDropdownComponent,
    KuiFieldComponent,
    KuiOptionDirective,
  ],
  templateUrl: './basic-combobox-example.html',
  styleUrl: './basic-combobox-example.scss',
})
export class BasicComboboxExample {
  protected readonly assignee = signal<Person | null>(null);
  protected readonly query = signal('');

  protected readonly personLabel = (person: Person) => person.name;

  protected readonly filteredPeople = computed(() => {
    const q = this.query().toLocaleLowerCase();

    return q ? PEOPLE.filter((person) => person.name.toLocaleLowerCase().includes(q)) : PEOPLE;
  });
}
