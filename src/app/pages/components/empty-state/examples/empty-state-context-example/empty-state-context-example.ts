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
