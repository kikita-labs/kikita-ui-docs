import { docsComponentPath } from '@core/docs-registry';
import { DOCS_COMPONENT_MANIFESTS, DOCS_REGISTRY } from '@generated/index';

import type { DocsComponentCategory } from './docs-component-category';

export const DOCS_COMPONENT_CATEGORIES: readonly DocsComponentCategory[] =
  DOCS_REGISTRY.categories.map((category) => ({
    label: category.label,
    description: category.description,
    components: DOCS_COMPONENT_MANIFESTS.filter(
      (component) => component.category === category.id,
    ).map((component) => ({
      name: component.label,
      importName: component.importName,
      status: component.status,
      description: component.description,
      routePath: docsComponentPath(component.slug),
    })),
  }));
