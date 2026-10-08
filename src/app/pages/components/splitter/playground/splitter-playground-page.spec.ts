import { signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsPointerDragService } from '@core/platform/pointer';
import { DocsThemeService } from '@core/theme';
import { CodeHighlighterService } from '@shared/docs-ui/code-tabs';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { SplitterPlaygroundPage } from './splitter-playground-page';

describe('SplitterPlaygroundPage', () => {
  let fixture: ComponentFixture<SplitterPlaygroundPage>;

  function option(label: string): HTMLButtonElement | undefined {
    return [
      ...(fixture.nativeElement as HTMLElement).querySelectorAll<HTMLButtonElement>(
        '[role="radio"]',
      ),
    ].find((button) => button.textContent?.trim() === label);
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

  function separators(): HTMLElement[] {
    return [
      ...(fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>(
        '.api-playground-viewport__resizable kui-splitter [role="separator"]',
      ),
    ];
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SplitterPlaygroundPage],
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

    fixture = TestBed.createComponent(SplitterPlaygroundPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('starts from the runtime defaults, so the snippet only lists the panes and the event', () => {
    expect(snippet()).toBe(
      '<kui-splitter (sizesChange)="onResize($event)">\n  <kui-splitter-pane>Pane 1</kui-splitter-pane>\n  <kui-splitter-pane>Pane 2</kui-splitter-pane>\n</kui-splitter>',
    );
    expect(separators()).toHaveLength(1);
  });

  it('switches to a vertical layout and a collapsible first pane', () => {
    option('vertical')?.click();
    toggle('first pane collapsible')?.click();
    fixture.detectChanges();

    expect(separators()[0]?.getAttribute('aria-orientation')).toBe('horizontal');
    expect(snippet()).toContain('orientation="vertical"');
    expect(snippet()).toContain('[collapsible]="true"');
  });

  it('disables the gutters', () => {
    toggle('disabled')?.click();
    fixture.detectChanges();

    expect(separators()[0]?.getAttribute('aria-disabled')).toBe('true');
    expect(snippet()).toContain('disabled');
  });

  it('logs the sizes after a keyboard resize', () => {
    const root = fixture.nativeElement as HTMLElement;

    separators()[0]?.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }),
    );
    fixture.detectChanges();

    expect(root.querySelector('app-playground-event-log')?.textContent).toContain('sizesChange');
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
