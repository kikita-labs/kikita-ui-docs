import { Component, signal } from '@angular/core';
import {
  KuiDropdownComponent,
  KuiFieldComponent,
  KuiOptionDirective,
  KuiSelectDirective,
} from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-select-example',
  imports: [KuiDropdownComponent, KuiFieldComponent, KuiOptionDirective, KuiSelectDirective],
  templateUrl: './basic-select-example.html',
  styleUrl: './basic-select-example.scss',
})
export class BasicSelectExample {
  protected readonly role = signal<string | null>(null);
}
