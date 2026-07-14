import { isStandalone, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsThemeService } from '@core/theme';
import { TABS_EXAMPLE_SOURCES } from '@generated/example-sources/tabs.generated';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { TABS_DOCS_MANIFEST } from './tabs.docs-manifest';
import { TabsPage } from './tabs-page';

describe('TabsPage', () => {
  let fixture: ComponentFixture<TabsPage>;

  beforeEach(async () => {
    vi.stubGlobal(
      'ResizeObserver',
      class {
        public observe(): void {
          return undefined;
        }

        public unobserve(): void {
          return undefined;
        }

        public disconnect(): void {
          return undefined;
        }
      },
    );

    await TestBed.configureTestingModule({
      imports: [TabsPage],
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

    fixture = TestBed.createComponent(TabsPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('preserves public sections and rendered tab examples', () => {
    const root = fixture.nativeElement as HTMLElement;
    const sectionIds = [...root.querySelectorAll<HTMLHeadingElement>('h2')].map(
      (heading) => heading.id,
    );

    expect(root.querySelector('h1')?.textContent?.trim()).toBe('Tabs');
    expect(sectionIds).toEqual([
      'import',
      'usage',
      'variant',
      'orientation',
      'composition',
      'api',
      'accessibility',
    ]);
    expect(root.querySelectorAll('app-live-preview .kui-tabs')).toHaveLength(4);
    expect(
      root.querySelector('app-pill-tabs-example .kui-tabs')?.getAttribute('data-kui-variant'),
    ).toBe('pill');
    expect(
      root
        .querySelector('app-vertical-tabs-example .kui-tabs')
        ?.getAttribute('data-kui-orientation'),
    ).toBe('vertical');
  });

  it('keeps manifest loaders and generated example ownership aligned', async () => {
    const [pageType, playgroundType] = await Promise.all([
      TABS_DOCS_MANIFEST.loadPage(),
      TABS_DOCS_MANIFEST.loadPlayground(),
    ]);

    expect(pageType).toBe(TabsPage);
    expect(playgroundType).not.toBe(pageType);
    expect(isStandalone(playgroundType)).toBe(true);
    expect(TABS_DOCS_MANIFEST.exampleIds).toEqual([
      'basic-tabs-example',
      'navigation-tabs-example',
      'pill-tabs-example',
      'vertical-tabs-example',
    ]);
    expect(Object.keys(TABS_EXAMPLE_SOURCES).sort()).toEqual(
      [...TABS_DOCS_MANIFEST.exampleIds].sort(),
    );
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
