import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  KuiButtonDirective,
  KuiEmptyStateActionsDirective,
  KuiEmptyStateComponent,
  KuiEmptyStateIconDirective,
} from '@kikita-labs/ui';
import { PageHeader } from '../../shared/docs-ui/page-header/page-header';

@Component({
  selector: 'app-docs-not-found-page',
  imports: [
    KuiButtonDirective,
    KuiEmptyStateActionsDirective,
    KuiEmptyStateComponent,
    KuiEmptyStateIconDirective,
    PageHeader,
    RouterLink,
  ],
  templateUrl: './docs-not-found-page.html',
  styleUrl: './docs-not-found-page.scss',
})
export class DocsNotFoundPage {}
