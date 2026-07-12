import { Component, inject, signal } from '@angular/core';
import {
  KUI_DIALOG_CONTEXT,
  KuiButtonDirective,
  KuiDialogContext,
  KuiDialogHost,
  KuiInputDirective,
} from '@kikita-labs/ui';

export interface InviteTeammateData {
  readonly teamName: string;
}

export type InviteTeammateResult = 'sent' | null;

@Component({
  selector: 'app-invite-teammate-dialog',
  imports: [KuiButtonDirective, KuiInputDirective],
  templateUrl: './invite-teammate-dialog.html',
})
export class InviteTeammateDialog implements KuiDialogHost<
  InviteTeammateResult,
  InviteTeammateData
> {
  readonly dialogContext =
    inject<KuiDialogContext<InviteTeammateResult, InviteTeammateData>>(KUI_DIALOG_CONTEXT);

  protected readonly email = signal('');

  protected send(): void {
    this.dialogContext.close('sent');
  }

  protected cancel(): void {
    this.dialogContext.close(null);
  }
}
