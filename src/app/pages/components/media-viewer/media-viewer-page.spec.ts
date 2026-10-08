import { isStandalone, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsThemeService } from '@core/theme';
import { MEDIA_VIEWER_EXAMPLE_SOURCES } from '@generated/example-sources/media-viewer.generated';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { MEDIA_VIEWER_DOCS_MANIFEST } from './media-viewer.docs-manifest';
import { MediaViewerPage } from './media-viewer-page';

describe('MediaViewerPage', () => {
  let fixture: ComponentFixture<MediaViewerPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaViewerPage],
      providers: [
        provideKikitaUi(),
        provideRouter([]),
        {
          provide: DocsClipboardService,
          useValue: { writeText: vi.fn().mockResolvedValue({ ok: true, value: undefined }) },
        },
        { provide: DocsThemeService, useValue: { codeThemeId: signal('github-dark-default') } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MediaViewerPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  afterEach(() => {
    document.querySelectorAll('.cdk-overlay-container').forEach((overlay) => {
      overlay.replaceChildren();
    });
  });

  it('preserves the public page sections', () => {
    const root = fixture.nativeElement as HTMLElement;
    const sectionIds = [...root.querySelectorAll<HTMLHeadingElement>('h2')].map(
      (heading) => heading.id,
    );

    expect(root.querySelector('h1')?.textContent?.trim()).toBe('Media Viewer');
    expect(sectionIds).toEqual([
      'import',
      'usage',
      'single-photo',
      'multi-select',
      'interaction',
      'theming-tokens',
      'messages',
      'api',
      'accessibility',
      'not-included',
    ]);
  });

  it('opens the lightbox on the clicked photo with its gallery chrome', async () => {
    const root = fixture.nativeElement as HTMLElement;
    const tiles = root.querySelectorAll<HTMLButtonElement>('.media-viewer-example__tile');

    tiles[1]?.click();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const dialog = document.querySelector<HTMLElement>('[role="dialog"]');

    expect(dialog?.getAttribute('aria-modal')).toBe('true');
    expect(dialog?.querySelectorAll('button[aria-current="true"]')).toHaveLength(1);
    expect(root.textContent).toContain('Last viewed index: 1');
  });

  it('toggles the selection without opening the viewer', () => {
    const root = fixture.nativeElement as HTMLElement;
    const checkbox = root.querySelector<HTMLInputElement>('input[kuiCheckbox]');

    checkbox?.click();
    fixture.detectChanges();

    expect(root.textContent).toContain('1 selected');
    expect(document.querySelector('[role="dialog"]')).toBeNull();
  });

  it('keeps manifest loaders and generated example ownership aligned', async () => {
    const [pageType, playgroundType] = await Promise.all([
      MEDIA_VIEWER_DOCS_MANIFEST.loadPage(),
      MEDIA_VIEWER_DOCS_MANIFEST.loadPlayground(),
    ]);

    expect(pageType).toBe(MediaViewerPage);
    expect(playgroundType).not.toBe(pageType);
    expect(isStandalone(playgroundType)).toBe(true);
    expect(Object.keys(MEDIA_VIEWER_EXAMPLE_SOURCES).sort()).toEqual(
      [...MEDIA_VIEWER_DOCS_MANIFEST.exampleIds].sort(),
    );
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
