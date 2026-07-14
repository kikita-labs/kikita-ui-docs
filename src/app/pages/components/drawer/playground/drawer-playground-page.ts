import {
  Component,
  DestroyRef,
  EnvironmentInjector,
  inject,
  runInInjectionContext,
} from '@angular/core';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { KuiButtonDirective, kuiDrawer } from '@kikita-labs/ui';

import { ApiPlayground } from '@shared/docs-ui/api-playground';
import {
  definePlaygroundControls,
  escapePlaygroundSingleQuotedString,
  type PlaygroundValues,
} from '@shared/docs-ui/api-playground';
import { ApiTable } from '@shared/docs-ui/api-table';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

import { DRAWER_API_ROWS } from '../drawer.api-schema';
import { DRAWER_API_DESCRIPTION } from '../drawer.docs-content';
import { PlaygroundDrawerContent } from './playground-drawer-content';

const DRAWER_PLAYGROUND_CONTROLS = definePlaygroundControls([
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
] as const);

type DrawerPlaygroundValues = PlaygroundValues<typeof DRAWER_PLAYGROUND_CONTROLS>;

@Component({
  selector: 'app-drawer-playground-page',
  imports: [ApiPlayground, ApiTable, KuiButtonDirective],
  templateUrl: './drawer-playground-page.html',
  styleUrl: './drawer-playground-page.scss',
})
export class DrawerPlaygroundPage {
  private readonly destroyRef = inject(DestroyRef);
  private readonly environmentInjector = inject(EnvironmentInjector);

  protected readonly apiDescription = DRAWER_API_DESCRIPTION;
  protected readonly apiRows = DRAWER_API_ROWS;

  protected readonly playgroundControls = DRAWER_PLAYGROUND_CONTROLS;

  protected openDrawer(values: DrawerPlaygroundValues): void {
    const side = values.side;
    const size = values.size;
    const closeOnBackdropClick = values.closeOnBackdropClick;
    const closeOnEscape = values.closeOnEscape;
    const closable = values.closable;
    const title = values.title || 'Filter results';
    const message = values.message || '';

    const open = runInInjectionContext(this.environmentInjector, () =>
      kuiDrawer(PlaygroundDrawerContent, {
        side,
        size,
        closeOnBackdropClick,
        closeOnEscape,
        closable,
      }),
    );

    open({ title, message }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }

  protected readonly buildPlaygroundSnippet = (
    values: DrawerPlaygroundValues,
  ): readonly CodeTab[] => {
    const side = values.side;
    const size = values.size;
    const closeOnBackdropClick = values.closeOnBackdropClick;
    const closeOnEscape = values.closeOnEscape;
    const closable = values.closable;
    const title = values.title || 'Filter results';
    const message = values.message || '';

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

openDrawer({
  title: '${escapePlaygroundSingleQuotedString(title)}',
  message: '${escapePlaygroundSingleQuotedString(message)}',
})
  .pipe(takeUntilDestroyed())
  .subscribe();`;

    return [{ label: 'TS', language: 'ts', code }];
  };
}
