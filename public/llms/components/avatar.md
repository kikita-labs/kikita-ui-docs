# Avatar

> User or entity identity with image, initials, and status.

- Status: available
- Route: /components/avatar
- Package: @kikita-labs/ui@0.4.2
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

- `avatar-button-example`
- `avatar-group-example`
- `avatar-sizes-shapes-example`
- `avatar-status-example`
- `basic-avatar-example`

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
