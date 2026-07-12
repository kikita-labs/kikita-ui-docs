import { Component, signal } from '@angular/core';
import {
  KuiDropdownComponent,
  KuiFieldComponent,
  KuiOptionDirective,
  KuiSelectDirective,
} from '@kikita-labs/ui';

@Component({
  selector: 'app-field-dropdown-example',
  imports: [KuiDropdownComponent, KuiFieldComponent, KuiOptionDirective, KuiSelectDirective],
  templateUrl: './field-dropdown-example.html',
})
export class FieldDropdownExample {
  protected readonly fruit = signal<string | null>(null);
}
