import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { KuiButtonDirective, KuiDrawerSide, KuiDrawerSize, kuiDrawer } from '@kikita-labs/ui';
import { ApiPlayground } from '../../../../shared/docs-ui/api-playground/api-playground';
import {
  PlaygroundControl,
  PlaygroundValues,
} from '../../../../shared/docs-ui/api-playground/playground-control';
import { ApiTable } from '../../../../shared/docs-ui/api-table/api-table';
import { KIKITA_UI_PACKAGE_VERSION } from '../../../../core/package/kikita-ui-package-version';
import { CodeTab } from '../../../../shared/docs-ui/code-tabs/code-tab';
import { DRAWER_API_ROWS } from '../drawer.api-schema';
import { PlaygroundDrawerContent } from './playground-drawer-content';

@Component({
  selector: 'app-drawer-playground-page',
  imports: [ApiPlayground, ApiTable, KuiButtonDirective],
  templateUrl: './drawer-playground-page.html',
  styleUrl: './drawer-playground-page.scss',
})
export class DrawerPlaygroundPage {
  private readonly destroyRef = inject(DestroyRef);

  protected readonly apiDescription = `API verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;
  protected readonly apiRows = DRAWER_API_ROWS;

  protected readonly playgroundControls: readonly PlaygroundControl[] = [
    { key: 'title', label: 'title', kind: 'string', defaultValue: 'Filter results' },
    {
      key: 'message',
      label: 'message',
      kind: 'string',
      defaultValue: 'Adjust filters and confirm to apply them.',
    },
    {
      key: 'side',
      label: 'side',
      kind: 'enum',
      options: ['right', 'left', 'bottom', 'top'],
      defaultValue: 'right',
    },
    {
      key: 'size',
      label: 'size',
      kind: 'enum',
      options: ['sm', 'md', 'lg', 'full'],
      defaultValue: 'md',
    },
    {
      key: 'closeOnBackdropClick',
      label: 'closeOnBackdropClick',
      kind: 'boolean',
      defaultValue: true,
    },
    { key: 'closeOnEscape', label: 'closeOnEscape', kind: 'boolean', defaultValue: true },
    { key: 'closable', label: 'closable', kind: 'boolean', defaultValue: true },
  ];

  protected openDrawer(values: PlaygroundValues): void {
    const side = values['side'] as KuiDrawerSide;
    const size = values['size'] as KuiDrawerSize;
    const closeOnBackdropClick = values['closeOnBackdropClick'] as boolean;
    const closeOnEscape = values['closeOnEscape'] as boolean;
    const closable = values['closable'] as boolean;
    const title = (values['title'] as string) || 'Filter results';
    const message = (values['message'] as string) || '';

    const open = kuiDrawer(PlaygroundDrawerContent, {
      side,
      size,
      closeOnBackdropClick,
      closeOnEscape,
      closable,
    });

    open({ title, message }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }

  protected buildPlaygroundSnippet = (values: PlaygroundValues): readonly CodeTab[] => {
    const side = values['side'] as string;
    const size = values['size'] as string;
    const closeOnBackdropClick = values['closeOnBackdropClick'] as boolean;
    const closeOnEscape = values['closeOnEscape'] as boolean;
    const closable = values['closable'] as boolean;
    const title = (values['title'] as string) || 'Filter results';
    const message = (values['message'] as string) || '';

    const configLines = [
      side !== 'right' ? `  side: '${side}',` : null,
      size !== 'md' ? `  size: '${size}',` : null,
      !closeOnBackdropClick ? `  closeOnBackdropClick: false,` : null,
      !closeOnEscape ? `  closeOnEscape: false,` : null,
      !closable ? `  closable: false,` : null,
    ]
      .filter((line): line is string => line !== null)
      .join('\n');

    const configArg = configLines ? `, {\n${configLines}\n}` : '';

    const code = `const openDrawer = kuiDrawer(MyDrawer${configArg});

openDrawer({ title: '${title}', message: '${message}' })
  .pipe(takeUntilDestroyed())
  .subscribe();`;

    return [{ label: 'TS', language: 'ts', code }];
  };
}
