import { isStandalone, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsThemeService } from '@core/theme';
import { BADGE_EXAMPLE_SOURCES } from '@generated/example-sources/badge.generated';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { BADGE_DOCS_MANIFEST } from './badge.docs-manifest';
import { BadgePage } from './badge-page';

describe('BadgePage', () => {
  let fixture: ComponentFixture<BadgePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgePage],
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

    fixture = TestBed.createComponent(BadgePage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('preserves the public page sections and rendered badge state matrix', () => {
    const root = fixture.nativeElement as HTMLElement;
    const sectionIds = [...root.querySelectorAll<HTMLHeadingElement>('h2')].map(
      (heading) => heading.id,
    );
    const badges = [...root.querySelectorAll<HTMLElement>('app-live-preview .kui-badge')];

    expect(root.querySelector('h1')?.textContent?.trim()).toBe('Badge');
    expect(sectionIds).toEqual(['import', 'usage', 'appearances', 'sizes', 'api', 'accessibility']);
    expect(badges).toHaveLength(14);
    expect(badges.map((badge) => badge.textContent?.trim())).toEqual([
      'Neutral',
      'Ready',
      'Review',
      'API reference',
      'Neutral',
      'Primary',
      'Success',
      'Warning',
      'Danger',
      'Info',
      'Extra small',
      'Small',
      'Medium',
      'Large',
    ]);
    expect(badges.slice(0, 4).map((badge) => badge.tagName)).toEqual([
      'SPAN',
      'STRONG',
      'CODE',
      'A',
    ]);
    expect(badges[3]?.getAttribute('href')).toBe('#api');
  });

  it('keeps manifest loaders and generated example ownership aligned', async () => {
    const [pageType, playgroundType] = await Promise.all([
      BADGE_DOCS_MANIFEST.loadPage(),
      BADGE_DOCS_MANIFEST.loadPlayground(),
    ]);

    expect(pageType).toBe(BadgePage);
    expect(playgroundType).not.toBe(pageType);
    expect(isStandalone(playgroundType)).toBe(true);
    expect(BADGE_DOCS_MANIFEST.exampleIds).toEqual([
      'badge-appearance-example',
      'badge-size-example',
      'basic-badge-example',
    ]);
    expect(Object.keys(BADGE_EXAMPLE_SOURCES).sort()).toEqual(
      [...BADGE_DOCS_MANIFEST.exampleIds].sort(),
    );
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
