import { Component } from '@angular/core';
import { DraftState } from '../../shared/docs-ui/draft-state/draft-state';
import { PageHeader } from '../../shared/docs-ui/page-header/page-header';

@Component({
  selector: 'app-docs-not-found-page',
  imports: [DraftState, PageHeader],
  templateUrl: './docs-not-found-page.html',
  styleUrl: './docs-not-found-page.scss',
})
export class DocsNotFoundPage {}
