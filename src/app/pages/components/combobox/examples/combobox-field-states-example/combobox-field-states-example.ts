import { Component, signal } from '@angular/core';

import {
  KuiComboboxDirective,
  KuiDropdownComponent,
  KuiFieldComponent,
  KuiOptionDirective,
} from '@kikita-labs/ui';

@Component({
  selector: 'app-combobox-field-states-example',
  imports: [KuiComboboxDirective, KuiDropdownComponent, KuiFieldComponent, KuiOptionDirective],
  templateUrl: './combobox-field-states-example.html',
  styleUrl: './combobox-field-states-example.scss',
})
export class ComboboxFieldStatesExample {
  protected readonly disabledOwner = signal<string | null>('engineer');
  protected readonly invalidOwner = signal<string | null>(null);
}
