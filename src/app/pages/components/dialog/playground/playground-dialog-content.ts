import { Component, inject } from '@angular/core';

import {
  KUI_DIALOG_CONTEXT,
  KuiButtonDirective,
  type KuiDialogContext,
  type KuiDialogHost,
  KuiIconComponent,
} from '@kikita-labs/ui';

export interface PlaygroundDialogData {
  readonly title: string;
  readonly message: string;
}

@Component({
  selector: 'app-playground-dialog-content',
  imports: [KuiButtonDirective, KuiIconComponent],
  templateUrl: './playground-dialog-content.html',
})
export class PlaygroundDialogContent implements KuiDialogHost<
  'confirmed' | null,
  PlaygroundDialogData
> {
  public readonly dialogContext =
    inject<KuiDialogContext<'confirmed' | null, PlaygroundDialogData>>(KUI_DIALOG_CONTEXT);
}
