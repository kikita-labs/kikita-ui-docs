import { Service } from '@angular/core';

import { type KuiCommandGroup, type KuiCommandItem } from '@kikita-labs/ui';

import { DOCS_REGISTRY } from '@generated/index';

import { docsComponentPath, docsFoundationPath, docsResourcePath } from '../docs-registry';

interface DocsSearchCommand extends KuiCommandItem {
  readonly path: string;
}

@Service()
export class DocsSearchIndexService {
  private readonly commands = this.createCommands();

  public readonly groups: readonly KuiCommandGroup[] = [
    {
      heading: 'Documentation',
      items: this.commands,
    },
  ];

  public getPath(command: KuiCommandItem): string | null {
    return this.commands.find((item) => item.id === command.id)?.path ?? null;
  }

  private createCommands(): readonly DocsSearchCommand[] {
    const pageCommands = Object.values(DOCS_REGISTRY.pages).flatMap((page) =>
      page.routeSegment === ''
        ? [this.toCommand(page.label, '/', page.description, 'Documentation')]
        : [],
    );
    const sectionCommands = Object.values(DOCS_REGISTRY.sections).map((section) =>
      this.toCommand(section.label, `/${section.slug}`, section.description, 'Section'),
    );
    const foundationCommands = DOCS_REGISTRY.foundations.map((foundation) =>
      this.toCommand(
        foundation.label,
        docsFoundationPath(foundation.slug),
        foundation.description,
        DOCS_REGISTRY.sections.foundations.label,
      ),
    );
    const componentCommands = DOCS_REGISTRY.components.map((component) => {
      const category = DOCS_REGISTRY.categories.find(
        (candidate) => candidate.id === component.category,
      );

      return this.toCommand(
        component.label,
        docsComponentPath(component.slug),
        component.description,
        category?.label ?? DOCS_REGISTRY.sections.components.label,
      );
    });
    const resourceCommands = DOCS_REGISTRY.resources.map((resource) =>
      this.toCommand(
        resource.label,
        docsResourcePath(resource.slug),
        resource.description,
        'Package',
      ),
    );

    return [
      ...pageCommands,
      ...sectionCommands,
      ...foundationCommands,
      ...componentCommands,
      ...resourceCommands,
    ];
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
