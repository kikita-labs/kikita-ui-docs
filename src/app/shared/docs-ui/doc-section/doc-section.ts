import { Component, computed, DestroyRef, effect, inject, input, signal } from '@angular/core';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { timer } from 'rxjs';

import { KuiIconButtonDirective, KuiIconComponent, kuiToast } from '@kikita-labs/ui';

import { DocsAnchorNavigationService } from '@core/platform/anchor';
import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsSectionRegistryService } from '@core/platform/heading';

@Component({
  selector: 'app-doc-section',
  imports: [KuiIconButtonDirective, KuiIconComponent],
  templateUrl: './doc-section.html',
  styleUrl: './doc-section.scss',
})
export class DocSection {
  private readonly anchorNavigation = inject(DocsAnchorNavigationService);
  private readonly clipboard = inject(DocsClipboardService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly sectionRegistry = inject(DocsSectionRegistryService);
  private readonly toast = kuiToast();

  /** Visible section heading and table-of-contents label. */
  public readonly heading = input.required<string>();
  /** Optional supporting text rendered under the heading row. */
  public readonly description = input<string>();
  /** Optional stable anchor override; otherwise derived from the heading. */
  public readonly anchor = input<string>();

  protected readonly copied = signal(false);

  protected readonly headingId = computed(() =>
    this.anchor() ? this.normalizeId(this.anchor() ?? '') : this.normalizeId(this.heading()),
  );

  protected readonly headingHref = computed(() => `#${this.headingId()}`);

  private readonly registrationEffect = effect((onCleanup) => {
    onCleanup(
      this.sectionRegistry.register({
        id: this.headingId(),
        label: this.heading(),
      }),
    );
  });

  protected scrollToHeading(event: MouseEvent): void {
    event.preventDefault();

    void this.anchorNavigation.navigate(this.headingId());
  }

  protected async copyHeadingLink(): Promise<void> {
    const url = this.anchorNavigation.urlFor(this.headingId());

    if (!url.ok) {
      this.showCopyFailure();
      return;
    }

    const result = await this.clipboard.writeText(url.value);

    if (result.ok) {
      this.copied.set(true);
      this.toast.open({
        title: 'Link copied',
        message: `${this.heading()} link copied to clipboard.`,
        appearance: 'success',
      });
      timer(1600)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => this.copied.set(false));
      return;
    }

    this.showCopyFailure();
  }

  private showCopyFailure(): void {
    this.toast.open({
      title: 'Copy failed',
      message: 'Clipboard access is unavailable in this browser.',
      appearance: 'danger',
    });
  }

  private normalizeId(value: string): string {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }
}
