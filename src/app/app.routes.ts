import { Routes } from '@angular/router';
import { DOCS_COMPONENT_CATEGORIES } from './core/components/docs-component-categories';
import { AppRoutePath } from './core/navigation/app-route-path';
import { DocsRouteDraft } from './core/navigation/docs-route-draft';
import { FOUNDATIONS_ROUTE_DRAFT } from './core/navigation/docs-route-drafts';

const loadDraftPage = () => import('./pages/draft/docs-draft-page').then((m) => m.DocsDraftPage);
const componentRoutePrefix = `/${AppRoutePath.Components}/`;
const componentDraftRoutes: Routes = DOCS_COMPONENT_CATEGORIES.flatMap((category) =>
  category.components.flatMap((component) => {
    if (component.status !== 'docs-pending' || !component.routePath) {
      return [];
    }

    const data: DocsRouteDraft = {
      title: component.name,
      eyebrow: category.label,
      description: `${component.name} is implemented but awaiting documented examples and API sign-off.`,
    };

    return [
      {
        path: component.routePath.slice(componentRoutePrefix.length),
        loadComponent: loadDraftPage,
        data,
      },
    ];
  }),
);

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
    children: [
      {
        path: AppRoutePath.Home,
        loadComponent: () =>
          import('./pages/components/components-overview-page').then(
            (m) => m.ComponentsOverviewPage,
          ),
        pathMatch: 'full',
      },
      {
        path: AppRoutePath.ComponentsButton,
        children: [
          {
            path: AppRoutePath.Home,
            loadComponent: () =>
              import('./pages/components/button/button-page').then((m) => m.ButtonPage),
            pathMatch: 'full',
          },
          {
            path: AppRoutePath.Playground,
            loadComponent: () =>
              import('./pages/components/button/playground/button-playground-page').then(
                (m) => m.ButtonPlaygroundPage,
              ),
          },
        ],
      },
      {
        path: AppRoutePath.ComponentsCheckbox,
        loadComponent: () =>
          import('./pages/components/checkbox/checkbox-page').then((m) => m.CheckboxPage),
      },
      {
        path: AppRoutePath.ComponentsCommandPalette,
        loadComponent: () =>
          import('./pages/components/command-palette/command-palette-page').then(
            (m) => m.CommandPalettePage,
          ),
      },
      {
        path: AppRoutePath.ComponentsIconButton,
        loadComponent: () =>
          import('./pages/components/icon-button/icon-button-page').then((m) => m.IconButtonPage),
      },
      {
        path: AppRoutePath.ComponentsField,
        loadComponent: () => import('./pages/components/field/field-page').then((m) => m.FieldPage),
      },
      {
        path: AppRoutePath.ComponentsInput,
        loadComponent: () => import('./pages/components/input/input-page').then((m) => m.InputPage),
      },
      {
        path: AppRoutePath.ComponentsMenu,
        loadComponent: () => import('./pages/components/menu/menu-page').then((m) => m.MenuPage),
      },
      {
        path: AppRoutePath.ComponentsSelect,
        loadComponent: () =>
          import('./pages/components/select/select-page').then((m) => m.SelectPage),
      },
      {
        path: AppRoutePath.ComponentsSwitch,
        loadComponent: () =>
          import('./pages/components/switch/switch-page').then((m) => m.SwitchPage),
      },
      ...componentDraftRoutes,
    ],
  },
  {
    path: AppRoutePath.Smoke,
    loadComponent: () => import('./pages/smoke/package-smoke-page').then((m) => m.PackageSmokePage),
  },
  {
    path: AppRoutePath.NotFound,
    data: { docsLayout: 'not-found' },
    loadComponent: () =>
      import('./pages/not-found/docs-not-found-page').then((m) => m.DocsNotFoundPage),
  },
];
