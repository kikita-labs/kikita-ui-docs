import { Component, inject } from '@angular/core';

import {
  KUI_DIALOG_CONTEXT,
  KuiButton,
  type KuiDialogContext,
  type KuiDialogHost,
} from '@kikita-labs/ui';

export interface SizePreviewData {
  readonly size: string;
}

@Component({
  selector: 'app-size-preview-dialog',
  imports: [KuiButton],
  templateUrl: './size-preview-dialog.html',
})
export class SizePreviewDialog implements KuiDialogHost<void, SizePreviewData> {
  public readonly dialogContext =
    inject<KuiDialogContext<void, SizePreviewData>>(KUI_DIALOG_CONTEXT);
}
