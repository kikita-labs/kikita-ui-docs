# Avatar

> User or entity identity with image, initials, and status.

- Status: available
- Route: /components/avatar
- Package: @kikita-labs/ui@1.0.0
- Import: KuiAvatarComponent from @kikita-labs/ui
- Source docs: ../kikita-ui/docs/avatar.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

```html
<kui-avatar src="/users/nikita.png" name="Nikita Repin" status="online" />
<kui-avatar name="Anya Murashova" />
<kui-avatar />
```

Image avatars render a native `<img>`. If the image fails to load, the component falls back to
initials generated from `name`, then to the icon fallback when no initials are available.

## Examples

Rendered at /components/avatar:

### avatar-button-example

#### avatar-button-example.html

```html
<div class="avatar-button-example">
  <button class="kui-avatar-action" type="button" aria-label="Open Nikita Repin profile">
    <kui-avatar src="https://i.pravatar.cc/64?img=12" name="Nikita Repin" />
  </button>
</div>
```

#### avatar-button-example.ts

```ts
import { Component } from '@angular/core';

import { KuiAvatarComponent } from '@kikita-labs/ui';

@Component({
  selector: 'app-avatar-button-example',
  imports: [KuiAvatarComponent],
  templateUrl: './avatar-button-example.html',
  styleUrl: './avatar-button-example.scss',
})
export class AvatarButtonExample {}
```

#### avatar-button-example.scss

```scss
.avatar-button-example {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### avatar-group-example

#### avatar-group-example.html

```html
<div class="avatar-group-example">
  <kui-avatar-group [avatars]="members" [max]="4" size="sm" label="Project participants" />
</div>
```

#### avatar-group-example.ts

```ts
import { Component } from '@angular/core';

import { KuiAvatarGroupComponent, type KuiAvatarItem } from '@kikita-labs/ui';

const MEMBERS: readonly KuiAvatarItem[] = [
  { src: 'https://i.pravatar.cc/64?img=12', name: 'Nikita Repin', status: 'online' },
  { name: 'Anya Murashova', status: 'away' },
  { name: 'Timur Ognev' },
  { name: 'Vera Saltykova' },
  { name: 'Ilya Denisov' },
];

@Component({
  selector: 'app-avatar-group-example',
  imports: [KuiAvatarGroupComponent],
  templateUrl: './avatar-group-example.html',
  styleUrl: './avatar-group-example.scss',
})
export class AvatarGroupExample {
  protected readonly members = MEMBERS;
}
```

#### avatar-group-example.scss

```scss
.avatar-group-example {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### avatar-sizes-shapes-example

#### avatar-sizes-shapes-example.html

```html
<div class="avatar-sizes-shapes-example">
  <div class="avatar-sizes-shapes-example__row">
    <kui-avatar name="Nikita Repin" size="xs" />
    <kui-avatar name="Nikita Repin" size="sm" />
    <kui-avatar name="Nikita Repin" size="md" />
    <kui-avatar name="Nikita Repin" size="lg" />
    <kui-avatar name="Nikita Repin" size="xl" />
    <kui-avatar name="Nikita Repin" size="2xl" />
  </div>
  <div class="avatar-sizes-shapes-example__row">
    <kui-avatar name="Design Bot" shape="square" />
    <kui-avatar name="Release Team" shape="square" size="lg" />
  </div>
</div>
```

#### avatar-sizes-shapes-example.ts

```ts
import { Component } from '@angular/core';

import { KuiAvatarComponent } from '@kikita-labs/ui';

@Component({
  selector: 'app-avatar-sizes-shapes-example',
  imports: [KuiAvatarComponent],
  templateUrl: './avatar-sizes-shapes-example.html',
  styleUrl: './avatar-sizes-shapes-example.scss',
})
export class AvatarSizesShapesExample {}
```

#### avatar-sizes-shapes-example.scss

```scss
.avatar-sizes-shapes-example {
  display: flex;
  flex-direction: column;
  gap: var(--kui-space-4, 16px);
  align-items: center;
}

.avatar-sizes-shapes-example__row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--kui-space-3, 12px);
  align-items: center;
  justify-content: center;
}
```

### avatar-status-example

#### avatar-status-example.html

```html
<div class="avatar-status-example">
  <kui-avatar name="Nikita Repin" status="online" />
  <kui-avatar name="Anya Murashova" status="away" />
  <kui-avatar name="Timur Ognev" status="busy" />
  <kui-avatar name="Vera Saltykova" status="offline" />
</div>
```

#### avatar-status-example.ts

```ts
import { Component } from '@angular/core';

import { KuiAvatarComponent } from '@kikita-labs/ui';

@Component({
  selector: 'app-avatar-status-example',
  imports: [KuiAvatarComponent],
  templateUrl: './avatar-status-example.html',
  styleUrl: './avatar-status-example.scss',
})
export class AvatarStatusExample {}
```

#### avatar-status-example.scss

```scss
.avatar-status-example {
  display: flex;
  flex-wrap: wrap;
  gap: var(--kui-space-3, 12px);
  align-items: center;
  justify-content: center;
}
```

### basic-avatar-example

#### basic-avatar-example.html

```html
<div class="basic-avatar-example">
  <kui-avatar src="https://i.pravatar.cc/64?img=12" name="Nikita Repin" status="online" />
  <kui-avatar name="Anya Murashova" />
  <kui-avatar />
</div>
```

#### basic-avatar-example.ts

```ts
import { Component } from '@angular/core';

import { KuiAvatarComponent } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-avatar-example',
  imports: [KuiAvatarComponent],
  templateUrl: './basic-avatar-example.html',
  styleUrl: './basic-avatar-example.scss',
})
export class BasicAvatarExample {}
```

#### basic-avatar-example.scss

```scss
.basic-avatar-example {
  display: flex;
  flex-wrap: wrap;
  gap: var(--kui-space-3, 12px);
  align-items: center;
  justify-content: center;
}
```

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| src | string \| undefined | undefined | Image URL. Falls back to initials, then the icon fallback, on load error. |
| name | string \| undefined | undefined | Used to derive initials, the palette hash, and the accessible label. |
| initials | string \| undefined | auto | Explicit one or two character initials, overriding the value derived from name. |
| alt | string \| undefined | name | Image alt text and accessible label override. |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' | 'md' | Fixed avatar size. |
| shape | 'circle' \| 'square' | 'circle' | circle is intended for people; square is intended for entities such as bots, teams, or projects. |
| status | 'online' \| 'away' \| 'busy' \| 'offline' \| undefined | undefined | Optional presence indicator. Appended to the accessible label; the dot itself is decorative. |
| paletteIndex | number \| undefined | auto | Palette slot from 1 to 7 used for the fallback background and text color. Clamped when explicit. |
| loading | boolean | false | Renders the avatar using the internal [kuiSkeleton] loading treatment and hides avatar content. |
| kui-avatar-group avatars | readonly KuiAvatarItem[] | [] | Items rendered by the group. Each item accepts the same fields as kui-avatar. |
| kui-avatar-group max | number | 4 | Maximum visible avatars before the group collapses the rest into a +N overflow avatar. |
| kui-avatar-group size | KuiAvatarSize | 'md' | Size applied to every avatar in the group, including the overflow avatar. |
| kui-avatar-group shape | KuiAvatarShape | 'circle' | Shape applied to every avatar in the group, including the overflow avatar. |
| kui-avatar-group label | string | 'Avatar group' | Accessible label for the group container. |
| .kui-avatar-action | CSS class | - | Applied to an external native button wrapping a kui-avatar to make it interactive. kui-avatar itself must not be made clickable. |

## Accessibility

- Image avatars render a native `<img>` with `alt` derived from `alt`, then `name`.
- Initials and icon fallback avatars expose `role="img"` and `aria-label`.
- Status is appended to the accessible label, for example `Nikita Repin, online`.
- The status dot is decorative.
- Interactive avatars must use a native `<button>` wrapper with `aria-label`.

## Playground

Available at /components/avatar/playground.
