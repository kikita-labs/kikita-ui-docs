import { Component } from '@angular/core';
import { DraftState } from '../../shared/docs-ui/draft-state/draft-state';

@Component({
  selector: 'app-docs-not-found-page',
  imports: [DraftState],
  templateUrl: './docs-not-found-page.html',
  styleUrl: './docs-not-found-page.scss',
})
export class DocsNotFoundPage {}
