import { AppRoutePath } from './app-route-path';
import { DocsNavigationItem } from './docs-navigation-item';

export const DOCS_HOME_PATH = `/${AppRoutePath.Home}`;

export const DOCS_NAVIGATION_ITEMS: readonly DocsNavigationItem[] = [
  {
    label: 'Foundations',
    path: `/${AppRoutePath.Foundations}`,
    description: 'Installation, theming, tokens, density, and accessibility.',
  },
  {
    label: 'Components',
    path: `/${AppRoutePath.Components}`,
    description: 'Consumer-safe component documentation built from package APIs.',
  },
  {
    label: 'Package Smoke',
    path: `/${AppRoutePath.Smoke}`,
    description: 'External consumer checks for package imports, styles, and provider setup.',
  },
];
