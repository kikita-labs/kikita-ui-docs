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
  componentsAvatar: `/${AppRoutePath.Components}/${AppRoutePath.ComponentsAvatar}`,
  componentsBadge: `/${AppRoutePath.Components}/${AppRoutePath.ComponentsBadge}`,
  componentsChip: `/${AppRoutePath.Components}/${AppRoutePath.ComponentsChip}`,
  componentsAccordion: `/${AppRoutePath.Components}/${AppRoutePath.ComponentsAccordion}`,
  componentsButton: `/${AppRoutePath.Components}/${AppRoutePath.ComponentsButton}`,
  componentsCard: `/${AppRoutePath.Components}/${AppRoutePath.ComponentsCard}`,
  componentsCheckbox: `/${AppRoutePath.Components}/${AppRoutePath.ComponentsCheckbox}`,
  componentsCombobox: `/${AppRoutePath.Components}/${AppRoutePath.ComponentsCombobox}`,
  componentsCommandPalette: `/${AppRoutePath.Components}/${AppRoutePath.ComponentsCommandPalette}`,
  componentsDialog: `/${AppRoutePath.Components}/${AppRoutePath.ComponentsDialog}`,
  componentsDrawer: `/${AppRoutePath.Components}/${AppRoutePath.ComponentsDrawer}`,
  componentsDropdown: `/${AppRoutePath.Components}/${AppRoutePath.ComponentsDropdown}`,
  componentsEmptyState: `/${AppRoutePath.Components}/${AppRoutePath.ComponentsEmptyState}`,
  componentsField: `/${AppRoutePath.Components}/${AppRoutePath.ComponentsField}`,
  componentsGroup: `/${AppRoutePath.Components}/${AppRoutePath.ComponentsGroup}`,
  componentsIconButton: `/${AppRoutePath.Components}/${AppRoutePath.ComponentsIconButton}`,
  componentsInput: `/${AppRoutePath.Components}/${AppRoutePath.ComponentsInput}`,
  componentsLoader: `/${AppRoutePath.Components}/${AppRoutePath.ComponentsLoader}`,
  componentsMenu: `/${AppRoutePath.Components}/${AppRoutePath.ComponentsMenu}`,
  componentsNumberInput: `/${AppRoutePath.Components}/${AppRoutePath.ComponentsNumberInput}`,
  componentsPopover: `/${AppRoutePath.Components}/${AppRoutePath.ComponentsPopover}`,
  componentsProgress: `/${AppRoutePath.Components}/${AppRoutePath.ComponentsProgress}`,
  componentsRadio: `/${AppRoutePath.Components}/${AppRoutePath.ComponentsRadio}`,
  componentsScrollbar: `/${AppRoutePath.Components}/${AppRoutePath.ComponentsScrollbar}`,
  componentsSelect: `/${AppRoutePath.Components}/${AppRoutePath.ComponentsSelect}`,
  componentsSeparator: `/${AppRoutePath.Components}/${AppRoutePath.ComponentsSeparator}`,
  componentsSkeleton: `/${AppRoutePath.Components}/${AppRoutePath.ComponentsSkeleton}`,
  componentsSlider: `/${AppRoutePath.Components}/${AppRoutePath.ComponentsSlider}`,
  componentsSwitch: `/${AppRoutePath.Components}/${AppRoutePath.ComponentsSwitch}`,
  componentsTable: `/${AppRoutePath.Components}/${AppRoutePath.ComponentsTable}`,
  componentsTabs: `/${AppRoutePath.Components}/${AppRoutePath.ComponentsTabs}`,
  componentsTextarea: `/${AppRoutePath.Components}/${AppRoutePath.ComponentsTextarea}`,
  componentsToast: `/${AppRoutePath.Components}/${AppRoutePath.ComponentsToast}`,
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
        label: 'Group',
        path: DOCS_PATHS.componentsGroup,
        description: 'Grouped control chrome for adjacent actions and fields.',
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
        label: 'Number Input',
        path: DOCS_PATHS.componentsNumberInput,
        description: 'Native number input styling with increment/decrement controls.',
      },
      {
        label: 'Radio',
        path: DOCS_PATHS.componentsRadio,
        description: 'Native radio control styling for exclusive choices.',
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
        label: 'Combobox',
        path: DOCS_PATHS.componentsCombobox,
        description: 'Searchable input trigger with projected options, filtering, and async mode.',
      },
      {
        label: 'Slider',
        path: DOCS_PATHS.componentsSlider,
        description: 'Native range input styling with Field and Signal Forms support.',
      },
      {
        label: 'Textarea',
        path: DOCS_PATHS.componentsTextarea,
        description: 'Native multiline input styling with field integration.',
      },
      {
        label: 'Badge',
        path: DOCS_PATHS.componentsBadge,
        description: 'Compact status or metadata marker for inline elements.',
      },
      {
        label: 'Loader',
        path: DOCS_PATHS.componentsLoader,
        description: 'Inline loading indicator for buttons and status areas.',
      },
      {
        label: 'Skeleton',
        path: DOCS_PATHS.componentsSkeleton,
        description: 'Loading placeholder directive with reduced-motion behavior.',
      },
      {
        label: 'Empty State',
        path: DOCS_PATHS.componentsEmptyState,
        description: 'Known empty, error, no-access, and success content states.',
      },
      {
        label: 'Progress',
        path: DOCS_PATHS.componentsProgress,
        description: 'Linear or circular progress status for determinate and indeterminate work.',
      },
      {
        label: 'Toast',
        path: DOCS_PATHS.componentsToast,
        description: 'Global notification service for non-blocking, auto-dismissing messages.',
      },
      {
        label: 'Card',
        path: DOCS_PATHS.componentsCard,
        description: 'Surface, elevated, and sunken content container.',
      },
      {
        label: 'Tabs',
        path: DOCS_PATHS.componentsTabs,
        description: 'Line and pill tab navigation with optional panel wiring.',
      },
      {
        label: 'Accordion',
        path: DOCS_PATHS.componentsAccordion,
        description: 'Disclosure component for grouped expandable content.',
      },
      {
        label: 'Popover',
        path: DOCS_PATHS.componentsPopover,
        description: 'Anchored floating panel for free-form interactive content.',
      },
      {
        label: 'Dialog',
        path: DOCS_PATHS.componentsDialog,
        description: 'Typed modal overlay service and host contract.',
      },
      {
        label: 'Drawer',
        path: DOCS_PATHS.componentsDrawer,
        description: 'Side and edge overlay surface for focused workflows.',
      },
      {
        label: 'Dropdown',
        path: DOCS_PATHS.componentsDropdown,
        description: 'Primitive floating option panel that underlies Select, Combobox, and Menu.',
      },
      {
        label: 'Separator',
        path: DOCS_PATHS.componentsSeparator,
        description: 'Tokenized horizontal or vertical separator primitive.',
      },
      {
        label: 'Avatar',
        path: DOCS_PATHS.componentsAvatar,
        description: 'User or entity identity with image, initials, and status.',
      },
      {
        label: 'Chip',
        path: DOCS_PATHS.componentsChip,
        description: 'Compact token for selected values, filters, and entity references.',
      },
      {
        label: 'Table',
        path: DOCS_PATHS.componentsTable,
        description: 'Native table styling, sorting context, and selection cells.',
      },
      {
        label: 'Scrollbar',
        path: DOCS_PATHS.componentsScrollbar,
        description: 'Tokenized native scroll container utility.',
      },
    ],
  },
  {
    label: 'Package Smoke',
    path: DOCS_PATHS.smoke,
    description: 'External consumer checks for package imports, styles, and provider setup.',
  },
];
