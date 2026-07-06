import { Component, signal } from '@angular/core';
import {
  KuiDropdownComponent,
  KuiFieldComponent,
  KuiOptionDirective,
  KuiSelectDirective,
} from '@kikita-labs/ui';

interface RoleOption {
  readonly label: string;
  readonly value: string;
}

@Component({
  selector: 'app-multiple-select-example',
  imports: [KuiDropdownComponent, KuiFieldComponent, KuiOptionDirective, KuiSelectDirective],
  templateUrl: './multiple-select-example.html',
  styleUrl: './multiple-select-example.scss',
})
export class MultipleSelectExample {
  protected readonly roles = signal<readonly string[]>(['engineer']);

  protected readonly roleOptions: readonly RoleOption[] = [
    { label: 'Software Engineer', value: 'engineer' },
    { label: 'Designer', value: 'designer' },
    { label: 'Product Manager', value: 'manager' },
    { label: 'Support Lead', value: 'support' },
  ];

  protected readonly roleLabel = (value: string): string =>
    this.roleOptions.find((role) => role.value === value)?.label ?? value;
}
