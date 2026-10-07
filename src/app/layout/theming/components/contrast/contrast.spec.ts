import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsThemeService } from '@core/theme';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { Contrast } from './contrast';

describe('Contrast', () => {
  let fixture: ComponentFixture<Contrast>;
  let theme: DocsThemeService;

  beforeEach(async () => {
    window.localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [Contrast],
      providers: [provideKikitaUi()],
    }).compileComponents();

    theme = TestBed.inject(DocsThemeService);
    fixture = TestBed.createComponent(Contrast);
    fixture.detectChanges();
  });

  function segment(label: string): HTMLButtonElement | undefined {
    return [...(fixture.nativeElement as HTMLElement).querySelectorAll('button')].find(
      (button) => button.textContent?.trim() === label,
    );
  }

  it('shows the soft profile selected by default', () => {
    expect(segment('Soft')?.getAttribute('aria-checked')).toBe('true');
    expect(segment('Strict')?.getAttribute('aria-checked')).toBe('false');
  });

  it('applies a chosen profile and returns to the default on reset', () => {
    segment('Strict')?.click();
    fixture.detectChanges();

    expect(theme.contrast()).toBe('strict');
    expect(segment('Strict')?.getAttribute('aria-checked')).toBe('true');

    segment('Reset to defaults')?.click();
    fixture.detectChanges();

    expect(theme.contrast()).toBe('soft');
    expect(segment('Soft')?.getAttribute('aria-checked')).toBe('true');
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
