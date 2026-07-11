import { Component, signal } from '@angular/core';
import {
  KuiComboboxDirective,
  KuiDropdownComponent,
  KuiFieldComponent,
  KuiOptionDirective,
} from '@kikita-labs/ui';

interface Person {
  readonly id: string;
  readonly name: string;
}

const ALL_REVIEWERS: readonly Person[] = [
  { id: 'amelia', name: 'Amelia Novak' },
  { id: 'daniel', name: 'Daniel Kowalski' },
  { id: 'harper', name: 'Harper Singh' },
  { id: 'ines', name: 'Ines Delacroix' },
  { id: 'ravi', name: 'Ravi Patel' },
];

@Component({
  selector: 'app-async-combobox-example',
  imports: [KuiComboboxDirective, KuiDropdownComponent, KuiFieldComponent, KuiOptionDirective],
  templateUrl: './async-combobox-example.html',
  styleUrl: './async-combobox-example.scss',
})
export class AsyncComboboxExample {
  protected readonly reviewer = signal<Person | null>(null);
  protected readonly reviewerQuery = signal('');
  protected readonly reviewers = signal<readonly Person[]>(ALL_REVIEWERS);
  protected readonly loading = signal(false);

  protected readonly personLabel = (person: Person) => person.name;

  protected loadReviewers(query: string): void {
    this.loading.set(true);

    window.setTimeout(() => {
      const q = query.toLocaleLowerCase();

      this.reviewers.set(
        q ? ALL_REVIEWERS.filter((person) => person.name.toLocaleLowerCase().includes(q)) : ALL_REVIEWERS,
      );
      this.loading.set(false);
    }, 400);
  }
}
