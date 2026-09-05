# Dropdown

> Projected option overlay used by select-like controls.

- Status: available
- Route: /components/dropdown
- Package: @kikita-labs/ui@1.8.0
- Import: KuiDropdownComponent from @kikita-labs/ui
- Source docs: https://github.com/kikita-labs/kikita-ui/blob/v1.8.0/docs/dropdown.md

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

### Controlled open state

Use the `open` model when the parent owns when the panel should be visible. The
dropdown updates the bound signal when it closes itself because of Escape, an
outside click, or an off-screen anchor.

```ts
readonly resultsOpen = signal(false);
```

```html
<kui-dropdown [(open)]="resultsOpen" panelWidth="anchor" [panelRole]="null">
  <!-- Projected search results. -->
</kui-dropdown>
```

The existing `open()`, `close()`, and `toggle()` methods remain available for
imperative integrations.

## Examples

Rendered at /components/dropdown:

### field-dropdown-example

#### field-dropdown-example.html

```html
<kui-field label="Fruit">
  <input kuiSelect [(value)]="fruit" placeholder="Pick..." />
  <kui-dropdown>
    <div kuiOption value="apple">Apple</div>
    <div kuiOption value="banana">Banana</div>
    <div kuiOption value="cherry">Cherry</div>
  </kui-dropdown>
</kui-field>
```

#### field-dropdown-example.ts

```ts
import { Component, signal } from '@angular/core';

import {
  KuiDropdownComponent,
  KuiFieldComponent,
  KuiOptionDirective,
  KuiSelectDirective,
} from '@kikita-labs/ui';

@Component({
  selector: 'app-field-dropdown-example',
  imports: [KuiDropdownComponent, KuiFieldComponent, KuiOptionDirective, KuiSelectDirective],
  templateUrl: './field-dropdown-example.html',
})
export class FieldDropdownExample {
  protected readonly fruit = signal<string | null>(null);
}
```

### panel-width-dropdown-example

#### panel-width-dropdown-example.html

```html
<div class="panel-width-dropdown-example">
  <button kuiButton type="button" [kuiDropdownFor]="anchorPanel">panelWidth="anchor"</button>
  <kui-dropdown #anchorPanel panelWidth="anchor">
    <div kuiOption value="a">Matches trigger width</div>
  </kui-dropdown>

  <button kuiButton type="button" [kuiDropdownFor]="contentPanel">panelWidth="content"</button>
  <kui-dropdown #contentPanel panelWidth="content">
    <div kuiOption value="b">Grows with a longer content line if needed</div>
  </kui-dropdown>

  <button kuiButton type="button" [kuiDropdownFor]="explicitPanel">width="320px"</button>
  <kui-dropdown #explicitPanel width="320px">
    <div kuiOption value="c">Always exactly 320px wide</div>
  </kui-dropdown>
</div>
```

#### panel-width-dropdown-example.ts

```ts
import { Component } from '@angular/core';

import {
  KuiButtonDirective,
  KuiDropdownComponent,
  KuiDropdownForDirective,
  KuiOptionDirective,
} from '@kikita-labs/ui';

@Component({
  selector: 'app-panel-width-dropdown-example',
  imports: [KuiButtonDirective, KuiDropdownComponent, KuiDropdownForDirective, KuiOptionDirective],
  templateUrl: './panel-width-dropdown-example.html',
  styleUrl: './panel-width-dropdown-example.scss',
})
export class PanelWidthDropdownExample {}
```

#### panel-width-dropdown-example.scss

```scss
.panel-width-dropdown-example {
  display: flex;
  flex-wrap: wrap;
  gap: var(--kui-space-4, 16px);
}
```

### standalone-dropdown-example

#### standalone-dropdown-example.html

```html
<div class="standalone-dropdown-example">
  <button kuiButton type="button" [kuiDropdownFor]="menu">Actions</button>

  <kui-dropdown #menu [maxHeight]="null">
    <div kuiOption value="edit">Edit</div>
    <div kuiOption value="delete" [disabled]="true">Delete</div>
  </kui-dropdown>
</div>
```

#### standalone-dropdown-example.ts

```ts
import { Component } from '@angular/core';

import {
  KuiButtonDirective,
  KuiDropdownComponent,
  KuiDropdownForDirective,
  KuiOptionDirective,
} from '@kikita-labs/ui';

@Component({
  selector: 'app-standalone-dropdown-example',
  imports: [KuiButtonDirective, KuiDropdownComponent, KuiDropdownForDirective, KuiOptionDirective],
  templateUrl: './standalone-dropdown-example.html',
})
export class StandaloneDropdownExample {}
```

### controlled-open-dropdown-example

#### controlled-open-dropdown-example.html

```html
<div class="controlled-open-dropdown-example">
  <div class="controlled-open-dropdown-example__actions">
    <button kuiButton type="button" [kuiDropdownFor]="results">Show results</button>
    <button kuiButton type="button" shape="soft" (click)="resultsOpen.set(true)">
      Open from parent
    </button>
  </div>

  <kui-dropdown #results [(open)]="resultsOpen" panelWidth="anchor" [panelRole]="null">
    <div kuiOption value="alpha">Alpha result</div>
    <div kuiOption value="beta">Beta result</div>
  </kui-dropdown>
</div>
```

#### controlled-open-dropdown-example.ts

```ts
import { Component, signal } from '@angular/core';

import {
  KuiButtonDirective,
  KuiDropdownComponent,
  KuiDropdownForDirective,
  KuiOptionDirective,
} from '@kikita-labs/ui';

@Component({
  selector: 'app-controlled-open-dropdown-example',
  imports: [KuiButtonDirective, KuiDropdownComponent, KuiDropdownForDirective, KuiOptionDirective],
  templateUrl: './controlled-open-dropdown-example.html',
  styleUrl: './controlled-open-dropdown-example.scss',
})
export class ControlledOpenDropdownExample {
  protected readonly resultsOpen = signal(false);
}
```

#### controlled-open-dropdown-example.scss

```scss
.controlled-open-dropdown-example {
  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
}
```

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| maxHeight | string \| null | '240px' | Preferred max height of the panel before it scrolls. Always additionally clamped to the viewport so the panel can never render taller than the screen. null removes only the preferred cap, not the viewport clamp. |
| offset | number | 4 | Gap in px between the anchor and the panel edge. |
| closeOnSelect | boolean (model) | true | Closes the panel after an enabled option is selected with a pointer or Enter/Space. Two-way bindable via closeOnSelectChange. |
| open | ModelSignal<boolean> | false | Controlled open state. Bind with [(open)] to keep parent state synchronized with Escape, outside-click, and off-screen-anchor dismissal. Imperative open(), close(), and toggle() remain available. |
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
- Escape closes the panel. Enter/Space selects an option and, by default, closes
  it. Tab closes without stealing focus back from the next tabbable element.

## Playground

Available at /components/dropdown/playground.
