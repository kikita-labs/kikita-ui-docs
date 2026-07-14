import { isStandalone, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsThemeService } from '@core/theme';
import { CARD_EXAMPLE_SOURCES } from '@generated/example-sources/card.generated';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { CARD_DOCS_MANIFEST } from './card.docs-manifest';
import { CardPage } from './card-page';

describe('CardPage', () => {
  let fixture: ComponentFixture<CardPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPage],
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

    fixture = TestBed.createComponent(CardPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('preserves public sections and semantic card examples', () => {
    const root = fixture.nativeElement as HTMLElement;
    const sectionIds = [...root.querySelectorAll<HTMLHeadingElement>('h2')].map(
      (heading) => heading.id,
    );

    expect(root.querySelector('h1')?.textContent?.trim()).toBe('Card');
    expect(sectionIds).toEqual([
      'import',
      'usage',
      'appearances',
      'sizes',
      'interactive',
      'api',
      'accessibility',
    ]);
    expect(root.querySelectorAll('app-live-preview .kui-card').length).toBeGreaterThanOrEqual(10);
    expect(root.querySelectorAll('app-card-interactive-example button.kui-card')).toHaveLength(1);
    expect(root.querySelectorAll('app-card-interactive-example a.kui-card')).toHaveLength(1);
    expect(root.querySelectorAll('app-card-interactive-example article.kui-card')).toHaveLength(0);
  });

  it('keeps manifest loaders and generated example ownership aligned', async () => {
    const [pageType, playgroundType] = await Promise.all([
      CARD_DOCS_MANIFEST.loadPage(),
      CARD_DOCS_MANIFEST.loadPlayground(),
    ]);

    expect(pageType).toBe(CardPage);
    expect(playgroundType).not.toBe(pageType);
    expect(isStandalone(playgroundType)).toBe(true);
    expect(CARD_DOCS_MANIFEST.exampleIds).toEqual([
      'basic-card-example',
      'card-appearance-example',
      'card-interactive-example',
      'card-size-example',
    ]);
    expect(Object.keys(CARD_EXAMPLE_SOURCES).sort()).toEqual(
      [...CARD_DOCS_MANIFEST.exampleIds].sort(),
    );
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
