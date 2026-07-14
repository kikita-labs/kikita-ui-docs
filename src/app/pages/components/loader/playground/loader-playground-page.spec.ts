import { signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsPointerDragService } from '@core/platform/pointer';
import { DocsThemeService } from '@core/theme';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { LoaderPlaygroundPage } from './loader-playground-page';

describe('LoaderPlaygroundPage', () => {
  let fixture: ComponentFixture<LoaderPlaygroundPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoaderPlaygroundPage],
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

    fixture = TestBed.createComponent(LoaderPlaygroundPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('updates the preview and emits an escaped, minimal public-API snippet', () => {
    const root = fixture.nativeElement as HTMLElement;
    const optionButtons = [...root.querySelectorAll<HTMLButtonElement>('[role="radio"]')];
    const labelInput = root.querySelector<HTMLInputElement>('input[type="text"]');

    optionButtons.find((button) => button.textContent?.trim() === 'lg')?.click();

    if (labelInput) {
      labelInput.value = '<Saving>';
      labelInput.dispatchEvent(new Event('input', { bubbles: true }));
    }

    fixture.detectChanges();

    const previewLoader = root.querySelector<HTMLElement>('span.kui-loader');
    const snippet = root.querySelector<HTMLElement>('.code-tabs__fallback code');

    expect(previewLoader?.getAttribute('aria-label')).toBe('<Saving>');
    expect(previewLoader?.getAttribute('data-kui-size')).toBe('lg');
    expect(snippet?.textContent).toBe('<span kuiLoader size="lg" label="&lt;Saving&gt;"></span>');
  });

  it('falls back to the installed default label when the control is empty', () => {
    const root = fixture.nativeElement as HTMLElement;
    const labelInput = root.querySelector<HTMLInputElement>('input[type="text"]');

    if (labelInput) {
      labelInput.value = '';
      labelInput.dispatchEvent(new Event('input', { bubbles: true }));
    }

    fixture.detectChanges();

    const previewLoader = root.querySelector<HTMLElement>('span.kui-loader');
    const snippet = root.querySelector<HTMLElement>('.code-tabs__fallback code');

    expect(previewLoader?.getAttribute('aria-label')).toBe('Loading');
    expect(snippet?.textContent).toBe('<span kuiLoader></span>');
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
