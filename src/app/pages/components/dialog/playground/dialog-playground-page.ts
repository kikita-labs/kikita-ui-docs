import {
  Component,
  DestroyRef,
  EnvironmentInjector,
  inject,
  runInInjectionContext,
} from '@angular/core';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { KuiButtonDirective, kuiDialog } from '@kikita-labs/ui';

import { ApiPlayground } from '@shared/docs-ui/api-playground';
import {
  definePlaygroundControls,
  escapePlaygroundSingleQuotedString,
  type PlaygroundValues,
} from '@shared/docs-ui/api-playground';
import { ApiTable } from '@shared/docs-ui/api-table';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

import { DIALOG_API_ROWS } from '../dialog.api-schema';
import { DIALOG_API_DESCRIPTION } from '../dialog.docs-content';
import { PlaygroundDialogContent } from './playground-dialog-content';

const DIALOG_PLAYGROUND_CONTROLS = definePlaygroundControls([
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
] as const);

type DialogPlaygroundValues = PlaygroundValues<typeof DIALOG_PLAYGROUND_CONTROLS>;

@Component({
  selector: 'app-dialog-playground-page',
  imports: [ApiPlayground, ApiTable, KuiButtonDirective],
  templateUrl: './dialog-playground-page.html',
  styleUrl: './dialog-playground-page.scss',
})
export class DialogPlaygroundPage {
  private readonly destroyRef = inject(DestroyRef);
  private readonly environmentInjector = inject(EnvironmentInjector);

  protected readonly apiDescription = DIALOG_API_DESCRIPTION;
  protected readonly apiRows = DIALOG_API_ROWS;

  protected readonly playgroundControls = DIALOG_PLAYGROUND_CONTROLS;

  protected openDialog(values: DialogPlaygroundValues): void {
    const size = values.size;
    const appearance = values.appearance;
    const dismissable = values.dismissable;
    const closable = values.closable;
    const title = values.title || 'Discard changes?';
    const message = values.message || '';

    const open = runInInjectionContext(this.environmentInjector, () =>
      kuiDialog(PlaygroundDialogContent, { size, appearance, dismissable, closable }),
    );

    open({ title, message }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }

  protected readonly buildPlaygroundSnippet = (
    values: DialogPlaygroundValues,
  ): readonly CodeTab[] => {
    const size = values.size;
    const appearance = values.appearance;
    const dismissable = values.dismissable;
    const closable = values.closable;
    const title = values.title || 'Discard changes?';
    const message = values.message || '';

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

openDialog({
  title: '${escapePlaygroundSingleQuotedString(title)}',
  message: '${escapePlaygroundSingleQuotedString(message)}',
})
  .pipe(takeUntilDestroyed())
  .subscribe();`;

    return [{ label: 'TS', language: 'ts', code }];
  };
}
