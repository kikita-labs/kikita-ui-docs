import { Service } from '@angular/core';
import { type KuiCommandGroup, type KuiCommandItem } from '@kikita-labs/ui';
import { DOCS_NAVIGATION_ITEMS } from '../navigation/docs-navigation-items';

interface DocsSearchCommand extends KuiCommandItem {
  readonly path: string;
}

@Service()
export class DocsSearchIndexService {
  private readonly commands = this.createCommands();

  readonly groups: readonly KuiCommandGroup[] = [
    {
      heading: 'Documentation',
      items: this.commands,
    },
  ];

  getPath(command: KuiCommandItem): string | null {
    return this.commands.find((item) => item.id === command.id)?.path ?? null;
  }

  private createCommands(): readonly DocsSearchCommand[] {
    return DOCS_NAVIGATION_ITEMS.flatMap((item) => [
      this.toCommand(item.label, item.path, item.description, 'Section'),
      ...(item.children ?? []).map((child) =>
        this.toCommand(child.label, child.path, child.description, item.label),
      ),
    ]);
  }

  private toCommand(
    label: string,
    path: string,
    description: string,
    meta: string,
  ): DocsSearchCommand {
    return {
      id: path,
      label,
      path,
      description,
      meta,
      keywords: [path, meta],
    };
  }
}
