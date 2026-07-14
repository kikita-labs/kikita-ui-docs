import { isStandalone, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsThemeService } from '@core/theme';
import { BUTTON_EXAMPLE_SOURCES } from '@generated/example-sources/button.generated';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { BUTTON_DOCS_MANIFEST } from './button.docs-manifest';
import { ButtonPage } from './button-page';

describe('ButtonPage', () => {
  let fixture: ComponentFixture<ButtonPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonPage],
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

    fixture = TestBed.createComponent(ButtonPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('preserves public sections and native button/link examples', () => {
    const root = fixture.nativeElement as HTMLElement;
    const sectionIds = [...root.querySelectorAll<HTMLHeadingElement>('h2')].map(
      (heading) => heading.id,
    );
    const buttons = [
      ...root.querySelectorAll<HTMLButtonElement>('app-live-preview button.kui-button'),
    ];
    const links = [...root.querySelectorAll<HTMLAnchorElement>('app-live-preview a.kui-button')];

    expect(root.querySelector('h1')?.textContent?.trim()).toBe('Button');
    expect(sectionIds).toEqual([
      'import',
      'usage',
      'appearances',
      'sizes-and-states',
      'api',
      'accessibility',
    ]);
    expect(buttons.map((button) => button.textContent?.trim())).toEqual([
      'Save changes',
      'Cancel',
      'Solid',
      'Soft',
      'Outline',
      'Ghost',
      'Danger',
      'Outline danger',
      'Extra small',
      'Small',
      'Medium',
      'Large',
      'Disabled',
      'Loading',
    ]);
    expect(links.map((link) => link.textContent?.trim())).toEqual(['Button docs']);
    expect(buttons.at(-2)?.disabled).toBe(true);
    expect(buttons.at(-1)?.getAttribute('aria-busy')).toBe('true');
  });

  it('keeps manifest loaders and generated example ownership aligned', async () => {
    const [pageType, playgroundType] = await Promise.all([
      BUTTON_DOCS_MANIFEST.loadPage(),
      BUTTON_DOCS_MANIFEST.loadPlayground(),
    ]);

    expect(pageType).toBe(ButtonPage);
    expect(isStandalone(playgroundType)).toBe(true);
    expect(BUTTON_DOCS_MANIFEST.exampleIds).toEqual([
      'basic-button-example',
      'button-appearance-example',
      'button-size-example',
    ]);
    expect(Object.keys(BUTTON_EXAMPLE_SOURCES).sort()).toEqual(
      [...BUTTON_DOCS_MANIFEST.exampleIds].sort(),
    );
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
