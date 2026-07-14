import { signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsPointerDragService } from '@core/platform/pointer';
import { DocsThemeService } from '@core/theme';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { CheckboxPlaygroundPage } from './checkbox-playground-page';

function setTextInput(root: HTMLElement, label: string, value: string): void {
  const controlLabel = [...root.querySelectorAll<HTMLLabelElement>('label')].find(
    (candidate) => candidate.textContent?.trim() === label,
  );
  const input = controlLabel?.htmlFor
    ? root.querySelector<HTMLInputElement>(`#${controlLabel.htmlFor}`)
    : null;

  if (!input) {
    throw new Error(`Missing text input: ${label}`);
  }

  input.value = value;
  input.dispatchEvent(new Event('input'));
}

describe('CheckboxPlaygroundPage', () => {
  let fixture: ComponentFixture<CheckboxPlaygroundPage>;

  function previewCheckbox(): HTMLInputElement | null {
    return (
      (fixture.nativeElement as HTMLElement).querySelector<HTMLInputElement>(
        '.api-playground-viewport__resizable input.kui-checkbox',
      ) ?? null
    );
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxPlaygroundPage],
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

    fixture = TestBed.createComponent(CheckboxPlaygroundPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('updates preview attributes and emits typed escaped snippet content', () => {
    const root = fixture.nativeElement as HTMLElement;
    const optionButtons = [...root.querySelectorAll<HTMLButtonElement>('[role="radio"]')];
    const toggles = [
      ...root.querySelectorAll<HTMLInputElement>('.api-playground__toggle-row input'),
    ];

    setTextInput(root, 'label', '<Updates>');
    optionButtons.find((button) => button.textContent?.trim() === 'lg')?.click();
    toggles.at(1)?.click();
    fixture.detectChanges();

    const checkbox = previewCheckbox();
    const snippet = root.querySelector<HTMLElement>('.code-tabs__fallback code');

    expect(checkbox?.checked).toBe(true);
    expect(checkbox?.getAttribute('data-kui-size')).toBe('lg');
    expect(checkbox?.getAttribute('aria-invalid')).toBe('true');
    expect(snippet?.textContent).toContain(
      '<input kuiCheckbox type="checkbox" size="lg" checked invalid />',
    );
    expect(snippet?.textContent).toContain('&lt;Updates&gt;');
  });

  it('keeps disabled behavior and snippet attribute', () => {
    const root = fixture.nativeElement as HTMLElement;
    const toggles = [
      ...root.querySelectorAll<HTMLInputElement>('.api-playground__toggle-row input'),
    ];

    toggles.at(2)?.click();
    fixture.detectChanges();

    const checkbox = previewCheckbox();
    const snippet = root.querySelector<HTMLElement>('.code-tabs__fallback code');

    expect(checkbox?.disabled).toBe(true);
    expect(snippet?.textContent).toContain('disabled');
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
