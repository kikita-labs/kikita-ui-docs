import { Service } from '@angular/core';
import { type KuiCommandGroup, type KuiCommandItem } from '@kikita-labs/ui';
import { DOCS_COMPONENT_CATEGORIES } from '../components/docs-component-categories';
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
    const commands = DOCS_NAVIGATION_ITEMS.flatMap((item) => [
      this.toCommand(item.label, item.path, item.description, 'Section'),
      ...(item.children ?? []).map((child) =>
        this.toCommand(child.label, child.path, child.description, item.label),
      ),
    ]);

    const componentCommands = DOCS_COMPONENT_CATEGORIES.flatMap((category) =>
      category.components.flatMap((component) =>
        component.routePath
          ? [
              this.toCommand(
                component.name,
                component.routePath,
                component.description,
                category.label,
              ),
            ]
          : [],
      ),
    );

    return [
      ...new Map([...commands, ...componentCommands].map((command) => [command.id, command])),
    ].map(([, command]) => command);
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
