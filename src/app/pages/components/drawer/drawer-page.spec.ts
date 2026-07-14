import { isStandalone, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsThemeService } from '@core/theme';
import { DRAWER_EXAMPLE_SOURCES } from '@generated/example-sources/drawer.generated';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { DRAWER_DOCS_MANIFEST } from './drawer.docs-manifest';
import { DrawerPage } from './drawer-page';

describe('DrawerPage', () => {
  let fixture: ComponentFixture<DrawerPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawerPage],
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

    fixture = TestBed.createComponent(DrawerPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('preserves public sections and drawer trigger examples', () => {
    const root = fixture.nativeElement as HTMLElement;
    const sectionIds = [...root.querySelectorAll<HTMLHeadingElement>('h2')].map(
      (heading) => heading.id,
    );

    expect(root.querySelector('h1')?.textContent?.trim()).toBe('Drawer');
    expect(sectionIds).toEqual(['import', 'usage', 'sides', 'sizes', 'api', 'accessibility']);
    expect(root.querySelectorAll('app-live-preview button[kuiButton]')).toHaveLength(9);
    expect(root.querySelector('app-basic-drawer-example')).not.toBeNull();
    expect(root.querySelector('app-drawer-sides-example')).not.toBeNull();
  });

  it('keeps manifest loaders and generated example ownership aligned', async () => {
    const [pageType, playgroundType] = await Promise.all([
      DRAWER_DOCS_MANIFEST.loadPage(),
      DRAWER_DOCS_MANIFEST.loadPlayground(),
    ]);

    expect(pageType).toBe(DrawerPage);
    expect(playgroundType).not.toBe(pageType);
    expect(isStandalone(playgroundType)).toBe(true);
    expect(DRAWER_DOCS_MANIFEST.exampleIds).toEqual([
      'basic-drawer-example',
      'drawer-sides-example',
      'drawer-sizes-example',
    ]);
    expect(Object.keys(DRAWER_EXAMPLE_SOURCES).sort()).toEqual(
      [...DRAWER_DOCS_MANIFEST.exampleIds].sort(),
    );
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
