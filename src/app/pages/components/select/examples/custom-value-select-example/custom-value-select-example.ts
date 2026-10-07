import { Component, signal } from '@angular/core';

import {
  KuiChip,
  KuiChipRemove,
  KuiDropdown,
  KuiField,
  KuiOption,
  KuiSelect,
  KuiSelectValue,
} from '@kikita-labs/ui';

interface RoleOption {
  readonly label: string;
  readonly value: string;
}

@Component({
  selector: 'app-custom-value-select-example',
  imports: [KuiChip, KuiChipRemove, KuiDropdown, KuiField, KuiOption, KuiSelect, KuiSelectValue],
  templateUrl: './custom-value-select-example.html',
  styleUrl: './custom-value-select-example.scss',
})
export class CustomValueSelectExample {
  protected readonly roles = signal<readonly string[]>(['engineer', 'designer']);

  protected readonly roleOptions: readonly RoleOption[] = [
    { label: 'Software Engineer', value: 'engineer' },
    { label: 'Designer', value: 'designer' },
    { label: 'Product Manager', value: 'manager' },
  ];

  protected readonly roleLabel = (value: string): string =>
    this.roleOptions.find((role) => role.value === value)?.label ?? value;
}
