import { isStandalone, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsThemeService } from '@core/theme';
import { GROUP_EXAMPLE_SOURCES } from '@generated/example-sources/group.generated';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { GROUP_DOCS_MANIFEST } from './group.docs-manifest';
import { GroupPage } from './group-page';

describe('GroupPage', () => {
  let fixture: ComponentFixture<GroupPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupPage],
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

    fixture = TestBed.createComponent(GroupPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('preserves public sections and grouped control examples', () => {
    const root = fixture.nativeElement as HTMLElement;
    const sectionIds = [...root.querySelectorAll<HTMLHeadingElement>('h2')].map(
      (heading) => heading.id,
    );
    const groups = [...root.querySelectorAll<HTMLElement>('app-live-preview .kui-group')];
    const verticalGroup = groups.find(
      (group) => group.getAttribute('data-kui-orientation') === 'vertical',
    );

    expect(root.querySelector('h1')?.textContent?.trim()).toBe('Group');
    expect(sectionIds).toEqual([
      'import',
      'usage',
      'orientation',
      'size',
      'grouping-fields',
      'api',
      'accessibility',
    ]);
    expect(groups.length).toBeGreaterThanOrEqual(8);
    expect(groups.every((group) => group.hasAttribute('data-kui-collapsed'))).toBe(true);
    expect(verticalGroup).toBeDefined();
    expect(root.querySelector('button[aria-label="More options"]')).not.toBeNull();
  });

  it('keeps manifest loaders and generated example ownership aligned', async () => {
    const [pageType, playgroundType] = await Promise.all([
      GROUP_DOCS_MANIFEST.loadPage(),
      GROUP_DOCS_MANIFEST.loadPlayground(),
    ]);

    expect(pageType).toBe(GroupPage);
    expect(isStandalone(playgroundType)).toBe(true);
    expect(GROUP_DOCS_MANIFEST.exampleIds).toEqual([
      'basic-group-example',
      'group-field-example',
      'group-orientation-example',
      'group-size-example',
    ]);
    expect(Object.keys(GROUP_EXAMPLE_SOURCES).sort()).toEqual(
      [...GROUP_DOCS_MANIFEST.exampleIds].sort(),
    );
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
