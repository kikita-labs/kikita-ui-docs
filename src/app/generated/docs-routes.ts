import type { Route, Routes } from '@angular/router';

import type { DocsDraftPageData } from '@core/docs-registry';

import {
  DOCS_COMPONENT_MANIFESTS,
  DOCS_FOUNDATION_MANIFESTS,
  DOCS_REGISTRY,
  DOCS_RESOURCE_MANIFESTS,
  DOCS_ROUTE_SEGMENTS,
} from './docs-registry';

const loadDraftPage = DOCS_REGISTRY.pages.draft.loadPage;

const componentRoutes: Routes = DOCS_COMPONENT_MANIFESTS.map((component): Route => {
  if (component.status === 'docs-pending') {
    const data: DocsDraftPageData = {
      title: component.label,
      eyebrow:
        DOCS_REGISTRY.categories.find((category) => category.id === component.category)?.label ??
        DOCS_REGISTRY.sections.components.label,
      description: `${component.label} is implemented but awaiting documented examples and API sign-off.`,
    };

    return { path: component.slug, loadComponent: loadDraftPage, data };
  }

  return {
    path: component.slug,
    children: [
      { path: '', pathMatch: 'full', loadComponent: component.loadPage },
      ...(component.loadPlayground
        ? [
            {
              path: DOCS_ROUTE_SEGMENTS.playground,
              loadComponent: component.loadPlayground,
            } satisfies Route,
          ]
        : []),
    ],
  };
});

const foundationsDraft: DocsDraftPageData = {
  title: DOCS_REGISTRY.sections.foundations.label,
  eyebrow: 'Planned section',
  description: DOCS_REGISTRY.sections.foundations.description,
};

export const DOCS_ROUTES: Routes = [
  {
    path: DOCS_ROUTE_SEGMENTS.home,
    pathMatch: 'full',
    loadComponent: DOCS_REGISTRY.pages.home.loadPage,
  },
  {
    path: DOCS_ROUTE_SEGMENTS.foundations,
    children: [
      { path: '', pathMatch: 'full', loadComponent: loadDraftPage, data: foundationsDraft },
      ...DOCS_FOUNDATION_MANIFESTS.map((foundation): Route => ({
        path: foundation.slug,
        loadComponent: foundation.loadPage,
      })),
    ],
  },
  {
    path: DOCS_ROUTE_SEGMENTS.components,
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: DOCS_REGISTRY.pages['components-overview'].loadPage,
      },
      ...componentRoutes,
    ],
  },
  ...DOCS_RESOURCE_MANIFESTS.map((resource): Route => ({
    path: resource.slug,
    loadComponent: resource.loadPage,
  })),
  {
    path: DOCS_ROUTE_SEGMENTS.notFound,
    data: DOCS_REGISTRY.pages['not-found'].routeData,
    loadComponent: DOCS_REGISTRY.pages['not-found'].loadPage,
  },
];
