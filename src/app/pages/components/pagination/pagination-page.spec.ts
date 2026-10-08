import { isStandalone, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsThemeService } from '@core/theme';
import { PAGINATION_EXAMPLE_SOURCES } from '@generated/example-sources/pagination.generated';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { PAGINATION_DOCS_MANIFEST } from './pagination.docs-manifest';
import { PaginationPage } from './pagination-page';

describe('PaginationPage', () => {
  let fixture: ComponentFixture<PaginationPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationPage],
      providers: [
        provideKikitaUi(),
        provideRouter([]),
        {
          provide: DocsClipboardService,
          useValue: { writeText: vi.fn().mockResolvedValue({ ok: true, value: undefined }) },
        },
        { provide: DocsThemeService, useValue: { codeThemeId: signal('github-dark-default') } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('preserves the public page sections', () => {
    const root = fixture.nativeElement as HTMLElement;
    const sectionIds = [...root.querySelectorAll<HTMLHeadingElement>('h2')].map(
      (heading) => heading.id,
    );

    expect(root.querySelector('h1')?.textContent?.trim()).toBe('Pagination');
    expect(sectionIds).toEqual([
      'import',
      'usage',
      'variants',
      'window',
      'table',
      'provider-defaults',
      'theming-tokens',
      'messages',
      'api',
      'accessibility',
      'known-gaps',
    ]);
  });

  it('marks the current page and moves with the step buttons', () => {
    const root = fixture.nativeElement as HTMLElement;
    const basic = root.querySelector<HTMLElement>('app-live-preview kui-pagination');
    const current = (): string | undefined =>
      basic?.querySelector('[aria-current="page"]')?.textContent?.trim();

    expect(basic?.closest('nav') ?? basic?.querySelector('nav')).not.toBeNull();
    expect(current()).toBe('3');

    basic?.querySelector<HTMLButtonElement>('button[aria-label="Next page"]')?.click();
    fixture.detectChanges();

    expect(current()).toBe('4');
    expect(root.textContent).toContain('Current page: 4');
  });

  it('disables every control of a disabled pagination', () => {
    const root = fixture.nativeElement as HTMLElement;
    const disabled = [...root.querySelectorAll('app-live-preview kui-pagination')].find((element) =>
      element.querySelector('button')?.hasAttribute('disabled'),
    );

    expect(disabled).toBeDefined();
    expect(
      [...(disabled?.querySelectorAll('button') ?? [])].every((button) => button.disabled),
    ).toBe(true);
  });

  it('shows only the rows of the selected page in the table example', () => {
    const root = fixture.nativeElement as HTMLElement;
    const section = root.querySelector('#table')?.closest('app-doc-section');

    expect(section?.querySelectorAll('tbody tr')).toHaveLength(10);
    expect(section?.querySelector('tbody')?.textContent).toContain('Project 1');
  });

  it('keeps manifest loaders and generated example ownership aligned', async () => {
    const [pageType, playgroundType] = await Promise.all([
      PAGINATION_DOCS_MANIFEST.loadPage(),
      PAGINATION_DOCS_MANIFEST.loadPlayground(),
    ]);

    expect(pageType).toBe(PaginationPage);
    expect(playgroundType).not.toBe(pageType);
    expect(isStandalone(playgroundType)).toBe(true);
    expect(Object.keys(PAGINATION_EXAMPLE_SOURCES).sort()).toEqual(
      [...PAGINATION_DOCS_MANIFEST.exampleIds].sort(),
    );
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
