import { ApiTableRow } from '../../../shared/docs-ui/api-table/api-table-row';

export const DROPDOWN_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'maxHeight',
    type: 'string | null',
    defaultValue: `'240px'`,
    description:
      'Preferred max height of the panel before it scrolls. Always additionally clamped to the viewport so the panel can never render taller than the screen. null removes only the preferred cap, not the viewport clamp.',
  },
  {
    name: 'offset',
    type: 'number',
    defaultValue: '4',
    description: 'Gap in px between the anchor and the panel edge.',
  },
  {
    name: 'closeOnSelect',
    type: 'boolean (model)',
    defaultValue: 'true',
    description:
      'Closes the panel when a selectable option is clicked. Two-way bindable via closeOnSelectChange.',
  },
  {
    name: 'panelRole',
    type: `'listbox' | 'dialog' | 'grid' | null`,
    defaultValue: `'listbox'`,
    description:
      'ARIA role rendered on the panel. Set to dialog (or null to omit the role) for non-listbox projected content, e.g. kui-calendar.',
  },
  {
    name: 'panelWidth',
    type: `'anchor' | 'content' | 'auto'`,
    defaultValue: `'anchor'`,
    description:
      "anchor matches the trigger's width exactly (listboxes). content grows with the panel's own content but never below the trigger's width. auto ignores the trigger's width and sizes purely to content.",
  },
  {
    name: 'width',
    type: 'string | null',
    defaultValue: 'null',
    description:
      'Explicit panel width (any CSS width, e.g. 320px). Overrides panelWidth entirely when set.',
  },
  {
    name: 'isOpen',
    type: 'Signal<boolean>',
    defaultValue: '-',
    description: 'Current open state.',
  },
  {
    name: 'open()',
    type: 'method',
    defaultValue: '-',
    description: 'Shows the panel and attaches scroll/outside-click/Escape listeners.',
  },
  {
    name: 'close()',
    type: 'method',
    defaultValue: '-',
    description: 'Starts the close animation and detaches listeners.',
  },
  {
    name: 'toggle()',
    type: 'method',
    defaultValue: '-',
    description: 'Opens when closed, closes when open.',
  },
  {
    name: 'setAnchor(el)',
    type: 'method',
    defaultValue: '-',
    description: 'Sets the anchor imperatively. Called by kui-field and [kuiDropdownFor].',
  },
  {
    name: 'getPanel()',
    type: 'method',
    defaultValue: '-',
    description: 'Returns the rendered panel element, if attached.',
  },
  {
    name: 'getPanelId()',
    type: 'method',
    defaultValue: '-',
    description: 'Returns the stable panel id for ARIA wiring.',
  },
  {
    name: '[kuiDropdownFor]',
    type: 'KuiDropdownComponent',
    defaultValue: '-',
    description:
      'Wires a standalone trigger to a dropdown instance and manages click toggling, aria-expanded, and aria-haspopup. Prefer a native button so keyboard behavior is already correct.',
  },
  {
    name: '[kuiOption] value',
    type: 'unknown',
    defaultValue: '-',
    description:
      'Required. The value an option renders and emits. Set via the `value` input on `KuiOptionDirective`, e.g. `<div kuiOption value="edit">`.',
  },
  {
    name: '[kuiOption] disabled',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Disables click and keyboard selection for this option.',
  },
  {
    name: 'kuiOptionSelect',
    type: 'EventEmitter<unknown>',
    defaultValue: '-',
    description: 'Emits the option value on selection.',
  },
  {
    name: '--kui-dropdown-bg',
    type: 'CSS custom property',
    defaultValue: 'var(--kui-color-surface-elevated)',
    description: 'Panel background.',
  },
  {
    name: '--kui-dropdown-border',
    type: 'CSS custom property',
    defaultValue: 'var(--kui-color-border)',
    description: 'Panel border color.',
  },
  {
    name: '--kui-dropdown-radius',
    type: 'CSS custom property',
    defaultValue: 'var(--kui-radius-md)',
    description: 'Panel corner radius.',
  },
  {
    name: '--kui-dropdown-shadow',
    type: 'CSS custom property',
    defaultValue: 'var(--kui-shadow-lg)',
    description: 'Panel drop shadow.',
  },
  {
    name: '--kui-dropdown-viewport-margin',
    type: 'CSS custom property',
    defaultValue: 'var(--kui-space-6, 32px)',
    description: 'Margin subtracted from the viewport height when clamping the panel max-height.',
  },
  {
    name: 'Known non-feature',
    type: '-',
    defaultValue: '-',
    description:
      'Dropdown does not own selection or value state itself. Select, Combobox, Menu, or another host component provides that context; a bare kui-dropdown only positions the panel and manages open/close.',
  },
];
