import type {
  DocsComponentManifest,
  DocsFoundationManifest,
  DocsPageManifest,
  DocsResourceManifest,
} from '@core/docs-registry';
import { defineDocsRegistry, docsComponentPath } from '@core/docs-registry';
import { ACCORDION_DOCS_MANIFEST } from '@pages/components/accordion/accordion.docs-manifest';
import { AVATAR_DOCS_MANIFEST } from '@pages/components/avatar/avatar.docs-manifest';
import { BADGE_DOCS_MANIFEST } from '@pages/components/badge/badge.docs-manifest';
import { BREADCRUMBS_DOCS_MANIFEST } from '@pages/components/breadcrumbs/breadcrumbs.docs-manifest';
import { BUTTON_DOCS_MANIFEST } from '@pages/components/button/button.docs-manifest';
import { CALENDAR_DOCS_MANIFEST } from '@pages/components/calendar/calendar.docs-manifest';
import { CARD_DOCS_MANIFEST } from '@pages/components/card/card.docs-manifest';
import { CHECKBOX_DOCS_MANIFEST } from '@pages/components/checkbox/checkbox.docs-manifest';
import { CHIP_DOCS_MANIFEST } from '@pages/components/chip/chip.docs-manifest';
import { COLOR_INPUT_DOCS_MANIFEST } from '@pages/components/color-input/color-input.docs-manifest';
import { COMBOBOX_DOCS_MANIFEST } from '@pages/components/combobox/combobox.docs-manifest';
import { COMMAND_PALETTE_DOCS_MANIFEST } from '@pages/components/command-palette/command-palette.docs-manifest';
import { COMPONENTS_OVERVIEW_DOCS_MANIFEST } from '@pages/components/components-overview.docs-manifest';
import { DATE_PICKER_DOCS_MANIFEST } from '@pages/components/date-picker/date-picker.docs-manifest';
import { DIALOG_DOCS_MANIFEST } from '@pages/components/dialog/dialog.docs-manifest';
import { DRAWER_DOCS_MANIFEST } from '@pages/components/drawer/drawer.docs-manifest';
import { DROPDOWN_DOCS_MANIFEST } from '@pages/components/dropdown/dropdown.docs-manifest';
import { EMPTY_STATE_DOCS_MANIFEST } from '@pages/components/empty-state/empty-state.docs-manifest';
import { FIELD_DOCS_MANIFEST } from '@pages/components/field/field.docs-manifest';
import { FILE_UPLOAD_DOCS_MANIFEST } from '@pages/components/file-upload/file-upload.docs-manifest';
import { GROUP_DOCS_MANIFEST } from '@pages/components/group/group.docs-manifest';
import { ICON_DOCS_MANIFEST } from '@pages/components/icon/icon.docs-manifest';
import { ICON_BUTTON_DOCS_MANIFEST } from '@pages/components/icon-button/icon-button.docs-manifest';
import { INPUT_DOCS_MANIFEST } from '@pages/components/input/input.docs-manifest';
import { LOADER_DOCS_MANIFEST } from '@pages/components/loader/loader.docs-manifest';
import { MENU_DOCS_MANIFEST } from '@pages/components/menu/menu.docs-manifest';
import { NUMBER_INPUT_DOCS_MANIFEST } from '@pages/components/number-input/number-input.docs-manifest';
import { POPOVER_DOCS_MANIFEST } from '@pages/components/popover/popover.docs-manifest';
import { PROGRESS_DOCS_MANIFEST } from '@pages/components/progress/progress.docs-manifest';
import { RADIO_DOCS_MANIFEST } from '@pages/components/radio/radio.docs-manifest';
import { SCROLLBAR_DOCS_MANIFEST } from '@pages/components/scrollbar/scrollbar.docs-manifest';
import { SEGMENTED_DOCS_MANIFEST } from '@pages/components/segmented/segmented.docs-manifest';
import { SELECT_DOCS_MANIFEST } from '@pages/components/select/select.docs-manifest';
import { SEPARATOR_DOCS_MANIFEST } from '@pages/components/separator/separator.docs-manifest';
import { SKELETON_DOCS_MANIFEST } from '@pages/components/skeleton/skeleton.docs-manifest';
import { SLIDER_DOCS_MANIFEST } from '@pages/components/slider/slider.docs-manifest';
import { STEPPER_DOCS_MANIFEST } from '@pages/components/stepper/stepper.docs-manifest';
import { SWITCH_DOCS_MANIFEST } from '@pages/components/switch/switch.docs-manifest';
import { TABLE_DOCS_MANIFEST } from '@pages/components/table/table.docs-manifest';
import { TABS_DOCS_MANIFEST } from '@pages/components/tabs/tabs.docs-manifest';
import { TEXTAREA_DOCS_MANIFEST } from '@pages/components/textarea/textarea.docs-manifest';
import { TOAST_DOCS_MANIFEST } from '@pages/components/toast/toast.docs-manifest';
import { TOOLTIP_DOCS_MANIFEST } from '@pages/components/tooltip/tooltip.docs-manifest';
import { TREE_DOCS_MANIFEST } from '@pages/components/tree/tree.docs-manifest';
import { DRAFT_DOCS_MANIFEST } from '@pages/draft/draft.docs-manifest';
import { ACCESSIBILITY_DOCS_MANIFEST } from '@pages/foundations/accessibility/accessibility.docs-manifest';
import { DENSITY_DOCS_MANIFEST } from '@pages/foundations/density/density.docs-manifest';
import { INSTALLATION_DOCS_MANIFEST } from '@pages/foundations/installation/installation.docs-manifest';
import { THEMING_DOCS_MANIFEST } from '@pages/foundations/theming/theming.docs-manifest';
import { TOKENS_DOCS_MANIFEST } from '@pages/foundations/tokens/tokens.docs-manifest';
import { TYPOGRAPHY_DOCS_MANIFEST } from '@pages/foundations/typography/typography.docs-manifest';
import { HOME_DOCS_MANIFEST } from '@pages/home/home.docs-manifest';
import { NOT_FOUND_DOCS_MANIFEST } from '@pages/not-found/not-found.docs-manifest';
import { SMOKE_DOCS_MANIFEST } from '@pages/smoke/smoke.docs-manifest';

const DOCS_SECTION_SEGMENTS = {
  foundations: 'foundations',
  components: 'components',
} as const;

export const DOCS_REGISTRY = defineDocsRegistry({
  pages: {
    home: HOME_DOCS_MANIFEST,
    draft: DRAFT_DOCS_MANIFEST,
    'components-overview': COMPONENTS_OVERVIEW_DOCS_MANIFEST,
    'not-found': NOT_FOUND_DOCS_MANIFEST,
  },
  sections: {
    foundations: {
      slug: DOCS_SECTION_SEGMENTS.foundations,
      label: 'Foundations',
      description: 'Installation, theming, tokens, density, and accessibility.',
    },
    components: {
      slug: DOCS_SECTION_SEGMENTS.components,
      label: 'Components',
      description: 'Consumer-safe component documentation built from package APIs.',
    },
  },
  categories: [
    {
      id: 'actions',
      label: 'Actions',
      description: 'Trigger commands, menus, and command-style workflows.',
    },
    {
      id: 'forms',
      label: 'Forms',
      description: 'Field wiring, native controls, and overlay-backed input patterns.',
    },
    {
      id: 'feedback',
      label: 'Feedback',
      description: 'Status, loading, empty, and notification primitives.',
    },
    {
      id: 'surfaces',
      label: 'Surfaces',
      description: 'Containers, disclosure patterns, overlays, and structural primitives.',
    },
    {
      id: 'data-identity',
      label: 'Data and Identity',
      description: 'Tables, avatars, chips, icons, and scroll containers.',
    },
  ],
  foundations: [
    INSTALLATION_DOCS_MANIFEST,
    THEMING_DOCS_MANIFEST,
    TOKENS_DOCS_MANIFEST,
    TYPOGRAPHY_DOCS_MANIFEST,
    DENSITY_DOCS_MANIFEST,
    ACCESSIBILITY_DOCS_MANIFEST,
  ],
  components: [
    BUTTON_DOCS_MANIFEST,
    ICON_BUTTON_DOCS_MANIFEST,
    MENU_DOCS_MANIFEST,
    COMMAND_PALETTE_DOCS_MANIFEST,
    FIELD_DOCS_MANIFEST,
    INPUT_DOCS_MANIFEST,
    COLOR_INPUT_DOCS_MANIFEST,
    SELECT_DOCS_MANIFEST,
    COMBOBOX_DOCS_MANIFEST,
    DATE_PICKER_DOCS_MANIFEST,
    CALENDAR_DOCS_MANIFEST,
    FILE_UPLOAD_DOCS_MANIFEST,
    SEGMENTED_DOCS_MANIFEST,
    SLIDER_DOCS_MANIFEST,
    NUMBER_INPUT_DOCS_MANIFEST,
    TEXTAREA_DOCS_MANIFEST,
    CHECKBOX_DOCS_MANIFEST,
    SWITCH_DOCS_MANIFEST,
    RADIO_DOCS_MANIFEST,
    GROUP_DOCS_MANIFEST,
    BADGE_DOCS_MANIFEST,
    LOADER_DOCS_MANIFEST,
    SKELETON_DOCS_MANIFEST,
    TOOLTIP_DOCS_MANIFEST,
    TOAST_DOCS_MANIFEST,
    EMPTY_STATE_DOCS_MANIFEST,
    PROGRESS_DOCS_MANIFEST,
    CARD_DOCS_MANIFEST,
    TABS_DOCS_MANIFEST,
    ACCORDION_DOCS_MANIFEST,
    BREADCRUMBS_DOCS_MANIFEST,
    POPOVER_DOCS_MANIFEST,
    DIALOG_DOCS_MANIFEST,
    DRAWER_DOCS_MANIFEST,
    DROPDOWN_DOCS_MANIFEST,
    SEPARATOR_DOCS_MANIFEST,
    STEPPER_DOCS_MANIFEST,
    ICON_DOCS_MANIFEST,
    AVATAR_DOCS_MANIFEST,
    TABLE_DOCS_MANIFEST,
    CHIP_DOCS_MANIFEST,
    SCROLLBAR_DOCS_MANIFEST,
    TREE_DOCS_MANIFEST,
  ],
  resources: [SMOKE_DOCS_MANIFEST],
});

export const DOCS_ROUTE_SEGMENTS = {
  home: DOCS_REGISTRY.pages.home.routeSegment,
  foundations: DOCS_REGISTRY.sections.foundations.slug,
  components: DOCS_REGISTRY.sections.components.slug,
  playground: 'playground',
  notFound: DOCS_REGISTRY.pages['not-found'].routeSegment,
} as const;

export const DOCS_PAGE_MANIFESTS: readonly DocsPageManifest[] = Object.values(DOCS_REGISTRY.pages);
export const DOCS_COMPONENT_MANIFESTS: readonly DocsComponentManifest[] = DOCS_REGISTRY.components;
export const DOCS_FOUNDATION_MANIFESTS: readonly DocsFoundationManifest[] =
  DOCS_REGISTRY.foundations;
export const DOCS_RESOURCE_MANIFESTS: readonly DocsResourceManifest[] = DOCS_REGISTRY.resources;

const componentByPath = new Map(
  DOCS_REGISTRY.components.map((component) => [docsComponentPath(component.slug), component]),
);

export function findDocsComponentByPath(path: string) {
  return componentByPath.get(path);
}
