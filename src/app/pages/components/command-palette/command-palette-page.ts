import { Component } from '@angular/core';
import { ApiTable } from '../../../shared/docs-ui/api-table/api-table';
import { KIKITA_UI_PACKAGE_VERSION } from '../../../core/package/kikita-ui-package-version';
import { CodeTab } from '../../../shared/docs-ui/code-tabs/code-tab';
import { CodeTabs } from '../../../shared/docs-ui/code-tabs/code-tabs';
import { DocSection } from '../../../shared/docs-ui/doc-section/doc-section';
import { LivePreview } from '../../../shared/docs-ui/live-preview/live-preview';
import { PageHeader } from '../../../shared/docs-ui/page-header/page-header';
import { BasicCommandPaletteExample } from './examples/basic-command-palette-example/basic-command-palette-example';
import { COMMAND_PALETTE_API_ROWS } from './command-palette.api-schema';

@Component({
  selector: 'app-command-palette-page',
  imports: [ApiTable, BasicCommandPaletteExample, CodeTabs, DocSection, LivePreview, PageHeader],
  templateUrl: './command-palette-page.html',
  styleUrl: './command-palette-page.scss',
})
export class CommandPalettePage {
  protected readonly status = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;
  protected readonly apiDescription = `Inputs and outputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;
  protected readonly apiRows = COMMAND_PALETTE_API_ROWS;

  protected readonly importTabs: readonly CodeTab[] = [
    {
      label: 'Import',
      language: 'ts',
      code: `import {
  KuiButtonDirective,
  KuiCommandGroup,
  KuiCommandItem,
  KuiCommandPaletteComponent,
} from '@kikita-labs/ui';`,
    },
  ];

  protected readonly usageTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<button kuiButton type="button" (click)="open.set(true)">Open command palette</button>

<kui-command-palette
  [(open)]="open"
  [(query)]="query"
  [groups]="groups"
  (selected)="runCommand($event)"
/>`,
    },
    {
      label: 'TS',
      language: 'ts',
      code: `import { Component, signal } from '@angular/core';
import {
  KuiButtonDirective,
  KuiCommandGroup,
  KuiCommandItem,
  KuiCommandPaletteComponent,
} from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-command-palette-example',
  imports: [KuiButtonDirective, KuiCommandPaletteComponent],
  templateUrl: './basic-command-palette-example.html',
})
export class BasicCommandPaletteExample {
  protected readonly open = signal(false);
  protected readonly query = signal('');
  protected readonly selectedCommand = signal<string | null>(null);

  protected readonly groups: readonly KuiCommandGroup[] = [
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
      ],
    },
  ];

  protected runCommand(item: KuiCommandItem): void {
    this.selectedCommand.set(item.label);
  }
}`,
    },
  ];

  protected readonly itemTabs: readonly CodeTab[] = [
    {
      label: 'Item data',
      language: 'ts',
      code: `const groups: readonly KuiCommandGroup[] = [
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
];`,
    },
  ];
}
