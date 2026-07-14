import { signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsPointerDragService } from '@core/platform/pointer';
import { DocsThemeService } from '@core/theme';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { SeparatorPlaygroundPage } from './separator-playground-page';

describe('SeparatorPlaygroundPage', () => {
  let fixture: ComponentFixture<SeparatorPlaygroundPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeparatorPlaygroundPage],
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

    fixture = TestBed.createComponent(SeparatorPlaygroundPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('updates preview attributes and emits minimal non-default snippet attributes', () => {
    const root = fixture.nativeElement as HTMLElement;
    const optionButtons = [...root.querySelectorAll<HTMLButtonElement>('[role="radio"]')];

    optionButtons.find((button) => button.textContent?.trim() === 'strong')?.click();
    optionButtons.find((button) => button.textContent?.trim() === 'vertical')?.click();
    optionButtons.find((button) => button.textContent?.trim() === 'lg')?.click();
    fixture.detectChanges();

    const separator = root.querySelector<HTMLHRElement>(
      'app-api-playground-viewport hr[kuiSeparator]',
    );
    const snippet = root.querySelector<HTMLElement>('.code-tabs__fallback code');

    expect(separator?.getAttribute('data-kui-appearance')).toBe('strong');
    expect(separator?.getAttribute('data-kui-orientation')).toBe('vertical');
    expect(separator?.getAttribute('aria-orientation')).toBe('vertical');
    expect(separator?.getAttribute('data-kui-spacing')).toBe('lg');
    expect(snippet?.textContent).toContain(
      '<hr kuiSeparator appearance="strong" orientation="vertical" spacing="lg" />',
    );
  });

  it('omits default values from the generated snippet', () => {
    const root = fixture.nativeElement as HTMLElement;
    const snippet = root.querySelector<HTMLElement>('.code-tabs__fallback code');

    expect(snippet?.textContent?.trim()).toBe('<hr kuiSeparator />');
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
