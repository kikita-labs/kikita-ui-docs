import { DocsComponentCategory } from './docs-component-category';
import { AppRoutePath } from '../navigation/app-route-path';

export const DOCS_COMPONENT_CATEGORIES: readonly DocsComponentCategory[] = [
  {
    label: 'Actions',
    description: 'Trigger commands, menus, and command-style workflows.',
    components: [
      {
        name: 'Button',
        importName: 'KuiButtonDirective',
        status: 'available',
        description: 'Primary command primitive for buttons and links.',
        routePath: `/${AppRoutePath.Components}/${AppRoutePath.ComponentsButton}`,
      },
      {
        name: 'Icon Button',
        importName: 'KuiIconButtonDirective',
        status: 'available',
        description: 'Compact icon-only action control.',
      },
      {
        name: 'Menu',
        importName: 'KuiMenuComponent',
        status: 'available',
        description: 'Anchored command menu with keyboard focus behavior.',
      },
      {
        name: 'Command Palette',
        importName: 'KuiCommandPaletteComponent',
        status: 'available',
        description: 'Searchable command overlay for application actions.',
      },
    ],
  },
  {
    label: 'Forms',
    description: 'Field wiring, native controls, and overlay-backed input patterns.',
    components: [
      {
        name: 'Field',
        importName: 'KuiFieldComponent',
        status: 'available',
        description: 'Label, hint, error, and form-control composition.',
      },
      {
        name: 'Input',
        importName: 'KuiInputDirective',
        status: 'available',
        description: 'Native text input styling with field integration.',
      },
      {
        name: 'Select',
        importName: 'KuiSelectDirective',
        status: 'available',
        description: 'Dropdown-backed selection control for single and multiple values.',
      },
      {
        name: 'Combobox',
        importName: 'KuiComboboxDirective',
        status: 'available',
        description: 'Searchable input with projected options and async mode.',
      },
      {
        name: 'Slider',
        importName: 'KuiSliderDirective',
        status: 'available',
        description: 'Native range input styling with field and Signal Forms support.',
      },
      {
        name: 'Number Input',
        importName: 'KuiNumberInputDirective',
        status: 'available',
        description: 'Number input states with compact variant options.',
      },
    ],
  },
  {
    label: 'Feedback',
    description: 'Status, loading, empty, and notification primitives.',
    components: [
      {
        name: 'Badge',
        importName: 'KuiBadgeDirective',
        status: 'available',
        description: 'Compact status or metadata marker.',
      },
      {
        name: 'Loader',
        importName: 'KuiLoaderDirective',
        status: 'available',
        description: 'Inline loading indicator for buttons and status areas.',
      },
      {
        name: 'Skeleton',
        importName: 'KuiSkeletonDirective',
        status: 'available',
        description: 'Loading placeholder with reduced-motion behavior.',
      },
      {
        name: 'Toast',
        importName: 'KuiToastService',
        status: 'available',
        description: 'Global notifications with actions and live-region semantics.',
      },
    ],
  },
  {
    label: 'Surfaces',
    description: 'Containers, disclosure patterns, overlays, and structural primitives.',
    components: [
      {
        name: 'Card',
        importName: 'KuiCardDirective',
        status: 'available',
        description: 'Surface, elevated, and sunken content container.',
      },
      {
        name: 'Tabs',
        importName: 'KuiTabsComponent',
        status: 'available',
        description: 'Line and pill tab navigation with optional panel wiring.',
      },
      {
        name: 'Popover',
        importName: 'KuiPopoverComponent',
        status: 'available',
        description: 'Anchored content surface for contextual UI.',
      },
      {
        name: 'Dialog',
        importName: 'kuiDialog',
        status: 'available',
        description: 'Typed modal overlay service and host contract.',
      },
      {
        name: 'Drawer',
        importName: 'kuiDrawer',
        status: 'available',
        description: 'Side and edge overlay surface for focused workflows.',
      },
    ],
  },
  {
    label: 'Data and Identity',
    description: 'Tables, avatars, chips, icons, and scroll containers.',
    components: [
      {
        name: 'Avatar',
        importName: 'KuiAvatarComponent',
        status: 'available',
        description: 'User or entity identity with image, initials, and status.',
      },
      {
        name: 'Table',
        importName: 'KuiTableDirective',
        status: 'available',
        description: 'Native table styling, sorting context, and selection cells.',
      },
      {
        name: 'Chip',
        importName: 'KuiChipDirective',
        status: 'available',
        description: 'Compact token for selected values, filters, and entity references.',
      },
      {
        name: 'Scrollbar',
        importName: '.kui-scroll',
        status: 'available',
        description: 'Tokenized native scroll container utility.',
      },
    ],
  },
];
