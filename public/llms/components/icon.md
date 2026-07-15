# Icon

> SVG icon renderer.

- Status: available
- Route: /components/icon
- Package: @kikita-labs/ui@0.4.3
- Import: KuiIconComponent from @kikita-labs/ui
- Source docs: ../kikita-ui/docs/icon.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

```html
<kui-icon name="check" label="Success" />
<kui-icon src="/assets/logo.svg" label="Logo" />
<kui-icon name="check" />
```

Omit `label` for decorative icons. Decorative icons render with `aria-hidden="true"`.

## Examples

Rendered at /components/icon:

- `basic-icon-example`

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| kui-icon | Component | - | Renders an icon from a registered name, trusted inline SVG source, or image URL. |
| name | KuiIconName \| undefined | undefined | Icon name resolved from icons registered with provideKuiIcons(). |
| source | KuiIconSource \| undefined | undefined | Trusted static inline SVG markup. It takes precedence over name. |
| src | string \| undefined | undefined | External image URL used when no source or registered name is provided. |
| label | string \| undefined | undefined | Accessible name for meaningful icons. Omit it for decorative icons. |
| size | string | '1em' | CSS size applied to the square icon box, for example 16px, 1.25rem, or 2em. |
| provideKuiIcons(icons) | EnvironmentProviders | - | Registers trusted static SVG strings for name-based icon lookup. |

## Accessibility

Rendered documentation, interactive examples, and the playground live at the HTML route above.

## Playground

Available at /components/icon/playground.
