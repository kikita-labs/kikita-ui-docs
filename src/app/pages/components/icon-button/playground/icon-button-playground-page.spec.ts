import { signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsPointerDragService } from '@core/platform/pointer';
import { DocsThemeService } from '@core/theme';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { IconButtonPlaygroundPage } from './icon-button-playground-page';

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

describe('IconButtonPlaygroundPage', () => {
  let fixture: ComponentFixture<IconButtonPlaygroundPage>;

  function previewButton(): HTMLButtonElement | null {
    return (
      [
        ...((fixture.nativeElement as HTMLElement).querySelectorAll<HTMLButtonElement>(
          '.api-playground-viewport__resizable button',
        ) ?? []),
      ].find((button) => button.hasAttribute('kuiIconButton')) ?? null
    );
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconButtonPlaygroundPage],
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

    fixture = TestBed.createComponent(IconButtonPlaygroundPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('updates preview attributes and emits typed escaped snippet attributes', () => {
    const root = fixture.nativeElement as HTMLElement;
    const optionButtons = [...root.querySelectorAll<HTMLButtonElement>('[role="radio"]')];

    setTextInput(root, 'aria-label', '<Settings>');
    optionButtons.find((button) => button.textContent?.trim() === 'outline')?.click();
    optionButtons.find((button) => button.textContent?.trim() === 'danger')?.click();
    optionButtons.find((button) => button.textContent?.trim() === 'lg')?.click();
    fixture.detectChanges();

    const button = previewButton();
    const snippet = root.querySelector<HTMLElement>('.code-tabs__fallback code');

    expect(button?.getAttribute('aria-label')).toBe('<Settings>');
    expect(button?.getAttribute('data-kui-shape')).toBe('outline');
    expect(button?.getAttribute('data-kui-appearance')).toBe('danger');
    expect(button?.getAttribute('data-kui-size')).toBe('lg');
    expect(snippet?.textContent).toContain(
      '<button kuiIconButton type="button" shape="outline" appearance="danger" size="lg" aria-label="&lt;Settings&gt;">',
    );
  });

  it('orders shape and appearance controls like the button playground without none', () => {
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

  it('keeps disabled preview behavior and snippet attribute', () => {
    const root = fixture.nativeElement as HTMLElement;
    const toggle = root.querySelector<HTMLInputElement>('.api-playground__toggle-row input');

    toggle?.click();
    fixture.detectChanges();

    const button = previewButton();
    const snippet = root.querySelector<HTMLElement>('.code-tabs__fallback code');

    expect(button?.disabled).toBe(true);
    expect(snippet?.textContent).toContain(
      '<button kuiIconButton type="button" appearance="primary" disabled',
    );
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
