# Command Palette

> Searchable command overlay for application actions.

- Status: available
- Route: /components/command-palette
- Package: @kikita-labs/ui@0.4.4
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

- `basic-command-palette-example`

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
