import { signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsPointerDragService } from '@core/platform/pointer';
import { DocsThemeService } from '@core/theme';
import { CodeHighlighterService } from '@shared/docs-ui/code-tabs';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { PaginationPlaygroundPage } from './pagination-playground-page';

describe('PaginationPlaygroundPage', () => {
  let fixture: ComponentFixture<PaginationPlaygroundPage>;

  function option(label: string, control?: string): HTMLButtonElement | undefined {
    const root = fixture.nativeElement as HTMLElement;
    const group = control
      ? [...root.querySelectorAll<HTMLElement>('.api-playground__group')].find((candidate) =>
          candidate.textContent?.trim().startsWith(control),
        )
      : root;

    return [...(group?.querySelectorAll<HTMLButtonElement>('[role="radio"]') ?? [])].find(
      (button) => button.textContent?.trim() === label,
    );
  }

  function snippet(): string {
    return (
      (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>('.code-tabs__fallback code')
        ?.textContent ?? ''
    );
  }

  function preview(): HTMLElement | null {
    return (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>(
      '.api-playground-viewport__resizable kui-pagination',
    );
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationPlaygroundPage],
      providers: [
        provideKikitaUi(),
        { provide: DocsPointerDragService, useValue: { start: vi.fn() } },
        {
          provide: CodeHighlighterService,
          useValue: { highlight: vi.fn().mockRejectedValue(new Error('fallback')) },
        },
        {
          provide: DocsClipboardService,
          useValue: { writeText: vi.fn().mockResolvedValue({ ok: true, value: undefined }) },
        },
        { provide: DocsThemeService, useValue: { codeThemeId: signal('github-dark-default') } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationPlaygroundPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('starts from the runtime defaults, so the snippet binds the page and the total', () => {
    expect(snippet()).toBe('<kui-pagination [(currentPage)]="page" [totalPages]="20" />');
    expect(preview()?.querySelector('[aria-current="page"]')?.textContent?.trim()).toBe('1');
  });

  it('switches to the full variant with the page size binding and the summary', () => {
    option('full')?.click();
    fixture.detectChanges();

    expect(snippet()).toContain('variant="full"');
    expect(snippet()).toContain('[(pageSize)]="pageSize"');
    expect(preview()?.textContent).toContain('Showing');
  });

  it('logs the page change when a page is selected', () => {
    const root = fixture.nativeElement as HTMLElement;

    preview()?.querySelector<HTMLButtonElement>('button[aria-label="Next page"]')?.click();
    fixture.detectChanges();

    expect(root.querySelector('app-playground-event-log')?.textContent).toContain(
      'currentPageChange',
    );
  });

  it('applies the custom messages to the landmark name', () => {
    option('custom', 'messages')?.click();
    fixture.detectChanges();

    expect(preview()?.querySelector('nav')?.getAttribute('aria-label')).toBe('Result pages');
    expect(snippet()).toContain('[messages]="messages"');
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
