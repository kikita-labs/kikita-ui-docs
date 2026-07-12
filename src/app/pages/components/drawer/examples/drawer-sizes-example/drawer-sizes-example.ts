import { Component } from '@angular/core';
import { KuiButtonDirective, KuiDrawerSize, kuiDrawer } from '@kikita-labs/ui';
import { SizePreviewDrawer } from './size-preview-drawer';

@Component({
  selector: 'app-drawer-sizes-example',
  imports: [KuiButtonDirective],
  templateUrl: './drawer-sizes-example.html',
  styleUrl: './drawer-sizes-example.scss',
})
export class DrawerSizesExample {
  protected readonly sizes: readonly KuiDrawerSize[] = ['sm', 'md', 'lg', 'full'];

  private readonly openers = new Map(
    this.sizes.map((size) => [size, kuiDrawer(SizePreviewDrawer, { side: 'right', size })]),
  );

  protected open(size: KuiDrawerSize): void {
    this.openers.get(size)?.(undefined);
  }
}
