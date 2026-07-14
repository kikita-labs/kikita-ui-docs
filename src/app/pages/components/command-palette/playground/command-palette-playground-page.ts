import { Component, signal } from '@angular/core';

import {
  KuiButtonDirective,
  type KuiCommandGroup,
  type KuiCommandItem,
  KuiCommandPaletteComponent,
} from '@kikita-labs/ui';

import { ApiPlayground } from '@shared/docs-ui/api-playground';
import {
  definePlaygroundControls,
  escapePlaygroundSingleQuotedString,
  type PlaygroundValues,
} from '@shared/docs-ui/api-playground';
import { ApiTable } from '@shared/docs-ui/api-table';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

import { COMMAND_PALETTE_API_ROWS } from '../command-palette.api-schema';
import { COMMAND_PALETTE_API_DESCRIPTION } from '../command-palette.docs-content';

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
  { key: 'label', label: 'label', kind: 'string', defaultValue: 'Command palette' },
  {
    key: 'placeholder',
    label: 'placeholder',
    kind: 'string',
    defaultValue: 'Type a command or search...',
  },
  { key: 'emptyText', label: 'emptyText', kind: 'string', defaultValue: 'No commands found' },
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
  imports: [ApiPlayground, ApiTable, KuiButtonDirective, KuiCommandPaletteComponent],
  templateUrl: './command-palette-playground-page.html',
  styleUrl: './command-palette-playground-page.scss',
})
export class CommandPalettePlaygroundPage {
  protected readonly apiDescription = COMMAND_PALETTE_API_DESCRIPTION;
  protected readonly apiRows = COMMAND_PALETTE_API_ROWS;

  protected readonly open = signal(false);
  protected readonly query = signal('');
  protected readonly selectedCommand = signal<string | null>(null);

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
      label !== 'Command palette'
        ? `[label]="'${escapePlaygroundSingleQuotedString(label)}'"`
        : null,
      placeholder !== 'Type a command or search...'
        ? `[placeholder]="'${escapePlaygroundSingleQuotedString(placeholder)}'"`
        : null,
      emptyText !== 'No commands found'
        ? `[emptyText]="'${escapePlaygroundSingleQuotedString(emptyText)}'"`
        : null,
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

  protected labelOf(values: CommandPalettePlaygroundValues): string {
    return values.label;
  }

  protected placeholderOf(values: CommandPalettePlaygroundValues): string {
    return values.placeholder;
  }

  protected emptyTextOf(values: CommandPalettePlaygroundValues): string {
    return values.emptyText;
  }

  protected loadingOf(values: CommandPalettePlaygroundValues): boolean {
    return values.loading;
  }

  protected groupsOf(values: CommandPalettePlaygroundValues): readonly KuiCommandGroup[] {
    return values.groupsPreset === 'no matches' ? EMPTY_GROUPS : PLAYGROUND_GROUPS;
  }

  protected runCommand(item: KuiCommandItem): void {
    this.selectedCommand.set(item.label);
  }
}
