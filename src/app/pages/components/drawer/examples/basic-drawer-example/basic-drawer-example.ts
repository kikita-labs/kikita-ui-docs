import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { KuiButtonDirective, kuiDrawer } from '@kikita-labs/ui';
import { EditItemDrawer } from './edit-item-drawer';

@Component({
  selector: 'app-basic-drawer-example',
  imports: [KuiButtonDirective],
  templateUrl: './basic-drawer-example.html',
  styleUrl: './basic-drawer-example.scss',
})
export class BasicDrawerExample {
  private readonly destroyRef = inject(DestroyRef);
  private readonly openEditItem = kuiDrawer(EditItemDrawer, { side: 'right', size: 'md' });

  protected readonly lastResult = signal<string | null>(null);

  protected edit(): void {
    this.openEditItem({ id: 'item-42' })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => this.lastResult.set(result ?? 'dismissed'));
  }
}
