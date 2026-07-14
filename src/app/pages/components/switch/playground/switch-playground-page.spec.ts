import { signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsPointerDragService } from '@core/platform/pointer';
import { DocsThemeService } from '@core/theme';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { SwitchPlaygroundPage } from './switch-playground-page';

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

describe('SwitchPlaygroundPage', () => {
  let fixture: ComponentFixture<SwitchPlaygroundPage>;

  function previewSwitch(): HTMLInputElement | null {
    return (
      (fixture.nativeElement as HTMLElement).querySelector<HTMLInputElement>(
        '.api-playground-viewport__resizable input.kui-switch',
      ) ?? null
    );
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwitchPlaygroundPage],
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

    fixture = TestBed.createComponent(SwitchPlaygroundPage);
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

    setTextInput(root, 'label', '<Notifications>');
    optionButtons.find((button) => button.textContent?.trim() === 'lg')?.click();
    toggles.at(1)?.click();
    fixture.detectChanges();

    const control = previewSwitch();
    const snippet = root.querySelector<HTMLElement>('.code-tabs__fallback code');

    expect(control?.checked).toBe(true);
    expect(control?.getAttribute('role')).toBe('switch');
    expect(control?.getAttribute('data-kui-size')).toBe('lg');
    expect(control?.getAttribute('aria-invalid')).toBe('true');
    expect(snippet?.textContent).toContain(
      '<input kuiSwitch type="checkbox" size="lg" checked invalid />',
    );
    expect(snippet?.textContent).toContain('&lt;Notifications&gt;');
  });

  it('keeps disabled behavior and snippet attribute', () => {
    const root = fixture.nativeElement as HTMLElement;
    const toggles = [
      ...root.querySelectorAll<HTMLInputElement>('.api-playground__toggle-row input'),
    ];

    toggles.at(2)?.click();
    fixture.detectChanges();

    const control = previewSwitch();
    const snippet = root.querySelector<HTMLElement>('.code-tabs__fallback code');

    expect(control?.disabled).toBe(true);
    expect(snippet?.textContent).toContain('disabled');
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
