import { isStandalone, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsThemeService } from '@core/theme';
import { AVATAR_EXAMPLE_SOURCES } from '@generated/example-sources/avatar.generated';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { AVATAR_DOCS_MANIFEST } from './avatar.docs-manifest';
import { AvatarPage } from './avatar-page';

describe('AvatarPage', () => {
  let fixture: ComponentFixture<AvatarPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarPage],
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

    fixture = TestBed.createComponent(AvatarPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('preserves public sections and avatar examples', () => {
    const root = fixture.nativeElement as HTMLElement;
    const sectionIds = [...root.querySelectorAll<HTMLHeadingElement>('h2')].map(
      (heading) => heading.id,
    );

    expect(root.querySelector('h1')?.textContent?.trim()).toBe('Avatar');
    expect(sectionIds).toEqual([
      'import',
      'usage',
      'sizes-and-shapes',
      'status',
      'avatar-group',
      'interactive-avatar',
      'api',
      'accessibility',
    ]);
    expect(root.querySelectorAll('app-live-preview kui-avatar').length).toBeGreaterThanOrEqual(18);
    expect(root.querySelector('app-live-preview kui-avatar-group')).not.toBeNull();
    expect(
      root.querySelector('.kui-avatar-action[aria-label="Open Nikita Repin profile"]'),
    ).not.toBeNull();
  });

  it('keeps manifest loaders and generated example ownership aligned', async () => {
    const [pageType, playgroundType] = await Promise.all([
      AVATAR_DOCS_MANIFEST.loadPage(),
      AVATAR_DOCS_MANIFEST.loadPlayground(),
    ]);

    expect(pageType).toBe(AvatarPage);
    expect(playgroundType).not.toBe(pageType);
    expect(isStandalone(playgroundType)).toBe(true);
    expect(AVATAR_DOCS_MANIFEST.exampleIds).toEqual([
      'avatar-button-example',
      'avatar-group-example',
      'avatar-sizes-shapes-example',
      'avatar-status-example',
      'basic-avatar-example',
    ]);
    expect(Object.keys(AVATAR_EXAMPLE_SOURCES).sort()).toEqual(
      [...AVATAR_DOCS_MANIFEST.exampleIds].sort(),
    );
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
