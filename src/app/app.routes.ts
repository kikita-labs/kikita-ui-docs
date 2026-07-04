import { Routes } from '@angular/router';
import { AppRoutePath } from './core/navigation/app-route-path';
import {
  COMPONENTS_ROUTE_DRAFT,
  FOUNDATIONS_ROUTE_DRAFT,
  HOME_ROUTE_DRAFT,
} from './core/navigation/docs-route-drafts';

export const routes: Routes = [
  {
    path: AppRoutePath.Home,
    loadComponent: () => import('./pages/draft/docs-draft-page').then((m) => m.DocsDraftPage),
    data: HOME_ROUTE_DRAFT,
    pathMatch: 'full',
  },
  {
    path: AppRoutePath.Foundations,
    loadComponent: () => import('./pages/draft/docs-draft-page').then((m) => m.DocsDraftPage),
    data: FOUNDATIONS_ROUTE_DRAFT,
  },
  {
    path: AppRoutePath.Components,
    loadComponent: () => import('./pages/draft/docs-draft-page').then((m) => m.DocsDraftPage),
    data: COMPONENTS_ROUTE_DRAFT,
  },
  {
    path: AppRoutePath.Smoke,
    loadComponent: () => import('./pages/smoke/package-smoke-page').then((m) => m.PackageSmokePage),
  },
  {
    path: AppRoutePath.NotFound,
    loadComponent: () =>
      import('./pages/not-found/docs-not-found-page').then((m) => m.DocsNotFoundPage),
  },
];
