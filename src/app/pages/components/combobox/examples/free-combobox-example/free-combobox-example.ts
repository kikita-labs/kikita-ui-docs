import { Component, signal } from '@angular/core';
import {
  KuiComboboxDirective,
  KuiDropdownComponent,
  KuiFieldComponent,
  KuiOptionDirective,
} from '@kikita-labs/ui';

@Component({
  selector: 'app-free-combobox-example',
  imports: [KuiComboboxDirective, KuiDropdownComponent, KuiFieldComponent, KuiOptionDirective],
  templateUrl: './free-combobox-example.html',
  styleUrl: './free-combobox-example.scss',
})
export class FreeComboboxExample {
  protected readonly tag = signal<string | null>(null);
}
