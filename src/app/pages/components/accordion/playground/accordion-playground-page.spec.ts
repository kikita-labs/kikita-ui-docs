import { signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsPointerDragService } from '@core/platform/pointer';
import { DocsThemeService } from '@core/theme';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { AccordionPlaygroundPage } from './accordion-playground-page';

describe('AccordionPlaygroundPage', () => {
  let fixture: ComponentFixture<AccordionPlaygroundPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccordionPlaygroundPage],
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

    fixture = TestBed.createComponent(AccordionPlaygroundPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('updates preview state and emits typed non-default snippet attributes', () => {
    const root = fixture.nativeElement as HTMLElement;
    const optionButtons = [...root.querySelectorAll<HTMLButtonElement>('[role="radio"]')];
    const disabledSwitch = root.querySelector<HTMLInputElement>('input[type="checkbox"]');

    optionButtons.find((button) => button.textContent?.trim() === 'multi')?.click();
    optionButtons.find((button) => button.textContent?.trim() === 'bordered')?.click();
    optionButtons.find((button) => button.textContent?.trim() === 'lg')?.click();
    disabledSwitch?.click();
    fixture.detectChanges();

    const preview = root.querySelector<HTMLElement>('app-api-playground-viewport .kui-accordion');
    const disabledTrigger = root.querySelector<HTMLElement>(
      'app-api-playground-viewport button[aria-disabled="true"]',
    );
    const snippet = root.querySelector<HTMLElement>('.code-tabs__fallback code');

    expect(preview?.getAttribute('data-kui-mode')).toBe('multi');
    expect(preview?.getAttribute('data-kui-appearance')).toBe('bordered');
    expect(preview?.getAttribute('data-kui-size')).toBe('lg');
    expect(disabledTrigger?.textContent).toContain('Security');
    expect(snippet?.textContent).toContain(
      '<kui-accordion mode="multi" appearance="bordered" size="lg">',
    );
    expect(snippet?.textContent).toContain('[disabled]="true"');
  });

  it('keeps exclusive mode to one expanded item and multi mode to many', () => {
    const root = fixture.nativeElement as HTMLElement;
    const optionButtons = [...root.querySelectorAll<HTMLButtonElement>('[role="radio"]')];
    const preview = root.querySelector<HTMLElement>('app-api-playground-viewport');

    preview?.querySelector<HTMLButtonElement>('button[aria-controls*="notifications"]')?.click();
    fixture.detectChanges();

    expect(preview?.querySelector('button[aria-expanded="true"]')?.textContent).toContain(
      'Notifications',
    );
    expect(preview?.querySelectorAll('button[aria-expanded="true"]')).toHaveLength(1);

    optionButtons.find((button) => button.textContent?.trim() === 'multi')?.click();
    fixture.detectChanges();
    preview?.querySelector<HTMLButtonElement>('button[aria-controls*="general"]')?.click();
    preview?.querySelector<HTMLButtonElement>('button[aria-controls*="security"]')?.click();
    fixture.detectChanges();

    expect(preview?.querySelectorAll('button[aria-expanded="true"]').length).toBeGreaterThan(1);
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
