import { Component, signal } from '@angular/core';

import { KuiChip } from '@kikita-labs/ui';

@Component({
  selector: 'app-removable-chip-example',
  imports: [KuiChip],
  templateUrl: './removable-chip-example.html',
  styleUrl: './removable-chip-example.scss',
})
export class RemovableChipExample {
  protected readonly tags = signal(['Design', 'Engineering', 'Product']);

  protected removeTag(tag: string): void {
    this.tags.update((current) => current.filter((existing) => existing !== tag));
  }
}
