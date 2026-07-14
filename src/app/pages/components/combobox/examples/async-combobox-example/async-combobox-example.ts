import { Component, effect, inject, signal } from '@angular/core';

import {
  KuiComboboxDirective,
  KuiDropdownComponent,
  KuiFieldComponent,
  KuiOptionDirective,
} from '@kikita-labs/ui';

import { ALL_REVIEWERS, type AsyncReviewer, AsyncReviewerService } from './async-reviewer.service';

@Component({
  selector: 'app-async-combobox-example',
  imports: [KuiComboboxDirective, KuiDropdownComponent, KuiFieldComponent, KuiOptionDirective],
  providers: [AsyncReviewerService],
  templateUrl: './async-combobox-example.html',
  styleUrl: './async-combobox-example.scss',
})
export class AsyncComboboxExample {
  private readonly reviewerLookup = inject(AsyncReviewerService);
  private readonly requestedQuery = signal<string | null>(null);

  protected readonly reviewer = signal<AsyncReviewer | null>(null);
  protected readonly reviewerQuery = signal('');
  protected readonly reviewers = signal<readonly AsyncReviewer[]>(ALL_REVIEWERS);
  protected readonly loading = signal(false);
  protected readonly errorMessage = signal<string | null>(null);

  protected readonly personLabel = (person: AsyncReviewer) => person.name;

  private readonly reviewerLookupEffect = effect((onCleanup) => {
    const query = this.requestedQuery();

    if (query === null) {
      return;
    }

    this.loading.set(true);
    this.errorMessage.set(null);

    const subscription = this.reviewerLookup.search(query).subscribe({
      next: (reviewers) => {
        this.reviewers.set(reviewers);
        this.loading.set(false);
      },
      error: () => {
        this.reviewers.set([]);
        this.loading.set(false);
        this.errorMessage.set('Reviewers could not be loaded. Try again.');
      },
    });

    onCleanup(() => subscription.unsubscribe());
  });

  protected loadReviewers(query: string): void {
    this.requestedQuery.set(query);
  }
}
