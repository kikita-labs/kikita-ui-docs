import { DOCS_COMPONENT_CATEGORIES } from '@core/components';
import { DOCS_REGISTRY, DOCS_ROUTE_SEGMENTS } from '@generated/index';

import { routes } from './app.routes';

const COMPONENT_SLUGS = [
  'accordion',
  'avatar',
  'badge',
  'breadcrumbs',
  'button',
  'calendar',
  'card',
  'checkbox',
  'chip',
  'color-input',
  'combobox',
  'command-palette',
  'date-picker',
  'dialog',
  'drawer',
  'dropdown',
  'empty-state',
  'field',
  'file-upload',
  'group',
  'icon',
  'icon-button',
  'input',
  'loader',
  'menu',
  'number-input',
  'popover',
  'progress',
  'radio',
  'scrollbar',
  'segmented',
  'select',
  'separator',
  'skeleton',
  'slider',
  'stepper',
  'switch',
  'table',
  'tabs',
  'textarea',
  'toast',
  'tooltip',
  'tree',
] as const;

const FOUNDATION_SLUGS = ['accessibility', 'density', 'installation', 'theming', 'tokens'] as const;

function collectPublicPaths(routeList: typeof routes, parentPath = ''): readonly string[] {
  return routeList.flatMap((route) => {
    if (route.path === DOCS_ROUTE_SEGMENTS.notFound) {
      return [DOCS_ROUTE_SEGMENTS.notFound];
    }

    const segment = route.path ?? '';
    const path = [parentPath, segment].filter(Boolean).join('/');
    const publicPath = `/${path}`;

    if (route.children) {
      return collectPublicPaths(route.children, path);
    }

    return [publicPath];
  });
}

describe('app routes', () => {
  it('preserves the public top-level route contract', () => {
    expect(routes.map((route) => route.path)).toEqual([
      DOCS_ROUTE_SEGMENTS.home,
      DOCS_ROUTE_SEGMENTS.foundations,
      DOCS_ROUTE_SEGMENTS.components,
      DOCS_REGISTRY.resources[0].slug,
      DOCS_ROUTE_SEGMENTS.notFound,
    ]);
  });

  it('routes every available component summary', () => {
    const componentRoute = routes.find((route) => route.path === DOCS_ROUTE_SEGMENTS.components);
    const childPaths = new Set(componentRoute?.children?.map((route) => route.path));
    const availablePaths = DOCS_COMPONENT_CATEGORIES.flatMap((category) =>
      category.components
        .filter((component) => component.status === 'available')
        .map((component) => component.routePath.split('/').at(-1)),
    );

    expect(componentRoute).toBeDefined();
    expect(availablePaths.length).toBeGreaterThan(0);

    for (const path of availablePaths) {
      expect(childPaths.has(path)).toBe(true);
    }
  });

  it('keeps the wildcard route as a real not-found layout', () => {
    const notFoundRoute = routes.find((route) => route.path === DOCS_ROUTE_SEGMENTS.notFound);

    expect(notFoundRoute?.data?.['docsLayout']).toBe('not-found');
    expect(notFoundRoute?.loadComponent).toBeTypeOf('function');
  });

  it('protects every existing public and playground URL before registry migration', () => {
    const componentPaths = COMPONENT_SLUGS.flatMap((slug) => [
      `/components/${slug}`,
      ...(slug === 'scrollbar' ? [] : [`/components/${slug}/playground`]),
    ]);
    const expectedPaths = [
      '/',
      '/foundations',
      ...FOUNDATION_SLUGS.map((slug) => `/foundations/${slug}`),
      '/components',
      ...componentPaths,
      '/smoke',
      DOCS_ROUTE_SEGMENTS.notFound,
    ].sort();

    expect([...collectPublicPaths(routes)].sort()).toEqual(expectedPaths);
  });

  it('keeps every public leaf lazy-loaded', () => {
    const visit = (routeList: typeof routes): void => {
      for (const route of routeList) {
        if (route.children) {
          visit(route.children);
        } else {
          expect(route.loadComponent).toBeTypeOf('function');
        }
      }
    };

    visit(routes);
  });
});
