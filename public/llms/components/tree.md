# Tree

> Hierarchical list.

- Status: available
- Route: /components/tree
- Package: @kikita-labs/ui@0.4.4
- Import: KuiTreeComponent from @kikita-labs/ui
- Source docs: ../kikita-ui/docs/tree.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

```html
<kui-tree ariaLabel="Project explorer" [data]="nodes" [(selected)]="selectedId" />
```

```ts
protected readonly nodes: KuiTreeNode[] = [
  {
    id: 'src',
    label: 'src',
    icon: 'folder',
    children: [
      { id: 'main-ts', label: 'main.ts', icon: 'file' },
      { id: 'readme', label: 'README.md', icon: 'file' },
    ],
  },
];
protected readonly selectedId = signal<string | null>(null);
```

## Examples

Rendered at /components/tree:

- `basic-tree-example`

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| mode | 'display' \| 'checkable' | 'display' | Selects navigation-style rows or checkbox rows with cascade. |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Controls row height and label scale. |
| data | readonly KuiTreeNode[] | [] | Root nodes rendered by the tree. |
| ariaLabel | string | 'Tree' | Accessible name for the role="tree" container. |
| mobile | boolean | false | Increases toggle hit targets to support touch layouts. |
| [(selected)] | string \| null | null | Controlled selected node id in display mode. |
| [(checkedIds)] | string[] | [] | Controlled checked node ids in checkable mode. |
| [(expandedIds)] | string[] | [] | Controlled expanded node ids. |
| loadChildren | (node: KuiTreeNode) => Promise<readonly KuiTreeNode[]> | - | Lazy child loader called once for nodes marked lazy. |
| KuiTreeNode.icon | 'folder' \| 'file' | - | Optional built-in glyph. Custom icon templates are not implemented. |

## Accessibility

`role="tree"` on the root, `role="treeitem"` on every node, `role="group"` on
nested children. `aria-expanded` on nodes with children, `aria-selected`
(`display` mode) or `aria-checked` (`checkable` mode, including `"mixed"`),
`aria-level`/`aria-setsize`/`aria-posinset` for depth and position, and
`aria-disabled="true"` on disabled nodes. Exactly one node is in the tab order
(`tabindex="0"`, roving tabindex); the rest are `tabindex="-1"`.

## Playground

Available at /components/tree/playground.
