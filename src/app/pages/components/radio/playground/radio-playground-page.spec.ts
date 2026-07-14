import { signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsPointerDragService } from '@core/platform/pointer';
import { DocsThemeService } from '@core/theme';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { RadioPlaygroundPage } from './radio-playground-page';

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

describe('RadioPlaygroundPage', () => {
  let fixture: ComponentFixture<RadioPlaygroundPage>;

  function previewRadios(): readonly HTMLInputElement[] {
    return [
      ...((fixture.nativeElement as HTMLElement).querySelectorAll<HTMLInputElement>(
        '.api-playground-viewport__resizable input.kui-radio',
      ) ?? []),
    ];
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioPlaygroundPage],
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

    fixture = TestBed.createComponent(RadioPlaygroundPage);
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

    setTextInput(root, 'group label', '<Plan>');
    setTextInput(root, 'first option', '<Starter>');
    setTextInput(root, 'second option', '<Pro>');
    optionButtons.find((button) => button.textContent?.trim() === 'lg')?.click();
    toggles.at(0)?.click();
    fixture.detectChanges();

    const radios = previewRadios();
    const snippet = root.querySelector<HTMLElement>('.code-tabs__fallback code');

    expect(radios).toHaveLength(2);
    expect(radios[0]?.checked).toBe(true);
    expect(radios[0]?.getAttribute('data-kui-size')).toBe('lg');
    expect(radios[0]?.getAttribute('aria-invalid')).toBe('true');
    expect(snippet?.textContent).toContain('label="&lt;Plan&gt;"');
    expect(snippet?.textContent).toContain(
      '<input kuiRadio type="radio" name="playground-radio" size="lg" invalid checked />',
    );
    expect(snippet?.textContent).toContain('&lt;Starter&gt;');
  });

  it('keeps second option disabled when requested', () => {
    const root = fixture.nativeElement as HTMLElement;
    const toggles = [
      ...root.querySelectorAll<HTMLInputElement>('.api-playground__toggle-row input'),
    ];

    toggles.at(1)?.click();
    fixture.detectChanges();

    const radios = previewRadios();
    const snippet = root.querySelector<HTMLElement>('.code-tabs__fallback code');

    expect(radios[1]?.disabled).toBe(true);
    expect(snippet?.textContent).toContain('disabled');
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
