# Group

> Grouped control chrome for adjacent actions and fields.

- Status: available
- Route: /components/group
- Package: @kikita-labs/ui@0.4.2
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

- `basic-group-example`
- `group-field-example`
- `group-orientation-example`
- `group-size-example`

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
