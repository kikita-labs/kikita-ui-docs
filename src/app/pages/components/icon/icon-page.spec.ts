import { isStandalone, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsThemeService } from '@core/theme';
import { ICON_EXAMPLE_SOURCES } from '@generated/example-sources/icon.generated';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { ICON_DOCS_MANIFEST } from './icon.docs-manifest';
import { IconPage } from './icon-page';

describe('IconPage', () => {
  let fixture: ComponentFixture<IconPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconPage],
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

    fixture = TestBed.createComponent(IconPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('preserves public sections and rendered icon examples', () => {
    const root = fixture.nativeElement as HTMLElement;
    const sectionIds = [...root.querySelectorAll<HTMLHeadingElement>('h2')].map(
      (heading) => heading.id,
    );

    expect(root.querySelector('h1')?.textContent?.trim()).toBe('Icon');
    expect(sectionIds).toEqual([
      'import',
      'usage',
      'swap-the-icon-set',
      'security',
      'api',
      'accessibility',
    ]);
    expect(root.querySelectorAll('app-live-preview kui-icon')).toHaveLength(5);
    expect(root.textContent).toContain('provideKuiIcons');
  });

  it('keeps manifest loaders and generated example ownership aligned', async () => {
    const [pageType, playgroundType] = await Promise.all([
      ICON_DOCS_MANIFEST.loadPage(),
      ICON_DOCS_MANIFEST.loadPlayground(),
    ]);

    expect(pageType).toBe(IconPage);
    expect(isStandalone(playgroundType)).toBe(true);
    expect(ICON_DOCS_MANIFEST.exampleIds).toEqual(['basic-icon-example', 'swap-icon-set-example']);
    expect(Object.keys(ICON_EXAMPLE_SOURCES).sort()).toEqual(
      [...ICON_DOCS_MANIFEST.exampleIds].sort(),
    );
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
