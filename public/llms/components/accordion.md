# Accordion

> Disclosure component for grouped expandable content.

- Status: available
- Route: /components/accordion
- Package: @kikita-labs/ui@0.4.6
- Import: KuiAccordionComponent from @kikita-labs/ui
- Source docs: ../kikita-ui/docs/accordion.md

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

import { KuiAccordionComponent, KuiAccordionItemComponent } from '@kikita-labs/ui';

@Component({
  selector: 'app-appearance-accordion-example',
  imports: [KuiAccordionComponent, KuiAccordionItemComponent],
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

import { KuiAccordionComponent, KuiAccordionItemComponent } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-accordion-example',
  imports: [KuiAccordionComponent, KuiAccordionItemComponent],
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
      <kui-icon [source]="settingsIcon" />
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

import {
  KuiAccordionComponent,
  KuiAccordionIconDirective,
  KuiAccordionItemComponent,
  KuiIconComponent,
} from '@kikita-labs/ui';

const SETTINGS_ICON =
  '<svg viewBox="0 0 24 24" fill="none"><path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" stroke="currentColor" stroke-width="2"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.04.04a2 2 0 0 1-2.83 2.83l-.04-.04a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V21a2 2 0 0 1-4 0v-.06A1.7 1.7 0 0 0 8.96 19.4a1.7 1.7 0 0 0-1.88.34l-.04.04a2 2 0 0 1-2.83-2.83l.04-.04A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.56-1.03H3a2 2 0 0 1 0-4h.06A1.7 1.7 0 0 0 4.6 8.96a1.7 1.7 0 0 0-.34-1.88l-.04-.04a2 2 0 1 1 2.83-2.83l.04.04A1.7 1.7 0 0 0 8.96 4.6 1.7 1.7 0 0 0 10 3.06V3a2 2 0 0 1 4 0v.06A1.7 1.7 0 0 0 15.04 4.6a1.7 1.7 0 0 0 1.88-.34l.04-.04a2 2 0 0 1 2.83 2.83l-.04.04a1.7 1.7 0 0 0-.34 1.88A1.7 1.7 0 0 0 20.94 10H21a2 2 0 0 1 0 4h-.06A1.7 1.7 0 0 0 19.4 15Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>';

@Component({
  selector: 'app-icon-accordion-example',
  imports: [
    KuiAccordionComponent,
    KuiAccordionIconDirective,
    KuiAccordionItemComponent,
    KuiIconComponent,
  ],
  templateUrl: './icon-accordion-example.html',
  styleUrl: './icon-accordion-example.scss',
})
export class IconAccordionExample {
  protected readonly settingsIcon = SETTINGS_ICON;
}
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

import { KuiAccordionComponent, KuiAccordionItemComponent } from '@kikita-labs/ui';

@Component({
  selector: 'app-multi-accordion-example',
  imports: [KuiAccordionComponent, KuiAccordionItemComponent],
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
| mode | 'exclusive' \| 'multi' | 'exclusive' | Toggle mode. exclusive keeps a single section open at a time; multi allows any number of sections open simultaneously. Two-way bindable. |
| appearance | 'default' \| 'bordered' \| 'ghost' | 'default' | Container and divider treatment: default uses bottom borders between items, bordered wraps each item in its own bordered block, ghost has no borders. |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' | 'md' | Trigger height and text size. |
| expandedItems | string[] | [] | IDs of currently expanded items. Supports two-way binding with [(expandedItems)]; mutations are reflected back through the model. |
| header | string | '' | kui-accordion-item: trigger label text. |
| id | string | auto-generated | kui-accordion-item: stable ID used for state tracking and ARIA wiring. |
| disabled | boolean | false | kui-accordion-item: removes the trigger from tab order and prevents toggling the section. |
| kuiAccordionIcon | - | - | Marker directive for an ng-template projected into a kui-accordion-item trigger, before the label text. |

## Accessibility

Each item renders a native button trigger with `aria-expanded`, `aria-controls`,
and a region body linked through `aria-labelledby`.

## Playground

Available at /components/accordion/playground.
