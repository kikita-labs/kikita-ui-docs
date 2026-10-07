import { Component, signal } from '@angular/core';

import {
  KuiButton,
  type KuiCommandGroup,
  type KuiCommandItem,
  KuiCommandPalette,
  type KuiCommandPaletteMessages,
} from '@kikita-labs/ui';

import { ApiPlayground } from '@shared/docs-ui/api-playground';
import {
  createPlaygroundEventLog,
  definePlaygroundControls,
  escapePlaygroundSingleQuotedString,
  PLAYGROUND_MESSAGES_CONTROL,
  PlaygroundEventLogView,
  type PlaygroundValues,
} from '@shared/docs-ui/api-playground';
import { ApiTable } from '@shared/docs-ui/api-table';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

import { COMMAND_PALETTE_API_ROWS } from '../command-palette.api-schema';
import { COMMAND_PALETTE_API_DESCRIPTION } from '../command-palette.docs-content';
import { COMMAND_PALETTE_PLAYGROUND_MESSAGES } from './constants';

const PLAYGROUND_GROUPS: readonly KuiCommandGroup[] = [
  {
    heading: 'Navigation',
    items: [
      {
        id: 'projects',
        label: 'Open projects',
        description: 'Go to the project overview.',
        shortcut: ['G', 'P'],
        keywords: ['workspace'],
      },
      {
        id: 'components',
        label: 'Browse components',
        description: 'Open the component index.',
        shortcut: ['G', 'C'],
        keywords: ['docs', 'ui'],
      },
    ],
  },
  {
    heading: 'Project',
    items: [
      {
        id: 'rename',
        label: 'Rename project',
        description: 'Update the display name.',
        meta: 'Project',
        badge: 'New',
        shortcut: ['F2'],
        icon: 'R',
        keywords: ['edit', 'title'],
      },
      {
        id: 'delete',
        label: 'Delete project',
        danger: true,
        disabled: true,
      },
    ],
  },
];

const EMPTY_GROUPS: readonly KuiCommandGroup[] = [];
const PLAYGROUND_GROUPS_SOURCE = JSON.stringify(PLAYGROUND_GROUPS, null, 2);

const COMMAND_PALETTE_PLAYGROUND_CONTROLS = definePlaygroundControls([
  { key: 'label', label: 'label (empty = message)', kind: 'string', defaultValue: '' },
  { key: 'placeholder', label: 'placeholder (empty = message)', kind: 'string', defaultValue: '' },
  { key: 'emptyText', label: 'emptyText (empty = message)', kind: 'string', defaultValue: '' },
  PLAYGROUND_MESSAGES_CONTROL,
  {
    key: 'groupsPreset',
    label: 'groups',
    kind: 'enum',
    options: ['with commands', 'no matches'],
    defaultValue: 'with commands',
  },
  { key: 'loading', label: 'loading', kind: 'boolean', defaultValue: false },
] as const);

type CommandPalettePlaygroundValues = PlaygroundValues<typeof COMMAND_PALETTE_PLAYGROUND_CONTROLS>;

@Component({
  selector: 'app-command-palette-playground-page',
  imports: [ApiPlayground, ApiTable, KuiButton, KuiCommandPalette, PlaygroundEventLogView],
  templateUrl: './command-palette-playground-page.html',
  styleUrl: './command-palette-playground-page.scss',
})
export class CommandPalettePlaygroundPage {
  protected readonly apiDescription = COMMAND_PALETTE_API_DESCRIPTION;
  protected readonly apiRows = COMMAND_PALETTE_API_ROWS;

  protected readonly open = signal(false);
  protected readonly query = signal('');
  protected readonly selectedCommand = signal<string | null>(null);
  protected readonly eventLog = createPlaygroundEventLog();

  protected readonly playgroundControls = COMMAND_PALETTE_PLAYGROUND_CONTROLS;

  protected readonly buildPlaygroundSnippet = (
    values: CommandPalettePlaygroundValues,
  ): readonly CodeTab[] => {
    const label = values.label;
    const placeholder = values.placeholder;
    const emptyText = values.emptyText;
    const groupsPreset = values.groupsPreset;
    const loading = values.loading;

    const attrs = [
      label ? `[label]="'${escapePlaygroundSingleQuotedString(label)}'"` : null,
      placeholder ? `[placeholder]="'${escapePlaygroundSingleQuotedString(placeholder)}'"` : null,
      emptyText ? `[emptyText]="'${escapePlaygroundSingleQuotedString(emptyText)}'"` : null,
      values.messages === 'custom' ? '[messages]="messages"' : null,
      loading ? '[loading]="true"' : null,
    ].filter((attr): attr is string => attr !== null);

    const attrString = attrs.length > 0 ? `\n  ${attrs.join('\n  ')}` : '';
    const groupsConst = groupsPreset === 'no matches' ? '[]' : PLAYGROUND_GROUPS_SOURCE;

    return [
      {
        label: 'HTML',
        language: 'html',
        code: `<button kuiButton type="button" (click)="open.set(true)">Open command palette</button>

<kui-command-palette
  [(open)]="open"
  [(query)]="query"
  [groups]="groups"${attrString}
  (selected)="runCommand($event)"
/>`,
      },
      {
        label: 'TS',
        language: 'ts',
        code: `readonly groups: readonly KuiCommandGroup[] = ${groupsConst};`,
      },
    ];
  };

  protected labelOf(values: CommandPalettePlaygroundValues): string | undefined {
    return values.label || undefined;
  }

  protected placeholderOf(values: CommandPalettePlaygroundValues): string | undefined {
    return values.placeholder || undefined;
  }

  protected emptyTextOf(values: CommandPalettePlaygroundValues): string | undefined {
    return values.emptyText || undefined;
  }

  protected messagesOf(
    values: CommandPalettePlaygroundValues,
  ): Partial<KuiCommandPaletteMessages> | undefined {
    return values.messages === 'custom' ? COMMAND_PALETTE_PLAYGROUND_MESSAGES : undefined;
  }

  protected onQueryChange(query: string): void {
    this.query.set(query);
    this.eventLog.log('queryChange', query);
  }

  protected onOpenChange(open: boolean): void {
    this.open.set(open);
    this.eventLog.log('openChange', open);
  }

  protected loadingOf(values: CommandPalettePlaygroundValues): boolean {
    return values.loading;
  }

  protected groupsOf(values: CommandPalettePlaygroundValues): readonly KuiCommandGroup[] {
    return values.groupsPreset === 'no matches' ? EMPTY_GROUPS : PLAYGROUND_GROUPS;
  }

  protected runCommand(item: KuiCommandItem): void {
    this.selectedCommand.set(item.label);
    this.eventLog.log('selected', item.id);
  }
}
