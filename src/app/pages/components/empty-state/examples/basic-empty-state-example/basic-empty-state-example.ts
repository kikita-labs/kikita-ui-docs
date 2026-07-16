import { Component } from '@angular/core';

import {
  KuiButtonDirective,
  KuiEmptyStateActionsDirective,
  KuiEmptyStateComponent,
  KuiEmptyStateIconDirective,
  KuiIconComponent,
} from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-empty-state-example',
  imports: [
    KuiButtonDirective,
    KuiEmptyStateActionsDirective,
    KuiEmptyStateComponent,
    KuiEmptyStateIconDirective,
    KuiIconComponent,
  ],
  templateUrl: './basic-empty-state-example.html',
  styleUrl: './basic-empty-state-example.scss',
})
export class BasicEmptyStateExample {}
