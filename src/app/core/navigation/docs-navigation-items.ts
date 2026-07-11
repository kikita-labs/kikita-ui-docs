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
  componentsCheckbox: `/${AppRoutePath.Components}/${AppRoutePath.ComponentsCheckbox}`,
  componentsCommandPalette: `/${AppRoutePath.Components}/${AppRoutePath.ComponentsCommandPalette}`,
  componentsField: `/${AppRoutePath.Components}/${AppRoutePath.ComponentsField}`,
  componentsIconButton: `/${AppRoutePath.Components}/${AppRoutePath.ComponentsIconButton}`,
  componentsInput: `/${AppRoutePath.Components}/${AppRoutePath.ComponentsInput}`,
  componentsMenu: `/${AppRoutePath.Components}/${AppRoutePath.ComponentsMenu}`,
  componentsSelect: `/${AppRoutePath.Components}/${AppRoutePath.ComponentsSelect}`,
  componentsSwitch: `/${AppRoutePath.Components}/${AppRoutePath.ComponentsSwitch}`,
  componentsTextarea: `/${AppRoutePath.Components}/${AppRoutePath.ComponentsTextarea}`,
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
        label: 'Field',
        path: DOCS_PATHS.componentsField,
        description: 'Label, hint, error, and ARIA wiring around native controls.',
      },
      {
        label: 'Input',
        path: DOCS_PATHS.componentsInput,
        description: 'Native input styling directive.',
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
      {
        label: 'Checkbox',
        path: DOCS_PATHS.componentsCheckbox,
        description: 'Native checkbox styling with field state integration.',
      },
      {
        label: 'Switch',
        path: DOCS_PATHS.componentsSwitch,
        description: 'Native checkbox rendered as a switch for binary settings.',
      },
      {
        label: 'Textarea',
        path: DOCS_PATHS.componentsTextarea,
        description: 'Native multiline input styling with field integration.',
      },
    ],
  },
  {
    label: 'Package Smoke',
    path: DOCS_PATHS.smoke,
    description: 'External consumer checks for package imports, styles, and provider setup.',
  },
];
