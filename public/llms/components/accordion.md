# Accordion

> Disclosure component for grouped expandable content.

- Status: available
- Route: /components/accordion
- Package: @kikita-labs/ui@2.0.0
- Import: KuiAccordion from @kikita-labs/ui
- Source docs: https://github.com/kikita-labs/kikita-ui/blob/v2.0.0/docs/accordion.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

```html
<kui-accordion mode="exclusive" appearance="default" size="md">
  <kui-accordion-item id="general" header="General settings">
    Configure display and behavior options.
  </kui-accordion-item>

  <kui-accordion-item id="security" header="Security">
    Account security parameters.
  </kui-accordion-item>
</kui-accordion>
```

## Examples

Rendered at /components/accordion:

### appearance-accordion-example

#### appearance-accordion-example.html

```html
<div class="appearance-accordion-example">
  <div class="appearance-accordion-example__col">
    <p class="appearance-accordion-example__label">bordered</p>
    <kui-accordion appearance="bordered">
      <kui-accordion-item id="bordered-general" header="General settings">
        Configure display and behavior options.
      </kui-accordion-item>
      <kui-accordion-item id="bordered-security" header="Security">
        Account security parameters.
      </kui-accordion-item>
    </kui-accordion>
  </div>

  <div class="appearance-accordion-example__col">
    <p class="appearance-accordion-example__label">ghost</p>
    <kui-accordion appearance="ghost">
      <kui-accordion-item id="ghost-general" header="General settings">
        Configure display and behavior options.
      </kui-accordion-item>
      <kui-accordion-item id="ghost-security" header="Security">
        Account security parameters.
      </kui-accordion-item>
    </kui-accordion>
  </div>
</div>
```

#### appearance-accordion-example.ts

```ts
import { Component } from '@angular/core';

import { KuiAccordion, KuiAccordionItem } from '@kikita-labs/ui';

@Component({
  selector: 'app-appearance-accordion-example',
  imports: [KuiAccordion, KuiAccordionItem],
  templateUrl: './appearance-accordion-example.html',
  styleUrl: './appearance-accordion-example.scss',
})
export class AppearanceAccordionExample {}
```

#### appearance-accordion-example.scss

```scss
.appearance-accordion-example {
  display: flex;
  gap: var(--kui-space-6, 24px);
  flex-wrap: wrap;
}

.appearance-accordion-example__col {
  flex: 1;
  min-width: 220px;
}

.appearance-accordion-example__label {
  margin: 0 0 var(--kui-space-2, 8px);
  color: var(--kui-color-text-secondary);
  font-size: var(--kui-text-xs-size, 11px);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
```

### basic-accordion-example

#### basic-accordion-example.html

```html
<kui-accordion mode="exclusive" appearance="default" size="md">
  <kui-accordion-item id="general" header="General settings">
    Configure display and behavior options.
  </kui-accordion-item>

  <kui-accordion-item id="notifications" header="Notifications">
    Manage push notifications and email digests.
  </kui-accordion-item>

  <kui-accordion-item id="security" header="Security">
    Account security parameters.
  </kui-accordion-item>
</kui-accordion>
```

#### basic-accordion-example.ts

```ts
import { Component } from '@angular/core';

import { KuiAccordion, KuiAccordionItem } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-accordion-example',
  imports: [KuiAccordion, KuiAccordionItem],
  templateUrl: './basic-accordion-example.html',
  styleUrl: './basic-accordion-example.scss',
})
export class BasicAccordionExample {}
```

#### basic-accordion-example.scss

```scss
:host {
  display: block;
}
```

### icon-accordion-example

#### icon-accordion-example.html

```html
<kui-accordion appearance="bordered">
  <kui-accordion-item id="settings" header="Settings">
    <ng-template kuiAccordionIcon>
      <kui-icon name="settings" />
    </ng-template>
    Settings content with a leading icon slot.
  </kui-accordion-item>

  <kui-accordion-item id="disabled" header="Archived project" [disabled]="true">
    This section is disabled and cannot be toggled.
  </kui-accordion-item>
</kui-accordion>
```

#### icon-accordion-example.ts

```ts
import { Component } from '@angular/core';

import { KuiAccordion, KuiAccordionIcon, KuiAccordionItem, KuiIcon } from '@kikita-labs/ui';

@Component({
  selector: 'app-icon-accordion-example',
  imports: [KuiAccordion, KuiAccordionIcon, KuiAccordionItem, KuiIcon],
  templateUrl: './icon-accordion-example.html',
  styleUrl: './icon-accordion-example.scss',
})
export class IconAccordionExample {}
```

#### icon-accordion-example.scss

```scss
:host {
  display: block;
}
```

### multi-accordion-example

#### multi-accordion-example.html

```html
<kui-accordion mode="multi" [(expandedItems)]="expanded">
  <kui-accordion-item id="profile" header="Profile">Profile content.</kui-accordion-item>
  <kui-accordion-item id="billing" header="Billing">Billing content.</kui-accordion-item>
  <kui-accordion-item id="team" header="Team members">Team content.</kui-accordion-item>
</kui-accordion>
```

#### multi-accordion-example.ts

```ts
import { Component, signal } from '@angular/core';

import { KuiAccordion, KuiAccordionItem } from '@kikita-labs/ui';

@Component({
  selector: 'app-multi-accordion-example',
  imports: [KuiAccordion, KuiAccordionItem],
  templateUrl: './multi-accordion-example.html',
  styleUrl: './multi-accordion-example.scss',
})
export class MultiAccordionExample {
  protected readonly expanded = signal(['profile']);
}
```

#### multi-accordion-example.scss

```scss
:host {
  display: block;
}
```

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| mode | 'exclusive' \| 'multi' | 'exclusive' | Toggle mode. exclusive keeps a single section open at a time; multi allows any number of sections open simultaneously. A plain input, not two-way bindable. Falls back to defaults.accordion.mode. |
| appearance | 'default' \| 'bordered' \| 'ghost' | 'default' | Container and divider treatment: default uses bottom borders between items, bordered wraps each item in its own bordered block, ghost has no borders. A plain input; falls back to defaults.accordion.appearance. |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' | 'md' | Trigger height and text size. A plain input; falls back to defaults.accordion.size, then the global defaults.size. |
| expandedItems | string[] | [] | IDs of currently expanded items. The only mutable state of the accordion and the only two-way bindable one: use [(expandedItems)] or listen to (expandedItemsChange). |
| header | string | '' | kui-accordion-item: trigger label text. |
| id | string | auto-generated | kui-accordion-item: stable ID used for state tracking and ARIA wiring. The generated default is numbered per Angular application, so server-rendered ids match the browser. |
| disabled | boolean | false | kui-accordion-item: removes the trigger from tab order and prevents toggling the section. |
| kuiAccordionIcon | - | - | Marker directive for an ng-template projected into a kui-accordion-item trigger, before the label text. |
| provideKuiDefaults({ accordion }) | (defaults: KuiComponentDefaults) => Provider | - | Sets size, mode, appearance and disclosureIcon for a subtree; provideKikitaUi({ defaults }) does it for the whole application. |
| KuiAccordionOptions | interface | - | Shape of defaults.accordion. disclosureIcon takes precedence over defaults.icons.disclosure. |
| KuiAccordionMode / KuiAccordionAppearance | type aliases | - | Public unions of the mode and appearance values. |

## Accessibility

Each item renders a native button trigger with `aria-expanded`, `aria-controls`,
and a region body linked through `aria-labelledby`.

## Playground

Available at /components/accordion/playground.
