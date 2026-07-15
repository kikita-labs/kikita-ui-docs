# Tabs

> Line and pill tab navigation with optional panel wiring.

- Status: available
- Route: /components/tabs
- Package: @kikita-labs/ui@0.4.2
- Import: KuiTabsComponent from @kikita-labs/ui
- Source docs: ../kikita-ui/docs/tabs.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

```html
<kui-tabs [(selected)]="activeTab">
  <button kuiTab value="overview">Overview</button>
  <button kuiTab value="settings">Settings</button>
  <button kuiTab value="logs">Logs</button>

  <div kuiTabPanel value="overview">Overview content</div>
  <div kuiTabPanel value="settings">Settings content</div>
  <div kuiTabPanel value="logs">Log content</div>
</kui-tabs>
```

### Pill Variant

```html
<kui-tabs variant="pill" [(selected)]="activeTab"> ... </kui-tabs>
```

### Router Navigation

Use `controlsPanels="false"` when `kui-tabs` is used as navigation and the routed page content is rendered by `router-outlet` instead of local `kuiTabPanel` elements.

```html
<kui-tabs [(selected)]="currentRoute" [controlsPanels]="false" aria-label="Sections">
  <button kuiTab value="/overview">Overview</button>
  <button kuiTab value="/settings">Settings</button>
</kui-tabs>
```

## Examples

Rendered at /components/tabs:

- `basic-tabs-example`
- `navigation-tabs-example`
- `pill-tabs-example`
- `vertical-tabs-example`

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| variant | 'line' \| 'pill' | 'line' | Tab visual style: underline indicator (line) or pill background (pill). |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' | 'md' | Tab trigger height and font size. |
| orientation | 'horizontal' \| 'vertical' | 'horizontal' | Layout direction of the tab list. Vertical stacks triggers in a column with the indicator on the side edge. |
| controlsPanels | boolean | true | Whether tabs expose aria-controls links to projected kuiTabPanel elements. Set to false when tabs are used as navigation and content is rendered elsewhere, such as a router-outlet. |
| selected | string | - | Value of the active tab. Two-way bindable with [(selected)]. |
| [kuiTab] value | string | - | Identifier for this tab trigger. Must match a kuiTabPanel value when controlsPanels is true. |
| [kuiTab] hasError | boolean | false | Shows a small danger dot next to the tab label without changing the selected state or tab color. |
| [kuiTab] errorLabel | string | '' | Screen-reader-only text announced alongside the error dot. |
| [kuiTabPanel] value | string | - | Identifier matching a [kuiTab] value. Panel is shown when its value matches selected. |
| --kui-tabs-gap | CSS length | 2px | Gap between tab triggers in the list. |
| --kui-tabs-border | CSS color | var(--kui-color-border) | Border color of the tab list edge (bottom for horizontal, side for vertical). |
| --kui-tabs-panel-gap | CSS length | var(--kui-space-4) | Gap between the tab list and the active panel. |
| --kui-tab-height | CSS length | var(--kui-btn-height) | Tab trigger block size. Overridden per size. |
| --kui-tab-px | CSS length | var(--kui-btn-px) | Tab trigger inline padding. Overridden per size. |
| --kui-tab-indicator | CSS color | var(--kui-color-primary-fill) | Color of the selected-tab indicator (underline for line, background for pill). |
| --kui-tab-fg-active | CSS color | var(--kui-color-text) | Text color of the selected tab. |

## Accessibility

- `role="tablist"` on the list container
- `role="tab"` on each trigger, with `aria-selected` and roving `tabindex`
- `role="tabpanel"` on each panel
- `aria-controls` is emitted by default and should point to a matching `[kuiTabPanel]`
- Use `[controlsPanels]="false"` only for navigation-style tabs without local panels

## Playground

Available at /components/tabs/playground.
