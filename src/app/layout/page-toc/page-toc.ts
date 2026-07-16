import { Component, computed, effect, inject, input, signal } from '@angular/core';

import {
  KuiAccordionComponent,
  KuiAccordionItemComponent,
  KuiTabDirective,
  KuiTabsComponent,
} from '@kikita-labs/ui';

import { DocsAnchorNavigationService } from '@core/platform/anchor';
import {
  DocsHeadingObserverService,
  type DocsSectionRegistration,
  DocsSectionRegistryService,
} from '@core/platform/heading';

@Component({
  selector: 'app-page-toc',
  imports: [KuiAccordionComponent, KuiAccordionItemComponent, KuiTabDirective, KuiTabsComponent],
  templateUrl: './page-toc.html',
  styleUrl: './page-toc.scss',
  host: {
    '[class.page-toc-host--empty]': 'links().length === 0',
    '[class.page-toc-host--mobile]': "variant() === 'mobile'",
  },
})
export class PageToc {
  private readonly anchorNavigation = inject(DocsAnchorNavigationService);
  private readonly headingObserver = inject(DocsHeadingObserverService);
  private readonly sectionRegistry = inject(DocsSectionRegistryService);

  public readonly variant = input<'desktop' | 'mobile'>('desktop');

  protected readonly links = this.sectionRegistry.sections;
  protected readonly activeLinkId = signal<string | null>(null);
  protected readonly mobileExpandedItems = signal<string[]>([]);
  protected readonly activeLinkLabel = computed(
    () => this.links().find((link) => link.id === this.activeLinkId())?.label ?? 'Sections',
  );

  private readonly headingObservationEffect = effect((onCleanup) => {
    const links = this.links();
    const activeLinkId = this.activeLinkId();

    if (!links.some((link) => link.id === activeLinkId)) {
      this.activeLinkId.set(links[0]?.id ?? null);
    }

    onCleanup(
      this.headingObserver.observe(
        links.map((link) => link.id),
        (headingId) => this.activeLinkId.set(headingId),
      ),
    );
  });

  protected scrollToLink(link: DocsSectionRegistration, event: MouseEvent): void {
    event.preventDefault();
    this.activateLink(link);
  }

  protected scrollToSelectedLink(linkId: string): void {
    const link = this.links().find((candidate) => candidate.id === linkId);

    if (!link) {
      return;
    }

    this.activateLink(link);
  }

  private activateLink(link: DocsSectionRegistration): void {
    this.activeLinkId.set(link.id);
    this.mobileExpandedItems.set([]);
    void this.anchorNavigation.navigate(link.id);
  }
}
