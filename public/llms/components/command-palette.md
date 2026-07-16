# Command Palette

> Searchable command overlay for application actions.

- Status: available
- Route: /components/command-palette
- Package: @kikita-labs/ui@0.6.0
- Import: KuiCommandPaletteComponent from @kikita-labs/ui
- Source docs: ../kikita-ui/docs/command-palette.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

```html
<button kuiButton type="button" (click)="open.set(true)">Open command palette</button>

<kui-command-palette
  [(open)]="open"
  [groups]="groups"
  [(query)]="query"
  (selected)="runCommand($event)"
/>
```

```ts
readonly open = signal(false);
readonly query = signal('');

readonly groups: readonly KuiCommandGroup[] = [
  {
    heading: 'Navigation',
    items: [
      {
        id: 'projects',
        label: 'Open projects',
        shortcut: ['G', 'P'],
        keywords: ['workspace'],
      },
    ],
  },
];
```

## Examples

Rendered at /components/command-palette:

### basic-command-palette-example

#### basic-command-palette-example.html

```html
<div class="basic-command-palette-example">
  <button kuiButton type="button" (click)="open.set(true)">Open command palette</button>

  @if (selectedCommand(); as command) {
    <p class="basic-command-palette-example__selection">Selected: {{ command }}</p>
  }

  <kui-command-palette
    [(open)]="open"
    [(query)]="query"
    [groups]="groups"
    (selected)="runCommand($event)"
  />
</div>
```

#### basic-command-palette-example.ts

```ts
import { Component, signal } from '@angular/core';

import {
  KuiButtonDirective,
  type KuiCommandGroup,
  type KuiCommandItem,
  KuiCommandPaletteComponent,
} from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-command-palette-example',
  imports: [KuiButtonDirective, KuiCommandPaletteComponent],
  templateUrl: './basic-command-palette-example.html',
  styleUrl: './basic-command-palette-example.scss',
})
export class BasicCommandPaletteExample {
  protected readonly open = signal(false);
  protected readonly query = signal('');
  protected readonly selectedCommand = signal<string | null>(null);

  protected readonly groups: readonly KuiCommandGroup[] = [
    {
      heading: 'Navigation',
      items: [
        {
          id: 'projects',
          label: 'Open projects',
          description: 'Go to the project overview.',
          shortcut: ['G', 'P'],
          keywords: ['workspace'],
        },
        {
          id: 'components',
          label: 'Browse components',
          description: 'Open the component index.',
          shortcut: ['G', 'C'],
          keywords: ['docs', 'ui'],
        },
      ],
    },
    {
      heading: 'Project',
      items: [
        {
          id: 'rename',
          label: 'Rename project',
          description: 'Update the display name.',
          meta: 'Project',
          badge: 'New',
          shortcut: ['F2'],
          icon: 'R',
          keywords: ['edit', 'title'],
        },
        {
          id: 'delete',
          label: 'Delete project',
          danger: true,
          disabled: true,
        },
      ],
    },
  ];

  protected runCommand(item: KuiCommandItem): void {
    this.selectedCommand.set(item.label);
  }
}
```

#### basic-command-palette-example.scss

```scss
.basic-command-palette-example {
  display: grid;
  gap: var(--kui-space-3, 12px);
  justify-items: center;
}

.basic-command-palette-example__selection {
  margin: 0;
  color: var(--kui-color-text-muted);
  font-size: var(--kui-text-sm-size, 13px);
}
```

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| open | ModelSignal<boolean> | - | Two-way model controlling overlay visibility. |
| groups | readonly KuiCommandGroup[] | - | Command groups rendered in the list. |
| loading | boolean | - | Renders skeleton rows and sets aria-busy. |
| placeholder | string | - | Search input placeholder. |
| label | string | - | Accessible label for the modal dialog and search input. |
| emptyText | string | - | Empty-state title when no command matches. |
| query | ModelSignal<string> | - | Two-way model for the current search value. |
| selected | OutputEmitterRef<KuiCommandItem> | - | Emits the selected command item. |

## Accessibility

- Uses a CDK overlay with scroll blocking.
- Uses a modal dialog container with CDK focus trap.
- The search input exposes combobox/listbox relationships through `aria-controls` and
  `aria-activedescendant`.
- Arrow keys move the active option, Enter selects it, Escape closes the palette.
- Disabled commands are skipped by keyboard navigation and cannot be selected.

## Playground

Available at /components/command-palette/playground.
