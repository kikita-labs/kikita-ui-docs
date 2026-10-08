import { signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsPointerDragService } from '@core/platform/pointer';
import { DocsThemeService } from '@core/theme';
import { CodeHighlighterService } from '@shared/docs-ui/code-tabs';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { MediaViewerPlaygroundPage } from './media-viewer-playground-page';

describe('MediaViewerPlaygroundPage', () => {
  let fixture: ComponentFixture<MediaViewerPlaygroundPage>;

  function snippet(): string {
    return (
      (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>('.code-tabs__fallback code')
        ?.textContent ?? ''
    );
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaViewerPlaygroundPage],
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

    fixture = TestBed.createComponent(MediaViewerPlaygroundPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  afterEach(() => {
    document.querySelectorAll('.cdk-overlay-container').forEach((overlay) => {
      overlay.replaceChildren();
    });
  });

  it('starts from the runtime defaults, so the snippet only lists the items and the callback', () => {
    expect(snippet()).toContain('items: this.photos,');
    expect(snippet()).toContain('onIndexChange');
    expect(snippet()).not.toContain('maxZoom');
    expect(snippet()).not.toContain('zoomStep');
  });

  it('opens the viewer and logs the open and the initial index', async () => {
    const root = fixture.nativeElement as HTMLElement;

    root.querySelector<HTMLButtonElement>('.api-playground-viewport__resizable button')?.click();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(document.querySelector('[role="dialog"]')).not.toBeNull();
    expect(root.querySelector('app-playground-event-log')?.textContent).toContain('open');
    expect(root.querySelector('app-playground-event-log')?.textContent).toContain('onIndexChange');
  });

  it('adds the custom messages to the snippet', () => {
    const custom = [
      ...(fixture.nativeElement as HTMLElement).querySelectorAll<HTMLButtonElement>(
        '[role="radio"]',
      ),
    ].find((button) => button.textContent?.trim() === 'custom');

    custom?.click();
    fixture.detectChanges();

    expect(snippet()).toContain('messages: this.messages');
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
