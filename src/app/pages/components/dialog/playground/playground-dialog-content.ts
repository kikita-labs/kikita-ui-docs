import { Component, inject } from '@angular/core';

import {
  KUI_DIALOG_CONTEXT,
  KuiButton,
  type KuiDialogContext,
  type KuiDialogHost,
  KuiIcon,
} from '@kikita-labs/ui';

export interface PlaygroundDialogData {
  readonly title: string;
  readonly message: string;
}

@Component({
  selector: 'app-playground-dialog-content',
  imports: [KuiButton, KuiIcon],
  templateUrl: './playground-dialog-content.html',
})
export class PlaygroundDialogContent implements KuiDialogHost<
  'confirmed' | null,
  PlaygroundDialogData
> {
  public readonly dialogContext =
    inject<KuiDialogContext<'confirmed' | null, PlaygroundDialogData>>(KUI_DIALOG_CONTEXT);
}
