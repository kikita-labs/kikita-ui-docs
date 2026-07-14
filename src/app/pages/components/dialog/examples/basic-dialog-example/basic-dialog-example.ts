import { Component, DestroyRef, inject, signal } from '@angular/core';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { KuiButtonDirective, kuiDialog } from '@kikita-labs/ui';

import { InviteTeammateDialog } from './invite-teammate-dialog';

@Component({
  selector: 'app-basic-dialog-example',
  imports: [KuiButtonDirective],
  templateUrl: './basic-dialog-example.html',
  styleUrl: './basic-dialog-example.scss',
})
export class BasicDialogExample {
  private readonly destroyRef = inject(DestroyRef);
  private readonly openInvite = kuiDialog(InviteTeammateDialog, { size: 'sm' });

  protected readonly lastResult = signal<string | null>(null);

  protected invite(): void {
    this.openInvite({ teamName: 'Docs' })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => this.lastResult.set(result ?? 'dismissed'));
  }
}
