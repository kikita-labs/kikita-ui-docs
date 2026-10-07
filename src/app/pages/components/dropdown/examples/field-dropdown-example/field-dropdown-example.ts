import { Component, signal } from '@angular/core';

import { KuiDropdown, KuiField, KuiOption, KuiSelect } from '@kikita-labs/ui';

@Component({
  selector: 'app-field-dropdown-example',
  imports: [KuiDropdown, KuiField, KuiOption, KuiSelect],
  templateUrl: './field-dropdown-example.html',
})
export class FieldDropdownExample {
  protected readonly fruit = signal<string | null>(null);
}
