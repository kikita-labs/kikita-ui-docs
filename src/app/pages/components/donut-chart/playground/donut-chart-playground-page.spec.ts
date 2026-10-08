import { signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsPointerDragService } from '@core/platform/pointer';
import { DocsThemeService } from '@core/theme';
import { CodeHighlighterService } from '@shared/docs-ui/code-tabs';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { DonutChartPlaygroundPage } from './donut-chart-playground-page';

describe('DonutChartPlaygroundPage', () => {
  let fixture: ComponentFixture<DonutChartPlaygroundPage>;

  function option(label: string, control?: string): HTMLButtonElement | undefined {
    const root = fixture.nativeElement as HTMLElement;
    const group = control
      ? [...root.querySelectorAll<HTMLElement>('.api-playground__group')].find((candidate) =>
          candidate.textContent?.trim().startsWith(control),
        )
      : root;

    return [...(group?.querySelectorAll<HTMLButtonElement>('[role="radio"]') ?? [])].find(
      (button) => button.textContent?.trim() === label,
    );
  }

  function toggle(label: string): HTMLInputElement | undefined {
    const row = [
      ...(fixture.nativeElement as HTMLElement).querySelectorAll<HTMLLabelElement>(
        '.api-playground__toggle-row',
      ),
    ].find((candidate) => candidate.querySelector('span')?.textContent?.trim() === label);

    return row?.querySelector<HTMLInputElement>('input') ?? undefined;
  }

  function snippet(): string {
    return (
      (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>('.code-tabs__fallback code')
        ?.textContent ?? ''
    );
  }

  function preview(): HTMLElement | null {
    return (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>(
      '.api-playground-viewport__resizable kui-donut-chart',
    );
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonutChartPlaygroundPage],
      providers: [
        provideKikitaUi(),
        { provide: DocsPointerDragService, useValue: { start: vi.fn() } },
        {
          provide: CodeHighlighterService,
          useValue: { highlight: vi.fn().mockRejectedValue(new Error('fallback')) },
        },
        {
          provide: DocsClipboardService,
          useValue: { writeText: vi.fn().mockResolvedValue({ ok: true, value: undefined }) },
        },
        { provide: DocsThemeService, useValue: { codeThemeId: signal('github-dark-default') } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DonutChartPlaygroundPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('starts from the runtime defaults, so the snippet only binds the data', () => {
    expect(snippet()).toContain('<kui-donut-chart [slices]="slices"');
    expect(snippet()).not.toContain('size=');
    expect(preview()?.querySelector('svg[role="graphics-document"]')).not.toBeNull();
  });

  it('switches the size and the legend in the preview and the snippet', () => {
    option('lg')?.click();
    option('hide')?.click();
    fixture.detectChanges();

    expect(snippet()).toContain('size="lg"');
    expect(snippet()).toContain('[legend]="false"');
    expect(preview()?.querySelector('.kui-chart__legend')).toBeNull();
  });

  it('shows the empty composition and the loading state', () => {
    toggle('empty data')?.click();
    fixture.detectChanges();

    expect(preview()?.textContent).toContain('No data');

    toggle('empty data')?.click();
    toggle('loading')?.click();
    fixture.detectChanges();

    expect(snippet()).toContain('loading');
  });

  it('applies the custom messages to the empty state and the snippet', () => {
    toggle('empty data')?.click();
    option('custom', 'messages')?.click();
    fixture.detectChanges();

    expect(preview()?.textContent).toContain('Nothing to show yet');
    expect(snippet()).toContain('[messages]="messages"');
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
