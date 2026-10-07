import { Component, inject, signal } from '@angular/core';

import {
  KUI_DIALOG_CONTEXT,
  KuiButton,
  type KuiDialogContext,
  type KuiDialogHost,
  KuiInput,
} from '@kikita-labs/ui';

export interface InviteTeammateData {
  readonly teamName: string;
}

export type InviteTeammateResult = 'sent' | null;

@Component({
  selector: 'app-invite-teammate-dialog',
  imports: [KuiButton, KuiInput],
  templateUrl: './invite-teammate-dialog.html',
})
export class InviteTeammateDialog implements KuiDialogHost<
  InviteTeammateResult,
  InviteTeammateData
> {
  public readonly dialogContext =
    inject<KuiDialogContext<InviteTeammateResult, InviteTeammateData>>(KUI_DIALOG_CONTEXT);

  protected readonly email = signal('');

  protected send(): void {
    this.dialogContext.close('sent');
  }

  protected cancel(): void {
    this.dialogContext.close(null);
  }
}
