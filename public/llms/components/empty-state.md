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

### basic-empty-state-example

#### basic-empty-state-example.html

```html
<div class="basic-empty-state-example">
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
      <button kuiButton shape="ghost" type="button">Import</button>
    </div>
  </kui-empty-state>
</div>
```

#### basic-empty-state-example.ts

```ts
import { Component } from '@angular/core';

import {
  KuiButtonDirective,
  KuiEmptyStateActionsDirective,
  KuiEmptyStateComponent,
  KuiEmptyStateIconDirective,
} from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-empty-state-example',
  imports: [
    KuiButtonDirective,
    KuiEmptyStateActionsDirective,
    KuiEmptyStateComponent,
    KuiEmptyStateIconDirective,
  ],
  templateUrl: './basic-empty-state-example.html',
  styleUrl: './basic-empty-state-example.scss',
})
export class BasicEmptyStateExample {}
```

#### basic-empty-state-example.scss

```scss
.basic-empty-state-example {
  display: flex;
  justify-content: center;
  inline-size: 100%;
}
```

### empty-state-context-example

#### empty-state-context-example.html

```html
<div class="empty-state-context-example">
  <kui-empty-state
    size="sm"
    context="no-results"
    title="No results"
    description="Try a different search term or clear your filters."
  >
    <svg kuiEmptyStateIcon viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  </kui-empty-state>

  <kui-empty-state
    size="sm"
    context="error"
    title="Couldn't load projects"
    description="Something went wrong while loading this list."
  >
    <svg kuiEmptyStateIcon viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v5" />
      <path d="M12 16h.01" />
    </svg>

    <div kuiEmptyStateActions>
      <button kuiButton shape="soft" type="button">Retry</button>
    </div>
  </kui-empty-state>

  <kui-empty-state
    size="sm"
    context="no-access"
    title="No access"
    description="Ask a workspace admin for access to this project."
  >
    <svg kuiEmptyStateIcon viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <rect x="4" y="10" width="16" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  </kui-empty-state>

  <kui-empty-state
    size="sm"
    context="success"
    title="All caught up"
    description="No pending reviews are waiting on you right now."
  >
    <svg kuiEmptyStateIcon viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12 3 3 5-6" />
    </svg>
  </kui-empty-state>
</div>
```

#### empty-state-context-example.ts

```ts
import { Component } from '@angular/core';

import {
  KuiButtonDirective,
  KuiEmptyStateActionsDirective,
  KuiEmptyStateComponent,
  KuiEmptyStateIconDirective,
} from '@kikita-labs/ui';

@Component({
  selector: 'app-empty-state-context-example',
  imports: [
    KuiButtonDirective,
    KuiEmptyStateActionsDirective,
    KuiEmptyStateComponent,
    KuiEmptyStateIconDirective,
  ],
  templateUrl: './empty-state-context-example.html',
  styleUrl: './empty-state-context-example.scss',
})
export class EmptyStateContextExample {}
```

#### empty-state-context-example.scss

```scss
.empty-state-context-example {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: var(--kui-space-4, 16px);
  inline-size: 100%;
}
```

### empty-state-size-example

#### empty-state-size-example.html

```html
<div class="empty-state-size-example">
  <kui-empty-state size="sm" title="No comments" description="Be the first to leave a comment.">
    <svg kuiEmptyStateIcon viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path
        d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
      />
    </svg>
  </kui-empty-state>

  <kui-empty-state size="md" title="No comments" description="Be the first to leave a comment.">
    <svg kuiEmptyStateIcon viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path
        d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
      />
    </svg>
  </kui-empty-state>

  <kui-empty-state size="lg" title="No comments" description="Be the first to leave a comment.">
    <svg kuiEmptyStateIcon viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path
        d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
      />
    </svg>
  </kui-empty-state>
</div>
```

#### empty-state-size-example.ts

```ts
import { Component } from '@angular/core';

import { KuiEmptyStateComponent, KuiEmptyStateIconDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-empty-state-size-example',
  imports: [KuiEmptyStateComponent, KuiEmptyStateIconDirective],
  templateUrl: './empty-state-size-example.html',
  styleUrl: './empty-state-size-example.scss',
})
export class EmptyStateSizeExample {}
```

#### empty-state-size-example.scss

```scss
.empty-state-size-example {
  display: flex;
  flex-direction: column;
  gap: var(--kui-space-6, 24px);
  inline-size: 100%;
}
```

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
