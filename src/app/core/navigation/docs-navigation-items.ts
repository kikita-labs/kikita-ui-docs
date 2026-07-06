import { AppRoutePath } from './app-route-path';
import { DocsNavigationItem } from './docs-navigation-item';

export const DOCS_HOME_PATH = `/${AppRoutePath.Home}`;

export const DOCS_PATHS = {
  foundations: `/${AppRoutePath.Foundations}`,
  foundationsInstallation: `/${AppRoutePath.Foundations}/${AppRoutePath.FoundationsInstallation}`,
  foundationsTheming: `/${AppRoutePath.Foundations}/${AppRoutePath.FoundationsTheming}`,
  foundationsTokens: `/${AppRoutePath.Foundations}/${AppRoutePath.FoundationsTokens}`,
  foundationsDensity: `/${AppRoutePath.Foundations}/${AppRoutePath.FoundationsDensity}`,
  foundationsAccessibility: `/${AppRoutePath.Foundations}/${AppRoutePath.FoundationsAccessibility}`,
  components: `/${AppRoutePath.Components}`,
  componentsButton: `/${AppRoutePath.Components}/${AppRoutePath.ComponentsButton}`,
  componentsCommandPalette: `/${AppRoutePath.Components}/${AppRoutePath.ComponentsCommandPalette}`,
  componentsIconButton: `/${AppRoutePath.Components}/${AppRoutePath.ComponentsIconButton}`,
  componentsInput: `/${AppRoutePath.Components}/${AppRoutePath.ComponentsInput}`,
  componentsMenu: `/${AppRoutePath.Components}/${AppRoutePath.ComponentsMenu}`,
  componentsSelect: `/${AppRoutePath.Components}/${AppRoutePath.ComponentsSelect}`,
  smoke: `/${AppRoutePath.Smoke}`,
} as const;

export const DOCS_NAVIGATION_ITEMS: readonly DocsNavigationItem[] = [
  {
    label: 'Foundations',
    path: DOCS_PATHS.foundations,
    description: 'Installation, theming, tokens, density, and accessibility.',
    children: [
      {
        label: 'Installation',
        path: DOCS_PATHS.foundationsInstallation,
        description: 'Package installation and global stylesheet setup.',
      },
      {
        label: 'Theming',
        path: DOCS_PATHS.foundationsTheming,
        description: 'Theme provider setup and theme customization basics.',
      },
      {
        label: 'Tokens',
        path: DOCS_PATHS.foundationsTokens,
        description: 'Design token categories exposed through Kikita CSS variables.',
      },
      {
        label: 'Density',
        path: DOCS_PATHS.foundationsDensity,
        description: 'Spacing and control density expectations for product UIs.',
      },
      {
        label: 'Accessibility',
        path: DOCS_PATHS.foundationsAccessibility,
        description: 'Keyboard, semantics, focus, and WCAG expectations.',
      },
    ],
  },
  {
    label: 'Components',
    path: DOCS_PATHS.components,
    description: 'Consumer-safe component documentation built from package APIs.',
    children: [
      {
        label: 'Button',
        path: DOCS_PATHS.componentsButton,
        description: 'Native button and anchor styling directive.',
      },
      {
        label: 'Icon Button',
        path: DOCS_PATHS.componentsIconButton,
        description: 'Square icon-only action control for buttons and links.',
      },
      {
        label: 'Input and Field',
        path: DOCS_PATHS.componentsInput,
        description: 'Native input styling with label, hint, error, and ARIA wiring.',
      },
      {
        label: 'Menu',
        path: DOCS_PATHS.componentsMenu,
        description: 'Anchored action menu with keyboard focus behavior.',
      },
      {
        label: 'Command Palette',
        path: DOCS_PATHS.componentsCommandPalette,
        description: 'Keyboard-first searchable command dialog.',
      },
      {
        label: 'Select',
        path: DOCS_PATHS.componentsSelect,
        description: 'Readonly input trigger backed by dropdown and option primitives.',
      },
    ],
  },
  {
    label: 'Package Smoke',
    path: DOCS_PATHS.smoke,
    description: 'External consumer checks for package imports, styles, and provider setup.',
  },
];
