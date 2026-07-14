import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { KuiButtonDirective } from '@kikita-labs/ui';

import { DocsSearchStateService } from '@core/search';

@Component({
  selector: 'app-docs-not-found-page',
  imports: [KuiButtonDirective, RouterLink],
  templateUrl: './docs-not-found-page.html',
  styleUrl: './docs-not-found-page.scss',
})
export class DocsNotFoundPage {
  protected readonly search = inject(DocsSearchStateService);
}
