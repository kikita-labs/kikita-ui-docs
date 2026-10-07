import { Component } from '@angular/core';

import {
  KuiButton,
  KuiEmptyState,
  KuiEmptyStateActions,
  KuiEmptyStateIcon,
  KuiIcon,
} from '@kikita-labs/ui';

@Component({
  selector: 'app-empty-state-context-example',
  imports: [KuiButton, KuiEmptyStateActions, KuiEmptyState, KuiEmptyStateIcon, KuiIcon],
  templateUrl: './empty-state-context-example.html',
  styleUrl: './empty-state-context-example.scss',
})
export class EmptyStateContextExample {}
