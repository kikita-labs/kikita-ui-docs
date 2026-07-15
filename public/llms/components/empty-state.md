# Empty State

> Known empty, error, no-access, and success content states.

- Status: available
- Route: /components/empty-state
- Package: @kikita-labs/ui@0.4.4
- Import: KuiEmptyStateComponent from @kikita-labs/ui
- Source docs: ../kikita-ui/docs/empty-state.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

```html
<kui-empty-state
  title="No projects yet"
  description="Create the first project to start working with your team."
>
  <svg kuiEmptyStateIcon viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M21 8v13H3V8" />
    <path d="M1 3h22v5H1z" />
    <path d="M10 12h4" />
  </svg>

  <div kuiEmptyStateActions>
    <button kuiButton type="button">Create project</button>
    <button kuiButton appearance="ghost" type="button">Import</button>
  </div>
</kui-empty-state>
```

## Examples

Rendered at /components/empty-state:

- `basic-empty-state-example`
- `empty-state-context-example`
- `empty-state-size-example`

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| title | string | - | Required empty-state title text. Visual text only, not a forced heading level. |
| description | string \| null | null | Optional supporting text rendered below the title. |
| context | 'no-data' \| 'no-results' \| 'error' \| 'no-access' \| 'success' | 'no-data' | Semantic context. Only changes the icon accent, not layout. |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Empty-state layout size. Small uses a compact horizontal layout. |
| [kuiEmptyStateIcon] | KuiEmptyStateIconDirective | - | Marks projected visual content as the decorative icon slot. Kikita marks it aria-hidden. |
| [kuiEmptyStateActions] | KuiEmptyStateActionsDirective | - | Marks projected content as the action slot for native buttons, links, or Kikita button directives. |

## Accessibility

- Use surrounding page structure for heading hierarchy. The built-in title is visual text, not a
  forced heading level.
- Decorative icons should use `[kuiEmptyStateIcon]`.
- Use `role="status"` on the `kui-empty-state` host when a no-results state appears dynamically
  after filtering.
- Actions remain normal interactive elements and should use native buttons or links.

## Playground

Available at /components/empty-state/playground.
