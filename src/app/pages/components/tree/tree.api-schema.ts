import { type ApiTableRow } from '@shared/docs-ui/api-table';

export const TREE_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'mode',
    type: `'display' | 'checkable' | undefined`,
    defaultValue: 'undefined',
    description:
      'Selects navigation-style rows or checkbox rows with cascade. Falls back to defaults.tree.mode, then display.',
  },
  {
    name: 'size',
    type: `'xs' | 'sm' | 'md' | 'lg' | undefined`,
    defaultValue: 'undefined',
    description:
      'Controls row height and label scale; only sm, md and lg have dedicated styling. Falls back to defaults.tree.size, then the root size, then md.',
  },
  {
    name: 'data',
    type: 'readonly KuiTreeNode[]',
    defaultValue: '[]',
    description: 'Root nodes rendered by the tree.',
  },
  {
    name: 'ariaLabel',
    type: 'string | undefined',
    defaultValue: 'undefined',
    description:
      'Accessible name for the role="tree" container. Falls back to the tree.label message (Tree).',
  },
  {
    name: 'mobile',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Increases toggle hit targets to support touch layouts.',
  },
  {
    name: '[(value)]',
    type: 'string | null',
    defaultValue: 'null',
    description: 'Controlled selected node id in display mode.',
  },
  {
    name: '[(selected)]',
    type: 'string | null',
    defaultValue: 'null',
    description:
      'Deprecated alias for value, kept in sync with it. Use value instead; planned for removal in the next major version.',
  },
  {
    name: '[(checkedIds)]',
    type: 'string[]',
    defaultValue: '[]',
    description: 'Controlled checked node ids in checkable mode.',
  },
  {
    name: '[(expandedIds)]',
    type: 'string[]',
    defaultValue: '[]',
    description: 'Controlled expanded node ids.',
  },
  {
    name: 'loadChildren',
    type: '(node: KuiTreeNode) => Promise<readonly KuiTreeNode[]>',
    defaultValue: '-',
    description: 'Lazy child loader called once for nodes marked lazy.',
  },
  {
    name: 'KuiTreeNode.icon',
    type: `'folder' | 'file'`,
    defaultValue: '-',
    description: 'Optional built-in glyph. Custom icon templates are not implemented.',
  },
  {
    name: 'KuiTreeOptions',
    type: 'interface',
    defaultValue: '-',
    description: 'Shape of defaults.tree: size, mode and disclosureIcon.',
  },
];
