import { signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsPointerDragService } from '@core/platform/pointer';
import { DocsThemeService } from '@core/theme';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { SegmentedPlaygroundPage } from './segmented-playground-page';

function toggleSwitch(root: HTMLElement, label: string): void {
  const controlLabel = [
    ...root.querySelectorAll<HTMLLabelElement>('.api-playground__toggle-row'),
  ].find((candidate) => candidate.querySelector('span')?.textContent?.trim() === label);
  const input = controlLabel?.querySelector<HTMLInputElement>('input');

  if (!input) {
    throw new Error(`Missing switch: ${label}`);
  }

  input.checked = !input.checked;
  input.dispatchEvent(new Event('change'));
}

describe('SegmentedPlaygroundPage', () => {
  let fixture: ComponentFixture<SegmentedPlaygroundPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SegmentedPlaygroundPage],
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

    fixture = TestBed.createComponent(SegmentedPlaygroundPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('updates preview size and disabled segment snippet state', () => {
    const root = fixture.nativeElement as HTMLElement;
    const optionButtons = [...root.querySelectorAll<HTMLButtonElement>('[role="radio"]')];

    optionButtons.find((button) => button.textContent?.trim() === 'lg')?.click();
    toggleSwitch(root, 'disabled timeline');
    fixture.detectChanges();

    const group = root.querySelector<HTMLElement>(
      '.api-playground-viewport__resizable kui-segmented',
    );
    const timeline = [...root.querySelectorAll<HTMLButtonElement>('button')].find(
      (button) => button.textContent?.trim() === 'Timeline',
    );
    const snippet = root.querySelector<HTMLElement>('.code-tabs__fallback code');

    expect(group?.getAttribute('role')).toBe('radiogroup');
    expect(timeline?.disabled).toBe(true);
    expect(snippet?.textContent).toContain('size="lg"');
    expect(snippet?.textContent).toContain('value="timeline" disabled');
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
