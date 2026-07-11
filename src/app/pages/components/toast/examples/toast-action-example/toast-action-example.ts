import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { KuiButtonDirective, kuiToast } from '@kikita-labs/ui';

@Component({
  selector: 'app-toast-action-example',
  imports: [KuiButtonDirective],
  templateUrl: './toast-action-example.html',
  styleUrl: './toast-action-example.scss',
})
export class ToastActionExample {
  private readonly toast = kuiToast();
  private readonly destroyRef = inject(DestroyRef);

  protected deleteMessage(): void {
    const ref = this.toast.open({
      title: 'Message deleted',
      actionLabel: 'Undo',
      duration: 6000,
    });

    ref.action$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.undoDelete());
  }

  private undoDelete(): void {
    this.toast.open({ title: 'Delete undone', appearance: 'success' });
  }
}
