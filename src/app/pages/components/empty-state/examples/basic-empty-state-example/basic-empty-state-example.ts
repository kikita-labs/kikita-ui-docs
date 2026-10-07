import { Component } from '@angular/core';

import {
  KuiButton,
  KuiEmptyState,
  KuiEmptyStateActions,
  KuiEmptyStateIcon,
  KuiIcon,
} from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-empty-state-example',
  imports: [KuiButton, KuiEmptyStateActions, KuiEmptyState, KuiEmptyStateIcon, KuiIcon],
  templateUrl: './basic-empty-state-example.html',
  styleUrl: './basic-empty-state-example.scss',
})
export class BasicEmptyStateExample {}
