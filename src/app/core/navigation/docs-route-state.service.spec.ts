import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';

import { DocsRouteStateService } from './docs-route-state.service';

@Component({ template: '' })
class RouteTestPage {}

describe('DocsRouteStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DocsRouteStateService,
        provideRouter([
          { path: '', component: RouteTestPage },
          { path: 'components/button/playground', component: RouteTestPage },
          {
            path: 'missing',
            component: RouteTestPage,
            data: { docsLayout: 'not-found' },
          },
        ]),
      ],
    });
  });

  it('derives path and component breadcrumbs from one router state source', async () => {
    const routeState = TestBed.inject(DocsRouteStateService);

    await TestBed.inject(Router).navigateByUrl('/components/button/playground');

    expect(routeState.path()).toBe('/components/button/playground');
    expect(routeState.breadcrumbs()).toEqual([
      { label: 'Components', path: '/components' },
      { label: 'Actions' },
      { label: 'Button', path: '/components/button' },
      { label: 'Playground' },
    ]);
    expect(routeState.activePage()).toEqual({
      breadcrumbs: routeState.breadcrumbs(),
      isLanding: false,
      isNotFound: false,
      layout: 'docs',
      path: '/components/button/playground',
      url: '/components/button/playground',
    });
  });

  it('derives the shell layout from leaf route data', async () => {
    const routeState = TestBed.inject(DocsRouteStateService);

    await TestBed.inject(Router).navigateByUrl('/missing');

    expect(routeState.layout()).toBe('not-found');
  });
});
