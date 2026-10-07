import { Component, signal } from '@angular/core';

import { KuiDropdown, KuiField, KuiOption, KuiSelect } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-select-example',
  imports: [KuiDropdown, KuiField, KuiOption, KuiSelect],
  templateUrl: './basic-select-example.html',
  styleUrl: './basic-select-example.scss',
})
export class BasicSelectExample {
  protected readonly role = signal<string | null>(null);
}
