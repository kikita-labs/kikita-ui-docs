# Dropdown

> Projected option overlay used by select-like controls.

- Status: available
- Route: /components/dropdown
- Package: @kikita-labs/ui@0.4.3
- Import: KuiDropdownComponent from @kikita-labs/ui
- Source docs: ../kikita-ui/docs/dropdown.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

### Inside `kui-field`

`kui-field` detects a nested dropdown, sets itself as the anchor, and toggles the
panel when the field is clicked. This is the normal pattern for `input[kuiSelect]`.

```html
<kui-field label="Fruit">
  <input kuiSelect [(value)]="fruit" placeholder="Pick..." />
  <kui-dropdown>
    @for (option of options; track option) {
    <div [kuiOption]="option">{{ option }}</div>
    }
  </kui-dropdown>
</kui-field>
```

### Trigger directive

Use `[kuiDropdownFor]` when the dropdown is anchored to a standalone trigger.
Prefer a native `<button>` so keyboard behavior and button semantics are already
correct.

```html
<button type="button" [kuiDropdownFor]="menu">Actions</button>

<kui-dropdown #menu [maxHeight]="null">
  <div kuiOption="edit">Edit</div>
  <div kuiOption="delete" [disabled]="true">Delete</div>
</kui-dropdown>
```

For non-button triggers, the host element must already be focusable and handle
keyboard activation. The directive only wires click toggling, `aria-expanded`,
and `aria-haspopup`.

## Examples

Rendered at /components/dropdown:

- `field-dropdown-example`
- `panel-width-dropdown-example`
- `standalone-dropdown-example`

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| maxHeight | string \| null | '240px' | Preferred max height of the panel before it scrolls. Always additionally clamped to the viewport so the panel can never render taller than the screen. null removes only the preferred cap, not the viewport clamp. |
| offset | number | 4 | Gap in px between the anchor and the panel edge. |
| closeOnSelect | boolean (model) | true | Closes the panel when a selectable option is clicked. Two-way bindable via closeOnSelectChange. |
| panelRole | 'listbox' \| 'dialog' \| 'grid' \| null | 'listbox' | ARIA role rendered on the panel. Set to dialog (or null to omit the role) for non-listbox projected content, e.g. kui-calendar. |
| panelWidth | 'anchor' \| 'content' \| 'auto' | 'anchor' | anchor matches the trigger's width exactly (listboxes). content grows with the panel's own content but never below the trigger's width. auto ignores the trigger's width and sizes purely to content. |
| width | string \| null | null | Explicit panel width (any CSS width, e.g. 320px). Overrides panelWidth entirely when set. |
| isOpen | Signal<boolean> | - | Current open state. |
| open() | method | - | Shows the panel and attaches scroll/outside-click/Escape listeners. |
| close() | method | - | Starts the close animation and detaches listeners. |
| toggle() | method | - | Opens when closed, closes when open. |
| setAnchor(el) | method | - | Sets the anchor imperatively. Called by kui-field and [kuiDropdownFor]. |
| getPanel() | method | - | Returns the rendered panel element, if attached. |
| getPanelId() | method | - | Returns the stable panel id for ARIA wiring. |
| [kuiDropdownFor] | KuiDropdownComponent | - | Wires a standalone trigger to a dropdown instance and manages click toggling, aria-expanded, and aria-haspopup. Prefer a native button so keyboard behavior is already correct. |
| [kuiOption] value | unknown | - | Required. The value an option renders and emits. Set via the `value` input on `KuiOptionDirective`, e.g. `<div kuiOption value="edit">`. |
| [kuiOption] disabled | boolean | false | Disables click and keyboard selection for this option. |
| kuiOptionSelect | EventEmitter<unknown> | - | Emits the option value on selection. |
| --kui-dropdown-bg | CSS custom property | var(--kui-color-surface-elevated) | Panel background. |
| --kui-dropdown-border | CSS custom property | var(--kui-color-border) | Panel border color. |
| --kui-dropdown-radius | CSS custom property | var(--kui-radius-md) | Panel corner radius. |
| --kui-dropdown-shadow | CSS custom property | var(--kui-shadow-lg) | Panel drop shadow. |
| --kui-dropdown-viewport-margin | CSS custom property | var(--kui-space-6, 32px) | Margin subtracted from the viewport height when clamping the panel max-height. |
| Known non-feature | - | - | Dropdown does not own selection or value state itself. Select, Combobox, Menu, or another host component provides that context; a bare kui-dropdown only positions the panel and manages open/close. |

## Accessibility

- Keep dropdown triggers native where possible, especially `<button>`.
- Select-style hosts should expose `role="combobox"`, `aria-expanded`,
  `aria-controls`, and `aria-describedby` through their own directive.
- Options use `role="option"` inside the dropdown `role="listbox"` panel.
- Escape closes the panel. Enter/Space selects an option. Tab closes without
  stealing focus back from the next tabbable element.

## Playground

Available at /components/dropdown/playground.
