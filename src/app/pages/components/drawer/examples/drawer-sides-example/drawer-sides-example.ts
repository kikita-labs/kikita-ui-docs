import { Component } from '@angular/core';
import { KuiButtonDirective, KuiDrawerSide, kuiDrawer } from '@kikita-labs/ui';
import { SidePreviewDrawer } from './side-preview-drawer';

@Component({
  selector: 'app-drawer-sides-example',
  imports: [KuiButtonDirective],
  templateUrl: './drawer-sides-example.html',
  styleUrl: './drawer-sides-example.scss',
})
export class DrawerSidesExample {
  protected readonly sides: readonly KuiDrawerSide[] = ['top', 'right', 'bottom', 'left'];

  private readonly openers = new Map(
    this.sides.map((side) => [side, kuiDrawer(SidePreviewDrawer, { side, size: 'sm' })]),
  );

  protected open(side: KuiDrawerSide): void {
    this.openers.get(side)?.(undefined);
  }
}
