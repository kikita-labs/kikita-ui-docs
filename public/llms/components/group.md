# Group

> Grouped control chrome for adjacent actions and fields.

- Status: available
- Route: /components/group
- Package: @kikita-labs/ui@0.5.0
- Import: KuiGroupDirective from @kikita-labs/ui
- Source docs: ../kikita-ui/docs/group.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

```html
<div kuiGroup collapsed>
  <button kuiButton appearance="outline">One</button>
  <button kuiButton appearance="outline">Two</button>
  <button kuiIconButton appearance="outline" aria-label="More">
    <kui-icon name="more" />
  </button>
</div>
```

## Examples

Rendered at /components/group:

### basic-group-example

#### basic-group-example.html

```html
<div class="basic-group-example">
  <div kuiGroup collapsed>
    <button kuiButton type="button" shape="outline">One</button>
    <button kuiButton type="button" shape="outline">Two</button>
    <button kuiIconButton type="button" shape="outline" aria-label="More options">
      <kui-icon [source]="moreIcon" />
    </button>
  </div>
</div>
```

#### basic-group-example.ts

```ts
import { Component } from '@angular/core';

import {
  KuiButtonDirective,
  KuiGroupDirective,
  KuiIconButtonDirective,
  KuiIconComponent,
} from '@kikita-labs/ui';

const MORE_ICON =
  '<svg viewBox="0 0 24 24" fill="none"><circle cx="5" cy="12" r="1.6" fill="currentColor"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/><circle cx="19" cy="12" r="1.6" fill="currentColor"/></svg>';

@Component({
  selector: 'app-basic-group-example',
  imports: [KuiButtonDirective, KuiGroupDirective, KuiIconButtonDirective, KuiIconComponent],
  templateUrl: './basic-group-example.html',
  styleUrl: './basic-group-example.scss',
})
export class BasicGroupExample {
  protected readonly moreIcon = MORE_ICON;
}
```

#### basic-group-example.scss

```scss
.basic-group-example {
  display: flex;
  flex-wrap: wrap;
  gap: var(--kui-space-3, 12px);
  align-items: center;
  justify-content: center;
}
```

### group-field-example

#### group-field-example.html

```html
<div class="group-field-example">
  <div kuiGroup collapsed>
    <input kuiInput placeholder="Search projects" />
    <button kuiIconButton type="button" shape="outline" aria-label="Search">
      <kui-icon [source]="searchIcon" />
    </button>
  </div>

  <div kuiGroup collapsed size="sm">
    <input kuiInput placeholder="Search" />
    <button kuiButton type="button" shape="outline">Go</button>
  </div>
</div>
```

#### group-field-example.ts

```ts
import { Component } from '@angular/core';

import {
  KuiButtonDirective,
  KuiGroupDirective,
  KuiIconButtonDirective,
  KuiIconComponent,
  KuiInputDirective,
} from '@kikita-labs/ui';

const SEARCH_ICON =
  '<svg viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="6" stroke="currentColor" stroke-width="2"/><path d="M20 20l-3.5-3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';

@Component({
  selector: 'app-group-field-example',
  imports: [
    KuiButtonDirective,
    KuiGroupDirective,
    KuiIconButtonDirective,
    KuiIconComponent,
    KuiInputDirective,
  ],
  templateUrl: './group-field-example.html',
  styleUrl: './group-field-example.scss',
})
export class GroupFieldExample {
  protected readonly searchIcon = SEARCH_ICON;
}
```

#### group-field-example.scss

```scss
.group-field-example {
  display: flex;
  flex-wrap: wrap;
  gap: var(--kui-space-4, 16px);
  align-items: center;
  justify-content: center;
}
```

### group-orientation-example

#### group-orientation-example.html

```html
<div class="group-orientation-example">
  <div kuiGroup collapsed orientation="horizontal">
    <button kuiButton type="button" shape="outline">Left</button>
    <button kuiButton type="button" shape="outline">Center</button>
    <button kuiButton type="button" shape="outline">Right</button>
  </div>

  <div kuiGroup collapsed orientation="vertical" class="group-orientation-example__vertical">
    <button kuiButton type="button" shape="outline">Top</button>
    <button kuiButton type="button" shape="outline">Middle</button>
    <button kuiButton type="button" shape="outline">Bottom</button>
  </div>
</div>
```

#### group-orientation-example.ts

```ts
import { Component } from '@angular/core';

import { KuiButtonDirective, KuiGroupDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-group-orientation-example',
  imports: [KuiButtonDirective, KuiGroupDirective],
  templateUrl: './group-orientation-example.html',
  styleUrl: './group-orientation-example.scss',
})
export class GroupOrientationExample {}
```

#### group-orientation-example.scss

```scss
.group-orientation-example {
  display: flex;
  flex-wrap: wrap;
  gap: var(--kui-space-6, 24px);
  align-items: center;
  justify-content: center;
}

.group-orientation-example__vertical {
  inline-size: fit-content;
}
```

### group-size-example

#### group-size-example.html

```html
<div class="group-size-example">
  <div kuiGroup collapsed size="xs">
    <button kuiButton type="button" shape="outline">One</button>
    <button kuiButton type="button" shape="outline">Two</button>
  </div>

  <div kuiGroup collapsed size="sm">
    <button kuiButton type="button" shape="outline">One</button>
    <button kuiButton type="button" shape="outline">Two</button>
  </div>

  <div kuiGroup collapsed size="md">
    <button kuiButton type="button" shape="outline">One</button>
    <button kuiButton type="button" shape="outline">Two</button>
  </div>

  <div kuiGroup collapsed size="lg">
    <button kuiButton type="button" shape="outline">One</button>
    <button kuiButton type="button" shape="outline">Two</button>
  </div>
</div>
```

#### group-size-example.ts

```ts
import { Component } from '@angular/core';

import { KuiButtonDirective, KuiGroupDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-group-size-example',
  imports: [KuiButtonDirective, KuiGroupDirective],
  templateUrl: './group-size-example.html',
  styleUrl: './group-size-example.scss',
})
export class GroupSizeExample {}
```

#### group-size-example.scss

```scss
.group-size-example {
  display: flex;
  flex-wrap: wrap;
  gap: var(--kui-space-4, 16px);
  align-items: center;
  justify-content: center;
}
```

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| orientation | 'horizontal' \| 'vertical' | 'horizontal' | Layout direction for the grouped controls. |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' | 'md' | Size inherited by grouped controls through CSS variables. Set on the group instead of each child. |
| collapsed | boolean | false | Collapses adjacent control borders into a single visual group, removing the double border between children. |
| rounded | boolean | true | Keeps the outer group corners rounded when collapsed. Set to false for square outer corners. |

## Accessibility

Rendered documentation, interactive examples, and the playground live at the HTML route above.

## Playground

Available at /components/group/playground.
