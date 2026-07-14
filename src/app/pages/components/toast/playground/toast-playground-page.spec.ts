import { signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsPointerDragService } from '@core/platform/pointer';
import { DocsThemeService } from '@core/theme';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { ToastPlaygroundPage } from './toast-playground-page';

describe('ToastPlaygroundPage', () => {
  let fixture: ComponentFixture<ToastPlaygroundPage>;

  beforeEach(async () => {
    document.querySelectorAll('kui-toast-region').forEach((region) => region.remove());

    await TestBed.configureTestingModule({
      imports: [ToastPlaygroundPage],
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

    fixture = TestBed.createComponent(ToastPlaygroundPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  afterEach(() => {
    document.querySelectorAll('kui-toast-region').forEach((region) => region.remove());
  });

  it('updates the trigger, opens a package toast, and emits a typed snippet', async () => {
    const root = fixture.nativeElement as HTMLElement;
    const titleInput = root.querySelector<HTMLInputElement>('input[type="text"]');
    const optionButtons = [...root.querySelectorAll<HTMLButtonElement>('[role="radio"]')];

    if (titleInput) {
      titleInput.value = 'Published';
      titleInput.dispatchEvent(new Event('input', { bubbles: true }));
    }

    optionButtons.find((button) => button.textContent?.trim() === 'success')?.click();
    optionButtons.find((button) => button.textContent?.trim() === 'top-end')?.click();
    fixture.detectChanges();

    root.querySelector<HTMLButtonElement>('app-api-playground button[kuiButton]')?.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const toast = document.querySelector<HTMLElement>('.kui-toast');
    const region = document.querySelector<HTMLElement>('.kui-toast-region');
    const snippet = root.querySelector<HTMLElement>('.code-tabs__fallback code');

    expect(root.querySelector('app-api-playground button[kuiButton]')?.textContent?.trim()).toBe(
      'Show "Published"',
    );
    expect(region?.getAttribute('data-position')).toBe('top-end');
    expect(region?.getAttribute('aria-live')).toBe('polite');
    expect(toast?.textContent).toContain('Published');
    expect(toast?.getAttribute('data-kui-appearance')).toBe('success');
    expect(snippet?.textContent).toContain("this.toast.setPosition('top-end');");
    expect(snippet?.textContent).toContain('appearance: "success"');
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
