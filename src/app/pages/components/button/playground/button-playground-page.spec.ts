import { signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsPointerDragService } from '@core/platform/pointer';
import { DocsThemeService } from '@core/theme';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { ButtonPlaygroundPage } from './button-playground-page';

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

describe('ButtonPlaygroundPage', () => {
  let fixture: ComponentFixture<ButtonPlaygroundPage>;

  function previewButton(): HTMLButtonElement | null {
    return (
      [
        ...((fixture.nativeElement as HTMLElement).querySelectorAll<HTMLButtonElement>(
          'app-api-playground-viewport button',
        ) ?? []),
      ].find((button) => button.hasAttribute('kuiButton')) ?? null
    );
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonPlaygroundPage],
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

    fixture = TestBed.createComponent(ButtonPlaygroundPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('updates preview attributes and emits typed escaped snippet attributes', () => {
    const root = fixture.nativeElement as HTMLElement;
    const optionButtons = [...root.querySelectorAll<HTMLButtonElement>('[role="radio"]')];
    const toggles = [
      ...root.querySelectorAll<HTMLInputElement>('.api-playground__toggle-row input'),
    ];

    setTextInput(root, 'label', '<Save>');
    optionButtons.find((button) => button.textContent?.trim() === 'outline')?.click();
    optionButtons.find((button) => button.textContent?.trim() === 'danger')?.click();
    optionButtons.find((button) => button.textContent?.trim() === 'lg')?.click();
    toggles.at(0)?.click();
    fixture.detectChanges();

    const button = previewButton();
    const snippet = root.querySelector<HTMLElement>('.code-tabs__fallback code');

    expect(button?.textContent?.trim()).toBe('<Save>');
    expect(button?.getAttribute('data-kui-shape')).toBe('outline');
    expect(button?.getAttribute('data-kui-appearance')).toBe('danger');
    expect(button?.getAttribute('data-kui-size')).toBe('lg');
    expect(snippet?.textContent).toBe(
      '<button kuiButton type="button" shape="outline" appearance="danger" size="lg" wrap>&lt;Save&gt;</button>',
    );
  });

  it('orders shape and appearance controls without a none appearance option', () => {
    const root = fixture.nativeElement as HTMLElement;
    const groups = [...root.querySelectorAll<HTMLElement>('.api-playground__group')];
    const shapeOptions = groups
      .find((group) => group.textContent?.includes('shape'))
      ?.querySelectorAll<HTMLButtonElement>('[role="radio"]');
    const appearanceOptions = groups
      .find((group) => group.textContent?.includes('appearance'))
      ?.querySelectorAll<HTMLButtonElement>('[role="radio"]');

    expect([...(shapeOptions ?? [])].map((button) => button.textContent?.trim())).toEqual([
      'solid',
      'soft',
      'outline',
      'ghost',
    ]);
    expect([...(appearanceOptions ?? [])].map((button) => button.textContent?.trim())).toEqual([
      'primary',
      'danger',
      'success',
      'warning',
    ]);
  });

  it('keeps loading behavior disabled and busy in preview and snippet', () => {
    const root = fixture.nativeElement as HTMLElement;
    const toggles = [
      ...root.querySelectorAll<HTMLInputElement>('.api-playground__toggle-row input'),
    ];

    toggles.at(1)?.click();
    fixture.detectChanges();

    const button = previewButton();
    const snippet = root.querySelector<HTMLElement>('.code-tabs__fallback code');

    expect(button?.disabled).toBe(true);
    expect(button?.getAttribute('aria-busy')).toBe('true');
    expect(snippet?.textContent).toBe(
      '<button kuiButton type="button" appearance="primary" loading>Save changes</button>',
    );
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
