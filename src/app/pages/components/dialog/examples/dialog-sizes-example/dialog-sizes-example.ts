import { Component } from '@angular/core';
import { KuiButtonDirective, KuiDialogSize, kuiDialog } from '@kikita-labs/ui';
import { SizePreviewDialog } from './size-preview-dialog';

@Component({
  selector: 'app-dialog-sizes-example',
  imports: [KuiButtonDirective],
  templateUrl: './dialog-sizes-example.html',
  styleUrl: './dialog-sizes-example.scss',
})
export class DialogSizesExample {
  protected readonly sizes: readonly KuiDialogSize[] = ['auto', 'sm', 'md', 'lg'];

  private readonly openers = new Map(
    this.sizes.map((size) => [size, kuiDialog(SizePreviewDialog, { size })]),
  );

  protected open(size: KuiDialogSize): void {
    this.openers.get(size)?.({ size });
  }
}
