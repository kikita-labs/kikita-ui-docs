import { Component, DestroyRef, inject, signal } from '@angular/core';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { KuiButtonDirective, kuiConfirm } from '@kikita-labs/ui';

@Component({
  selector: 'app-dialog-confirm-example',
  imports: [KuiButtonDirective],
  templateUrl: './dialog-confirm-example.html',
  styleUrl: './dialog-confirm-example.scss',
})
export class DialogConfirmExample {
  private readonly destroyRef = inject(DestroyRef);
  private readonly confirm = kuiConfirm();

  protected readonly lastResult = signal<string | null>(null);

  protected deleteRecord(): void {
    this.confirm({
      title: 'Delete record?',
      message: 'This action cannot be undone.',
      appearance: 'danger',
      confirmLabel: 'Delete',
    })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((ok) => this.lastResult.set(ok ? 'confirmed' : 'cancelled'));
  }
}
