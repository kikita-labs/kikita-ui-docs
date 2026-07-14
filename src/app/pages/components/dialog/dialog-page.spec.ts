import { isStandalone, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsThemeService } from '@core/theme';
import { DIALOG_EXAMPLE_SOURCES } from '@generated/example-sources/dialog.generated';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { DIALOG_DOCS_MANIFEST } from './dialog.docs-manifest';
import { DialogPage } from './dialog-page';

describe('DialogPage', () => {
  let fixture: ComponentFixture<DialogPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogPage],
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

    fixture = TestBed.createComponent(DialogPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('preserves public sections and dialog trigger examples', () => {
    const root = fixture.nativeElement as HTMLElement;
    const sectionIds = [...root.querySelectorAll<HTMLHeadingElement>('h2')].map(
      (heading) => heading.id,
    );

    expect(root.querySelector('h1')?.textContent?.trim()).toBe('Dialog');
    expect(sectionIds).toEqual(['import', 'usage', 'sizes', 'confirm', 'api', 'accessibility']);
    expect(root.querySelectorAll('app-live-preview button[kuiButton]')).toHaveLength(6);
    expect(root.querySelector('app-basic-dialog-example')).not.toBeNull();
    expect(root.querySelector('app-dialog-confirm-example')).not.toBeNull();
  });

  it('keeps manifest loaders and generated example ownership aligned', async () => {
    const [pageType, playgroundType] = await Promise.all([
      DIALOG_DOCS_MANIFEST.loadPage(),
      DIALOG_DOCS_MANIFEST.loadPlayground(),
    ]);

    expect(pageType).toBe(DialogPage);
    expect(playgroundType).not.toBe(pageType);
    expect(isStandalone(playgroundType)).toBe(true);
    expect(DIALOG_DOCS_MANIFEST.exampleIds).toEqual([
      'basic-dialog-example',
      'dialog-confirm-example',
      'dialog-sizes-example',
    ]);
    expect(Object.keys(DIALOG_EXAMPLE_SOURCES).sort()).toEqual(
      [...DIALOG_DOCS_MANIFEST.exampleIds].sort(),
    );
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
