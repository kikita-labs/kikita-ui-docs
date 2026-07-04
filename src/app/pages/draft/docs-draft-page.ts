import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { DocsRouteDraft } from '../../core/navigation/docs-route-draft';
import { HOME_ROUTE_DRAFT } from '../../core/navigation/docs-route-drafts';
import { DraftState } from '../../shared/docs-ui/draft-state/draft-state';

@Component({
  selector: 'app-docs-draft-page',
  imports: [DraftState],
  templateUrl: './docs-draft-page.html',
  styleUrl: './docs-draft-page.scss',
})
export class DocsDraftPage {
  private readonly route = inject(ActivatedRoute);

  protected readonly draft = toSignal(this.route.data.pipe(map((data) => this.toDraft(data))), {
    initialValue: this.toDraft(this.route.snapshot.data),
  });

  private toDraft(data: Partial<DocsRouteDraft>): DocsRouteDraft {
    return {
      title: data.title ?? HOME_ROUTE_DRAFT.title,
      eyebrow: data.eyebrow ?? HOME_ROUTE_DRAFT.eyebrow,
      description: data.description ?? HOME_ROUTE_DRAFT.description,
    };
  }
}
