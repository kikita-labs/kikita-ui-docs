import { Component, signal } from '@angular/core';

import { KuiCombobox, KuiDropdown, KuiField, KuiOption } from '@kikita-labs/ui';

@Component({
  selector: 'app-free-combobox-example',
  imports: [KuiCombobox, KuiDropdown, KuiField, KuiOption],
  templateUrl: './free-combobox-example.html',
  styleUrl: './free-combobox-example.scss',
})
export class FreeComboboxExample {
  protected readonly tag = signal<string | null>(null);
}
