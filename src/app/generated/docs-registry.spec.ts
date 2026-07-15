import { isStandalone } from '@angular/core';

import { DOCS_COMPONENT_CATEGORIES } from '@core/components';
import {
  docsComponentPath,
  docsFoundationPath,
  docsPlaygroundPath,
  docsResourcePath,
} from '@core/docs-registry';
import { DOCS_NAVIGATION_ITEMS } from '@core/navigation';

import { DOCS_REGISTRY } from './docs-registry';

describe('docs registry', () => {
  it('uses unique section, category, feature, and public path identities', () => {
    const categoryIds = DOCS_REGISTRY.categories.map((category) => category.id);
    const componentSlugs = DOCS_REGISTRY.components.map((component) => component.slug);
    const foundationSlugs = DOCS_REGISTRY.foundations.map((foundation) => foundation.slug);
    const pageIds = Object.values(DOCS_REGISTRY.pages).map((page) => page.id);
    const publicPaths = [
      ...DOCS_REGISTRY.components.flatMap((component) => [
        docsComponentPath(component.slug),
        ...('loadPlayground' in component ? [docsPlaygroundPath(component.slug)] : []),
      ]),
      ...DOCS_REGISTRY.foundations.map((foundation) => docsFoundationPath(foundation.slug)),
      ...DOCS_REGISTRY.resources.map((resource) => docsResourcePath(resource.slug)),
    ];

    expect(new Set(categoryIds).size).toBe(categoryIds.length);
    expect(new Set(componentSlugs).size).toBe(componentSlugs.length);
    expect(new Set(foundationSlugs).size).toBe(foundationSlugs.length);
    expect(new Set(pageIds).size).toBe(pageIds.length);
    expect(new Set(publicPaths).size).toBe(publicPaths.length);
  });

  it('links every component to a declared category', () => {
    const categoryIds = new Set(DOCS_REGISTRY.categories.map((category) => category.id));

    for (const component of DOCS_REGISTRY.components) {
      expect(categoryIds.has(component.category)).toBe(true);
    }
  });

  it('enforces loader and status invariants for the current package catalog', () => {
    expect(DOCS_REGISTRY.components).toHaveLength(43);
    expect(Object.keys(DOCS_REGISTRY.pages)).toEqual([
      'home',
      'draft',
      'components-overview',
      'not-found',
    ]);

    for (const page of Object.values(DOCS_REGISTRY.pages)) {
      expect(page.loadPage).toBeTypeOf('function');
    }

    for (const component of DOCS_REGISTRY.components) {
      expect(component.status).toBe('available');

      if (component.status === 'available') {
        expect(component.loadPage).toBeTypeOf('function');
        expect(
          component.slug === 'scrollbar'
            ? !('loadPlayground' in component)
            : 'loadPlayground' in component,
        ).toBe(true);
      }
    }

    for (const foundation of DOCS_REGISTRY.foundations) {
      expect(foundation.loadPage).toBeTypeOf('function');
    }

    for (const resource of DOCS_REGISTRY.resources) {
      expect(resource.loadPage).toBeTypeOf('function');
    }
  });

  it('registers every foundation and resource page through a lazy manifest', async () => {
    const ownedPageManifests = [
      ...Object.values(DOCS_REGISTRY.pages),
      ...DOCS_REGISTRY.foundations,
      ...DOCS_REGISTRY.resources,
    ];
    const pageTypes = await Promise.all(ownedPageManifests.map((manifest) => manifest.loadPage()));

    expect(ownedPageManifests).toHaveLength(11);
    expect(new Set(pageTypes).size).toBe(ownedPageManifests.length);
    expect(pageTypes.every((pageType) => isStandalone(pageType))).toBe(true);
  });

  it('drives category and navigation derivations without missing catalog entries', () => {
    const categoryPaths = DOCS_COMPONENT_CATEGORIES.flatMap((category) =>
      category.components.map((component) => component.routePath),
    );
    const navigationPaths = DOCS_NAVIGATION_ITEMS.flatMap((item) => [
      item.path,
      ...(item.children ?? []).map((child) => child.path),
    ]);
    const expectedCategoryPaths = DOCS_REGISTRY.components.map((component) =>
      docsComponentPath(component.slug),
    );
    const expectedNavigationPaths = [
      '/foundations',
      ...DOCS_REGISTRY.foundations.map((foundation) => docsFoundationPath(foundation.slug)),
      '/components',
      ...expectedCategoryPaths,
      ...DOCS_REGISTRY.resources.map((resource) => docsResourcePath(resource.slug)),
    ];

    expect(categoryPaths).toEqual(expectedCategoryPaths);
    expect(navigationPaths).toEqual(expectedNavigationPaths);
  });
});
