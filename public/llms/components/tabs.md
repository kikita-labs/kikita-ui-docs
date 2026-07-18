# Tabs

> Line and pill tab navigation with optional panel wiring.

- Status: available
- Route: /components/tabs
- Package: @kikita-labs/ui@0.7.0
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

### Inverted Edge

Use `inverted` when the tab list should sit on the opposite edge of the panels.
Horizontal tabs render panels above the tab list and place the line indicator on
the top edge. Vertical tabs render panels before the tab list and place the line
indicator on the start edge.

```html
<kui-tabs inverted [(selected)]="activeTab">
  <button kuiTab value="details">Details</button>
  <button kuiTab value="history">History</button>

  <div kuiTabPanel value="details">Details content</div>
  <div kuiTabPanel value="history">History content</div>
</kui-tabs>

<kui-tabs orientation="vertical" inverted [(selected)]="activeTab">
  <button kuiTab value="details">Details</button>
  <button kuiTab value="history">History</button>

  <div kuiTabPanel value="details">Details content</div>
  <div kuiTabPanel value="history">History content</div>
</kui-tabs>
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

### basic-tabs-example

#### basic-tabs-example.html

```html
<kui-tabs [(selected)]="activeTab">
  <button kuiTab value="overview">Overview</button>
  <button kuiTab value="settings">Settings</button>
  <button kuiTab value="logs">Logs</button>

  <div kuiTabPanel value="overview">Overview content.</div>
  <div kuiTabPanel value="settings">Settings content.</div>
  <div kuiTabPanel value="logs">Log content.</div>
</kui-tabs>
```

#### basic-tabs-example.ts

```ts
import { Component, signal } from '@angular/core';

import { KuiTabDirective, KuiTabPanelDirective, KuiTabsComponent } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-tabs-example',
  imports: [KuiTabDirective, KuiTabPanelDirective, KuiTabsComponent],
  templateUrl: './basic-tabs-example.html',
  styleUrl: './basic-tabs-example.scss',
})
export class BasicTabsExample {
  protected readonly activeTab = signal('overview');
}
```

#### basic-tabs-example.scss

```scss
:host {
  display: block;
}
```

### navigation-tabs-example

#### navigation-tabs-example.html

```html
<kui-tabs [(selected)]="currentSection" [controlsPanels]="false" aria-label="Sections">
  <button kuiTab value="/overview">Overview</button>
  <button kuiTab value="/settings">Settings</button>
  <button kuiTab value="/team">Team</button>
</kui-tabs>

<p class="navigation-tabs-example__note">
  Selected value: <code>{{ currentSection() }}</code>
</p>
```

#### navigation-tabs-example.ts

```ts
import { Component, signal } from '@angular/core';

import { KuiTabDirective, KuiTabsComponent } from '@kikita-labs/ui';

@Component({
  selector: 'app-navigation-tabs-example',
  imports: [KuiTabDirective, KuiTabsComponent],
  templateUrl: './navigation-tabs-example.html',
  styleUrl: './navigation-tabs-example.scss',
})
export class NavigationTabsExample {
  protected readonly currentSection = signal('/overview');
}
```

#### navigation-tabs-example.scss

```scss
:host {
  display: block;
}

.navigation-tabs-example__note {
  margin: var(--kui-space-3, 12px) 0 0;
  color: var(--kui-color-text-secondary);
  font-size: var(--kui-text-sm-size, 13px);
}
```

### pill-tabs-example

#### pill-tabs-example.html

```html
<kui-tabs variant="pill" [(selected)]="activeTab">
  <button kuiTab value="daily">Daily</button>
  <button kuiTab value="weekly" hasError errorLabel="Contains validation errors">Weekly</button>
  <button kuiTab value="monthly">Monthly</button>

  <div kuiTabPanel value="daily">Daily report content.</div>
  <div kuiTabPanel value="weekly">Weekly report content.</div>
  <div kuiTabPanel value="monthly">Monthly report content.</div>
</kui-tabs>
```

#### pill-tabs-example.ts

```ts
import { Component, signal } from '@angular/core';

import { KuiTabDirective, KuiTabPanelDirective, KuiTabsComponent } from '@kikita-labs/ui';

@Component({
  selector: 'app-pill-tabs-example',
  imports: [KuiTabDirective, KuiTabPanelDirective, KuiTabsComponent],
  templateUrl: './pill-tabs-example.html',
  styleUrl: './pill-tabs-example.scss',
})
export class PillTabsExample {
  protected readonly activeTab = signal('daily');
}
```

#### pill-tabs-example.scss

```scss
:host {
  display: block;
}
```

### vertical-tabs-example

#### vertical-tabs-example.html

```html
<kui-tabs orientation="vertical" [(selected)]="activeTab">
  <button kuiTab value="profile">Profile</button>
  <button kuiTab value="billing">Billing</button>
  <button kuiTab value="security">Security</button>

  <div kuiTabPanel value="profile">Profile content.</div>
  <div kuiTabPanel value="billing">Billing content.</div>
  <div kuiTabPanel value="security">Security content.</div>
</kui-tabs>
```

#### vertical-tabs-example.ts

```ts
import { Component, signal } from '@angular/core';

import { KuiTabDirective, KuiTabPanelDirective, KuiTabsComponent } from '@kikita-labs/ui';

@Component({
  selector: 'app-vertical-tabs-example',
  imports: [KuiTabDirective, KuiTabPanelDirective, KuiTabsComponent],
  templateUrl: './vertical-tabs-example.html',
  styleUrl: './vertical-tabs-example.scss',
})
export class VerticalTabsExample {
  protected readonly activeTab = signal('profile');
}
```

#### vertical-tabs-example.scss

```scss
:host {
  display: block;
}
```

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| variant | 'line' \| 'pill' | 'line' | Tab visual style: underline indicator (line) or pill background (pill). |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' | 'md' | Tab trigger height and font size. |
| orientation | 'horizontal' \| 'vertical' | 'horizontal' | Layout direction of the tab list. Vertical stacks triggers in a column with the indicator on the side edge. |
| inverted | boolean | false | Flips the tab edge. Horizontal tabs render panels above and the indicator on top; vertical tabs render panels before the list and the indicator on the start edge. |
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
