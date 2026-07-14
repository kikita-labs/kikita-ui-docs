import { signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsPointerDragService } from '@core/platform/pointer';
import { DocsThemeService } from '@core/theme';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { BadgePlaygroundPage } from './badge-playground-page';

describe('BadgePlaygroundPage', () => {
  let fixture: ComponentFixture<BadgePlaygroundPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgePlaygroundPage],
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

    fixture = TestBed.createComponent(BadgePlaygroundPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('updates the preview and emits an escaped, minimal public-API snippet', () => {
    const root = fixture.nativeElement as HTMLElement;
    const optionButtons = [...root.querySelectorAll<HTMLButtonElement>('[role="radio"]')];
    const labelInput = root.querySelector<HTMLInputElement>('input[type="text"]');

    optionButtons.find((button) => button.textContent?.trim() === 'danger')?.click();
    optionButtons.find((button) => button.textContent?.trim() === 'lg')?.click();

    if (labelInput) {
      labelInput.value = '<Admin>';
      labelInput.dispatchEvent(new Event('input', { bubbles: true }));
    }

    fixture.detectChanges();

    const previewBadge = root.querySelector<HTMLElement>('span.kui-badge');
    const snippet = root.querySelector<HTMLElement>('.code-tabs__fallback code');

    expect(previewBadge?.textContent?.trim()).toBe('<Admin>');
    expect(previewBadge?.getAttribute('data-kui-appearance')).toBe('danger');
    expect(previewBadge?.getAttribute('data-kui-size')).toBe('lg');
    expect(snippet?.textContent).toBe(
      '<span kuiBadge appearance="danger" size="lg">&lt;Admin&gt;</span>',
    );
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
