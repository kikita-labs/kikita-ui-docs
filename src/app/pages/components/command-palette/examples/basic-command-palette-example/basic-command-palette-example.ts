import { Component, signal } from '@angular/core';
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
  styleUrl: './basic-command-palette-example.scss',
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

  protected runCommand(item: KuiCommandItem): void {
    this.selectedCommand.set(item.label);
  }
}
