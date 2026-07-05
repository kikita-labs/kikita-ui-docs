import { isPlatformBrowser } from '@angular/common';
import { DOCUMENT, PLATFORM_ID } from '@angular/core';
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
  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  protected readonly links = signal<readonly PageTocLink[]>([]);

  constructor() {
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
    if (this.document.querySelector('#main-content .docs-draft-page')) {
      this.links.set([]);
      return;
    }

    const headings = Array.from(
      this.document.querySelectorAll<HTMLElement>('#main-content h2[id]'),
    );

    this.links.set(
      headings.map((heading) => ({
        id: heading.id,
        label: heading.textContent?.trim() ?? heading.id,
      })),
    );
  }
}
