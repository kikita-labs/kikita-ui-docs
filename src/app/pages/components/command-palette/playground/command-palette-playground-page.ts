import { Component, signal } from '@angular/core';
import {
  KuiButtonDirective,
  KuiCommandGroup,
  KuiCommandItem,
  KuiCommandPaletteComponent,
} from '@kikita-labs/ui';
import { ApiPlayground } from '../../../../shared/docs-ui/api-playground/api-playground';
import {
  PlaygroundControl,
  PlaygroundValues,
} from '../../../../shared/docs-ui/api-playground/playground-control';
import { ApiTable } from '../../../../shared/docs-ui/api-table/api-table';
import { KIKITA_UI_PACKAGE_VERSION } from '../../../../core/package/kikita-ui-package-version';
import { CodeTab } from '../../../../shared/docs-ui/code-tabs/code-tab';
import { COMMAND_PALETTE_API_ROWS } from '../command-palette.api-schema';

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

@Component({
  selector: 'app-command-palette-playground-page',
  imports: [ApiPlayground, ApiTable, KuiButtonDirective, KuiCommandPaletteComponent],
  templateUrl: './command-palette-playground-page.html',
  styleUrl: './command-palette-playground-page.scss',
})
export class CommandPalettePlaygroundPage {
  protected readonly apiDescription = `Inputs and outputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;
  protected readonly apiRows = COMMAND_PALETTE_API_ROWS;

  protected readonly open = signal(false);
  protected readonly query = signal('');
  protected readonly selectedCommand = signal<string | null>(null);

  protected readonly playgroundControls: readonly PlaygroundControl[] = [
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
  ];

  protected buildPlaygroundSnippet = (values: PlaygroundValues): readonly CodeTab[] => {
    const label = values['label'] as string;
    const placeholder = values['placeholder'] as string;
    const emptyText = values['emptyText'] as string;
    const groupsPreset = values['groupsPreset'] as string;
    const loading = values['loading'] as boolean;

    const attrs = [
      label !== 'Command palette' ? `[label]="'${this.escapeAttr(label)}'"` : null,
      placeholder !== 'Type a command or search...'
        ? `[placeholder]="'${this.escapeAttr(placeholder)}'"`
        : null,
      emptyText !== 'No commands found' ? `[emptyText]="'${this.escapeAttr(emptyText)}'"` : null,
      loading ? '[loading]="true"' : null,
    ].filter((attr): attr is string => attr !== null);

    const attrString = attrs.length > 0 ? `\n  ${attrs.join('\n  ')}` : '';
    const groupsConst = groupsPreset === 'no matches' ? '[]' : this.formatGroups();

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

  protected labelOf(values: PlaygroundValues): string {
    return values['label'] as string;
  }

  protected placeholderOf(values: PlaygroundValues): string {
    return values['placeholder'] as string;
  }

  protected emptyTextOf(values: PlaygroundValues): string {
    return values['emptyText'] as string;
  }

  protected loadingOf(values: PlaygroundValues): boolean {
    return values['loading'] as boolean;
  }

  protected groupsOf(values: PlaygroundValues): readonly KuiCommandGroup[] {
    return values['groupsPreset'] === 'no matches' ? EMPTY_GROUPS : PLAYGROUND_GROUPS;
  }

  protected runCommand(item: KuiCommandItem): void {
    this.selectedCommand.set(item.label);
  }

  private formatGroups(): string {
    return JSON.stringify(PLAYGROUND_GROUPS, null, 2);
  }

  private escapeAttr(value: string): string {
    return value.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  }
}
