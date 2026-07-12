import { Component, inject } from '@angular/core';
import {
  KUI_DIALOG_CONTEXT,
  KuiButtonDirective,
  KuiDialogContext,
  KuiDialogHost,
} from '@kikita-labs/ui';

export interface PlaygroundDialogData {
  readonly title: string;
  readonly message: string;
}

@Component({
  selector: 'app-playground-dialog-content',
  imports: [KuiButtonDirective],
  templateUrl: './playground-dialog-content.html',
})
export class PlaygroundDialogContent implements KuiDialogHost<
  'confirmed' | null,
  PlaygroundDialogData
> {
  readonly dialogContext =
    inject<KuiDialogContext<'confirmed' | null, PlaygroundDialogData>>(KUI_DIALOG_CONTEXT);
}
