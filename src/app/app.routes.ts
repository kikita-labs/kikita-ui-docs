import { Routes } from '@angular/router';
import { AppRoutePath } from './core/navigation/app-route-path';
import {
  COMPONENTS_ROUTE_DRAFT,
  FOUNDATIONS_ROUTE_DRAFT,
  HOME_ROUTE_DRAFT,
  SMOKE_ROUTE_DRAFT,
} from './core/navigation/docs-route-drafts';
import { DocsDraftPage } from './pages/draft/docs-draft-page';
import { DocsNotFoundPage } from './pages/not-found/docs-not-found-page';

export const routes: Routes = [
  {
    path: AppRoutePath.Home,
    component: DocsDraftPage,
    data: HOME_ROUTE_DRAFT,
    pathMatch: 'full',
  },
  {
    path: AppRoutePath.Foundations,
    component: DocsDraftPage,
    data: FOUNDATIONS_ROUTE_DRAFT,
  },
  {
    path: AppRoutePath.Components,
    component: DocsDraftPage,
    data: COMPONENTS_ROUTE_DRAFT,
  },
  {
    path: AppRoutePath.Smoke,
    component: DocsDraftPage,
    data: SMOKE_ROUTE_DRAFT,
  },
  {
    path: AppRoutePath.NotFound,
    component: DocsNotFoundPage,
  },
];
