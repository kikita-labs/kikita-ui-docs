import { signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsPointerDragService } from '@core/platform/pointer';
import { DocsThemeService } from '@core/theme';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { CardPlaygroundPage } from './card-playground-page';

describe('CardPlaygroundPage', () => {
  let fixture: ComponentFixture<CardPlaygroundPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPlaygroundPage],
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

    fixture = TestBed.createComponent(CardPlaygroundPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('updates preview state and emits a semantic interactive snippet', () => {
    const root = fixture.nativeElement as HTMLElement;
    const optionButtons = [...root.querySelectorAll<HTMLButtonElement>('[role="radio"]')];
    const checkbox = root.querySelector<HTMLInputElement>('input[type="checkbox"]');

    optionButtons.find((button) => button.textContent?.trim() === 'elevated')?.click();
    optionButtons.find((button) => button.textContent?.trim() === 'lg')?.click();
    checkbox!.checked = true;
    checkbox!.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    const preview = root.querySelector<HTMLElement>('app-api-playground-viewport button.kui-card');
    const snippet = root.querySelector<HTMLElement>('.code-tabs__fallback code');

    expect(preview).not.toBeNull();
    expect(preview?.getAttribute('data-kui-appearance')).toBe('elevated');
    expect(preview?.getAttribute('data-kui-size')).toBe('lg');
    expect(preview?.hasAttribute('data-kui-interactive')).toBe(true);
    expect(snippet?.textContent).toContain(
      '<button kuiCard appearance="elevated" size="lg" interactive type="button">',
    );
  });

  it('uses a static article host and omits defaults by default', () => {
    const root = fixture.nativeElement as HTMLElement;
    const preview = root.querySelector<HTMLElement>('app-api-playground-viewport article.kui-card');
    const snippet = root.querySelector<HTMLElement>('.code-tabs__fallback code');

    expect(preview).not.toBeNull();
    expect(preview?.getAttribute('data-kui-appearance')).toBe('surface');
    expect(preview?.getAttribute('data-kui-size')).toBe('md');
    expect(preview?.hasAttribute('data-kui-interactive')).toBe(false);
    expect(snippet?.textContent).toContain('<article kuiCard>');
    expect(snippet?.textContent).not.toContain('interactive');
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
