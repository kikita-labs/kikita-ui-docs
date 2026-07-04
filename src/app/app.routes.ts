import { Routes } from '@angular/router';
import { AppRoutePath } from './core/navigation/app-route-path';
import {
  ACCESSIBILITY_ROUTE_DRAFT,
  COMPONENTS_ROUTE_DRAFT,
  DENSITY_ROUTE_DRAFT,
  FOUNDATIONS_ROUTE_DRAFT,
  HOME_ROUTE_DRAFT,
  THEMING_ROUTE_DRAFT,
  TOKENS_ROUTE_DRAFT,
} from './core/navigation/docs-route-drafts';

const loadDraftPage = () => import('./pages/draft/docs-draft-page').then((m) => m.DocsDraftPage);

export const routes: Routes = [
  {
    path: AppRoutePath.Home,
    loadComponent: loadDraftPage,
    data: HOME_ROUTE_DRAFT,
    pathMatch: 'full',
  },
  {
    path: AppRoutePath.Foundations,
    children: [
      {
        path: AppRoutePath.Home,
        loadComponent: loadDraftPage,
        data: FOUNDATIONS_ROUTE_DRAFT,
        pathMatch: 'full',
      },
      {
        path: AppRoutePath.FoundationsInstallation,
        loadComponent: () =>
          import('./pages/foundations/installation/installation-page').then(
            (m) => m.InstallationPage,
          ),
      },
      {
        path: AppRoutePath.FoundationsTheming,
        loadComponent: loadDraftPage,
        data: THEMING_ROUTE_DRAFT,
      },
      {
        path: AppRoutePath.FoundationsTokens,
        loadComponent: loadDraftPage,
        data: TOKENS_ROUTE_DRAFT,
      },
      {
        path: AppRoutePath.FoundationsDensity,
        loadComponent: loadDraftPage,
        data: DENSITY_ROUTE_DRAFT,
      },
      {
        path: AppRoutePath.FoundationsAccessibility,
        loadComponent: loadDraftPage,
        data: ACCESSIBILITY_ROUTE_DRAFT,
      },
    ],
  },
  {
    path: AppRoutePath.Components,
    loadComponent: loadDraftPage,
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
