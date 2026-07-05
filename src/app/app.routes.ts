import { Routes } from '@angular/router';
import { AppRoutePath } from './core/navigation/app-route-path';
import {
  COMPONENTS_ROUTE_DRAFT,
  FOUNDATIONS_ROUTE_DRAFT,
} from './core/navigation/docs-route-drafts';

const loadDraftPage = () => import('./pages/draft/docs-draft-page').then((m) => m.DocsDraftPage);

export const routes: Routes = [
  {
    path: AppRoutePath.Home,
    loadComponent: () => import('./pages/home/home-page').then((m) => m.HomePage),
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
        loadComponent: () =>
          import('./pages/foundations/theming/theming-page').then((m) => m.ThemingPage),
      },
      {
        path: AppRoutePath.FoundationsTokens,
        loadComponent: () =>
          import('./pages/foundations/tokens/tokens-page').then((m) => m.TokensPage),
      },
      {
        path: AppRoutePath.FoundationsDensity,
        loadComponent: () =>
          import('./pages/foundations/density/density-page').then((m) => m.DensityPage),
      },
      {
        path: AppRoutePath.FoundationsAccessibility,
        loadComponent: () =>
          import('./pages/foundations/accessibility/accessibility-page').then(
            (m) => m.AccessibilityPage,
          ),
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
