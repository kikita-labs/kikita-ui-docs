import { Component, signal } from '@angular/core';

import { KuiCombobox, KuiDropdown, KuiField, KuiOption } from '@kikita-labs/ui';

@Component({
  selector: 'app-combobox-field-states-example',
  imports: [KuiCombobox, KuiDropdown, KuiField, KuiOption],
  templateUrl: './combobox-field-states-example.html',
  styleUrl: './combobox-field-states-example.scss',
})
export class ComboboxFieldStatesExample {
  protected readonly disabledOwner = signal<string | null>('engineer');
  protected readonly invalidOwner = signal<string | null>(null);
}
