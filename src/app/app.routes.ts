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
        children: [
          {
            path: AppRoutePath.Home,
            loadComponent: () =>
              import('./pages/components/checkbox/checkbox-page').then((m) => m.CheckboxPage),
            pathMatch: 'full',
          },
          {
            path: AppRoutePath.Playground,
            loadComponent: () =>
              import('./pages/components/checkbox/playground/checkbox-playground-page').then(
                (m) => m.CheckboxPlaygroundPage,
              ),
          },
        ],
      },
      {
        path: AppRoutePath.ComponentsCommandPalette,
        children: [
          {
            path: AppRoutePath.Home,
            loadComponent: () =>
              import('./pages/components/command-palette/command-palette-page').then(
                (m) => m.CommandPalettePage,
              ),
            pathMatch: 'full',
          },
          {
            path: AppRoutePath.Playground,
            loadComponent: () =>
              import('./pages/components/command-palette/playground/command-palette-playground-page').then(
                (m) => m.CommandPalettePlaygroundPage,
              ),
          },
        ],
      },
      {
        path: AppRoutePath.ComponentsIconButton,
        children: [
          {
            path: AppRoutePath.Home,
            loadComponent: () =>
              import('./pages/components/icon-button/icon-button-page').then(
                (m) => m.IconButtonPage,
              ),
            pathMatch: 'full',
          },
          {
            path: AppRoutePath.Playground,
            loadComponent: () =>
              import('./pages/components/icon-button/playground/icon-button-playground-page').then(
                (m) => m.IconButtonPlaygroundPage,
              ),
          },
        ],
      },
      {
        path: AppRoutePath.ComponentsField,
        children: [
          {
            path: AppRoutePath.Home,
            loadComponent: () =>
              import('./pages/components/field/field-page').then((m) => m.FieldPage),
            pathMatch: 'full',
          },
          {
            path: AppRoutePath.Playground,
            loadComponent: () =>
              import('./pages/components/field/playground/field-playground-page').then(
                (m) => m.FieldPlaygroundPage,
              ),
          },
        ],
      },
      {
        path: AppRoutePath.ComponentsGroup,
        children: [
          {
            path: AppRoutePath.Home,
            loadComponent: () =>
              import('./pages/components/group/group-page').then((m) => m.GroupPage),
            pathMatch: 'full',
          },
          {
            path: AppRoutePath.Playground,
            loadComponent: () =>
              import('./pages/components/group/playground/group-playground-page').then(
                (m) => m.GroupPlaygroundPage,
              ),
          },
        ],
      },
      {
        path: AppRoutePath.ComponentsInput,
        children: [
          {
            path: AppRoutePath.Home,
            loadComponent: () =>
              import('./pages/components/input/input-page').then((m) => m.InputPage),
            pathMatch: 'full',
          },
          {
            path: AppRoutePath.Playground,
            loadComponent: () =>
              import('./pages/components/input/playground/input-playground-page').then(
                (m) => m.InputPlaygroundPage,
              ),
          },
        ],
      },
      {
        path: AppRoutePath.ComponentsMenu,
        children: [
          {
            path: AppRoutePath.Home,
            loadComponent: () =>
              import('./pages/components/menu/menu-page').then((m) => m.MenuPage),
            pathMatch: 'full',
          },
          {
            path: AppRoutePath.Playground,
            loadComponent: () =>
              import('./pages/components/menu/playground/menu-playground-page').then(
                (m) => m.MenuPlaygroundPage,
              ),
          },
        ],
      },
      {
        path: AppRoutePath.ComponentsSelect,
        children: [
          {
            path: AppRoutePath.Home,
            loadComponent: () =>
              import('./pages/components/select/select-page').then((m) => m.SelectPage),
            pathMatch: 'full',
          },
          {
            path: AppRoutePath.Playground,
            loadComponent: () =>
              import('./pages/components/select/playground/select-playground-page').then(
                (m) => m.SelectPlaygroundPage,
              ),
          },
        ],
      },
      {
        path: AppRoutePath.ComponentsSlider,
        children: [
          {
            path: AppRoutePath.Home,
            loadComponent: () =>
              import('./pages/components/slider/slider-page').then((m) => m.SliderPage),
            pathMatch: 'full',
          },
          {
            path: AppRoutePath.Playground,
            loadComponent: () =>
              import('./pages/components/slider/playground/slider-playground-page').then(
                (m) => m.SliderPlaygroundPage,
              ),
          },
        ],
      },
      {
        path: AppRoutePath.ComponentsSwitch,
        children: [
          {
            path: AppRoutePath.Home,
            loadComponent: () =>
              import('./pages/components/switch/switch-page').then((m) => m.SwitchPage),
            pathMatch: 'full',
          },
          {
            path: AppRoutePath.Playground,
            loadComponent: () =>
              import('./pages/components/switch/playground/switch-playground-page').then(
                (m) => m.SwitchPlaygroundPage,
              ),
          },
        ],
      },
      {
        path: AppRoutePath.ComponentsRadio,
        children: [
          {
            path: AppRoutePath.Home,
            loadComponent: () =>
              import('./pages/components/radio/radio-page').then((m) => m.RadioPage),
            pathMatch: 'full',
          },
          {
            path: AppRoutePath.Playground,
            loadComponent: () =>
              import('./pages/components/radio/playground/radio-playground-page').then(
                (m) => m.RadioPlaygroundPage,
              ),
          },
        ],
      },
      {
        path: AppRoutePath.ComponentsCombobox,
        children: [
          {
            path: AppRoutePath.Home,
            loadComponent: () =>
              import('./pages/components/combobox/combobox-page').then((m) => m.ComboboxPage),
            pathMatch: 'full',
          },
          {
            path: AppRoutePath.Playground,
            loadComponent: () =>
              import('./pages/components/combobox/playground/combobox-playground-page').then(
                (m) => m.ComboboxPlaygroundPage,
              ),
          },
        ],
      },
      {
        path: AppRoutePath.ComponentsTextarea,
        children: [
          {
            path: AppRoutePath.Home,
            loadComponent: () =>
              import('./pages/components/textarea/textarea-page').then((m) => m.TextareaPage),
            pathMatch: 'full',
          },
          {
            path: AppRoutePath.Playground,
            loadComponent: () =>
              import('./pages/components/textarea/playground/textarea-playground-page').then(
                (m) => m.TextareaPlaygroundPage,
              ),
          },
        ],
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
