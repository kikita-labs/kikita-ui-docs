import { computed, inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { toSignal } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';

import { DOCS_REGISTRY, findDocsComponentByPath } from '@generated/index';

import { DOCS_HOME_PATH, DOCS_NAVIGATION_ITEMS, DOCS_PATHS } from './docs-navigation-items';

export interface DocsBreadcrumb {
  readonly label: string;
  readonly path?: string;
}

export type DocsRouteLayout = 'docs' | 'not-found';

export interface DocsActivePageView {
  readonly breadcrumbs: readonly DocsBreadcrumb[];
  readonly isLanding: boolean;
  readonly isNotFound: boolean;
  readonly layout: DocsRouteLayout;
  readonly path: string;
  readonly url: string;
}

@Injectable({ providedIn: 'root' })
export class DocsRouteStateService {
  private readonly router = inject(Router);
  private readonly navigationEnd = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    ),
    { initialValue: null },
  );

  public readonly url = computed(() => {
    this.navigationEnd();

    return this.router.url;
  });
  public readonly path = computed(() => this.url().split(/[?#]/)[0]);
  public readonly layout = computed<DocsRouteLayout>(() => {
    this.navigationEnd();

    let route = this.router.routerState.snapshot.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    return route.data['docsLayout'] === 'not-found' ? 'not-found' : 'docs';
  });
  public readonly breadcrumbs = computed(() => this.createBreadcrumbs(this.path()));
  public readonly activePage = computed<DocsActivePageView>(() => {
    const path = this.path();
    const layout = this.layout();

    return {
      breadcrumbs: this.breadcrumbs(),
      isLanding: path === '/',
      isNotFound: layout === 'not-found',
      layout,
      path,
      url: this.url(),
    };
  });

  private createBreadcrumbs(path: string): readonly DocsBreadcrumb[] {
    const home: DocsBreadcrumb = { label: 'Kikita UI', path: DOCS_HOME_PATH };

    if (path.startsWith('/components/')) {
      const isPlayground = path.endsWith('/playground');
      const componentPath = isPlayground ? path.slice(0, -'/playground'.length) : path;
      const component = findDocsComponentByPath(componentPath);

      if (component) {
        const category = DOCS_REGISTRY.categories.find(
          (candidate) => candidate.id === component.category,
        );

        return [
          home,
          { label: 'Components', path: DOCS_PATHS.components },
          { label: category?.label ?? 'Components' },
          isPlayground
            ? { label: component.label, path: componentPath }
            : { label: component.label },
          ...(isPlayground ? [{ label: 'Playground' }] : []),
        ];
      }
    }

    for (const item of DOCS_NAVIGATION_ITEMS) {
      if (item.path === path) {
        return [home, { label: item.label }];
      }

      const child = item.children?.find((navigationChild) => navigationChild.path === path);

      if (child) {
        return [home, { label: item.label, path: item.path }, { label: child.label }];
      }
    }

    return [home];
  }
}
