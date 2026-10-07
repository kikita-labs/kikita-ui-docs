import { signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsPointerDragService } from '@core/platform/pointer';
import { DocsThemeService } from '@core/theme';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { IconPlaygroundPage } from './icon-playground-page';

function setTextControl(root: HTMLElement, label: string, value: string): void {
  const controlLabel = [
    ...root.querySelectorAll<HTMLLabelElement>('.api-playground__group-label'),
  ].find((candidate) => candidate.textContent?.trim() === label);
  const inputId = controlLabel?.getAttribute('for');
  const input = inputId ? root.querySelector<HTMLInputElement>(`#${inputId}`) : null;

  if (!input) throw new Error(`Missing text control: ${label}`);

  input.value = value;
  input.dispatchEvent(new Event('input'));
}

describe('IconPlaygroundPage', () => {
  let fixture: ComponentFixture<IconPlaygroundPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconPlaygroundPage],
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

    fixture = TestBed.createComponent(IconPlaygroundPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('updates preview size, label, and generated snippet', () => {
    const root = fixture.nativeElement as HTMLElement;

    setTextControl(root, 'size', '32px');
    setTextControl(root, 'label (accessible name)', 'Verified');
    fixture.detectChanges();

    const icon = root.querySelector<HTMLElement>('.api-playground-viewport__resizable kui-icon');
    const snippet = root.querySelector<HTMLElement>('.code-tabs__fallback code');

    expect(icon).not.toBeNull();
    expect(snippet?.textContent).toContain('label="Verified"');
    expect(snippet?.textContent).toContain('size="32px"');
  });

  it('draws glyph data and applies the stroke inputs to the preview and the snippet', () => {
    const root = fixture.nativeElement as HTMLElement;
    const glyph = [...root.querySelectorAll<HTMLButtonElement>('[role="radio"]')].find(
      (button) => button.textContent?.trim() === 'glyph',
    );
    const toggle = root.querySelector<HTMLInputElement>('.api-playground__toggle-row input');

    glyph?.click();
    setTextControl(root, 'strokeWidth (0 = unset)', '2.5');
    toggle?.click();
    fixture.detectChanges();

    const icon = root.querySelector<HTMLElement>('.api-playground-viewport__resizable kui-icon');
    const snippets = [...root.querySelectorAll<HTMLElement>('.code-tabs__fallback code')];

    expect(icon?.querySelector('svg path')).not.toBeNull();
    expect(icon?.getAttribute('style')).toContain('--kui-icon-stroke-width');
    expect(snippets[0]?.textContent).toContain('[source]="gauge"');
    expect(snippets[0]?.textContent).toContain('[strokeWidth]="2.5"');
    expect(snippets[0]?.textContent).toContain('absoluteStrokeWidth');
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
