import { signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsPointerDragService } from '@core/platform/pointer';
import { DocsThemeService } from '@core/theme';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { ChipPlaygroundPage } from './chip-playground-page';

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

describe('ChipPlaygroundPage', () => {
  let fixture: ComponentFixture<ChipPlaygroundPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChipPlaygroundPage],
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

    fixture = TestBed.createComponent(ChipPlaygroundPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('updates preview attributes and emits typed non-default snippet attributes', () => {
    const root = fixture.nativeElement as HTMLElement;
    const optionButtons = [...root.querySelectorAll<HTMLButtonElement>('[role="radio"]')];
    const toggles = [
      ...root.querySelectorAll<HTMLInputElement>('.api-playground__toggle-row input'),
    ];

    setTextInput(root, 'label', '<Design>');
    optionButtons.find((button) => button.textContent?.trim() === 'danger')?.click();
    optionButtons.find((button) => button.textContent?.trim() === 'lg')?.click();
    toggles.at(1)?.click();
    fixture.detectChanges();

    const chip = root.querySelector<HTMLElement>('app-api-playground-viewport [kuiChip]');
    const snippet = root.querySelector<HTMLElement>('.code-tabs__fallback code');

    expect(chip?.getAttribute('data-kui-appearance')).toBe('danger');
    expect(chip?.getAttribute('data-kui-size')).toBe('lg');
    expect(snippet?.textContent).toContain('appearance="danger" size="lg" invalid');
    expect(snippet?.textContent).toContain('Remove &lt;Design&gt;');
  });

  it('omits remove action when removable is disabled', () => {
    const root = fixture.nativeElement as HTMLElement;
    const toggles = [
      ...root.querySelectorAll<HTMLInputElement>('.api-playground__toggle-row input'),
    ];

    toggles.at(2)?.click();
    fixture.detectChanges();

    const snippet = root.querySelector<HTMLElement>('.code-tabs__fallback code');

    expect(root.querySelector('app-api-playground-viewport button[kuiChipRemove]')).toBeNull();
    expect(snippet?.textContent?.trim()).toBe('<span kuiChip>Design</span>');
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
