import { Component, signal } from '@angular/core';

import { KuiDropdown, KuiField, KuiOption, KuiSelect } from '@kikita-labs/ui';

interface Role {
  readonly id: number;
  readonly label: string;
}

@Component({
  selector: 'app-object-value-select-example',
  imports: [KuiDropdown, KuiField, KuiOption, KuiSelect],
  templateUrl: './object-value-select-example.html',
  styleUrl: './object-value-select-example.scss',
})
export class ObjectValueSelectExample {
  protected readonly roles: readonly Role[] = [
    { id: 1, label: 'Software Engineer' },
    { id: 2, label: 'Designer' },
    { id: 3, label: 'Product Manager' },
  ];

  protected readonly role = signal<Role | null>(this.roles[0] ?? null);

  protected readonly roleLabel = (role: Role): string => role.label;
}
