import { signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsPointerDragService } from '@core/platform/pointer';
import { DocsThemeService } from '@core/theme';
import { CodeHighlighterService } from '@shared/docs-ui/code-tabs';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { CarouselPlaygroundPage } from './carousel-playground-page';

describe('CarouselPlaygroundPage', () => {
  let fixture: ComponentFixture<CarouselPlaygroundPage>;

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

  function snippet(): string | undefined {
    return (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>(
      '.code-tabs__fallback code',
    )?.textContent;
  }

  function preview(): HTMLElement | null {
    return (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>(
      '.api-playground-viewport__resizable .kui-carousel__region',
    );
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselPlaygroundPage],
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

    fixture = TestBed.createComponent(CarouselPlaygroundPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('starts from the runtime defaults, so the snippet only lists the slides', () => {
    expect(snippet()?.startsWith('<kui-carousel [(index)]="slide">\n')).toBe(true);
    expect(preview()?.querySelectorAll('[role="group"]')).toHaveLength(5);
    expect(preview()?.getAttribute('aria-label')).toBe('Slides');
  });

  it('applies the custom messages to the preview and the snippet', () => {
    option('custom')?.click();
    fixture.detectChanges();

    expect(preview()?.getAttribute('aria-label')).toBe('Photo gallery');
    expect(snippet()).toContain('[messages]="messages"');
  });

  it('adds the autoplay control and the toggled attributes to the snippet', () => {
    toggle('autoplay')?.click();
    toggle('showDots')?.click();
    fixture.detectChanges();

    expect(preview()?.querySelector('button[aria-label="Pause autoplay"]')).not.toBeNull();
    expect(snippet()).toContain('autoplay');
    expect(snippet()).toContain('[showDots]="false"');
  });

  it('logs the index change when the next arrow is clicked', () => {
    const root = fixture.nativeElement as HTMLElement;

    preview()?.querySelector<HTMLButtonElement>('button[aria-label="Next slide"]')?.click();
    fixture.detectChanges();

    expect(root.querySelector('app-playground-event-log')?.textContent).toContain('indexChange');
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
