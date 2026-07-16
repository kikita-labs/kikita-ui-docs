import { docsComponentPath, docsFoundationPath, docsResourcePath } from '@core/docs-registry';
import { DOCS_REGISTRY } from '@generated/index';

import type { DocsNavigationItem } from './docs-navigation-item';

export const DOCS_HOME_PATH = '/';

export const DOCS_PATHS = {
  foundations: `/${DOCS_REGISTRY.sections.foundations.slug}`,
  components: `/${DOCS_REGISTRY.sections.components.slug}`,
  aiSupport: docsResourcePath('ai-support'),
  smoke: docsResourcePath('smoke'),
} as const;

export const DOCS_NAVIGATION_ITEMS: readonly DocsNavigationItem[] = [
  {
    ...DOCS_REGISTRY.sections.foundations,
    path: DOCS_PATHS.foundations,
    children: DOCS_REGISTRY.foundations.map((foundation) => ({
      label: foundation.label,
      path: docsFoundationPath(foundation.slug),
      description: foundation.description,
    })),
  },
  {
    ...DOCS_REGISTRY.sections.components,
    path: DOCS_PATHS.components,
    children: DOCS_REGISTRY.components.map((component) => ({
      label: component.label,
      path: docsComponentPath(component.slug),
      description: component.description,
    })),
  },
  ...DOCS_REGISTRY.resources.map((resource) => ({
    label: resource.label,
    path: docsResourcePath(resource.slug),
    description: resource.description,
  })),
];
