import { Component } from '@angular/core';

import {
  KuiEmptyStateComponent,
  KuiEmptyStateIconDirective,
  KuiIconComponent,
} from '@kikita-labs/ui';

@Component({
  selector: 'app-empty-state-size-example',
  imports: [KuiEmptyStateComponent, KuiEmptyStateIconDirective, KuiIconComponent],
  templateUrl: './empty-state-size-example.html',
  styleUrl: './empty-state-size-example.scss',
})
export class EmptyStateSizeExample {}
