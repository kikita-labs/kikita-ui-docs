import { Component, signal } from '@angular/core';

import { KuiTreeComponent, type KuiTreeNode } from '@kikita-labs/ui';

const PROJECT_NODES: readonly KuiTreeNode[] = [
  {
    id: 'src',
    label: 'src',
    icon: 'folder',
    children: [
      { id: 'main-ts', label: 'main.ts', icon: 'file' },
      { id: 'styles', label: 'styles', icon: 'folder', children: [] },
    ],
  },
  {
    id: 'docs',
    label: 'docs',
    icon: 'folder',
    children: [{ id: 'readme', label: 'README.md', icon: 'file' }],
  },
];

@Component({
  selector: 'app-basic-tree-example',
  imports: [KuiTreeComponent],
  templateUrl: './basic-tree-example.html',
  styleUrl: './basic-tree-example.scss',
})
export class BasicTreeExample {
  protected readonly nodes = PROJECT_NODES;
  protected readonly selectedId = signal<string | null>('main-ts');
  protected readonly expandedIds = signal<string[]>(['src']);
}
