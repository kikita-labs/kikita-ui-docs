import { isStandalone, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsThemeService } from '@core/theme';
import { ICON_BUTTON_EXAMPLE_SOURCES } from '@generated/example-sources/icon-button.generated';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { ICON_BUTTON_DOCS_MANIFEST } from './icon-button.docs-manifest';
import { IconButtonPage } from './icon-button-page';

describe('IconButtonPage', () => {
  let fixture: ComponentFixture<IconButtonPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconButtonPage],
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

    fixture = TestBed.createComponent(IconButtonPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('preserves public sections and labelled icon-only examples', () => {
    const root = fixture.nativeElement as HTMLElement;
    const sectionIds = [...root.querySelectorAll<HTMLHeadingElement>('h2')].map(
      (heading) => heading.id,
    );
    const buttons = [
      ...root.querySelectorAll<HTMLButtonElement>('app-live-preview button.kui-icon-button'),
    ];

    expect(root.querySelector('h1')?.textContent?.trim()).toBe('Icon Button');
    expect(sectionIds).toEqual([
      'import',
      'usage',
      'appearance',
      'size',
      'api',
      'accessibility',
      'known-gaps',
    ]);
    expect(buttons).toHaveLength(17);
    expect(buttons.every((button) => button.hasAttribute('aria-label'))).toBe(true);
    expect(buttons.at(-1)?.disabled).toBe(true);
  });

  it('keeps manifest loaders and generated example ownership aligned', async () => {
    const [pageType, playgroundType] = await Promise.all([
      ICON_BUTTON_DOCS_MANIFEST.loadPage(),
      ICON_BUTTON_DOCS_MANIFEST.loadPlayground(),
    ]);

    expect(pageType).toBe(IconButtonPage);
    expect(isStandalone(playgroundType)).toBe(true);
    expect(ICON_BUTTON_DOCS_MANIFEST.exampleIds).toEqual([
      'icon-button-appearance-example',
      'icon-button-size-example',
    ]);
    expect(Object.keys(ICON_BUTTON_EXAMPLE_SOURCES).sort()).toEqual(
      [...ICON_BUTTON_DOCS_MANIFEST.exampleIds].sort(),
    );
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
