import { signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsPointerDragService } from '@core/platform/pointer';
import { DocsThemeService } from '@core/theme';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { EmptyStatePlaygroundPage } from './empty-state-playground-page';

describe('EmptyStatePlaygroundPage', () => {
  let fixture: ComponentFixture<EmptyStatePlaygroundPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyStatePlaygroundPage],
      providers: [
        provideKikitaUi(),
        { provide: DocsPointerDragService, useValue: { start: vi.fn() } },
        {
          provide: DocsClipboardService,
          useValue: { writeText: vi.fn().mockResolvedValue({ ok: true, value: undefined }) },
        },
        { provide: DocsThemeService, useValue: { codeThemeId: signal('github-dark-default') } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EmptyStatePlaygroundPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('updates preview state and emits a minimal public-API snippet', () => {
    const root = fixture.nativeElement as HTMLElement;
    const title = root.querySelector<HTMLInputElement>('.api-playground__text-controls input');
    const optionButtons = [...root.querySelectorAll<HTMLButtonElement>('[role="radio"]')];

    title!.value = 'No invoices';
    title!.dispatchEvent(new Event('input'));
    optionButtons.find((button) => button.textContent?.trim() === 'no-results')?.click();
    optionButtons.find((button) => button.textContent?.trim() === 'lg')?.click();
    fixture.detectChanges();

    const preview = root.querySelector<HTMLElement>('app-api-playground-viewport kui-empty-state');
    const snippet = root.querySelector<HTMLElement>('.code-tabs__fallback code');

    expect(preview?.getAttribute('data-kui-context')).toBe('no-results');
    expect(preview?.getAttribute('data-kui-size')).toBe('lg');
    expect(preview?.textContent).toContain('No invoices');
    expect(snippet?.textContent).toContain('title="No invoices"');
    expect(snippet?.textContent).toContain('context="no-results"');
    expect(snippet?.textContent).toContain('size="lg"');
  });

  it('keeps installed defaults out of the generated snippet and projected actions in preview', () => {
    const root = fixture.nativeElement as HTMLElement;
    const preview = root.querySelector<HTMLElement>('app-api-playground-viewport kui-empty-state');
    const snippet = root.querySelector<HTMLElement>('.code-tabs__fallback code');

    expect(preview?.getAttribute('data-kui-context')).toBe('no-data');
    expect(preview?.getAttribute('data-kui-size')).toBe('md');
    expect(
      root.querySelectorAll('app-api-playground-viewport [kuiEmptyStateActions] button'),
    ).toHaveLength(2);
    expect(snippet?.textContent).not.toContain('context=');
    expect(snippet?.textContent).not.toContain('size=');
    expect(snippet?.textContent).toContain('<div kuiEmptyStateActions>');
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
