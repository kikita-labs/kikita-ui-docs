import { Component, signal } from '@angular/core';

import { type KuiSize, KuiTreeComponent, type KuiTreeNode } from '@kikita-labs/ui';

import {
  ApiPlayground,
  definePlaygroundControls,
  type PlaygroundValues,
  serializePlaygroundAttributes,
} from '@shared/docs-ui/api-playground';
import { ApiTable } from '@shared/docs-ui/api-table';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

import { TREE_API_ROWS } from '../tree.api-schema';
import { TREE_API_DESCRIPTION } from '../tree.docs-content';

const TREE_PLAYGROUND_CONTROLS = definePlaygroundControls([
  {
    key: 'mode',
    label: 'mode',
    kind: 'enum',
    options: ['display', 'checkable'],
    defaultValue: 'display',
  },
  { key: 'size', label: 'size', kind: 'enum', options: ['sm', 'md', 'lg'], defaultValue: 'md' },
  { key: 'mobile', label: 'mobile targets', kind: 'boolean', defaultValue: false },
  { key: 'ariaLabel', label: 'aria label', kind: 'string', defaultValue: 'Project files' },
] as const);

type TreePlaygroundValues = PlaygroundValues<typeof TREE_PLAYGROUND_CONTROLS>;

const TREE_NODES: readonly KuiTreeNode[] = [
  {
    id: 'app',
    label: 'app',
    icon: 'folder',
    children: [
      { id: 'routes', label: 'app.routes.ts', icon: 'file' },
      { id: 'components', label: 'components', icon: 'folder', lazy: true },
    ],
  },
  {
    id: 'docs',
    label: 'docs',
    icon: 'folder',
    children: [
      { id: 'tree-md', label: 'tree.md', icon: 'file' },
      { id: 'archive', label: 'archive', icon: 'folder', disabled: true },
    ],
  },
];

const LAZY_CHILDREN: readonly KuiTreeNode[] = [
  { id: 'button-page', label: 'button-page.ts', icon: 'file' },
  { id: 'tree-page', label: 'tree-page.ts', icon: 'file' },
];

@Component({
  selector: 'app-tree-playground-page',
  imports: [ApiPlayground, ApiTable, KuiTreeComponent],
  templateUrl: './tree-playground-page.html',
  styleUrl: './tree-playground-page.scss',
})
export class TreePlaygroundPage {
  protected readonly apiDescription = TREE_API_DESCRIPTION;
  protected readonly apiRows = TREE_API_ROWS;
  protected readonly checkedIds = signal<string[]>(['tree-md']);
  protected readonly expandedIds = signal<string[]>(['app', 'docs']);
  protected readonly nodes = TREE_NODES;
  protected readonly playgroundControls = TREE_PLAYGROUND_CONTROLS;
  protected readonly selectedId = signal<string | null>('routes');

  protected readonly loadChildren = (node: KuiTreeNode): Promise<readonly KuiTreeNode[]> =>
    Promise.resolve(node.id === 'components' ? LAZY_CHILDREN : []);

  protected readonly buildPlaygroundSnippet = (
    values: TreePlaygroundValues,
  ): readonly CodeTab[] => {
    const attrString = serializePlaygroundAttributes([
      { name: 'mode', value: values.mode, defaultValue: 'display' },
      { name: 'size', value: values.size, defaultValue: 'md' },
      { name: 'mobile', value: values.mobile },
      { name: 'ariaLabel', value: values.ariaLabel, defaultValue: 'Tree' },
      { name: '[data]', value: 'nodes' },
      { name: '[loadChildren]', value: 'loadChildren' },
    ]);
    const modelBinding =
      values.mode === 'checkable'
        ? ` [(checkedIds)]="checkedIds"`
        : ` [(selected)]="selectedId"`;

    return [
      {
        label: 'HTML',
        language: 'html',
        code: `<kui-tree${attrString}${modelBinding} [(expandedIds)]="expandedIds" />`,
      },
    ];
  };

  protected modeOf(values: TreePlaygroundValues): 'display' | 'checkable' {
    return values.mode;
  }

  protected sizeOf(values: TreePlaygroundValues): KuiSize {
    return values.size;
  }

  protected mobileOf(values: TreePlaygroundValues): boolean {
    return values.mobile;
  }

  protected ariaLabelOf(values: TreePlaygroundValues): string {
    return values.ariaLabel;
  }
}
