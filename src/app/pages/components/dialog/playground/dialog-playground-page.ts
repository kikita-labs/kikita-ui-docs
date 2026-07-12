import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { KuiButtonDirective, KuiDialogAppearance, KuiDialogSize, kuiDialog } from '@kikita-labs/ui';
import { ApiPlayground } from '../../../../shared/docs-ui/api-playground/api-playground';
import {
  PlaygroundControl,
  PlaygroundValues,
} from '../../../../shared/docs-ui/api-playground/playground-control';
import { ApiTable } from '../../../../shared/docs-ui/api-table/api-table';
import { KIKITA_UI_PACKAGE_VERSION } from '../../../../core/package/kikita-ui-package-version';
import { CodeTab } from '../../../../shared/docs-ui/code-tabs/code-tab';
import { DIALOG_API_ROWS } from '../dialog.api-schema';
import { PlaygroundDialogContent } from './playground-dialog-content';

@Component({
  selector: 'app-dialog-playground-page',
  imports: [ApiPlayground, ApiTable, KuiButtonDirective],
  templateUrl: './dialog-playground-page.html',
  styleUrl: './dialog-playground-page.scss',
})
export class DialogPlaygroundPage {
  private readonly destroyRef = inject(DestroyRef);

  protected readonly apiDescription = `API verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;
  protected readonly apiRows = DIALOG_API_ROWS;

  protected readonly playgroundControls: readonly PlaygroundControl[] = [
    { key: 'title', label: 'title', kind: 'string', defaultValue: 'Discard changes?' },
    {
      key: 'message',
      label: 'message',
      kind: 'string',
      defaultValue: 'Unsaved edits will be lost.',
    },
    {
      key: 'size',
      label: 'size',
      kind: 'enum',
      options: ['auto', 'sm', 'md', 'lg'],
      defaultValue: 'md',
    },
    {
      key: 'appearance',
      label: 'appearance',
      kind: 'enum',
      options: ['default', 'danger', 'warning'],
      defaultValue: 'default',
    },
    { key: 'dismissable', label: 'dismissable', kind: 'boolean', defaultValue: true },
    { key: 'closable', label: 'closable', kind: 'boolean', defaultValue: true },
  ];

  protected openDialog(values: PlaygroundValues): void {
    const size = values['size'] as KuiDialogSize;
    const appearance = values['appearance'] as KuiDialogAppearance;
    const dismissable = values['dismissable'] as boolean;
    const closable = values['closable'] as boolean;
    const title = (values['title'] as string) || 'Discard changes?';
    const message = (values['message'] as string) || '';

    const open = kuiDialog(PlaygroundDialogContent, { size, appearance, dismissable, closable });

    open({ title, message }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }

  protected buildPlaygroundSnippet = (values: PlaygroundValues): readonly CodeTab[] => {
    const size = values['size'] as string;
    const appearance = values['appearance'] as string;
    const dismissable = values['dismissable'] as boolean;
    const closable = values['closable'] as boolean;
    const title = (values['title'] as string) || 'Discard changes?';
    const message = (values['message'] as string) || '';

    const configLines = [
      size !== 'md' ? `  size: '${size}',` : null,
      appearance !== 'default' ? `  appearance: '${appearance}',` : null,
      !dismissable ? `  dismissable: false,` : null,
      !closable ? `  closable: false,` : null,
    ]
      .filter((line): line is string => line !== null)
      .join('\n');

    const configArg = configLines ? `, {\n${configLines}\n}` : '';

    const code = `const openDialog = kuiDialog(MyDialog${configArg});

openDialog({ title: '${title}', message: '${message}' })
  .pipe(takeUntilDestroyed())
  .subscribe();`;

    return [{ label: 'TS', language: 'ts', code }];
  };
}
