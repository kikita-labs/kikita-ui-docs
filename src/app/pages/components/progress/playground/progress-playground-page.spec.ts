import { signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsPointerDragService } from '@core/platform/pointer';
import { DocsThemeService } from '@core/theme';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { ProgressPlaygroundPage } from './progress-playground-page';

describe('ProgressPlaygroundPage', () => {
  let fixture: ComponentFixture<ProgressPlaygroundPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressPlaygroundPage],
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

    fixture = TestBed.createComponent(ProgressPlaygroundPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('updates preview state and emits a minimal public-API snippet', () => {
    const root = fixture.nativeElement as HTMLElement;
    const optionButtons = [...root.querySelectorAll<HTMLButtonElement>('[role="radio"]')];

    optionButtons.find((button) => button.textContent?.trim() === 'circular')?.click();
    optionButtons.find((button) => button.textContent?.trim() === 'success')?.click();
    optionButtons.find((button) => button.textContent?.trim() === 'lg')?.click();
    fixture.detectChanges();

    const progressbar = root.querySelector<HTMLElement>(
      'app-api-playground-viewport [role="progressbar"]',
    );
    const preview = root.querySelector<HTMLElement>(
      'app-api-playground-viewport .kui-progress-circular',
    );
    const snippet = root.querySelector<HTMLElement>('.code-tabs__fallback code');

    expect(preview).not.toBeNull();
    expect(preview?.getAttribute('data-kui-color')).toBe('success');
    expect(preview?.getAttribute('data-kui-size')).toBe('lg');
    expect(progressbar?.getAttribute('aria-valuenow')).toBe('60');
    expect(snippet?.textContent).toContain('type="circular"');
    expect(snippet?.textContent).toContain('[value]="60"');
    expect(snippet?.textContent).toContain('color="success"');
    expect(snippet?.textContent).toContain('size="lg"');
  });

  it('omits aria-valuenow and value binding for indeterminate progress', () => {
    const root = fixture.nativeElement as HTMLElement;
    const checkbox = root.querySelector<HTMLInputElement>('input[type="checkbox"]');

    checkbox!.checked = true;
    checkbox!.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    const preview = root.querySelector<HTMLElement>(
      'app-api-playground-viewport [role="progressbar"]',
    );
    const snippet = root.querySelector<HTMLElement>('.code-tabs__fallback code');

    expect(preview?.hasAttribute('aria-valuenow')).toBe(false);
    expect(snippet?.textContent).not.toContain('[value]');
    expect(snippet?.textContent).toContain('aria-label="Upload progress"');
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
