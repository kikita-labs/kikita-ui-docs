import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { KuiButtonDirective } from '@kikita-labs/ui';
import { ApiTable } from '../../../shared/docs-ui/api-table/api-table';
import { KIKITA_UI_PACKAGE_VERSION } from '../../../core/package/kikita-ui-package-version';
import { CodeTab } from '../../../shared/docs-ui/code-tabs/code-tab';
import { CodeTabs } from '../../../shared/docs-ui/code-tabs/code-tabs';
import { DocSection } from '../../../shared/docs-ui/doc-section/doc-section';
import { LivePreview } from '../../../shared/docs-ui/live-preview/live-preview';
import { PageHeader } from '../../../shared/docs-ui/page-header/page-header';
import { BasicDialogExample } from './examples/basic-dialog-example/basic-dialog-example';
import { DialogConfirmExample } from './examples/dialog-confirm-example/dialog-confirm-example';
import { DialogSizesExample } from './examples/dialog-sizes-example/dialog-sizes-example';
import { DIALOG_API_ROWS } from './dialog.api-schema';

@Component({
  selector: 'app-dialog-page',
  imports: [
    ApiTable,
    BasicDialogExample,
    CodeTabs,
    DialogConfirmExample,
    DialogSizesExample,
    DocSection,
    KuiButtonDirective,
    LivePreview,
    PageHeader,
    RouterLink,
  ],
  templateUrl: './dialog-page.html',
  styleUrl: './dialog-page.scss',
})
export class DialogPage {
  protected readonly status = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;
  protected readonly apiDescription = `API verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;

  protected readonly importTabs: readonly CodeTab[] = [
    {
      label: 'Import',
      filename: 'dialog.ts',
      language: 'ts',
      code: `import {
  KUI_DIALOG_CONTEXT,
  KuiButtonDirective,
  KuiDialogContext,
  KuiDialogHost,
  kuiDialog,
} from '@kikita-labs/ui';

// Import runtime styles once, application-wide:
import '@kikita-labs/ui/styles';`,
    },
  ];

  protected readonly basicTabs: readonly CodeTab[] = [
    {
      label: 'TS',
      language: 'ts',
      code: `// 1. Implement the dialog contract
@Component({ ... })
export class InviteTeammateDialog implements KuiDialogHost<'sent' | null, { teamName: string }> {
  readonly dialogContext =
    inject<KuiDialogContext<'sent' | null, { teamName: string }>>(KUI_DIALOG_CONTEXT);

  send() {
    this.dialogContext.close('sent');
  }
}

// 2. Create a typed opener in an injection context
export function injectInviteTeammateDialog() {
  return kuiDialog(InviteTeammateDialog, { size: 'sm' });
}

// 3. Open it and react to the typed result
class TeamPage {
  private readonly openInvite = injectInviteTeammateDialog();

  invite() {
    this.openInvite({ teamName: 'Docs' })
      .pipe(takeUntilDestroyed())
      .subscribe((result) => {
        if (result === 'sent') this.reloadInvites();
      });
  }
}`,
    },
  ];

  protected readonly sizesTabs: readonly CodeTab[] = [
    {
      label: 'TS',
      language: 'ts',
      code: `const open = kuiDialog(SizePreviewDialog, { size: 'lg' });
open({ size: 'lg' });`,
    },
  ];

  protected readonly confirmTabs: readonly CodeTab[] = [
    {
      label: 'TS',
      language: 'ts',
      code: `class RecordPage {
  private readonly confirm = kuiConfirm();

  delete(id: string) {
    this.confirm({
      title: 'Delete record?',
      message: 'This action cannot be undone.',
      appearance: 'danger',
      confirmLabel: 'Delete',
    })
      .pipe(takeUntilDestroyed())
      .subscribe((ok) => {
        if (ok) this.deleteItem(id);
      });
  }
}`,
    },
  ];

  protected readonly apiRows = DIALOG_API_ROWS;
}
