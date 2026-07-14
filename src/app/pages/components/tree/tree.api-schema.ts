import { type ApiTableRow } from '@shared/docs-ui/api-table';

export const TREE_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'mode',
    type: `'display' | 'checkable'`,
    defaultValue: `'display'`,
    description: 'Selects navigation-style rows or checkbox rows with cascade.',
  },
  {
    name: 'size',
    type: `'sm' | 'md' | 'lg'`,
    defaultValue: `'md'`,
    description: 'Controls row height and label scale.',
  },
  {
    name: 'data',
    type: 'readonly KuiTreeNode[]',
    defaultValue: '[]',
    description: 'Root nodes rendered by the tree.',
  },
  {
    name: 'ariaLabel',
    type: 'string',
    defaultValue: `'Tree'`,
    description: 'Accessible name for the role="tree" container.',
  },
  {
    name: 'mobile',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Increases toggle hit targets to support touch layouts.',
  },
  {
    name: '[(selected)]',
    type: 'string | null',
    defaultValue: 'null',
    description: 'Controlled selected node id in display mode.',
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
];
