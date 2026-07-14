import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

import type { DocsDraftPageData } from '@core/docs-registry';
import { DocSection } from '@shared/docs-ui/doc-section';
import { DraftState } from '@shared/docs-ui/draft-state';
import { PageHeader } from '@shared/docs-ui/page-header';

@Component({
  selector: 'app-docs-draft-page',
  imports: [DocSection, DraftState, PageHeader],
  templateUrl: './docs-draft-page.html',
  styleUrl: './docs-draft-page.scss',
})
export class DocsDraftPage {
  private static readonly DEFAULT_DATA: DocsDraftPageData = {
    title: 'Kikita UI Docs',
    eyebrow: 'Docs shell',
    description: 'Public documentation shell for the Kikita UI package.',
  };

  private readonly route = inject(ActivatedRoute);

  protected readonly draft = toSignal(this.route.data.pipe(map((data) => this.toDraft(data))), {
    initialValue: this.toDraft(this.route.snapshot.data),
  });

  private toDraft(data: Partial<DocsDraftPageData>): DocsDraftPageData {
    return {
      title: data.title ?? DocsDraftPage.DEFAULT_DATA.title,
      eyebrow: data.eyebrow ?? DocsDraftPage.DEFAULT_DATA.eyebrow,
      description: data.description ?? DocsDraftPage.DEFAULT_DATA.description,
    };
  }
}
