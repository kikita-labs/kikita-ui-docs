import { DOCUMENT } from '@angular/common';
import { Component, computed, inject, input, signal } from '@angular/core';
import { KuiIconButtonDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-doc-section',
  imports: [KuiIconButtonDirective],
  templateUrl: './doc-section.html',
  styleUrl: './doc-section.scss',
})
export class DocSection {
  private readonly document = inject(DOCUMENT);

  readonly title = input.required<string>();
  readonly description = input<string>();
  readonly anchor = input<string>();

  protected readonly copied = signal(false);

  protected readonly headingId = computed(() =>
    this.anchor() ? this.normalizeId(this.anchor() ?? '') : this.normalizeId(this.title()),
  );

  protected readonly headingHref = computed(() => `#${this.headingId()}`);

  protected scrollToHeading(event: MouseEvent): void {
    event.preventDefault();

    const target = this.document.getElementById(this.headingId());
    const view = this.document.defaultView;

    if (!target || !view) {
      return;
    }

    const offset = 84;
    const top = target.getBoundingClientRect().top + view.scrollY - offset;
    const url = new URL(this.document.location.href);
    url.hash = this.headingId();

    view.history.pushState(null, '', url);
    view.scrollTo({ top, behavior: 'smooth' });
  }

  protected async copyHeadingLink(): Promise<void> {
    const url = new URL(this.document.location.href);
    url.hash = this.headingId();

    try {
      await navigator.clipboard.writeText(url.toString());
      this.copied.set(true);
      window.setTimeout(() => this.copied.set(false), 1600);
    } catch {
      this.document.location.hash = this.headingId();
    }
  }

  private normalizeId(value: string): string {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }
}
