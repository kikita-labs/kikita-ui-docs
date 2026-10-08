import { isStandalone, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsThemeService } from '@core/theme';
import { LINK_EXAMPLE_SOURCES } from '@generated/example-sources/link.generated';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { LINK_DOCS_MANIFEST } from './link.docs-manifest';
import { LinkPage } from './link-page';

describe('LinkPage', () => {
  let fixture: ComponentFixture<LinkPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkPage],
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

    fixture = TestBed.createComponent(LinkPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('preserves the public page sections', () => {
    const root = fixture.nativeElement as HTMLElement;
    const sectionIds = [...root.querySelectorAll<HTMLHeadingElement>('h2')].map(
      (heading) => heading.id,
    );

    expect(root.querySelector('h1')?.textContent?.trim()).toBe('Link');
    expect(sectionIds).toEqual([
      'import',
      'usage',
      'underline',
      'icons',
      'actions',
      'provider-defaults',
      'messages',
      'api',
      'accessibility',
      'not-included',
    ]);
  });

  it('marks external links and disables anchors and buttons', () => {
    const root = fixture.nativeElement as HTMLElement;
    const external = root.querySelector<HTMLAnchorElement>('a[target="_blank"]');
    const disabledAnchor = [...root.querySelectorAll<HTMLAnchorElement>('a[kuiLink]')].find(
      (candidate) => candidate.textContent?.includes('unavailable'),
    );
    const disabledButton = root.querySelector<HTMLButtonElement>('button[kuiLink][disabled]');

    expect(external?.getAttribute('rel')).toContain('noopener');
    expect(external?.textContent).toContain('opens in a new tab');
    expect(disabledAnchor?.getAttribute('aria-disabled')).toBe('true');
    expect(disabledAnchor?.getAttribute('tabindex')).toBe('-1');
    expect(disabledButton?.disabled).toBe(true);
  });

  it('counts a button link click without navigating', () => {
    const root = fixture.nativeElement as HTMLElement;
    const button = [...root.querySelectorAll<HTMLButtonElement>('button[kuiLink]')].find(
      (candidate) => candidate.textContent?.includes('Copy link ('),
    );

    button?.click();
    fixture.detectChanges();

    expect(button?.textContent).toContain('(1)');
  });

  it('keeps manifest loaders and generated example ownership aligned', async () => {
    const [pageType, playgroundType] = await Promise.all([
      LINK_DOCS_MANIFEST.loadPage(),
      LINK_DOCS_MANIFEST.loadPlayground(),
    ]);

    expect(pageType).toBe(LinkPage);
    expect(playgroundType).not.toBe(pageType);
    expect(isStandalone(playgroundType)).toBe(true);
    expect(Object.keys(LINK_EXAMPLE_SOURCES).sort()).toEqual(
      [...LINK_DOCS_MANIFEST.exampleIds].sort(),
    );
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
