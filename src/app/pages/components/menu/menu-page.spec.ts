import { isStandalone, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsThemeService } from '@core/theme';
import { MENU_EXAMPLE_SOURCES } from '@generated/example-sources/menu.generated';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { MENU_DOCS_MANIFEST } from './menu.docs-manifest';
import { MenuPage } from './menu-page';

describe('MenuPage', () => {
  let fixture: ComponentFixture<MenuPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuPage],
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

    fixture = TestBed.createComponent(MenuPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('preserves public sections and menu trigger examples', () => {
    const root = fixture.nativeElement as HTMLElement;
    const sectionIds = [...root.querySelectorAll<HTMLHeadingElement>('h2')].map(
      (heading) => heading.id,
    );
    const triggers = [
      ...root.querySelectorAll<HTMLButtonElement>('app-live-preview button[kuibutton]'),
    ];

    expect(root.querySelector('h1')?.textContent?.trim()).toBe('Menu');
    expect(sectionIds).toEqual(['import', 'usage', 'content', 'api', 'accessibility']);
    expect(triggers.length).toBeGreaterThanOrEqual(2);
    expect(triggers.every((trigger) => trigger.getAttribute('aria-haspopup') === 'menu')).toBe(
      true,
    );
    expect(root.textContent).toContain('destructive');
  });

  it('keeps manifest loaders and generated example ownership aligned', async () => {
    const [pageType, playgroundType] = await Promise.all([
      MENU_DOCS_MANIFEST.loadPage(),
      MENU_DOCS_MANIFEST.loadPlayground(),
    ]);

    expect(pageType).toBe(MenuPage);
    expect(isStandalone(playgroundType)).toBe(true);
    expect(MENU_DOCS_MANIFEST.exampleIds).toEqual(['basic-menu-example', 'menu-content-example']);
    expect(Object.keys(MENU_EXAMPLE_SOURCES).sort()).toEqual(
      [...MENU_DOCS_MANIFEST.exampleIds].sort(),
    );
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
