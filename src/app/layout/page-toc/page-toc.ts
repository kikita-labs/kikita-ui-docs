import { isPlatformBrowser } from '@angular/common';
import { DestroyRef, DOCUMENT, PLATFORM_ID } from '@angular/core';
import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

interface PageTocLink {
  readonly id: string;
  readonly label: string;
}

@Component({
  selector: 'app-page-toc',
  imports: [],
  templateUrl: './page-toc.html',
  styleUrl: './page-toc.scss',
  host: {
    '[class.page-toc-host--empty]': 'links().length === 0',
  },
})
export class PageToc {
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private observer: IntersectionObserver | null = null;

  protected readonly links = signal<readonly PageTocLink[]>([]);
  protected readonly activeLinkId = signal<string | null>(null);

  constructor() {
    this.destroyRef.onDestroy(() => this.observer?.disconnect());

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        this.scheduleCollectLinks();
      });

    this.scheduleCollectLinks();
  }

  private scheduleCollectLinks(): void {
    if (!this.isBrowser) {
      return;
    }

    this.document.defaultView?.setTimeout(() => {
      this.collectLinks();
    });
  }

  private collectLinks(): void {
    this.observer?.disconnect();
    this.observer = null;

    if (this.document.querySelector('#main-content .docs-draft-page')) {
      this.links.set([]);
      this.activeLinkId.set(null);
      return;
    }

    const headings = Array.from(
      this.document.querySelectorAll<HTMLElement>('#main-content h2[id]'),
    );

    const links = headings.map((heading) => ({
      id: heading.id,
      label: heading.textContent?.trim() ?? heading.id,
    }));

    this.links.set(links);
    this.activeLinkId.set(links[0]?.id ?? null);
    this.observeHeadings(headings);
  }

  private observeHeadings(headings: readonly HTMLElement[]): void {
    const view = this.document.defaultView;

    if (!view || headings.length === 0) {
      return;
    }

    this.observer = new view.IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

        if (visibleEntry?.target instanceof HTMLElement) {
          this.activeLinkId.set(visibleEntry.target.id);
        }
      },
      {
        rootMargin: '-96px 0px -65%',
        threshold: 0,
      },
    );

    headings.forEach((heading) => this.observer?.observe(heading));
  }

  protected scrollToLink(link: PageTocLink, event: MouseEvent): void {
    event.preventDefault();
    this.activeLinkId.set(link.id);

    const target = this.document.getElementById(link.id);
    const view = this.document.defaultView;

    if (!target || !view) {
      return;
    }

    const offset = 84;
    const top = target.getBoundingClientRect().top + view.scrollY - offset;
    const url = new URL(this.document.location.href);
    url.hash = link.id;

    view.history.pushState(null, '', url);
    view.scrollTo({ top, behavior: 'smooth' });
  }
}
